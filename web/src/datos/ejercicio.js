// Guía de ejercicio con evidencia, por objetivo. Cada recomendación cita un
// estudio real (meta-análisis, ensayo o cohorte) enunciado como asociación o
// resultado, no como promesa individual.

export const RECOMPOSICION = {
  titulo: 'Recomposición corporal',
  intro:
    'Recomposición es ganar músculo y perder grasa a la vez. Es posible —sobre ' +
    'todo en principiantes, en quienes regresan a entrenar y con sobrepeso— aunque ' +
    'más lento que perseguir una sola meta. Las dos palancas son proteína alta y ' +
    'entrenamiento de fuerza progresivo, con un déficit calórico ligero (o ' +
    'mantenimiento).',
  claves: [
    {
      titulo: 'Proteína alta',
      texto:
        'Alrededor de 1.6 g/kg al día maximiza la ganancia de músculo con ' +
        'entrenamiento de fuerza; más allá de ~2.2 g/kg no añade beneficio claro. ' +
        'Repártela en el día.',
      fuente: 'Morton RW, et al. Br J Sports Med, 2018 (meta-análisis, 49 ensayos).',
    },
    {
      titulo: 'Déficit ligero, no agresivo',
      texto:
        'Un déficit moderado (~500 kcal) con proteína alta y fuerza permite perder ' +
        'grasa conservando —o incluso ganando— músculo en personas con margen; los ' +
        'déficits agresivos sacrifican músculo.',
      fuente: 'Longland TM, et al. Am J Clin Nutr, 2016 (ensayo controlado).',
    },
    {
      titulo: 'Sobrecarga progresiva',
      texto:
        'El músculo crece cuando el estímulo aumenta con el tiempo (más peso, más ' +
        'repeticiones o más series). Llevar registro de tus series —como en la app— ' +
        'es lo que hace visible el progreso.',
      fuente: 'Schoenfeld BJ, et al. J Strength Cond Res, 2017 (dosis-respuesta de volumen).',
    },
  ],
}

export const EJERCICIO_POR_OBJETIVO = [
  {
    objetivo: 'Longevidad',
    resumen:
      'La combinación ganadora es fuerza + algo de cardio. Y para la fuerza, poco ' +
      'rinde mucho: el mayor beneficio en mortalidad aparece con dosis modestas.',
    items: [
      {
        titulo: 'Fuerza 30-60 min por semana (el punto dulce)',
        texto:
          'En este meta-análisis, entrenar fuerza se asoció con ~15% menos ' +
          'mortalidad por todas las causas; el MÁXIMO beneficio apareció alrededor ' +
          'de 30-60 min semanales, con una curva en J (más volumen no daba más ' +
          'beneficio, e incluso se atenuaba). Poco y constante gana.',
        fuente: 'Shailendra P, Baldock KL, et al. Am J Prev Med, 2022 (meta-análisis).',
      },
      {
        titulo: 'Fuerza 2 veces por semana',
        texto:
          '30-60 min semanales de trabajo de fuerza se asocian con 10-17% menos ' +
          'mortalidad por todas las causas, enfermedad cardiovascular y cáncer, ' +
          'independientemente del ejercicio aeróbico.',
        fuente: 'Momma H, et al. Br J Sports Med, 2022 (meta-análisis).',
      },
      {
        titulo: 'Camina a diario',
        texto:
          'Más pasos al día se asocian con menor mortalidad; el beneficio crece ' +
          'rápido desde el sedentarismo y se estabiliza alrededor de 7,000-9,000 ' +
          'pasos en adultos.',
        fuente: 'Paluch AE, et al. Lancet Public Health, 2022 (meta-análisis de cohortes).',
      },
    ],
  },
  {
    objetivo: 'Ganancia de músculo',
    resumen:
      'El volumen (series semanales por grupo muscular) es el motor; la frecuencia ' +
      'ayuda a repartirlo y el fallo no es obligatorio.',
    items: [
      {
        titulo: '10+ series por grupo muscular a la semana',
        texto:
          'Existe relación dosis-respuesta entre las series semanales por grupo ' +
          'muscular y la hipertrofia: ~10 o más series/semana rinde claramente más ' +
          'que pocas. Reparte ese volumen en 2+ sesiones.',
        fuente: 'Schoenfeld BJ, et al. J Sports Sci, 2017 (meta-análisis de volumen).',
      },
      {
        titulo: 'Rango de repeticiones amplio, cerca del fallo',
        texto:
          'Se gana músculo tanto con cargas altas (pocas reps) como moderadas ' +
          '(más reps) si te acercas al fallo; elige lo que te deje entrenar con ' +
          'buena técnica y constancia.',
        fuente: 'Schoenfeld BJ, et al. J Strength Cond Res, 2021 (revisión de cargas).',
      },
      {
        titulo: 'Proteína ~1.6 g/kg y superávit ligero',
        texto:
          'Con entrenamiento, ~1.6 g/kg de proteína al día maximiza la síntesis ' +
          'muscular; un superávit calórico pequeño (~10%) favorece la ganancia sin ' +
          'exceso de grasa.',
        fuente: 'Morton RW, et al. Br J Sports Med, 2018 (meta-análisis).',
      },
    ],
  },
  {
    objetivo: 'Pérdida de grasa',
    resumen:
      'La dieta manda en el déficit; el ejercicio protege el músculo y suma gasto. ' +
      'La fuerza es tu seguro anti-catabolismo.',
    items: [
      {
        titulo: 'Fuerza para conservar el músculo en déficit',
        texto:
          'Combinar déficit calórico con entrenamiento de fuerza y proteína alta ' +
          'permite perder grasa conservando masa magra, frente a solo dieta.',
        fuente: 'Longland TM, et al. Am J Clin Nutr, 2016 (ensayo controlado).',
      },
      {
        titulo: 'Cardio como herramienta de gasto',
        texto:
          'El aeróbico aumenta el gasto energético y mejora la salud cardiovascular; ' +
          'combinado con fuerza da mejor composición corporal que cualquiera solo.',
        fuente: 'Willis LH, et al. J Appl Physiol, 2012 (ensayo aeróbico vs fuerza vs combinado).',
      },
      {
        titulo: 'Muévete más fuera del gym (NEAT)',
        texto:
          'La actividad no-ejercicio (caminar, escaleras, estar de pie) puede ' +
          'variar cientos de kcal al día entre personas y es clave para sostener el ' +
          'déficit sin matarte de hambre.',
        fuente: 'Levine JA. Best Pract Res Clin Endocrinol Metab, 2002 (revisión de NEAT).',
      },
      {
        titulo: 'Pero el cuerpo compensa: el ejercicio no es cheque en blanco',
        texto:
          'En un estudio reciente con 34 pastores seminómadas daasanach (Kenia), ' +
          'su gasto energético diario total fue prácticamente el mismo que el de ' +
          'poblaciones industrializadas y NO se correlacionó con su actividad física, ' +
          'mucho mayor. Encaja con el "modelo de gasto restringido": el cuerpo ' +
          'compensa el ejercicio recortando energía en otras funciones, así que a ' +
          'largo plazo moverte más no eleva tu gasto total tanto como dice la ' +
          'calculadora. Conclusión: el déficit se gana sobre todo en la cocina; el ' +
          'ejercicio vale por el músculo y la salud, no como permiso para comer de más.',
        fuente: 'McGrosky A, et al. (incl. Pontzer H). Ann Hum Biol, 2024 (agua doblemente marcada).',
      },
    ],
  },
]
