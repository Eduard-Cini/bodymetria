import { useEffect, useMemo, useState } from 'react'
import { ALIMENTOS, MICROS_APP, NUTRIENTES } from '../datos/alimentos.js'

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

/** Registro del día con porciones IMSS; totales listos para pasar a la app. */
export default function Alimentos() {
  const [busqueda, setBusqueda] = useState('')
  const [propios, setPropios] = useState(() => cargar(CLAVE_PROPIOS, []))
  const [registro, setRegistro] = useState(() => {
    const r = cargar(CLAVE_DIA, null)
    return r && r.fecha === hoyIso() ? r.items : []
  })
  const [agregando, setAgregando] = useState(false)
  const [nuevo, setNuevo] = useState({ nombre: '', porcion: '', kcal: '', prot: '', carb: '', gras: '' })

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

  const guardarPropio = () => {
    const a = {
      id: 'propio-' + Date.now(),
      nombre: nuevo.nombre.trim(),
      grupo: 'Mis alimentos',
      porcion: nuevo.porcion.trim() || '1 porción',
      kcal: +nuevo.kcal || 0, prot: +nuevo.prot || 0, carb: +nuevo.carb || 0, gras: +nuevo.gras || 0,
      fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 0, vitC: 0, vitD: 0, b12: 0,
    }
    setPropios((p) => [a, ...p])
    setNuevo({ nombre: '', porcion: '', kcal: '', prot: '', carb: '', gras: '' })
    setAgregando(false)
  }

  return (
    <>
      <h2>Registro de comida del día</h2>
      <p className="mini">
        Porciones del sistema de equivalentes (Guía de Alimentos IMSS). Suma lo
        que comiste hoy y pasa los totales a la app: calorías y macros en
        <strong> Macros</strong>, micronutrientes en <strong>Micros</strong>.
      </p>

      <div className="tarjeta">
        <input
          style={{ width: '100%' }}
          placeholder="Busca un alimento… (tortilla, frijol, pollo, guayaba)"
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
                    <div className="mini">{a.grupo} · ración: {a.porcion} · {a.kcal} kcal</div>
                  </td>
                  <td className="num">
                    <button className="boton secundario" onClick={() => agregar(a)}>+ Añadir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {busqueda && resultados.length === 0 && (
          <p className="mini">Sin resultados. ¿Lo agregas como alimento propio? ↓</p>
        )}
        <p style={{ marginBottom: 0 }}>
          <button className="boton secundario" onClick={() => setAgregando(!agregando)}>
            {agregando ? 'Cancelar' : '+ Agregar alimento propio'}
          </button>
        </p>
        {agregando && (
          <div className="fila" style={{ marginTop: '0.6rem' }}>
            <input placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
            <input placeholder="Porción (ej. 1 pieza)" value={nuevo.porcion} onChange={(e) => setNuevo({ ...nuevo, porcion: e.target.value })} style={{ width: 140 }} />
            <input placeholder="kcal" type="number" value={nuevo.kcal} onChange={(e) => setNuevo({ ...nuevo, kcal: e.target.value })} style={{ width: 80 }} />
            <input placeholder="Prot g" type="number" value={nuevo.prot} onChange={(e) => setNuevo({ ...nuevo, prot: e.target.value })} style={{ width: 80 }} />
            <input placeholder="Carb g" type="number" value={nuevo.carb} onChange={(e) => setNuevo({ ...nuevo, carb: e.target.value })} style={{ width: 80 }} />
            <input placeholder="Grasa g" type="number" value={nuevo.gras} onChange={(e) => setNuevo({ ...nuevo, gras: e.target.value })} style={{ width: 80 }} />
            <button className="boton" disabled={!nuevo.nombre.trim()} onClick={guardarPropio}>Guardar</button>
          </div>
        )}
      </div>

      {registro.length > 0 && (
        <div className="tarjeta">
          <h3 style={{ marginTop: 0 }}>Lo de hoy</h3>
          <table>
            <thead>
              <tr><th>Alimento</th><th>Raciones</th><th className="num">kcal</th><th></th></tr>
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
                  <td className="num">{fmt(i.kcal * i.raciones, 0)}</td>
                  <td><button className="borrar" onClick={() => quitar(i.uid)} title="Quitar">✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {registro.length > 0 && (
        <div className="tarjeta" style={{ borderColor: 'var(--acento)', borderWidth: 2 }}>
          <h3 style={{ marginTop: 0 }}>Totales del día → pásalos a la app</h3>
          <div className="fila">
            <span className="pastilla"><strong>{fmt(totales.kcal, 0)}</strong> kcal</span>
            <span className="pastilla">P <strong>{fmt(totales.prot, 1)}</strong> g</span>
            <span className="pastilla">C <strong>{fmt(totales.carb, 1)}</strong> g</span>
            <span className="pastilla">G <strong>{fmt(totales.gras, 1)}</strong> g</span>
          </div>
          <p className="mini">↑ Estos van en la sección <strong>Macros</strong> de la app.</p>
          <table>
            <thead><tr><th>Micronutriente</th><th className="num">Total de hoy</th></tr></thead>
            <tbody>
              {NUTRIENTES.filter((n) => MICROS_APP.includes(n.clave)).map((n) => (
                <tr key={n.clave}>
                  <td>{n.nombre}</td>
                  <td className="num"><strong>{fmt(totales[n.clave], n.decimales)}</strong> {n.unidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mini" style={{ marginBottom: 0 }}>
            ↑ Estos van en la sección <strong>Micros</strong>. Micronutrientes
            aproximados; los alimentos propios no suman micros.
          </p>
        </div>
      )}
    </>
  )
}
