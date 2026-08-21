import { useState } from 'react'
import AnimacionEjercicio from '../componentes/AnimacionEjercicio.jsx'
import { ANIM } from '../datos/animaciones.js'
import {
  BLOQUES, CUES, ORDEN_ZONAS, PROGRESION, REFS, REGLAS, SEMANAS,
} from '../datos/blindaje.js'

// La biblioteca del final se arma del mismo diccionario que usan las semanas,
// así que no se puede desincronizar con ellas.
const POR_ZONA = ORDEN_ZONAS.map((zona) => ({
  zona,
  fichas: Object.keys(CUES)
    .filter((k) => CUES[k].z === zona)
    .map((k) => ({ k, ...CUES[k] })),
})).filter((g) => g.fichas.length)

function Ejercicio({ e, id, abierto, alternar }) {
  const nota = ANIM[e.cue] && ANIM[e.cue].nota
  return (
    <li>
      <div className="ej-txt">
        <button
          type="button"
          className="ej-btn"
          aria-expanded={abierto}
          onClick={() => alternar(id)}
        >
          {e.n}
          <span className="chev" aria-hidden="true">{abierto ? '−' : '+'}</span>
        </button>
        <span className="rx">{e.rx}</span>
        {nota && <span className="anim-nota">▲ {nota}</span>}
      </div>
      <AnimacionEjercicio clave={e.cue} nombre={e.n} />
      {abierto && <p className="cue-inline">{CUES[e.cue].c}</p>}
    </li>
  )
}

export default function Blindaje() {
  const [semana, setSemana] = useState(0)
  const [abiertos, setAbiertos] = useState({})
  const s = SEMANAS[semana]

  const alternar = (id) => setAbiertos((a) => ({ ...a, [id]: !a[id] }))

  return (
    <>
      <h2>Blindaje Articular</h2>
      <div className="tarjeta" style={{ borderLeft: '4px solid var(--acento)' }}>
        <p style={{ marginTop: 0 }}>
          Un día a la semana para las estructuras que casi nadie entrena hasta que
          duelen: tendones de codo y muñeca, manguito rotador, aductores, isquios,
          tendón rotuliano, tibial y pies. Es <strong>prehabilitación</strong>: mantener
          sano lo que ya está sano.
        </p>
        <div className="fila" style={{ marginBottom: 0 }}>
          <span className="pastilla"><strong>1×</strong> por semana</span>
          <span className="pastilla"><strong>50 min</strong> por sesión</span>
          <span className="pastilla"><strong>4</strong> semanas que rotan</span>
          <span className="pastilla">Banda + mancuernas</span>
        </div>
      </div>

      <h2>Antes de cargar: las reglas de dolor</h2>
      <p className="mini">
        El tendón no se cura con reposo, se cura con carga progresiva bien dosificada.
        Estas cuatro reglas deciden si subes, mantienes o bajas.
      </p>
      <div className="tarjeta" style={{ background: '#ffe0b2', borderColor: 'var(--frijol)' }}>
        <h3 style={{ marginTop: 0 }}>Semáforo de tendón</h3>
        {REGLAS.map((r) => (
          <div className="regla" key={r.n}>
            <span className="regla-n">{r.n}</span>
            <span>{r.t}</span>
          </div>
        ))}
      </div>

      <h2>La estructura de la sesión</h2>
      <p className="mini">
        El esqueleto es siempre el mismo; lo que rota cada semana son los ejercicios.
        El orden importa: se moviliza, se calma el tendón con isométricos, se carga
        pesado y hasta el final va lo pequeño.
      </p>
      <div className="bloque-tiempo">
        {BLOQUES.map((b) => (
          <div key={b.n} style={{ flex: b.min }} className={b.n === 3 ? 'fuerte' : ''}>
            {b.min}′
          </div>
        ))}
      </div>
      <p className="mini" style={{ marginTop: 0 }}>
        Reparto real de los 52 minutos · el bloque 3 es el que construye
      </p>
      <div className="rejilla">
        {BLOQUES.map((b) => (
          <div className="tarjeta" key={b.n}>
            <span className="mini">{b.min} min</span>
            <h3 style={{ margin: '0 0 0.3rem' }}>{b.n}. {b.nombre}</h3>
            <p style={{ margin: 0, fontSize: '0.93rem' }}>{b.t}</p>
          </div>
        ))}
      </div>

      <h2>Las cuatro semanas</h2>
      <p className="mini">
        Cada semana toca todo el cuerpo, pero pone el foco en una región. Al terminar
        la D vuelves a la A con más carga. Toca el nombre de cualquier ejercicio para
        ver cómo se hace.
      </p>
      <div className="fila" style={{ marginBottom: '0.5rem' }}>
        {SEMANAS.map((x, i) => (
          <button
            key={x.tag}
            className={'boton' + (i === semana ? '' : ' secundario')}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.88rem' }}
            onClick={() => { setSemana(i); setAbiertos({}) }}
          >
            {x.tag}
          </button>
        ))}
      </div>
      <div className="tarjeta" style={{ borderColor: 'var(--acento)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>{s.tag} — {s.titulo}</h3>
        {s.bloques.map((b) => (
          <div className="bq" key={b.i}>
            <p className="bq-cab">
              <span className="bq-i">{b.i}</span> {b.nombre}
              <span className="bq-t">{b.min}</span>
            </p>
            <ul className="ejs">
              {b.ejs.map((e) => {
                const id = b.i + '-' + e.cue
                return (
                  <Ejercicio
                    key={id}
                    e={e}
                    id={id}
                    abierto={!!abiertos[id]}
                    alternar={alternar}
                  />
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <h2>Todos los ejercicios, uno por uno</h2>
      <p className="mini">
        La misma explicación que sale al tocar cada nombre, aquí junta y ordenada por
        zona ({Object.keys(CUES).length} ejercicios). Si un movimiento te saca de la
        posición, baja el peso antes que la técnica.
      </p>
      {POR_ZONA.map((g) => (
        <div className="tarjeta" key={g.zona}>
          <h3 style={{ marginTop: 0 }}>{g.zona}</h3>
          <div className="rejilla">
            {g.fichas.map((f) => (
              <div key={f.k}>
                <strong>{f.n}</strong>
                <AnimacionEjercicio clave={f.k} nombre={f.n} grande />
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{f.c}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h2>Cómo progresar</h2>
      <p className="mini">
        Un ciclo completo son 4 semanas (A → D). El ciclo siguiente se repite con más
        carga, no con más ejercicios.
      </p>
      <div className="tarjeta">
        {PROGRESION.map((p) => (
          <div className="regla" key={p.ciclo}>
            <span className="regla-n">{p.ciclo}</span>
            <span>{p.t}</span>
          </div>
        ))}
      </div>

      <div className="tarjeta" style={{ background: '#ffe0b2', borderColor: 'var(--frijol)' }}>
        <h3 style={{ marginTop: 0 }}>Una sesión a la semana es blindaje, no rehabilitación</h3>
        <p style={{ margin: 0, fontSize: '0.95rem' }}>
          Los protocolos que curan una tendinopatía activa (isométricos, HSR o
          excéntricos) se aplican <strong>2-3 veces por semana durante unos 3 meses</strong>.
          Si hoy tienes un tendón que duele de verdad, saca ese ejercicio de aquí y hazlo
          con esa frecuencia — y con alguien que te vea. Esta sesión mantiene lo que ya
          está sano. El protocolo por zona está en <a href="#/tendones">Tendones</a>.
        </p>
      </div>

      <div className="tarjeta">
        <strong>Regístralo en la app</strong>
        <p style={{ margin: '0.3rem 0 0' }}>
          Guarda cada semana como una rutina ("Blindaje — {s.tag}") desde Ejercicio →
          Guardar como rutina, y con "Usar" la precargas el día que toque. La disciplina
          que mejor le queda es <em>Movilidad</em>, con el RPE bajo: aquí no se busca
          fallo, se busca dosis.
        </p>
      </div>

      <h2>De dónde sale cada decisión</h2>
      <p className="mini">
        Los movimientos son los que popularizó Squat University y compañía; la
        dosificación viene de estos trabajos.
      </p>
      <div className="tarjeta">
        <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
          {REFS.map((r) => (
            <li key={r.ref} style={{ marginBottom: '0.4rem' }}>
              {r.ref} <span className="mini">— {r.tema}</span>
            </li>
          ))}
        </ol>
      </div>

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Material educativo, no consejo médico. Si tienes un dolor que ya lleva meses,
        que despierta por la noche o que apareció tras un golpe, esto no sustituye una
        valoración presencial. Fichas completas en <a href="#/papers">Papers</a>.
      </p>
    </>
  )
}
