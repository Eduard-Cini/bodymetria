import { useState } from 'react'
import { GRUPOS, ALIMENTOS, RETOS, MENU } from '../datos/fodmap.js'

const ETAPAS = [
  {
    n: 1, nombre: 'Eliminación', duracion: '2 a 6 semanas',
    texto: 'Se retiran TODOS los alimentos altos en FODMAP a la vez usando el menú de abajo. ' +
      'La mayoría nota mejoría en 2-4 semanas. Si a las 4-6 semanas no hay cambio claro, ' +
      'esta dieta probablemente no es tu herramienta: suspéndela y coméntalo con tu médico ' +
      '(no tiene sentido seguir restringiendo).',
  },
  {
    n: 2, nombre: 'Reintroducción', duracion: '6 a 8 semanas',
    texto: 'Manteniendo la base baja en FODMAP, se prueba UN grupo a la vez: 3 días con dosis ' +
      'creciente y 3-4 días de lavado antes del siguiente reto. Así identificas exactamente ' +
      'cuáles grupos y en qué cantidad te disparan síntomas. Registra los síntomas de cada día ' +
      'en la app (Doctor → Dieta FODMAP).',
  },
  {
    n: 3, nombre: 'Personalización', duracion: 'largo plazo',
    texto: 'Reincorpora de forma permanente todos los grupos que toleraste y limita solo los que ' +
      'te dieron síntomas, en la dosis que toleres. El objetivo final es comer la dieta MÁS ' +
      'variada posible: la restricción prolongada innecesaria empobrece la microbiota ' +
      '(reduce bifidobacterias) y puede causar déficits de fibra y calcio.',
  },
]

const TIPS = [
  ['El sabor sin el FODMAP', 'Los fructanos del ajo y la cebolla son solubles en agua pero no en aceite: un aceite infusionado con ajo (dorar y RETIRAR el ajo) da el sabor sin el disparador. La parte verde del cebollín sustituye a la cebolla.'],
  ['No es la dieta sin gluten', 'En el trigo lo que fermenta son los fructanos, no el gluten. Los productos "sin gluten" suelen servir porque de paso quitan fructanos, pero no necesitas evitar trazas de gluten.'],
  ['La dosis manda', 'FODMAP no es blanco o negro: casi todo alimento tiene una porción tolerable y los FODMAP de una comida se ACUMULAN (medio aguacate + ajo + frijoles suma más que cada uno solo).'],
  ['Lee etiquetas', 'Inulina, raíz de achicoria, FOS, "fibra prebiótica", miel, agave, jarabe de maíz de alta fructosa y los polioles (sorbitol E420, manitol E421, xilitol) son FODMAP escondidos en productos procesados.'],
  ['Tortilla de maíz = aliada', 'La dieta mexicana lo pone fácil en cereales: tortilla de maíz, arroz, avena y papa son bajos en FODMAP. Lo difícil son cebolla, ajo y frijoles — por eso se re-prueban uno por uno.'],
  ['No es dieta para bajar de peso', 'Es una herramienta diagnóstica temporal para intestino irritable. Mantén tus calorías y proteína de siempre (calcúlalas en Alimentos y regístralas en la app).'],
]

export default function Fodmap() {
  const [dia, setDia] = useState(1)
  const menuDia = MENU.find((d) => d.dia === dia)

  return (
    <>
      <h2>Dieta baja en FODMAP, paso a paso</h2>
      <div className="tarjeta" style={{ borderLeft: '4px solid var(--acento)' }}>
        <p style={{ marginTop: 0 }}>
          Los <strong>FODMAP</strong> son carbohidratos fermentables (fructanos, GOS,
          lactosa, fructosa en exceso y polioles) que se absorben mal: arrastran agua al
          intestino y fermentan en el colon. En personas con <strong>síndrome de intestino
          irritable (SII)</strong> eso produce dolor, inflamación, gases y cambios en las
          evacuaciones. Reducirlos temporalmente mejora los síntomas en ~50-75% de los
          casos (Halmos 2014; Black 2022), y el protocolo completo de 3 etapas es el
          estándar para detectar <em>cuáles</em> te afectan a ti.
        </p>
        <p className="mini" style={{ marginBottom: 0 }}>
          ⚠️ <strong>Hazlo acompañado.</strong> Esta guía es educativa: el protocolo está
          pensado para SII ya diagnosticado y idealmente se lleva con nutriólogo/gastroenterólogo.
          Si tienes señales de alarma (sangre en heces, pérdida de peso sin explicación, fiebre,
          anemia, síntomas nocturnos o antecedentes familiares de cáncer digestivo o celiaquía),
          ve al médico ANTES de cambiar tu dieta — y descarta celiaquía antes de retirar el trigo,
          porque la prueba requiere estar comiéndolo.
        </p>
      </div>

      <h2>Las 3 etapas</h2>
      <div className="rejilla">
        {ETAPAS.map((e) => (
          <div className="tarjeta" key={e.n}>
            <h3 style={{ marginTop: 0 }}>
              {e.n}. {e.nombre} <span className="mini">({e.duracion})</span>
            </h3>
            <p style={{ margin: 0 }}>{e.texto}</p>
          </div>
        ))}
      </div>

      <h2>Los 6 grupos FODMAP</h2>
      <p className="mini">
        En la reintroducción se prueban por separado porque la tolerancia a cada uno es
        individual: casi nadie reacciona a todos.
      </p>
      <div className="rejilla">
        {GRUPOS.map((g) => (
          <div className="tarjeta" key={g.clave}>
            <h3 style={{ marginTop: 0 }}>{g.nombre}</h3>
            <p style={{ marginBottom: '0.4rem' }}><strong>Dónde está:</strong> {g.fuentes}.</p>
            <p className="mini" style={{ margin: 0 }}>{g.nota}</p>
          </div>
        ))}
      </div>

      <h2>Etapa 1 — Qué comer y qué evitar</h2>
      <p className="mini">
        Porciones por comida según las mediciones de Monash University (aproximadas).
        "Libre" = bajo en FODMAP incluso en porciones grandes. Recuerda que los FODMAP
        de distintos alimentos se suman en la misma comida.
      </p>
      {ALIMENTOS.map((c) => (
        <div className="tarjeta" key={c.categoria}>
          <h3 style={{ marginTop: 0 }}>{c.categoria}</h3>
          <div className="fila" style={{ alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 260px' }}>
              <p className="mini" style={{ margin: '0 0 0.3rem', color: 'var(--verde)', fontWeight: 700 }}>✔ PERMITIDOS</p>
              <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                {c.permitidos.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div style={{ flex: '1 1 260px' }}>
              <p className="mini" style={{ margin: '0 0 0.3rem', color: 'var(--acento)', fontWeight: 700 }}>✖ EVITAR (y qué FODMAP tienen)</p>
              <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                {c.evitar.map((a) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}

      <h2>Etapa 1 — Menú semanal con recetas</h2>
      <p className="mini">
        Siete días de cocina mexicana baja en FODMAP; repítelo o combina los días
        durante las 2-6 semanas de eliminación. Ajusta las porciones de arroz, tortilla
        y proteína a tu meta de calorías (página Alimentos) y registra tus macros en la app.
      </p>
      <div className="fila" style={{ marginBottom: '0.5rem' }}>
        {MENU.map((d) => (
          <button
            key={d.dia}
            className={'boton' + (d.dia === dia ? '' : ' secundario')}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.9rem' }}
            onClick={() => setDia(d.dia)}
          >
            Día {d.dia}
          </button>
        ))}
      </div>
      <div className="rejilla">
        {menuDia.comidas.map((c) => (
          <div className="tarjeta" key={c.tiempo}>
            <p className="mini" style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{c.tiempo}</p>
            <h3 style={{ margin: '0.2rem 0 0.5rem' }}>{c.nombre}</h3>
            <p className="mini" style={{ margin: '0 0 0.2rem', fontWeight: 700 }}>Ingredientes</p>
            <ul style={{ margin: '0 0 0.6rem', paddingLeft: '1.1rem' }}>
              {c.ingredientes.map((i) => <li key={i}>{i}</li>)}
            </ul>
            <p className="mini" style={{ margin: '0 0 0.2rem', fontWeight: 700 }}>Preparación</p>
            <ol style={{ margin: 0, paddingLeft: '1.1rem' }}>
              {c.preparacion.map((p) => <li key={p}>{p}</li>)}
            </ol>
          </div>
        ))}
      </div>

      <h2>Etapa 2 — Calendario de reintroducción</h2>
      <div className="tarjeta">
        <p style={{ marginTop: 0 }}>
          Sigue comiendo el menú de eliminación como base y añade el <strong>alimento de
          prueba</strong> del grupo en turno: 3 días con dosis creciente y luego 3-4 días de
          lavado (base estricta, sin retos) antes del siguiente. Reglas:
        </p>
        <ul style={{ marginTop: 0 }}>
          <li>Si un día del reto hay síntomas claros, <strong>suspende ese reto</strong>, marca el grupo como disparador y respeta el lavado igual.</li>
          <li>No empieces un reto si aún tienes síntomas del anterior.</li>
          <li>Aunque toleres el grupo, <strong>vuelve a retirarlo</strong> hasta terminar todos los retos (el efecto es acumulativo y confundiría los siguientes).</li>
          <li>Califica tus síntomas (1-10) cada día en la app: <em>Doctor → Dieta FODMAP</em>; ahí mismo marcas el resultado de cada grupo.</li>
        </ul>
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Semana</th><th>Grupo</th><th>Alimento de prueba</th>
                <th>Día 1</th><th>Día 2</th><th>Día 3</th><th>Alternativa / nota</th>
              </tr>
            </thead>
            <tbody>
              {RETOS.map((r) => (
                <tr key={r.semana}>
                  <td className="num">{r.semana}</td>
                  <td><strong>{r.nombre}</strong></td>
                  <td>{r.alimento}</td>
                  <td>{r.dosis[0]}</td>
                  <td>{r.dosis[1]}</td>
                  <td>{r.dosis[2]}</td>
                  <td className="mini">{r.alternativa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mini" style={{ marginBottom: 0 }}>
          Días 4-7 de cada semana: lavado con la base de eliminación. El orden es
          sugerido (Tuck &amp; Barrett 2017); puedes empezar por el grupo que más te
          interese recuperar.
        </p>
      </div>

      <h2>Etapa 3 — Tu dieta personalizada</h2>
      <div className="tarjeta">
        <p style={{ marginTop: 0 }}>
          Con los resultados de los 8 retos arma tu dieta de largo plazo:
        </p>
        <ul style={{ marginTop: 0 }}>
          <li><span className="pastilla ok">Tolerado</span> — reincorpóralo por completo, sin miedo.</li>
          <li><span className="pastilla alerta">Síntomas leves</span> — inclúyelo en porciones menores a la dosis del día que dio molestias.</li>
          <li><span className="pastilla">Disparador claro</span> — limítalo, y re-pruébalo en unos meses: la tolerancia cambia con el tiempo.</li>
        </ul>
        <p className="mini" style={{ marginBottom: 0 }}>
          La meta es la MÁXIMA variedad que tu intestino tolere. Quedarse en eliminación
          permanente reduce bifidobacterias y fibra sin beneficio extra (Staudacher 2012, 2017;
          O'Keeffe 2018).
        </p>
      </div>

      <h2>Trucos que salvan la dieta</h2>
      <div className="rejilla">
        {TIPS.map(([titulo, texto]) => (
          <div className="tarjeta" key={titulo}>
            <h3 style={{ marginTop: 0 }}>{titulo}</h3>
            <p style={{ margin: 0 }}>{texto}</p>
          </div>
        ))}
      </div>

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Evidencia: Halmos EP 2014 · Böhn L 2015 · Eswaran S 2016 · Staudacher HM 2012/2017 ·
        Whelan K 2018 · Tuck C &amp; Barrett J 2017 · Black CJ 2022 · O'Keeffe M 2018 ·
        Gibson PR &amp; Shepherd SJ 2010 (fichas completas en <a href="#/papers">Papers</a>).
        Nada de esto sustituye el consejo de un profesional de salud.
      </p>
    </>
  )
}
