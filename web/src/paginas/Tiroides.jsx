import { QUE_ES, LEVOTIROXINA, NUTRICION, ESTILO_VIDA, SENALES_ALARMA } from '../datos/tiroides.js'

export default function Tiroides() {
  return (
    <>
      <h2>Hipotiroidismo: tips para el día a día</h2>
      <div className="tarjeta" style={{ borderLeft: '4px solid var(--acento)' }}>
        <p style={{ marginTop: 0 }}>{QUE_ES.intro}</p>
        <p className="mini" style={{ marginBottom: 0 }}>
          ⚠️ <strong>Esto no es consejo médico.</strong> El diagnóstico, el tratamiento
          y la dosis los decide tu médico según tu TSH. Aquí solo reunimos hábitos de
          adherencia y estilo de vida con evidencia para acompañar tu tratamiento — nunca
          para reemplazarlo ni para ajustar dosis por tu cuenta.
        </p>
      </div>

      <h2>Síntomas frecuentes</h2>
      <div className="tarjeta">
        <div className="fila">
          {QUE_ES.sintomas.map((s) => (
            <span className="pastilla" key={s}>{s}</span>
          ))}
        </div>
        <p className="mini" style={{ marginBottom: 0 }}>{QUE_ES.nota}</p>
      </div>

      <h2>Cómo tomar la levotiroxina (lo más importante)</h2>
      <p className="mini">
        La hormona funciona si se absorbe bien, y eso depende de cómo y cuándo la tomas.
        Estos son hábitos de adherencia estándar; tu pauta exacta la marca tu médico.
      </p>
      <div className="rejilla">
        {LEVOTIROXINA.map(([titulo, texto]) => (
          <div className="tarjeta" key={titulo}>
            <strong>{titulo}</strong>
            <p style={{ margin: '0.3rem 0 0' }}>{texto}</p>
          </div>
        ))}
      </div>

      <h2>Dieta y suplementos</h2>
      <div className="rejilla">
        {NUTRICION.map((n) => (
          <div
            className="tarjeta"
            key={n.titulo}
            style={n.tono === 'alerta' ? { borderColor: 'var(--acento)', borderWidth: 2 } : undefined}
          >
            <strong>{n.tono === 'alerta' ? '⚠️ ' : ''}{n.titulo}</strong>
            <p style={{ margin: '0.3rem 0 0' }}>{n.texto}</p>
          </div>
        ))}
      </div>

      <h2>Estilo de vida</h2>
      <div className="rejilla">
        {ESTILO_VIDA.map(([titulo, texto]) => (
          <div className="tarjeta" key={titulo}>
            <strong>{titulo}</strong>
            <p style={{ margin: '0.3rem 0 0' }}>{texto}</p>
          </div>
        ))}
      </div>

      <div className="tarjeta">
        <strong>Regístralo en la app</strong>
        <p style={{ margin: '0.3rem 0 0' }}>
          Activa la sección Doctor y crea métricas para lo que te pidió tu endocrinólogo:
          <em> TSH</em> (número, en cada análisis), <em>pastilla tomada</em> (sí/no diario)
          y <em>energía 1-10</em>. Junto con tu peso, sueño y ánimo, tendrás una foto real
          para tus consultas — y podrás ver si tras un cambio de dosis mejoras.
        </p>
      </div>

      <div className="tarjeta" style={{ borderColor: 'var(--acento)', borderWidth: 2 }}>
        <strong>⚠️ Cuándo buscar ayuda</strong>
        <p style={{ margin: '0.3rem 0 0' }}>{SENALES_ALARMA}</p>
      </div>

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Evidencia: Jonklaas 2014 (guía ATA de tratamiento) · Bolk 2010 (toma nocturna) ·
        Benvenga 2008 (café y absorción) · Winther 2020 (selenio) · Leung &amp; Braverman 2014
        (exceso de yodo) — fichas en <a href="#/papers">Papers</a>. No sustituye a tu médico.
      </p>
    </>
  )
}
