const NATURALES = [
  {
    nombre: 'Sandía (citrulina natural)',
    objetivo: 'Vasodilatación · presión arterial',
    texto: 'La sandía es la fuente natural más rica de L-citrulina, precursora del óxido nítrico (vasodilatador). Extractos de sandía redujeron modestamente la presión arterial en adultos con prehipertensión.',
    fuente: 'Figueroa A, et al. Am J Hypertens, 2011-2012 (ensayos con extracto de sandía).',
  },
  {
    nombre: 'Jamaica (flor de hibisco)',
    objetivo: 'Vasodilatación · presión arterial',
    texto: 'El agua de jamaica (sin azúcar) reduce la presión sistólica y diastólica de forma consistente en meta-análisis de ensayos; efecto comparable a cambios de estilo de vida.',
    fuente: 'Serban C, et al. J Hypertens, 2015 (meta-análisis de hibiscus sabdariffa).',
  },
  {
    nombre: 'Betabel (nitratos)',
    objetivo: 'Rendimiento de resistencia',
    texto: 'El jugo de betabel eleva el óxido nítrico vía nitratos y mejora la eficiencia y el rendimiento en ejercicio de resistencia en la mayoría de los ensayos.',
    fuente: 'Domínguez R, et al. Nutrients, 2017 (revisión de betabel y resistencia).',
  },
  {
    nombre: 'Té verde',
    objetivo: 'Longevidad · salud cardiovascular',
    texto: 'En cohortes grandes, el consumo habitual de té verde se asocia con menor mortalidad cardiovascular; las catequinas son el candidato principal.',
    fuente: 'Kuriyama S, et al. JAMA, 2006 (cohorte Ohsaki, ~40 000 adultos).',
  },
]

const SINTETICOS = [
  {
    nombre: 'Creatina monohidratada',
    dosis: '3-5 g diarios, cualquier hora',
    texto: 'El suplemento con más evidencia en deporte: aumenta fuerza y masa magra con entrenamiento, y es seguro a largo plazo en adultos sanos. No necesita fase de carga.',
    fuente: 'Kreider RB, et al. J Int Soc Sports Nutr, 2017 (postura oficial ISSN).',
  },
  {
    nombre: 'Proteína en polvo (suero o vegetal)',
    dosis: 'Para completar tu meta diaria de proteína',
    texto: 'Es comida en polvo, no magia: suplementar proteína aumenta fuerza y masa muscular SOLO si no llegas a tu requerimiento con alimentos (~1.6 g/kg/día en entrenamiento).',
    fuente: 'Morton RW, et al. Br J Sports Med, 2018 (meta-análisis, 49 ensayos).',
  },
  {
    nombre: 'Beta-alanina',
    dosis: '3-6 g diarios (repartidos)',
    texto: 'Mejora el rendimiento en esfuerzos de 1 a 4 minutos (amortigua la acidez muscular). El hormigueo (parestesia) que puede dar es inocuo y se evita repartiendo la dosis.',
    fuente: 'Trexler ET, et al. J Int Soc Sports Nutr, 2015 (postura oficial ISSN).',
  },
  {
    nombre: 'Citrulina malato',
    dosis: '6-8 g, 40-60 min antes de entrenar',
    texto: 'Pre-entreno SIN estimulantes: precursor de óxido nítrico. La evidencia es mixta-moderada (mejoras pequeñas en repeticiones y percepción de esfuerzo en varios ensayos, no en todos).',
    fuente: 'Gonzalez AM, Trexler ET. J Strength Cond Res, 2020 (revisión).',
  },
]

export default function Suplementos() {
  return (
    <>
      <h2>Suplementación con evidencia</h2>
      <p className="mini">
        Primero la comida, luego los polvos. Aquí solo lo que tiene respaldo en
        ensayos o meta-análisis; sin estimulantes a propósito. No sustituye el
        consejo médico (revisa interacciones si tomas medicamentos).
      </p>

      <h3>🌿 Naturales (en tu mercado)</h3>
      <div className="rejilla">
        {NATURALES.map((s) => (
          <div className="tarjeta" key={s.nombre}>
            <h3 style={{ marginTop: 0 }}>{s.nombre}</h3>
            <span className="pastilla ok">{s.objetivo}</span>
            <p style={{ marginBottom: '0.4rem' }}>{s.texto}</p>
            <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{s.fuente}</p>
          </div>
        ))}
      </div>

      <h3>🥤 Sintéticos que sí pasan el filtro</h3>
      <div className="rejilla">
        {SINTETICOS.map((s) => (
          <div className="tarjeta" key={s.nombre}>
            <h3 style={{ marginTop: 0 }}>{s.nombre}</h3>
            <span className="pastilla">{s.dosis}</span>
            <p style={{ marginBottom: '0.4rem' }}>{s.texto}</p>
            <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{s.fuente}</p>
          </div>
        ))}
      </div>

      <div className="tarjeta">
        <h3 style={{ marginTop: 0 }}>Lo que dejamos fuera y por qué</h3>
        <p style={{ margin: 0 }}>
          Pre-entrenos comerciales (mezclas opacas con estimulantes), quemadores de
          grasa, BCAA (redundantes si comes suficiente proteína) y la mayoría de
          multivitamínicos (con el menú + ensalada diaria no aportan nada extra en
          personas sanas). Menos frascos, más mercado.
        </p>
      </div>
    </>
  )
}
