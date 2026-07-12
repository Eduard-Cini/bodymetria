const NATURALES = [
  {
    nombre: 'Sandía (citrulina natural)',
    objetivo: 'Vasodilatación · presión arterial',
    texto: 'La sandía es la fuente natural más rica de L-citrulina, precursora del óxido nítrico (vasodilatador). La citrulina se concentra sobre todo en la PARTE BLANCA de la cáscara. Extractos de sandía redujeron modestamente la presión arterial en adultos con prehipertensión.',
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
    grado: 'Evidencia FUERTE',
    gradoOk: true,
    dosis: '3-5 g diarios, a cualquier hora',
    texto: 'El suplemento con más evidencia en deporte: aumenta fuerza y masa magra con entrenamiento, y es seguro a largo plazo en adultos sanos. No necesita fase de carga. Es, además, muy económico.',
    fuente: 'Kreider RB, et al. J Int Soc Sports Nutr, 2017 (postura oficial ISSN).',
  },
  {
    nombre: 'Proteína en polvo (suero o vegetal)',
    grado: 'Evidencia FUERTE',
    gradoOk: true,
    dosis: 'Solo para completar tu meta diaria de proteína',
    texto: 'Es comida en polvo, no magia: aumenta fuerza y masa muscular SOLO si no llegas a tu requerimiento con alimentos (~1.6 g/kg/día entrenando). Si ya lo alcanzas comiendo, no añade nada.',
    fuente: 'Morton RW, et al. Br J Sports Med, 2018 (meta-análisis, 49 ensayos).',
  },
  {
    nombre: 'Beta-alanina',
    grado: 'Evidencia MODERADA',
    dosis: '3-6 g diarios · NO es necesaria',
    texto: 'Grado de evidencia moderado: mejora el rendimiento en esfuerzos de 1 a 4 minutos (amortigua la acidez muscular), pero el efecto es pequeño y no la necesitas para progresar. El hormigueo que da es inocuo.',
    fuente: 'Trexler ET, et al. J Int Soc Sports Nutr, 2015 (postura oficial ISSN).',
  },
  {
    nombre: 'Citrulina malato',
    grado: 'Evidencia MIXTA / moderada',
    dosis: '6-8 g pre-entreno · NO es necesaria',
    texto: 'Grado de evidencia mixto-moderado: precursor de óxido nítrico sin estimulantes. Algunos ensayos muestran mejoras pequeñas en repeticiones y percepción de esfuerzo; otros no. Prescindible.',
    fuente: 'Gonzalez AM, Trexler ET. J Strength Cond Res, 2020 (revisión).',
  },
]

export default function Suplementos() {
  return (
    <>
      <h2>Suplementación con evidencia</h2>
      <p className="mini">
        Primero la comida, luego los polvos. Aquí solo lo que tiene respaldo en
        ensayos o meta-análisis, con su grado de evidencia; sin estimulantes a
        propósito. No sustituye el consejo médico (revisa interacciones si tomas
        medicamentos).
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
            <div className="fila">
              <span className={'pastilla' + (s.gradoOk ? ' ok' : '')}>{s.grado}</span>
              <span className="pastilla">{s.dosis}</span>
            </div>
            <p style={{ margin: '0.4rem 0' }}>{s.texto}</p>
            <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{s.fuente}</p>
          </div>
        ))}
      </div>

      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>🍌 Pre-entreno natural, sano y barato</h3>
        <p style={{ marginTop: 0 }}>
          No necesitas beta-alanina ni citrulina malato para entrenar bien. Una
          alternativa natural, económica y con buen respaldo:
        </p>
        <ul style={{ margin: '0 0 0.6rem' }}>
          <li><strong>Energía rápida:</strong> un plátano con un poco de crema de avellanas antes de entrenar.</li>
          <li><strong>Creatina</strong> (esa sí vale la pena: 3-5 g al día).</li>
          <li><strong>Óxido nítrico natural:</strong> la parte blanca de la sandía, agua de jamaica con algo de azúcar y betabel.</li>
        </ul>
        <p style={{ marginBottom: 0 }}>
          Dicho esto, los pre-entrenos <strong>sin estimulantes</strong> (con citrulina,
          beta-alanina) también son una alternativa válida si te gustan — solo que no
          son imprescindibles.
        </p>
      </div>

      <div className="tarjeta">
        <h3 style={{ marginTop: 0 }}>Lo que dejamos fuera y por qué</h3>
        <p style={{ margin: 0 }}>
          Pre-entrenos comerciales con estimulantes y mezclas opacas, quemadores de
          grasa, BCAA (redundantes si comes suficiente proteína) y la mayoría de
          multivitamínicos (con el menú + ensalada diaria no aportan extra en gente
          sana). La industria necesita vender cosas, pero muy poco de eso tiene
          evidencia sólida.
        </p>
      </div>
    </>
  )
}
