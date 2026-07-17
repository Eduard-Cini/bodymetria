import { useState } from 'react'
import { PRINCIPIOS, FASES, TENDINOPATIAS } from '../datos/tendones.js'

export default function Tendones() {
  const [clave, setClave] = useState(TENDINOPATIAS[0].clave)
  const t = TENDINOPATIAS.find((x) => x.clave === clave)

  return (
    <>
      <h2>Fortalecimiento de tendones</h2>
      <div className="tarjeta" style={{ borderLeft: '4px solid var(--acento)' }}>
        <p style={{ marginTop: 0 }}>
          Los tendones son el eslabón que aguanta la fuerza que produce el músculo, y
          se adaptan a la <strong>carga mecánica progresiva</strong> — no al reposo. La
          mayoría de las molestias de tendón (tendinopatías) mejoran con un programa de
          carga bien dosificado, no evitándola. Aquí está el marco con evidencia y los
          protocolos por zona.
        </p>
        <p className="mini" style={{ marginBottom: 0 }}>
          ⚠️ Esto es educativo. Si el dolor es intenso, apareció por un golpe, hay
          hinchazón marcada, pérdida de fuerza súbita o no mejora en varias semanas,
          consulta a un profesional (puede no ser tendinopatía). No reemplaza la
          valoración de un fisioterapeuta o médico.
        </p>
      </div>

      <h2>Principios</h2>
      <div className="rejilla">
        {PRINCIPIOS.map(([titulo, texto]) => (
          <div className="tarjeta" key={titulo}>
            <strong>{titulo}</strong>
            <p style={{ margin: '0.3rem 0 0' }}>{texto}</p>
          </div>
        ))}
      </div>

      <h2>Las 4 fases de la carga</h2>
      <p className="mini">
        Marco general (Cook &amp; Silbernagel): no todos pasan por las cuatro ni al
        mismo ritmo. Avanza de fase cuando la actual no te da síntomas al día siguiente.
      </p>
      {FASES.map((f) => (
        <div className="tarjeta" key={f.fase}>
          <h3 style={{ marginTop: 0 }}>{f.fase}. {f.nombre}</h3>
          <p style={{ margin: '0 0 0.3rem' }}><strong>¿Cuándo?</strong> {f.cuando}</p>
          <p style={{ margin: '0 0 0.3rem' }}><strong>Qué hacer:</strong> {f.que}</p>
          <p className="mini" style={{ margin: 0 }}><strong>Meta:</strong> {f.meta}</p>
        </div>
      ))}

      <h2>Protocolos por zona</h2>
      <div className="fila" style={{ marginBottom: '0.5rem' }}>
        {TENDINOPATIAS.map((x) => (
          <button
            key={x.clave}
            className={'boton' + (x.clave === clave ? '' : ' secundario')}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.88rem' }}
            onClick={() => setClave(x.clave)}
          >
            {x.zona.split('—')[0].trim()}
          </button>
        ))}
      </div>
      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>{t.zona}</h3>
        <p style={{ margin: '0 0 0.6rem' }}><strong>Suele venir de:</strong> {t.quien}</p>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Fase</th><th>Qué hacer</th></tr>
            </thead>
            <tbody>
              <tr><td style={{ whiteSpace: 'nowrap' }}><strong>Calmar</strong><br /><span className="mini">isométrico</span></td><td>{t.isometrico}</td></tr>
              <tr><td style={{ whiteSpace: 'nowrap' }}><strong>Construir</strong><br /><span className="mini">fuerza lenta</span></td><td>{t.pesado}</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mini" style={{ margin: '0.6rem 0 0' }}><strong>Ojo:</strong> {t.ojo}</p>
      </div>

      <div className="tarjeta">
        <strong>Regístralo en la app</strong>
        <p style={{ margin: '0.3rem 0 0' }}>
          Anota estos ejercicios como una sesión de <em>Movilidad</em> o crea una
          rutina "Tendón — [zona]" (Ejercicio → Guardar como rutina) para repetirla.
          Si activas la sección Doctor, lleva una métrica de <em>dolor del tendón
          (0-10)</em>: ver la línea bajar semana a semana es la mejor señal de que la
          carga está bien dosificada.
        </p>
      </div>

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Evidencia: Cook &amp; Purdam 2009 · Rio 2015 · Kongsgaard 2009 · Beyer 2015 ·
        Alfredson 1998 · Silbernagel 2020 (fichas en <a href="#/papers">Papers</a>).
        No sustituye a un fisioterapeuta.
      </p>
    </>
  )
}
