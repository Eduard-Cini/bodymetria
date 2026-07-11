import { ALIMENTOS, NUTRIENTES, RANGOS_MICROS } from '../datos/alimentos.js'

const DESCRIPCIONES = {
  fibra: 'Salud digestiva y cardiovascular; sacia y alimenta la microbiota.',
  calcio: 'Huesos y dientes; contracción muscular y nervios.',
  hierro: 'Transporte de oxígeno (hemoglobina); su falta causa anemia.',
  potasio: 'Presión arterial y función muscular; contrapeso del sodio.',
  sodio: 'Necesario en poco; en exceso sube la presión arterial.',
  vitC: 'Antioxidante; absorción del hierro vegetal; piel y encías.',
  vitD: 'Absorción de calcio e inmunidad; se sintetiza con el sol.',
  b12: 'Nervios y glóbulos rojos; SOLO en alimentos de origen animal.',
}

const fmt = (v, dec) => Number(v.toFixed(dec)).toLocaleString('es-MX')

export default function Micros() {
  return (
    <>
      <h2>Micronutrientes: rangos y dónde encontrarlos</h2>
      <p className="mini">
        La dirección importa: en casi todos la meta es <strong>no bajar</strong> del
        mínimo diario, pero en el sodio es <strong>no pasar</strong> del tope.
        Rangos de referencia para adultos (NIH); H = hombres, M = mujeres.
      </p>

      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>🥗 La garantía práctica</h3>
        Con el <strong>menú semanal + la ensalada cruda diaria</strong> del sitio se
        alcanzan los mínimos de fibra, potasio, vitamina C, hierro y calcio de forma
        natural — la verdura cruda abundante es la póliza de seguro de tus micros.
        Las dos excepciones que la verdura NO cubre: <strong>B12</strong> (viene del
        origen animal del menú: huevo, lácteos, pescado) y <strong>vitamina D</strong>
        {' '}(pescado y, sobre todo, 10-20 min de sol varias veces por semana).
      </div>

      {RANGOS_MICROS.map((r) => {
        const n = NUTRIENTES.find((x) => x.clave === r.clave)
        const ricos = [...ALIMENTOS]
          .sort((a, b) => (b[r.clave] || 0) - (a[r.clave] || 0))
          .slice(0, 4)
          .filter((a) => (a[r.clave] || 0) > 0)
        return (
          <div className="tarjeta" key={r.clave}>
            <div className="fila" style={{ justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{n.nombre}</h3>
              <span className={'pastilla' + (r.tipo === 'max' ? ' alerta' : ' ok')}>
                {r.tipo === 'max' ? 'No pasar de' : 'No bajar de'}{' '}
                {r.hombres === r.mujeres
                  ? `${fmt(r.hombres, 0)} ${n.unidad}`
                  : `H ${fmt(r.hombres, 0)} · M ${fmt(r.mujeres, 0)} ${n.unidad}`}
              </span>
            </div>
            <p style={{ margin: '0.4rem 0' }}>{DESCRIPCIONES[r.clave]}</p>
            <div className="mini">
              {r.tipo === 'max' ? 'Dónde se esconde (cuidado): ' : 'Alimentos ricos (por ración): '}
              {ricos.map((a) => `${a.nombre} (${fmt(a[r.clave], n.decimales)} ${n.unidad})`).join(' · ')}
            </div>
          </div>
        )
      })}
    </>
  )
}
