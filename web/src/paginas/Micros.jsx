import { MICROS_GUIA } from '../datos/micros.js'

const fmt = (v) => Number(v).toLocaleString('es-MX')

function rangoTexto(m) {
  const { tipo, hombres, mujeres } = m.rango
  const dir = tipo === 'max' ? 'No pasar de' : 'No bajar de'
  const val = hombres === mujeres
    ? `${fmt(hombres)} ${m.unidad}`
    : `H ${fmt(hombres)} · M ${fmt(mujeres)} ${m.unidad}`
  return `${dir} ${val}`
}

export default function Micros() {
  return (
    <>
      <h2>Micronutrientes: rangos, evidencia y de dónde sacarlos</h2>
      <p className="mini">
        La dirección importa: en casi todos la meta es <strong>no bajar</strong> del
        mínimo diario, pero en el sodio es <strong>no pasar</strong> del tope. Rangos
        de referencia para adultos (NIH/OMS); H = hombres, M = mujeres. Las fuentes
        son de origen natural, salvo el sodio (ahí conviene saber dónde se esconde).
      </p>

      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>🥗 La garantía práctica</h3>
        Con el <strong>menú semanal + la ensalada cruda diaria</strong> del sitio se
        alcanzan de forma natural los mínimos de fibra, potasio, vitamina C, folato,
        magnesio, hierro y calcio — la verdura y las leguminosas abundantes son tu
        póliza de seguro. Las excepciones que la verdura NO cubre y hay que cuidar
        aparte: <strong>B12</strong> (solo de origen animal: huevo, lácteos, pescado
        del menú) y <strong>vitamina D</strong> (pescado y, sobre todo, sol).
      </div>

      {MICROS_GUIA.map((m) => (
        <div className="tarjeta" key={m.clave}>
          <div className="fila" style={{ justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0 }}>{m.nombre}</h3>
            <span className={'pastilla' + (m.rango.tipo === 'max' ? ' alerta' : ' ok')}>
              {rangoTexto(m)}
            </span>
          </div>
          <p style={{ margin: '0.4rem 0 0.2rem' }}>{m.funcion}</p>
          <p style={{ margin: '0.2rem 0' }}>
            <strong>Evidencia:</strong> {m.evidencia}{' '}
            <span className="mini" style={{ fontStyle: 'italic' }}>({m.fuente})</span>
          </p>
          <div className="mini">
            {m.marca ? 'Dónde se esconde (vigílalo): ' : 'Fuentes naturales: '}
            {m.fuentes.join(' · ')}
          </div>
        </div>
      ))}

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Rangos de referencia para adultos sanos; el embarazo, la lactancia y algunas
        condiciones cambian estos valores. No sustituye el consejo médico.
      </p>
    </>
  )
}
