// Tips de estilo de vida y adherencia para hipotiroidismo. NO es consejo médico
// ni sustituye a tu endocrinólogo: el tratamiento (levotiroxina) y la dosis los
// decide y ajusta tu médico según tu TSH. Aquí solo reunimos hábitos con
// evidencia que ayudan a que el tratamiento funcione mejor.

export const QUE_ES = {
  intro:
    'El hipotiroidismo es cuando la tiroides produce poca hormona (T4/T3), que regula ' +
    'el metabolismo de casi todo el cuerpo. La causa más común es autoinmune ' +
    '(tiroiditis de Hashimoto). Se controla muy bien con levotiroxina — hormona ' +
    'idéntica a la que falta — y seguimiento periódico de la TSH.',
  sintomas: [
    'Cansancio y sueño excesivo', 'Frío que otros no sienten', 'Aumento de peso o dificultad para bajarlo',
    'Piel seca, caída de cabello', 'Estreñimiento', 'Ánimo bajo o "niebla mental"',
    'Reglas más abundantes o irregulares', 'Ritmo cardiaco lento',
  ],
  nota:
    'Muchos síntomas son inespecíficos: solo un análisis de sangre (TSH, y a veces T4 ' +
    'libre y anticuerpos) confirma el diagnóstico. No te auto-diagnostiques por la lista.',
}

// Lo más accionable: cómo se toma la levotiroxina para que se absorba bien.
export const LEVOTIROXINA = [
  [
    'En ayunas, a la misma hora',
    'Lo estándar es tomarla 30-60 min ANTES del desayuno con agua, todos los días a la misma hora. La constancia importa tanto como la dosis. (Alternativa validada: al acostarse, 2-3 h después de cenar, si te acomoda más — háblalo con tu médico.)',
  ],
  [
    'Lejos del café',
    'El café inmediatamente después reduce la absorción: espera ~30-60 min. Es una de las causas más comunes de "no me hace efecto".',
  ],
  [
    'Separa calcio y hierro 4 horas',
    'Suplementos de calcio o hierro y los antiácidos bloquean su absorción. Tómalos con varias horas de diferencia (p. ej. la levotiroxina en la mañana, el hierro en la tarde).',
  ],
  [
    'Ojo con soya, fibra muy alta y ciertos fármacos',
    'Comidas muy ricas en soya o en fibra justo con la pastilla, y algunos medicamentos (omeprazol, ciertos anticonvulsivos), pueden alterar la absorción. No los elimines: solo sepáralos en el tiempo y coméntalos con tu médico.',
  ],
  [
    'No cambies de marca sin avisar',
    'Distintas presentaciones pueden absorberse un poco diferente. Si te cambian la marca, coméntalo: puede justificar recontrolar la TSH.',
  ],
  [
    'No la suspendas por sentirte bien',
    'Sentirte bien significa que funciona, no que ya no la necesitas. Suspenderla hace volver los síntomas en semanas.',
  ],
]

// Dieta y suplementos: dónde SÍ hay señal y dónde el riesgo es real.
export const NUTRICION = [
  {
    titulo: 'Yodo: ni poco ni de más',
    texto:
      'El yodo es la materia prima de la hormona, pero en países con sal yodada la mayoría ya tiene suficiente. En Hashimoto, el EXCESO de yodo (algas, suplementos de kelp, megadosis) puede empeorar la autoinmunidad. No te suplementes yodo por tu cuenta.',
    tono: 'alerta',
  },
  {
    titulo: 'Selenio: evidencia mixta',
    texto:
      'En Hashimoto, el selenio puede bajar algo los anticuerpos, pero no está claro que cambie los síntomas ni que debas suplementarlo. Un par de nueces de Brasil cubren de sobra el requerimiento; en exceso el selenio es tóxico. Consúltalo antes de suplementar.',
    tono: 'normal',
  },
  {
    titulo: 'Revisa hierro, B12 y vitamina D',
    texto:
      'Suelen ir bajos y comparten síntomas (fatiga, caída de cabello). Vale la pena medirlos con tu médico: corregir una anemia o un déficit de B12 puede explicar parte del cansancio.',
    tono: 'normal',
  },
  {
    titulo: 'No existe la "dieta de la tiroides"',
    texto:
      'Salvo enfermedad celíaca asociada (más frecuente en Hashimoto), no hay evidencia de que quitar gluten cure el hipotiroidismo. Una dieta con suficiente proteína, verdura y yodo dietético normal es lo sensato. Desconfía de curas milagro.',
    tono: 'normal',
  },
]

// Vida diaria: qué esperar y qué sí ayuda.
export const ESTILO_VIDA = [
  [
    'Ejercicio: sí, dosificado',
    'La fatiga hace difícil arrancar, pero el ejercicio regular mejora energía, ánimo y composición corporal. Empieza suave (caminata, fuerza 2×/semana) y sube gradual. Con la dosis de hormona ajustada, deberías tolerarlo cada vez mejor.',
  ],
  [
    'El peso: paciencia y realismo',
    'El hipotiroidismo no tratado frena algo el metabolismo, pero rara vez explica un sobrepeso grande por sí solo. Bien tratado, bajar de peso responde a lo de siempre: déficit calórico, proteína y actividad. No esperes que la pastilla lo haga sola.',
  ],
  [
    'Duerme y cuida el estrés',
    'La fatiga tiroidea empeora con mal sueño. Higiene de sueño y manejo del estrés no curan, pero suman a que te sientas con más energía (registra tu sueño y ánimo en la app para verlo).',
  ],
  [
    'Sigue tu TSH',
    'El objetivo es mantener la TSH en el rango que tu médico marque. Tras cada cambio de dosis se recontrola en ~6-8 semanas. En embarazo o si lo planeas, avisa de inmediato: las necesidades cambian.',
  ],
]

export const SENALES_ALARMA =
  'Ve al médico pronto si tienes: palpitaciones, temblor, pérdida de peso y calor ' +
  '(posible dosis excesiva), hinchazón importante, dolor de cuello al tragar, o si ' +
  'estás embarazada o buscándolo. Ajustar la dosis SIEMPRE es decisión médica con TSH.'
