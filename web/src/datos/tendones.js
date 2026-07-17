// Fortalecimiento de tendones y manejo de tendinopatías, basado en la evidencia
// de carga (Cook & Purdam 2009; Rio 2015; Kongsgaard 2009; Beyer 2015).
// Los tendones se adaptan a la carga MECÁNICA, pero mucho más lento que el
// músculo (semanas-meses); la clave es carga progresiva y tolerable, no reposo.

export const PRINCIPIOS = [
  [
    'El tendón se adapta a la carga, no al reposo',
    'El reposo total quita el dolor un rato pero deja el tendón más débil: al volver, recae. Lo que remodela el colágeno es la tensión progresiva y sostenida en el tiempo.',
  ],
  [
    'Van más lento que el músculo',
    'El músculo responde en semanas; el tendón tarda de 6-12 semanas a varios meses. La paciencia no es opcional: subir carga demasiado rápido es la causa #1 de recaída.',
  ],
  [
    'Dolor tolerable está permitido',
    'En rehabilitación de tendón, molestia de hasta 3-4/10 DURANTE el ejercicio es aceptable si baja a la calma en 24 h y no empeora día con día. Guíate por cómo amanece el tendón, no solo por cómo se siente en el momento.',
  ],
  [
    'Isométrico para calmar, pesado-lento para reconstruir',
    'Fase de dolor: isométricos (sostener sin moverse) dan analgesia y algo de carga. Fase de construir: HSR (heavy slow resistance) o excéntricos — cargas altas a tempo lento, 3-4 s por fase.',
  ],
  [
    'Progresión guiada por síntomas',
    'Sube carga (peso, repes o dificultad) solo cuando el nivel actual se siente cómodo 2-3 sesiones seguidas y el tendón no se queja a la mañana siguiente. Un escalón a la vez.',
  ],
  [
    'Constancia sobre intensidad',
    'Mejor poco casi diario que una sesión heroica semanal. Los tendones responden a la frecuencia de estímulo repetido y necesitan ~48 h entre sesiones fuertes.',
  ],
]

// Protocolo genérico de 4 fases (marco Cook/Silbernagel). Cada tendinopatía
// concreta abajo adapta los ejercicios, pero la lógica de fases es la misma.
export const FASES = [
  {
    fase: 1, nombre: 'Calmar (isométricos)',
    cuando: 'Dolor alto o reactivo, tendón "irritado" al mínimo esfuerzo.',
    que: 'Isométricos: sostener una contracción fuerte sin movimiento, 5 × 30-45 s, descanso 1-2 min, 1-2 veces al día. Intensidad al 40-70% de tu máximo, en un rango sin dolor agudo.',
    meta: 'Bajar el dolor y mantener algo de carga sin irritar. Suele aliviar en 2-4 semanas.',
  },
  {
    fase: 2, nombre: 'Construir (fuerza lenta)',
    cuando: 'El dolor bajó y toleras cargar el tendón con movimiento.',
    que: 'HSR o excéntrico: 3-4 series de 6-15 repes a tempo lento (3 s subir + 3 s bajar), 2-3 días/semana con día de descanso entre medias. Carga alta pero controlada.',
    meta: 'Remodelar el tendón y ganar fuerza real. Es la fase larga: 8-12+ semanas.',
  },
  {
    fase: 3, nombre: 'Almacenar energía (si tu deporte lo pide)',
    cuando: 'Fuerza recuperada y sin dolor con carga pesada lenta.',
    que: 'Añade gradualmente trabajo elástico: saltos suaves, pliometría de bajo impacto, rebotes. Empieza con poco volumen y en días alternos.',
    meta: 'Preparar el tendón para correr, saltar o cambios de dirección.',
  },
  {
    fase: 4, nombre: 'Volver a jugar',
    cuando: 'Toleras energía elástica sin reacción al día siguiente.',
    que: 'Reintroduce tu deporte/entreno progresivamente, manteniendo 1-2 sesiones de fuerza lenta por semana como mantenimiento (el seguro anti-recaída).',
    meta: 'Rendir sin síntomas y no volver al punto de partida.',
  },
]

// Tendinopatías comunes con su ejercicio estrella por fase.
export const TENDINOPATIAS = [
  {
    clave: 'rotuliana',
    zona: 'Rodilla — tendón rotuliano ("rodilla del saltador")',
    quien: 'Saltos, sentadilla profunda, básquet/vóley, correr en cuesta.',
    isometrico: 'Sentadilla isométrica en pared o extensión de rodilla sostenida (45°), 5 × 30-45 s.',
    pesado: 'Sentadilla o prensa a tempo lento (3-1-3), o extensión de cuádriceps; sentadilla en declive 25° si toleras. 3-4 × 6-8, 3 días/semana.',
    ojo: 'Evita al inicio los saltos y frenadas; reincorpóralos hasta la fase 3.',
  },
  {
    clave: 'aquileo',
    zona: 'Tobillo — tendón de Aquiles',
    quien: 'Correr, saltar, aumentos bruscos de kilometraje.',
    isometrico: 'Elevación de talón sostenida (de pie, punta del pie en escalón), 5 × 30-45 s.',
    pesado: 'Protocolo tipo Alfredson/HSR: elevaciones de talón lentas con peso, pierna recta y flexionada, 3 × 12-15, a diario o días alternos. El aquíleo tolera y necesita volumen.',
    ojo: 'Distingue medio-tendón (mejor pronóstico) de inserción en el hueso (evita bajar por debajo del escalón, duele más).',
  },
  {
    clave: 'codo',
    zona: 'Codo — epicondilalgia ("codo de tenista/golfista")',
    quien: 'Agarres repetidos, trabajo de computadora, dominadas/remo con mucho volumen, raqueta.',
    isometrico: 'Extensión de muñeca isométrica sosteniendo una mancuerna ligera, 5 × 30-45 s.',
    pesado: 'Excéntrico de muñeca: sube con ayuda, baja lento (3-4 s) el peso; o Tyler Twist con barra de goma. 3 × 10-15, días alternos.',
    ojo: 'Revisa ergonomía y agarre; a veces el gatillo es la carga diaria (ratón, teclado), no el gym.',
  },
  {
    clave: 'hombro',
    zona: 'Hombro — manguito rotador / tendón supraespinoso',
    quien: 'Press de hombro con mala técnica, dormir de lado, trabajo por encima de la cabeza.',
    isometrico: 'Rotación externa isométrica contra la pared con el codo pegado, 5 × 30-45 s.',
    pesado: 'Rotación externa e interna con banda/polea a tempo lento, más elevaciones en el plano de la escápula (scaption). 3 × 12-15, 3 días/semana.',
    ojo: 'No lo confundas con pinzamiento por movilidad; si duele en un arco concreto, trabaja fuera de él primero.',
  },
  {
    clave: 'muneca',
    zona: 'Muñecas y codos — para calistenia (plancha, pino)',
    quien: 'Quien entrena holds con brazo recto (planche, pino, front lever): mucha carga en muñeca y tendón del codo.',
    isometrico: 'Apoyos progresivos: peso en las palmas en cuadrupedia aguantando, y con el dorso de la mano; 5 × 20-30 s.',
    pesado: 'Rutina de preparación de muñecas ANTES de cada sesión de habilidad: círculos, flexión/extensión cargada lenta, dedos. Progresa el planche lean solo si las muñecas amanecen bien.',
    ojo: 'En calistenia el error clásico es saltar de progresión por fuerza muscular cuando el tendón/muñeca aún no está listo. Deja que la articulación mande el ritmo.',
  },
]
