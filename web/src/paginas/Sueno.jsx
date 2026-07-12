import { useState } from 'react'

const CONSEJOS = [
  {
    titulo: 'Duerme 7-8 horas',
    texto: 'Dormir menos de 6 o más de 9 horas se asocia con mayor mortalidad; el mínimo de riesgo ronda las 7-8 horas.',
    fuente: 'Cappuccio FP, et al. Sleep, 2010 (meta-análisis).',
  },
  {
    titulo: 'Horario regular, también en fin de semana',
    texto: 'Acostarte y levantarte a la misma hora estabiliza tu reloj circadiano; la irregularidad se asocia con peor sueño y peor ánimo.',
    fuente: 'Irish LA, et al. Sleep Med Rev, 2015 (revisión de higiene del sueño).',
  },
  {
    titulo: 'Corta la cafeína 6+ horas antes',
    texto: 'Cafeína incluso 6 horas antes de dormir reduce de forma medible el tiempo total de sueño, aunque no lo notes.',
    fuente: 'Drake C, et al. J Clin Sleep Med, 2013 (ensayo).',
  },
  {
    titulo: 'Pantallas fuera al final del día',
    texto: 'La luz de pantallas por la noche retrasa la melatonina y el reloj circadiano, y reduce el estado de alerta matutino.',
    fuente: 'Chang AM, et al. PNAS, 2015 (ensayo con lectores electrónicos).',
  },
  {
    titulo: 'Cuarto fresco, oscuro y silencioso',
    texto: 'La temperatura alta del dormitorio fragmenta el sueño; oscuridad y silencio reducen despertares. Apunta a ~18-20 °C.',
    fuente: 'Okamoto-Mizuno K, Mizuno K. J Physiol Anthropol, 2012 (revisión).',
  },
  {
    titulo: 'Ejercicio sí — idealmente no justo antes de acostarte',
    texto: 'El ejercicio regular mejora la calidad del sueño; el vigoroso en la hora previa a dormir puede retrasarlo en algunas personas.',
    fuente: 'Stutz J, et al. Sports Med, 2019 (meta-análisis).',
  },
  {
    titulo: 'Alcohol: falso amigo del sueño',
    texto: 'Aunque ayuda a quedarse dormido, el alcohol fragmenta la segunda mitad de la noche y suprime el sueño REM.',
    fuente: 'Ebrahim IO, et al. Alcohol Clin Exp Res, 2013 (revisión).',
  },
  {
    titulo: 'Siestas cortas (10-20 min) y antes de las 3 pm',
    texto: 'Las siestas breves mejoran alerta y rendimiento sin interferir con el sueño nocturno; las largas o tardías sí interfieren.',
    fuente: 'Brooks A, Lack L. Sleep, 2006 (ensayo de duración de siesta).',
  },
]

/** Ciclos de ~90 min + ~15 min para conciliar el sueño. */
function horasDormir(despertar) {
  const [h, m] = despertar.split(':').map(Number)
  const objetivo = h * 60 + m
  return [6, 5, 4].map((ciclos) => {
    let t = objetivo - ciclos * 90 - 15
    while (t < 0) t += 24 * 60
    const hh = String(Math.floor(t / 60)).padStart(2, '0')
    const mm = String(t % 60).padStart(2, '0')
    // 5 ciclos = 7.5 h, dentro del punto óptimo de 7-8 h para adultos.
    return { ciclos, hora: `${hh}:${mm}`, horas: (ciclos * 90) / 60, recomendado: ciclos === 5 }
  })
}

export default function Sueno() {
  const [despertar, setDespertar] = useState('06:30')
  const opciones = horasDormir(despertar)

  return (
    <>
      <h2>Calculadora de hora de dormir</h2>
      <div className="tarjeta">
        <div className="fila">
          <label>¿A qué hora despiertas?{' '}
            <input type="time" value={despertar} onChange={(e) => setDespertar(e.target.value)} />
          </label>
        </div>
        <p className="mini">
          El sueño va en ciclos de ~90 min y despertar al final de uno se siente
          mejor que a la mitad — pero es un <strong>heurístico aproximado</strong>:
          la duración del ciclo varía de 70 a 120 min entre personas y a lo largo
          de la noche. Tómalo como guía, no como reloj exacto. Sumamos ~15 min para
          conciliar el sueño.
        </p>
        <div className="fila">
          {opciones.map((o) => (
            <span key={o.ciclos} className={'pastilla' + (o.recomendado ? ' ok' : '')}>
              Acuéstate a las <strong>{o.hora}</strong> · {o.ciclos} ciclos ({o.horas} h)
              {o.recomendado ? ' ← objetivo 7-8 h' : ''}
            </span>
          ))}
        </div>
        <p className="mini" style={{ marginBottom: 0 }}>
          El punto óptimo para adultos son <strong>7-8 horas</strong>: por debajo de 6
          y por encima de 9 se asocia con más mortalidad. Registra después en la app
          tus horas y calificación para ver tu media y varianza reales.
        </p>
      </div>

      <h2>Recomendaciones con evidencia</h2>
      <p className="mini">
        Asociaciones y ensayos en poblaciones; no sustituyen consejo médico.
      </p>
      <div className="rejilla">
        {CONSEJOS.map((c) => (
          <div className="tarjeta" key={c.titulo}>
            <h3 style={{ marginTop: 0 }}>{c.titulo}</h3>
            <p style={{ marginBottom: '0.4rem' }}>{c.texto}</p>
            <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{c.fuente}</p>
          </div>
        ))}
      </div>
    </>
  )
}
