import { useMemo, useState } from 'react'
import { ensaladaSemana, esInternacional, POSTRES, RECETAS, calcularReceta, ingredientesLegibles } from '../datos/recetas.js'
import { NUTRIENTES, MICROS_APP, rangoDe } from '../datos/alimentos.js'
import { calcularMetas, cargarPerfil } from '../datos/perfil.js'
import MetaPanel from '../componentes/MetaPanel.jsx'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const TIEMPOS = ['desayuno', 'comida', 'cena']

/** Generador determinista por semilla (LCG), mismo espíritu que la app. */
function generarSemana(objetivo, semilla) {
  let s = semilla >>> 0
  const azar = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  const pool = (tiempo) => {
    const propias = RECETAS.filter((r) => r.tiempo === tiempo && r.objetivos.includes(objetivo))
    return propias.length >= 2
      ? propias
      : RECETAS.filter((r) => r.tiempo === tiempo && (r.objetivos.includes(objetivo) || r.objetivos.includes('general')))
  }
  // Máximo UNA receta internacional por semana: solo un slot (de 21) la permite.
  const slotInternacional = Math.floor(azar() * 21)
  let slot = 0
  return DIAS.map(() => {
    const dia = {}
    for (const t of TIEMPOS) {
      const todas = pool(t)
      const nacionales = todas.filter((r) => !esInternacional(r))
      const opciones = slot === slotInternacional || nacionales.length === 0 ? todas : nacionales
      dia[t] = opciones[Math.floor(azar() * opciones.length)]
      slot++
    }
    return dia
  })
}

const fmt = (v, dec = 0) => Number(v.toFixed(dec)).toLocaleString('es-MX')

function EstadoMicro({ clave, valor, sexo }) {
  const rango = rangoDe(clave, sexo)
  const n = NUTRIENTES.find((x) => x.clave === clave)
  if (!rango) return null
  const ok = rango.tipo === 'max' ? valor <= rango.valor : valor >= rango.valor
  // La vitamina D casi no se obtiene de la comida: su vía principal es el sol.
  // No la marcamos como "falta" del menú, sino como recordatorio.
  const esVitD = clave === 'vitD'
  return (
    <tr>
      <td>{n.nombre}</td>
      <td className="num">{fmt(valor, n.decimales)} {n.unidad}</td>
      <td className="num mini">{rango.tipo === 'max' ? '≤' : '≥'} {fmt(rango.valor, 0)}</td>
      <td>
        {esVitD
          ? <span className="pastilla">☀ del sol</span>
          : ok
            ? <span className="pastilla ok">✓</span>
            : <span className="pastilla alerta">{rango.tipo === 'max' ? 'excede' : 'falta'}</span>}
      </td>
    </tr>
  )
}

export default function Recetas() {
  const [, setTick] = useState(0)
  const perfil = cargarPerfil()
  const metas = calcularMetas(perfil)
  const objetivo = perfil?.objetivo ?? 'longevidad'
  const sexo = perfil?.sexo || 'femenino' // sin perfil: rangos de mujer (los más exigentes)

  const [semilla, setSemilla] = useState(() => {
    // Semilla por semana ISO: el menú CAMBIA SOLO cada lunes y es fijo toda la semana.
    const ahora = new Date()
    const inicio = new Date(ahora.getFullYear(), 0, 1)
    return ahora.getFullYear() * 100 + Math.ceil(((ahora - inicio) / 86400000 + 1) / 7)
  })
  const [abierta, setAbierta] = useState(null)

  const semana = useMemo(() => generarSemana(objetivo, semilla), [objetivo, semilla])
  const ENSALADA = useMemo(() => ensaladaSemana(semilla), [semilla])
  const ensalada = useMemo(() => calcularReceta(ENSALADA), [ENSALADA])

  return (
    <>
      <h2>Menú semanal</h2>
      <p className="mini">
        Tres comidas por día + una <strong>ensalada cruda</strong> que rota cada
        semana (la verdura cruda es la garantía de micronutrientes). El menú
        también rota solo cada semana; las porciones se escalan a TU meta.
      </p>

      <MetaPanel onCambio={() => setTick((t) => t + 1)} />

      <div className="fila tarjeta">
        <span className="pastilla">Objetivo del menú: <strong>{objetivo}</strong> (se toma de tu perfil)</span>
        <button className="boton secundario" onClick={() => setSemilla(Math.floor(Math.random() * 1e9))}>
          🎲 Otro menú
        </button>
      </div>

      {semana.map((dia, i) => {
        // Escala las comidas (no la ensalada) para que CADA día caiga en tu meta.
        // Con los topes por ingrediente la relación ya no es lineal, así que el
        // factor se encuentra por búsqueda binaria (kcal(factor) es monótona).
        const kcalConFactor = (f) =>
          TIEMPOS.reduce((acc, t) => acc + calcularReceta(dia[t], f).kcal, 0)
        let factor = 1
        if (metas) {
          const objetivoComidas = metas.kcal - ensalada.kcal
          let lo = 0.7
          let hi = 3
          for (let i = 0; i < 24; i++) {
            const mid = (lo + hi) / 2
            if (kcalConFactor(mid) < objetivoComidas) lo = mid
            else hi = mid
          }
          factor = Math.round(((lo + hi) / 2) * 10) / 10
        }
        const totalDia = {}
        for (const n of NUTRIENTES) totalDia[n.clave] = ensalada[n.clave]
        for (const t of TIEMPOS) {
          const r = calcularReceta(dia[t], factor)
          for (const n of NUTRIENTES) totalDia[n.clave] += r[n.clave]
        }
        const claveMicros = `${DIAS[i]}-micros`
        return (
          <div className="tarjeta" key={DIAS[i]}>
            <div className="fila" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{DIAS[i]}</h3>
              <span className="fila">
                {factor !== 1 && <span className="pastilla">porciones ×{factor}</span>}
                <span className="pastilla">
                  ≈ {fmt(totalDia.kcal)} kcal{metas ? ` de ${fmt(metas.kcal)}` : ''}
                </span>
                <span className="pastilla">P {fmt(totalDia.prot)}</span>
                <span className="pastilla">C {fmt(totalDia.carb)}</span>
                <span className="pastilla">G {fmt(totalDia.gras)} g</span>
                {metas && totalDia.kcal < metas.kcal * 0.93 && (
                  <span className="pastilla alerta">corto: agrega un postre o colación</span>
                )}
              </span>
            </div>
            <table>
              <tbody>
                {TIEMPOS.map((t) => {
                  const r = dia[t]
                  const tot = calcularReceta(r, factor)
                  const clave = `${DIAS[i]}-${t}`
                  return (
                    <tr key={t}>
                      <td style={{ width: 100, textTransform: 'capitalize' }} className="mini">{t}</td>
                      <td>
                        <button
                          className="borrar"
                          style={{ padding: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--marron)', textAlign: 'left' }}
                          onClick={() => setAbierta(abierta === clave ? null : clave)}
                        >
                          {r.nombre} {abierta === clave ? '▴' : '▾'}
                        </button>
                        {abierta === clave && (
                          <ul className="mini" style={{ margin: '0.3rem 0 0' }}>
                            {ingredientesLegibles(r, factor).map((ing) => <li key={ing}>{ing}</li>)}
                          </ul>
                        )}
                      </td>
                      <td className="num mini">
                        {fmt(tot.kcal)} kcal · P {fmt(tot.prot)} C {fmt(tot.carb)} G {fmt(tot.gras)}
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td className="mini">siempre</td>
                  <td>
                    <button
                      className="borrar"
                      style={{ padding: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--verde)', textAlign: 'left' }}
                      onClick={() => setAbierta(abierta === `${DIAS[i]}-ens` ? null : `${DIAS[i]}-ens`)}
                    >
                      🥗 {ENSALADA.nombre} {abierta === `${DIAS[i]}-ens` ? '▴' : '▾'}
                    </button>
                    {abierta === `${DIAS[i]}-ens` && (
                      <ul className="mini" style={{ margin: '0.3rem 0 0' }}>
                        {ingredientesLegibles(ENSALADA).map((ing) => <li key={ing}>{ing}</li>)}
                      </ul>
                    )}
                  </td>
                  <td className="num mini">
                    {fmt(ensalada.kcal)} kcal · P {fmt(ensalada.prot)} C {fmt(ensalada.carb)} G {fmt(ensalada.gras)}
                  </td>
                </tr>
              </tbody>
            </table>
            <details style={{ marginTop: '0.5rem' }}>
              <summary className="mini" style={{ cursor: 'pointer' }}>
                Ver micronutrientes del día vs. rango saludable
              </summary>
              <table style={{ marginTop: '0.4rem' }}>
                <thead><tr><th>Micro</th><th className="num">Día</th><th className="num">Rango</th><th></th></tr></thead>
                <tbody>
                  {MICROS_APP.map((clave) => (
                    <EstadoMicro key={clave} clave={clave} valor={totalDia[clave]} sexo={sexo} />
                  ))}
                </tbody>
              </table>
              <p className="mini" style={{ marginTop: '0.4rem', marginBottom: 0 }}>
                Suma la ensalada + las 3 comidas. La <strong>vitamina D</strong> casi no
                viene de la comida (su vía es el sol, ~15 min varias veces/semana), y la
                <strong> B12</strong> solo del origen animal del menú (huevo, lácteos,
                pescado).
              </p>
            </details>
          </div>
        )
      })}

      <h2>Postres saludables (opcional)</h2>
      <p className="mini">
        Si te queda margen de calorías, elige uno. No se suman al total del día
        (ese ya cuadra con las 3 comidas + ensalada); aquí solo como referencia.
      </p>
      <div className="rejilla">
        {POSTRES.map((p) => {
          const t = calcularReceta(p)
          return (
            <div className="tarjeta" key={p.id}>
              <div className="fila" style={{ justifyContent: 'space-between' }}>
                <strong>{p.nombre}</strong>
                <span className="pastilla">{fmt(t.kcal)} kcal</span>
              </div>
              <p className="mini" style={{ margin: '0.3rem 0 0' }}>
                P {fmt(t.prot)} · C {fmt(t.carb)} · G {fmt(t.gras)} g
              </p>
              <ul className="mini" style={{ margin: '0.3rem 0 0' }}>
                {ingredientesLegibles(p).map((ing) => <li key={ing}>{ing}</li>)}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}
