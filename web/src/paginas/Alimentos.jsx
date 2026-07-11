import { useEffect, useMemo, useState } from 'react'
import { ALIMENTOS, MICROS_APP, NUTRIENTES, rangoDe } from '../datos/alimentos.js'
import { calcularMetas, cargarPerfil } from '../datos/perfil.js'
import MetaPanel from '../componentes/MetaPanel.jsx'

const CLAVE_PROPIOS = 'bm.alimentosPropios'
const CLAVE_DIA = 'bm.registroDia'

const hoyIso = () => new Date().toISOString().slice(0, 10)

function cargar(clave, porDefecto) {
  try {
    return JSON.parse(localStorage.getItem(clave)) ?? porDefecto
  } catch {
    return porDefecto
  }
}

const fmt = (v, dec) => Number(v.toFixed(dec)).toLocaleString('es-MX')

const CAMPOS_100G = [
  ['kcal', 'kcal'], ['prot', 'Proteína g'], ['carb', 'Carbos g'], ['gras', 'Grasa g'],
  ['fibra', 'Fibra g'], ['sodio', 'Sodio mg'],
]

/** Registro del día con porciones IMSS; totales listos para pasar a la app. */
export default function Alimentos() {
  const [, setTick] = useState(0)
  const [busqueda, setBusqueda] = useState('')
  const [propios, setPropios] = useState(() => cargar(CLAVE_PROPIOS, []))
  const [registro, setRegistro] = useState(() => {
    const r = cargar(CLAVE_DIA, null)
    return r && r.fecha === hoyIso() ? r.items : []
  })
  const [agregando, setAgregando] = useState(false)
  const [nuevo, setNuevo] = useState({ nombre: '', gramos: 100 })

  const perfil = cargarPerfil()
  const metas = calcularMetas(perfil)
  const sexo = perfil?.sexo || 'femenino'

  useEffect(() => {
    localStorage.setItem(CLAVE_DIA, JSON.stringify({ fecha: hoyIso(), items: registro }))
  }, [registro])
  useEffect(() => {
    localStorage.setItem(CLAVE_PROPIOS, JSON.stringify(propios))
  }, [propios])

  const base = useMemo(() => [...propios, ...ALIMENTOS], [propios])
  const resultados = useMemo(() => {
    const q = busqueda.trim().toLowerCase()
    if (!q) return []
    return base.filter((a) => a.nombre.toLowerCase().includes(q)).slice(0, 10)
  }, [busqueda, base])

  const agregar = (alimento) => {
    setRegistro((r) => [...r, { ...alimento, raciones: 1, uid: Date.now() + Math.random() }])
    setBusqueda('')
  }

  const cambiarRaciones = (uid, raciones) =>
    setRegistro((r) => r.map((i) => (i.uid === uid ? { ...i, raciones } : i)))

  const quitar = (uid) => setRegistro((r) => r.filter((i) => i.uid !== uid))

  const totales = useMemo(() => {
    const t = {}
    for (const n of NUTRIENTES) t[n.clave] = 0
    for (const item of registro) {
      for (const n of NUTRIENTES) t[n.clave] += (item[n.clave] || 0) * item.raciones
    }
    return t
  }, [registro])

  // El alimento propio se captura POR 100 g (como la etiqueta) + el tamaño de
  // tu porción en gramos; aquí se convierte a valores por porción.
  const guardarPropio = () => {
    const g = +nuevo.gramos > 0 ? +nuevo.gramos : 100
    const escala = g / 100
    const a = {
      id: 'propio-' + Date.now(),
      nombre: nuevo.nombre.trim(),
      grupo: 'Mis alimentos',
      porcion: `${g} g`,
      fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 0, vitC: 0, vitD: 0, b12: 0,
    }
    for (const [clave] of CAMPOS_100G) a[clave] = (+nuevo[clave] || 0) * escala
    setPropios((p) => [a, ...p])
    setNuevo({ nombre: '', gramos: 100 })
    setAgregando(false)
  }

  const borrarPropio = (id) => setPropios((p) => p.filter((a) => a.id !== id))

  return (
    <>
      <h2>Registro de comida del día</h2>
      <p className="mini">
        Porciones del sistema de equivalentes (Guía de Alimentos IMSS) + marcas
        comerciales. Suma lo de hoy y pasa los totales a la app: calorías y
        macros en <strong>Macros</strong>; la verdura del día en <strong>Micronutrientes</strong>.
      </p>

      <MetaPanel onCambio={() => setTick((t) => t + 1)} />

      <div className="tarjeta">
        <input
          style={{ width: '100%' }}
          placeholder="Busca un alimento… (tortilla, frijol, zucaritas, coca)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        {resultados.length > 0 && (
          <table>
            <tbody>
              {resultados.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.nombre}</strong>
                    <div className="mini">
                      {a.grupo} · {a.porcion} · {fmt(a.kcal, 0)} kcal · P {fmt(a.prot, 1)} · C {fmt(a.carb, 1)} · G {fmt(a.gras, 1)}
                    </div>
                  </td>
                  <td className="num">
                    <button className="boton secundario" onClick={() => agregar(a)}>+ Añadir</button>
                    {a.grupo === 'Mis alimentos' && (
                      <button className="borrar" title="Borrar de mis alimentos" onClick={() => borrarPropio(a.id)}>🗑</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {busqueda && resultados.length === 0 && (
          <p className="mini">Sin resultados. ¿Lo agregas con los datos de su etiqueta? ↓</p>
        )}
        <p style={{ marginBottom: 0 }}>
          <button className="boton secundario" onClick={() => setAgregando(!agregando)}>
            {agregando ? 'Cancelar' : '+ Agregar alimento propio (por 100 g, como la etiqueta)'}
          </button>
        </p>
        {agregando && (
          <div style={{ marginTop: '0.6rem' }}>
            <p className="mini" style={{ marginTop: 0 }}>
              Copia los valores <strong>por 100 g</strong> tal como vienen en la
              etiqueta y di cuánto pesa TU porción; nosotros convertimos.
            </p>
            <div className="fila">
              <input placeholder="Nombre (ej. Granola Great Value)" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} style={{ width: 230 }} />
              {CAMPOS_100G.map(([clave, etiqueta]) => (
                <input key={clave} placeholder={`${etiqueta} /100g`} type="number" value={nuevo[clave] ?? ''}
                  onChange={(e) => setNuevo({ ...nuevo, [clave]: e.target.value })} style={{ width: 110 }} />
              ))}
              <label className="mini">Tu porción:{' '}
                <input type="number" value={nuevo.gramos} onChange={(e) => setNuevo({ ...nuevo, gramos: e.target.value })} style={{ width: 70 }} /> g
              </label>
              <button className="boton" disabled={!nuevo.nombre.trim()} onClick={guardarPropio}>Guardar</button>
            </div>
          </div>
        )}
      </div>

      {registro.length > 0 && (
        <div className="tarjeta">
          <h3 style={{ marginTop: 0 }}>Lo de hoy</h3>
          <table>
            <thead>
              <tr><th>Alimento</th><th>Raciones</th><th className="num">kcal · P/C/G</th><th></th></tr>
            </thead>
            <tbody>
              {registro.map((i) => (
                <tr key={i.uid}>
                  <td>{i.nombre} <span className="mini">({i.porcion} c/u)</span></td>
                  <td>
                    <input
                      type="number" min="0.5" step="0.5" value={i.raciones}
                      onChange={(e) => cambiarRaciones(i.uid, Math.max(0.5, +e.target.value || 0.5))}
                      style={{ width: 70 }}
                    />
                  </td>
                  <td className="num mini">
                    <strong>{fmt(i.kcal * i.raciones, 0)}</strong> · {fmt(i.prot * i.raciones, 0)}/{fmt(i.carb * i.raciones, 0)}/{fmt(i.gras * i.raciones, 0)}
                  </td>
                  <td><button className="borrar" onClick={() => quitar(i.uid)} title="Quitar">✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {registro.length > 0 && (
        <div className="tarjeta" style={{ borderColor: 'var(--acento)', borderWidth: 2 }}>
          <h3 style={{ marginTop: 0 }}>Totales del día → sección Macros de la app</h3>
          <div className="fila">
            <span className="pastilla"><strong>{fmt(totales.kcal, 0)}</strong>{metas ? ` / ${fmt(metas.kcal, 0)}` : ''} kcal</span>
            <span className="pastilla">P <strong>{fmt(totales.prot, 1)}</strong>{metas ? ` / ${metas.prot}` : ''} g</span>
            <span className="pastilla">C <strong>{fmt(totales.carb, 1)}</strong>{metas ? ` / ${metas.carb}` : ''} g</span>
            <span className="pastilla">G <strong>{fmt(totales.gras, 1)}</strong>{metas ? ` / ${metas.gras}` : ''} g</span>
          </div>
          <details style={{ marginTop: '0.6rem' }}>
            <summary className="mini" style={{ cursor: 'pointer' }}>
              Ver micronutrientes del día vs. rango saludable
            </summary>
            <table style={{ marginTop: '0.4rem' }}>
              <thead><tr><th>Micro</th><th className="num">Hoy</th><th className="num">Rango</th><th></th></tr></thead>
              <tbody>
                {MICROS_APP.map((clave) => {
                  const n = NUTRIENTES.find((x) => x.clave === clave)
                  const rango = rangoDe(clave, sexo)
                  const v = totales[clave]
                  const ok = rango.tipo === 'max' ? v <= rango.valor : v >= rango.valor
                  return (
                    <tr key={clave}>
                      <td>{n.nombre}</td>
                      <td className="num">{fmt(v, n.decimales)} {n.unidad}</td>
                      <td className="num mini">{rango.tipo === 'max' ? '≤' : '≥'} {fmt(rango.valor, 0)}</td>
                      <td>{ok ? <span className="pastilla ok">✓</span> : <span className="pastilla alerta">{rango.tipo === 'max' ? 'excede' : 'falta'}</span>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <p className="mini" style={{ marginBottom: 0 }}>
              Con la ensalada cruda diaria del menú, los mínimos quedan cubiertos en
              la práctica; los alimentos propios no suman micros.
            </p>
          </details>
        </div>
      )}
    </>
  )
}
