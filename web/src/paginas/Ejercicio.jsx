import { EJERCICIO_POR_OBJETIVO, RECOMPOSICION } from '../datos/ejercicio.js'

export default function Ejercicio() {
  return (
    <>
      <h2>Ejercicio con evidencia</h2>
      <p className="mini">
        Recomendaciones por objetivo, cada una con su estudio. Son asociaciones y
        ensayos en poblaciones; no sustituyen el consejo de un profesional.
      </p>

      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>💪 {RECOMPOSICION.titulo}</h3>
        <p>{RECOMPOSICION.intro}</p>
        <div className="rejilla">
          {RECOMPOSICION.claves.map((c) => (
            <div className="tarjeta" key={c.titulo}>
              <strong>{c.titulo}</strong>
              <p style={{ margin: '0.3rem 0' }}>{c.texto}</p>
              <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{c.fuente}</p>
            </div>
          ))}
        </div>
      </div>

      {EJERCICIO_POR_OBJETIVO.map((seccion) => (
        <div key={seccion.objetivo}>
          <h2>{seccion.objetivo}</h2>
          <p className="mini">{seccion.resumen}</p>
          <div className="rejilla">
            {seccion.items.map((it) => (
              <div className="tarjeta" key={it.titulo}>
                <h3 style={{ marginTop: 0 }}>{it.titulo}</h3>
                <p style={{ marginBottom: '0.4rem' }}>{it.texto}</p>
                <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{it.fuente}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Registra tus sesiones y series en la app (sección Ejercicio) para ver tu
        progreso, gasto estimado y esfuerzo a lo largo del tiempo.
      </p>
    </>
  )
}
