import { useMemo, useState } from 'react'
import { RECETAS } from '../datos/recetas.js'

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
const TIEMPOS = ['desayuno', 'comida', 'cena']

const OBJETIVOS = [
  { clave: 'longevidad', nombre: 'Longevidad (énfasis vegetal)' },
  { clave: 'perdida', nombre: 'Pérdida de grasa' },
  { clave: 'ganancia', nombre: 'Ganancia de músculo' },
  { clave: 'general', nombre: 'General' },
]

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
  return DIAS.map(() => {
    const dia = {}
    for (const t of TIEMPOS) {
      const opciones = pool(t)
      dia[t] = opciones[Math.floor(azar() * opciones.length)]
    }
    return dia
  })
}

export default function Recetas() {
  const [objetivo, setObjetivo] = useState('longevidad')
  const [semilla, setSemilla] = useState(() => {
    // Semilla por semana ISO: el menú se mantiene toda la semana.
    const ahora = new Date()
    const inicio = new Date(ahora.getFullYear(), 0, 1)
    return ahora.getFullYear() * 100 + Math.ceil(((ahora - inicio) / 86400000 + 1) / 7)
  })
  const [abierta, setAbierta] = useState(null)

  const semana = useMemo(() => generarSemana(objetivo, semilla), [objetivo, semilla])

  return (
    <>
      <h2>Menú semanal</h2>
      <p className="mini">
        Tres comidas por día armadas con el recetario según tu objetivo. El menú
        es fijo durante la semana; si no te convence, genera otro.
      </p>

      <div className="fila tarjeta">
        <label>Objetivo:{' '}
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
            {OBJETIVOS.map((o) => <option key={o.clave} value={o.clave}>{o.nombre}</option>)}
          </select>
        </label>
        <button className="boton secundario" onClick={() => setSemilla(Math.floor(Math.random() * 1e9))}>
          🎲 Otro menú
        </button>
      </div>

      {semana.map((dia, i) => {
        const kcalDia = TIEMPOS.reduce((acc, t) => acc + dia[t].kcal, 0)
        return (
          <div className="tarjeta" key={DIAS[i]}>
            <div className="fila" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{DIAS[i]}</h3>
              <span className="pastilla">≈ {kcalDia} kcal</span>
            </div>
            <table>
              <tbody>
                {TIEMPOS.map((t) => {
                  const r = dia[t]
                  const clave = `${DIAS[i]}-${t}`
                  return (
                    <tr key={t}>
                      <td style={{ width: 110, textTransform: 'capitalize' }} className="mini">{t}</td>
                      <td>
                        <button
                          className="borrar"
                          style={{ padding: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--marron)' }}
                          onClick={() => setAbierta(abierta === clave ? null : clave)}
                        >
                          {r.nombre} {abierta === clave ? '▴' : '▾'}
                        </button>
                        {abierta === clave && (
                          <ul className="mini" style={{ margin: '0.3rem 0 0' }}>
                            {r.ingredientes.map((ing) => <li key={ing}>{ing}</li>)}
                          </ul>
                        )}
                      </td>
                      <td className="num mini">{r.kcal} kcal</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })}
    </>
  )
}
