import { PAPERS } from '../datos/papers.js'

export default function Papers() {
  const total = PAPERS.reduce((acc, s) => acc + s.refs.length, 0)
  return (
    <>
      <h2>Bibliografía</h2>
      <p className="mini">
        Toda la evidencia que citamos en el sitio y la app, agrupada por sección
        ({total} referencias). Son meta-análisis, ensayos y cohortes; describen
        asociaciones en poblaciones, no garantías individuales.
      </p>

      {PAPERS.map((s) => (
        <div className="tarjeta" key={s.seccion}>
          <h3 style={{ marginTop: 0 }}>{s.seccion}</h3>
          <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {s.refs.map((r) => (
              <li key={r.ref} style={{ marginBottom: '0.4rem' }}>
                {r.ref} <span className="mini">— {r.tema}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Nada de esto sustituye el consejo de un profesional de salud.
      </p>
    </>
  )
}
