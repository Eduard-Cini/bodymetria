// Blindaje Articular: sesión semanal de prehabilitación (50 min, 4 semanas que
// rotan). Los ejercicios se animan con el motor de ./animaciones.js; la clave de
// cada ejercicio (cue) es la MISMA en CUES, en SEMANAS y en ANIM, así que las
// tres tablas no se pueden desincronizar.
//
// Dosificación tomada de la evidencia de carga de tendón: isométricos que
// calman (Rio 2015), carga lenta y pesada que remodela (Kongsgaard 2009) y
// progresión guiada por síntomas (Silbernagel 2020). Ver REFS al final.

// El semáforo que decide si subes, mantienes o bajas la carga.
export const REGLAS = [
  {
    n: '≤ 4/10',
    t: 'Molestia tolerable DURANTE el ejercicio. Ese rango es seguro y hasta terapéutico en un tendón.',
  },
  {
    n: '24 h',
    t: 'Es la prueba real: al día siguiente la rigidez matutina debe estar igual o mejor. Si empeoró, la dosis fue mucha.',
  },
  {
    n: '−20 %',
    t: 'Si empeoró a las 24 h, repite la misma sesión bajando carga o series un 20-30 %. No la saltes.',
  },
  {
    n: 'Alto',
    t: 'Dolor punzante, dentro de la articulación, o que te cambia la técnica: para ese ejercicio. Eso ya no es tendón.',
  },
]

// El esqueleto de la sesión no cambia nunca; lo que rota son los ejercicios.
// El orden importa: moviliza, calma el tendón, carga pesado y al final lo pequeño.
export const BLOQUES = [
  {
    n: 1, min: 8, nombre: 'Despertar articular',
    t: 'Círculos controlados (CARs) en las articulaciones del día. Sin carga, rango máximo, lento. Prepara tejido y te dice cómo amaneció cada zona.',
  },
  {
    n: 2, min: 10, nombre: 'Isométricos de tendón',
    t: 'Sostenes largos al ~70 % de tu máximo. Bajan el dolor de forma inmediata y permiten cargar mejor en el bloque siguiente.',
  },
  {
    n: 3, min: 17, nombre: 'Carga lenta y pesada',
    t: 'El corazón de la sesión: 3 ejercicios grandes con tempo 3 s abajo / 3 s arriba. La carga alta y lenta es lo que remodela el tendón.',
  },
  {
    n: 4, min: 10, nombre: 'Los olvidados',
    t: 'Circuito ligero: manguito rotador, tibial anterior, pies, cuello, dedos y agarre. Poco peso, muchas repeticiones, sin prisa.',
  },
  {
    n: 5, min: 7, nombre: 'Rango final',
    t: 'Movilidad con carga o con tiempo: posiciones profundas sostenidas para que el rango nuevo se quede.',
  },
]

// Cada semana toca todo el cuerpo pero pone el foco en una región. Al terminar
// la D se vuelve a la A con más carga.
export const SEMANAS = [
  {
    tag: 'Semana A', titulo: 'Cadena posterior y hombro',
    bloques: [
    {
      i: '01', nombre: 'Despertar articular', min: '8 min',
      ejs: [
        { cue: 'cars', n: 'CARs de cadera, hombro y tobillo', rx: '5 reps c/lado' },
        { cue: 'bisagra', n: 'Bisagra de cadera con palo', rx: '2 × 10' },
        { cue: 'desliz', n: 'Deslizamiento en pared (escápulas)', rx: '2 × 10' },
      ],
    },
    {
      i: '02', nombre: 'Isométricos', min: '10 min',
      ejs: [
        { cue: 'espsquat', n: 'Sentadilla española', rx: '5 × 30 s' },
        { cue: 'copeniso', n: 'Copenhagen corto (rodilla apoyada)', rx: '3 × 20 s / lado' },
        { cue: 'isoext', n: 'Extensión de muñeca isométrica', rx: '3 × 30 s' },
      ],
    },
    {
      i: '03', nombre: 'Carga lenta y pesada', min: '17 min',
      ejs: [
        { cue: 'rdl', n: 'Peso muerto rumano', rx: '4 × 8 · 3-1-3' },
        { cue: 'nordico', n: 'Curl nórdico asistido', rx: '3 × 5 · bajar 4 s' },
        { cue: 'hipthrust', n: 'Hip thrust con pausa arriba', rx: '3 × 10 · pausa 2 s' },
      ],
    },
    {
      i: '04', nombre: 'Los olvidados', min: '10 min',
      ejs: [
        { cue: 'rotext', n: 'Rotación externa con banda', rx: '3 × 15' },
        { cue: 'facepull', n: 'Face pull', rx: '3 × 15' },
        { cue: 'tibial', n: 'Elevación de tibial en pared', rx: '3 × 20' },
        { cue: 'pinza', n: 'Pinza de disco', rx: '3 × 30 s' },
      ],
    },
    {
      i: '05', nombre: 'Rango final', min: '7 min',
      ejs: [
        { cue: 'noventa', n: '90/90 con transiciones', rx: '8 cambios' },
        { cue: 'sofa', n: 'Estiramiento de sofá', rx: '2 × 60 s / lado' },
        { cue: 'colgarse', n: 'Colgarse activo de la barra', rx: '2 × 30 s' },
      ],
    },
    ],
  },
  {
    tag: 'Semana B', titulo: 'Rodilla, cuádriceps y muñeca',
    bloques: [
    {
      i: '01', nombre: 'Despertar articular', min: '8 min',
      ejs: [
        { cue: 'cars', n: 'CARs de rodilla, muñeca y cuello', rx: '5 reps c/lado' },
        { cue: 'mecidas', n: 'Mecidas de muñeca en cuadrupedia', rx: '2 × 10 c/orientación' },
        { cue: 'rodillapared', n: 'Rodilla a la pared (tobillo)', rx: '2 × 10 / lado' },
      ],
    },
    {
      i: '02', nombre: 'Isométricos', min: '10 min',
      ejs: [
        { cue: 'isopared', n: 'Sentadilla isométrica en pared', rx: '5 × 45 s' },
        { cue: 'isoext', n: 'Extensión de muñeca isométrica', rx: '4 × 30 s' },
        { cue: 'squeeze', n: 'Apretar pelota entre rodillas', rx: '3 × 30 s' },
      ],
    },
    {
      i: '03', nombre: 'Carga lenta y pesada', min: '17 min',
      ejs: [
        { cue: 'bulgara', n: 'Búlgara profunda', rx: '3 × 8 / pierna · 3-1-3' },
        { cue: 'nordicoinv', n: 'Nórdico inverso', rx: '3 × 6 · bajar 4 s' },
        { cue: 'flexoext', n: 'Flexo-extensión de muñeca con mancuerna', rx: '3 × 12 · 3-1-3' },
      ],
    },
    {
      i: '04', nombre: 'Los olvidados', min: '10 min',
      ejs: [
        { cue: 'ytw', n: 'Y-T-W en prono', rx: '3 × 8 de cada' },
        { cue: 'gemelosentado', n: 'Elevación de gemelo sentado (sóleo)', rx: '3 × 15 · 3-2-3' },
        { cue: 'shortfoot', n: 'Arco corto del pie', rx: '3 × 10 / pie' },
        { cue: 'cuelloiso', n: 'Isométrico de cuello, 4 direcciones', rx: '3 × 20 s' },
      ],
    },
    {
      i: '05', nombre: 'Rango final', min: '7 min',
      ejs: [
        { cue: 'sentprofunda', n: 'Sentadilla profunda sostenida', rx: '3 × 45 s' },
        { cue: 'dedosatras', n: 'Muñeca con dedos hacia las rodillas', rx: '2 × 30 s' },
        { cue: 'cuadriceps', n: 'Cuádriceps de pie con apoyo', rx: '2 × 45 s / lado' },
      ],
    },
    ],
  },
  {
    tag: 'Semana C', titulo: 'Cadera, ingle y manguito rotador',
    bloques: [
    {
      i: '01', nombre: 'Despertar articular', min: '8 min',
      ejs: [
        { cue: 'cars', n: 'CARs de cadera y hombro', rx: '5 reps c/lado' },
        { cue: 'openbook', n: 'Apertura torácica (open book)', rx: '2 × 8 / lado' },
        { cue: 'balanceo', n: 'Balanceo de pierna al frente y al lado', rx: '2 × 12 / lado' },
      ],
    },
    {
      i: '02', nombre: 'Isométricos', min: '10 min',
      ejs: [
        { cue: 'copeniso', n: 'Copenhagen isométrico', rx: '5 × 30 s / lado' },
        { cue: 'isorotext', n: 'Rotación externa isométrica con banda', rx: '4 × 30 s' },
        { cue: 'espsquat', n: 'Sentadilla española', rx: '3 × 30 s' },
      ],
    },
    {
      i: '03', nombre: 'Carga lenta y pesada', min: '17 min',
      ejs: [
        { cue: 'copenhagen', n: 'Copenhagen completo (pierna extendida)', rx: '3 × 6 / lado · 3 s' },
        { cue: 'cosaco', n: 'Sentadilla cosaco', rx: '3 × 6 / lado · 3-1-3' },
        { cue: 'cubano', n: 'Press cubano ligero', rx: '3 × 10 · controlado' },
      ],
    },
    {
      i: '04', nombre: 'Los olvidados', min: '10 min',
      ejs: [
        { cue: 'planchalat', n: 'Plancha lateral con abducción', rx: '3 × 30 s / lado' },
        { cue: 'facepull', n: 'Face pull', rx: '3 × 15' },
        { cue: 'nordico', n: 'Curl nórdico asistido', rx: '2 × 5' },
        { cue: 'extdedos', n: 'Extensión de dedos con liga', rx: '3 × 20' },
      ],
    },
    {
      i: '05', nombre: 'Rango final', min: '7 min',
      ejs: [
        { cue: 'airplane', n: 'Hip airplane', rx: '3 × 5 / lado' },
        { cue: 'noventa', n: '90/90 con inclinación al frente', rx: '8 reps + 30 s' },
        { cue: 'rana', n: 'Rana / mariposa sostenida', rx: '2 × 45 s' },
      ],
    },
    ],
  },
  {
    tag: 'Semana D', titulo: 'Codo, mano, agarre y pie',
    bloques: [
    {
      i: '01', nombre: 'Despertar articular', min: '8 min',
      ejs: [
        { cue: 'cars', n: 'CARs de muñeca, codo y dedos', rx: '8 reps c/lado' },
        { cue: 'mecidas', n: 'Mecidas de muñeca en cuadrupedia', rx: '2 × 10 c/orientación' },
        { cue: 'dedospie', n: 'Extensión y abanico de dedos del pie', rx: '2 × 15' },
      ],
    },
    {
      i: '02', nombre: 'Isométricos', min: '10 min',
      ejs: [
        { cue: 'isoext', n: 'Extensión de muñeca isométrica (codo de tenista)', rx: '5 × 45 s' },
        { cue: 'isoflex', n: 'Flexión de muñeca isométrica (codo de golfista)', rx: '3 × 30 s' },
        { cue: 'espsquat', n: 'Sentadilla española', rx: '3 × 30 s' },
      ],
    },
    {
      i: '03', nombre: 'Carga lenta y pesada', min: '17 min',
      ejs: [
        { cue: 'tyler', n: 'Tyler twist (excéntrico de extensores)', rx: '3 × 15 · bajar 4 s' },
        { cue: 'supinacion', n: 'Supinación-pronación con martillo', rx: '3 × 12 / lado' },
        { cue: 'gemelo1p', n: 'Gemelo a una pierna con carga', rx: '3 × 10 · 3-2-3' },
      ],
    },
    {
      i: '04', nombre: 'Los olvidados', min: '10 min',
      ejs: [
        { cue: 'pinza', n: 'Pinza de disco', rx: '4 × 30 s' },
        { cue: 'extdedos', n: 'Extensión de dedos con liga', rx: '3 × 30 s' },
        { cue: 'rotext', n: 'Rotación externa con banda', rx: '3 × 15' },
        { cue: 'deadbug', n: 'Dead bug', rx: '3 × 8 / lado' },
      ],
    },
    {
      i: '05', nombre: 'Rango final', min: '7 min',
      ejs: [
        { cue: 'colgarse', n: 'Colgarse activo de la barra', rx: '3 × 30 s' },
        { cue: 'dedosatras', n: 'Muñeca con dedos hacia atrás', rx: '2 × 30 s' },
        { cue: 'sentprofunda', n: 'Sentadilla profunda sostenida', rx: '2 × 45 s' },
      ],
    },
    ],
  },
]

export const CUES = {
  cars: { z: "Movilidad y despertar", n: "CARs (círculos articulares controlados)",
    c: "Círculos lentos y lo más grandes posible en UNA sola articulación, con el resto del cuerpo quieto y apretado al 20 %. Buscas el borde de tu rango sin dolor. Sirven de calentamiento y de diagnóstico: te dicen qué zona amaneció rasposa." },
  bisagra: { z: "Movilidad y despertar", n: "Bisagra de cadera con palo",
    c: "Palo pegado a nuca, dorsales y sacro: los tres contactos no se pierden en todo el movimiento. Lleva la cadera hacia atrás con las espinillas casi verticales y las rodillas ligeramente flexionadas. Enseña a separar bisagra de sentadilla, que es la mitad de la técnica del peso muerto." },
  desliz: { z: "Core, cuello y escápulas", n: "Deslizamiento en pared",
    c: "Antebrazos y dorso de las manos contra el muro, codos a la altura de los hombros. Sube y baja sin que las muñecas ni la zona lumbar se despeguen de la pared. Trabaja serrato y movilidad escapular, lo que le falta a casi todo hombro que truena." },
  openbook: { z: "Movilidad y despertar", n: "Apertura torácica (open book)",
    c: "De lado, rodillas a 90° apiladas y apoyadas en el suelo. Abre el brazo de arriba siguiendo la mano con la mirada hasta llevarlo al otro lado. Las rodillas no se despegan: si la pelvis gira, el giro ya no viene de la espalda alta." },
  balanceo: { z: "Cadera e ingle", n: "Balanceo de pierna",
    c: "Apoyado en la pared: 12 balanceos al frente y atrás, luego 12 laterales cruzando por delante. Tronco firme y el movimiento saliendo de la cadera, sin arquear la lumbar para ganar rango." },
  rodillapared: { z: "Pie, tobillo y tibial", n: "Rodilla a la pared",
    c: "Pie a unos centímetros del muro; lleva la rodilla a tocar la pared sin despegar el talón. Aleja el pie hasta el límite y mide con los dedos. Compara lado contra lado: la diferencia es tu asimetría de tobillo, y explica muchas rodillas y sentadillas torcidas." },

  tyler: { z: "Codo y antebrazo", n: "Tyler twist",
    c: "Barra de goma o una toalla enrollada firme. Sostienes con las dos manos, giras con la sana y luego resistes el desenrollado con la lesionada durante 4 segundos. Solo entrenas la fase de frenado: es el excéntrico que remodela el tendón del codo de tenista." },
  isoext: { z: "Codo y antebrazo", n: "Extensión de muñeca isométrica",
    c: "Antebrazo apoyado en el muslo o un banco, palma hacia abajo y solo la mano fuera. Con una mancuerna ligera, sostén la muñeca extendida sin dejar que baje. Debe sentirse en el lado externo del codo, no en la articulación." },
  isoflex: { z: "Codo y antebrazo", n: "Flexión de muñeca isométrica",
    c: "Igual que la anterior pero con la palma hacia ARRIBA. Sostén sin que la muñeca caiga. Se siente en el lado interno del codo: es la versión para codo de golfista." },
  supinacion: { z: "Codo y antebrazo", n: "Supinación-pronación con martillo",
    c: "Codo a 90° pegado al costado, agarra el martillo por la punta del mango, lejos de la cabeza. Gira lento hasta ambos extremos del rango. Si pesa demasiado, agárralo más cerca de la cabeza." },
  flexoext: { z: "Codo y antebrazo", n: "Flexo-extensión de muñeca con mancuerna",
    c: "Antebrazo apoyado, solo la mano fuera del banco. Sube y baja en 3 segundos por fase, rango completo. Haz series separadas con palma abajo (extensores) y palma arriba (flexores): son músculos distintos." },

  mecidas: { z: "Muñeca y mano", n: "Mecidas de muñeca en cuadrupedia",
    c: "Palmas fijas al suelo. Primera orientación con los dedos al frente, segunda con los dedos hacia las rodillas, tercera con el dorso de la mano abajo. En cada una, mece el peso adelante y atrás sin despegar la palma. Es el mejor seguro para muñecas que cargan peso." },
  pinza: { z: "Muñeca y mano", n: "Pinza de disco",
    c: "Dos discos lisos cara con cara, sostenidos solo con las yemas de los dedos, brazo relajado al costado. Hombro abajo y muñeca neutra. Sube tiempo antes que peso: es agarre de pinza, el que casi nadie entrena y el que falla primero." },
  extdedos: { z: "Muñeca y mano", n: "Extensión de dedos con liga",
    c: "Liga alrededor de las cinco yemas. Abre la mano lento y ciérrala aún más lento. Es el antagonista de todo lo que agarras: entrenarlo equilibra el antebrazo y descarga el codo." },
  dedosatras: { z: "Muñeca y mano", n: "Muñeca con dedos hacia atrás",
    c: "En cuadrupedia, dedos apuntando a las rodillas y palma bien pegada. Siéntate lentamente hacia atrás hasta sentir el estiramiento en el antebrazo. Sal igual de lento. Es el estiramiento que le falta a quien empuja mucho (lagartijas, pino, press)." },
  colgarse: { z: "Muñeca y mano", n: "Colgarse activo de la barra",
    c: "Agarre firme y hombros guardados: escápulas hacia abajo y atrás, no colgado muerto con las orejas entre los hombros. Respira normal. Entrena agarre, salud del hombro y descompresión de columna a la vez." },

  rotext: { z: "Hombro y manguito rotador", n: "Rotación externa con banda",
    c: "Codo pegado al costado a 90°; pon una toalla enrollada bajo la axila para que no se despegue. Gira solo el antebrazo hacia afuera y vuelve controlado. El hombro no se encoge ni se va hacia adelante. Poco peso: es un músculo pequeño." },
  isorotext: { z: "Hombro y manguito rotador", n: "Rotación externa isométrica",
    c: "Misma posición que la versión con movimiento, pero te quedas a mitad de rango sosteniendo la tensión de la banda 30 segundos. El codo nunca se separa del costado." },
  ytw: { z: "Hombro y manguito rotador", n: "Y-T-W en prono",
    c: "Boca abajo, frente apoyada, pulgares apuntando al techo. Levanta los brazos dibujando una Y, luego una T, luego una W, juntando las escápulas en cada una. La nuca larga y los hombros lejos de las orejas. Sin peso las primeras semanas." },
  cubano: { z: "Hombro y manguito rotador", n: "Press cubano",
    c: "Mancuernas muy ligeras: remo alto hasta los codos a la altura del hombro, rotas los antebrazos hacia arriba, y de ahí presionas sobre la cabeza. Baja deshaciendo el camino. Si el codo se cae al rotar, pesa demasiado." },
  facepull: { z: "Hombro y manguito rotador", n: "Face pull",
    c: "Banda anclada a la altura de la cara. Tira hacia ti separando las manos y llevando los codos altos, terminando en posición de doble bíceps. Aprieta un segundo atrás. Es el antídoto de los hombros adelantados." },

  copenhagen: { z: "Cadera e ingle", n: "Copenhagen completo",
    c: "Antebrazo en el suelo, pie de arriba apoyado en un banco a la altura de la rodilla o el tobillo. Sube la cadera hasta hacer una línea recta de tobillo a hombro y baja controlado. Es el ejercicio con mejor evidencia para la ingle, y es exigente: entra por la versión corta." },
  copeniso: { z: "Cadera e ingle", n: "Copenhagen isométrico (corto)",
    c: "Misma postura pero con la RODILLA de arriba apoyada en el banco en vez del pie, y te quedas arriba en línea recta sin subir ni bajar. Si tiembla, está funcionando. Solo pasa a pierna extendida cuando estos 30 segundos se sientan cómodos." },
  squeeze: { z: "Cadera e ingle", n: "Apretar pelota entre rodillas",
    c: "Tumbado boca arriba, rodillas a 90°, una pelota o toalla enrollada entre las rodillas. Aprieta al 70 % y sostén respirando normal. Es el isométrico de aductores más seguro para empezar cuando la ingle está sensible." },
  airplane: { z: "Cadera e ingle", n: "Hip airplane",
    c: "Sobre una pierna, tronco inclinado hacia el frente casi paralelo al suelo, la otra pierna extendida atrás. Abre la pelvis rotando hacia afuera y ciérrala rotando hacia adentro, controlando desde la cadera de apoyo — no desde la lumbar. Apóyate en una pared al principio." },
  cosaco: { z: "Cadera e ingle", n: "Sentadilla cosaco",
    c: "Pies muy separados; baja hacia un lado en cuclillas mientras la otra pierna queda extendida con la punta del pie hacia arriba. El talón del lado que carga siempre en el suelo. Pecho arriba; si te caes hacia atrás, sujétate de algo mientras ganas rango." },
  noventa: { z: "Cadera e ingle", n: "90/90",
    c: "Sentado en el suelo, una rodilla a 90° al frente y la otra a 90° al lado. Cambia de lado sin usar las manos, dejando caer las rodillas de un lado al otro. Para el estiramiento, inclínate con la espalda larga sobre la pierna de adelante." },
  rana: { z: "Cadera e ingle", n: "Rana / mariposa sostenida",
    c: "Rana: en cuadrupedia con las rodillas bien abiertas, tobillos en línea con las rodillas, mece la cadera hacia atrás. Mariposa: sentado, plantas de los pies juntas, tronco largo hacia el frente. Respira profundo y sostén; no rebotes." },
  sofa: { z: "Cadera e ingle", n: "Estiramiento de sofá",
    c: "Rodilla trasera al pie de la pared con el empeine apoyado en ella, la otra pierna al frente en zancada. Mete la pelvis apretando el glúteo del lado estirado y sube el tronco vertical. Si arqueas la lumbar, pierdes el psoas: mejor menos rango y pelvis metida." },

  nordico: { z: "Isquios y rodilla", n: "Curl nórdico asistido",
    c: "De rodillas con los tobillos fijos (alguien que sujete o bajo una barra). Baja lo más lento que puedas manteniendo la cadera EXTENDIDA: si te doblas de la cadera, el isquio dejó de trabajar. Frena con las manos al final y empuja para volver. Es el ejercicio con más evidencia contra la lesión de isquios." },
  espsquat: { z: "Isquios y rodilla", n: "Sentadilla española",
    c: "Banda gruesa detrás de las rodillas, anclada baja y firme. Tronco vertical y espinillas verticales durante todo el movimiento; baja hasta unos 90° dejando que la banda aguante tu peso. Toda la carga va al tendón rotuliano sin cizallar la rodilla — el isométrico estrella para la rodilla que duele." },
  isopared: { z: "Isquios y rodilla", n: "Sentadilla isométrica en pared",
    c: "Espalda plana contra la pared, rodillas y caderas a 90°, peso repartido en todo el pie. Sostén sin apoyar las manos en los muslos. Para buscar efecto analgésico en la rodilla, 45 segundos es el mínimo útil." },
  nordicoinv: { z: "Isquios y rodilla", n: "Nórdico inverso",
    c: "De rodillas, cuerpo recto desde la rodilla hasta el hombro. Inclínate hacia atrás frenando con el cuádriceps y vuelve. Nada de arquear la lumbar ni sentarte sobre los talones: si no puedes controlarlo, reduce el rango a la mitad." },
  rdl: { z: "Isquios y rodilla", n: "Peso muerto rumano",
    c: "Es una bisagra, no una sentadilla: la cadera va atrás y la rodilla apenas se dobla. Barra o mancuernas rozando la pierna todo el recorrido, columna neutra. Baja hasta que el isquio se tense, no hasta el suelo, y aprieta el glúteo al subir." },
  hipthrust: { z: "Isquios y rodilla", n: "Hip thrust con pausa",
    c: "Escápulas apoyadas en un banco, barbilla metida mirando al frente, pies a la anchura de la cadera. Sube hasta que el tronco quede paralelo al suelo y aprieta el glúteo 2 segundos arriba. El rango lo da la cadera, no la lumbar arqueada." },
  bulgara: { z: "Isquios y rodilla", n: "Búlgara profunda",
    c: "Pie trasero sobre un banco, el delantero lo bastante adelante para bajar con el talón siempre pegado al suelo. La rodilla delantera viaja sobre el pie (sí, puede pasar la punta si el tobillo lo permite). Baja hasta donde no duela y sube en 3 segundos." },
  cuadriceps: { z: "Isquios y rodilla", n: "Cuádriceps de pie con apoyo",
    c: "De pie sujetando el tobillo, rodillas juntas y pelvis metida apretando el glúteo. Si solo jalas el pie hacia el glúteo sin meter la pelvis, estás estirando la rodilla en lugar del cuádriceps." },
  sentprofunda: { z: "Isquios y rodilla", n: "Sentadilla profunda sostenida",
    c: "Baja hasta el fondo con los talones en el suelo y los codos empujando las rodillas hacia afuera, pecho arriba. Respira ahí. Si los talones se levantan, pon un par de discos debajo y ve bajando la altura con las semanas." },

  tibial: { z: "Pie, tobillo y tibial", n: "Elevación de tibial",
    c: "Espalda contra la pared, talones a un palmo de ella. Sube las puntas de los pies lo más alto que puedas y baja en 3 segundos. Arde en la espinilla y así debe ser: el tibial anterior es el freno de la rodilla al caminar y correr." },
  gemelosentado: { z: "Pie, tobillo y tibial", n: "Elevación de gemelo sentado (sóleo)",
    c: "Sentado con la rodilla a 90° y peso sobre el muslo. Sube el talón al máximo, pausa arriba, baja lento hasta el fondo. Con la rodilla doblada trabajas el sóleo, que es el que aguanta correr y casi nadie entrena." },
  gemelo1p: { z: "Pie, tobillo y tibial", n: "Gemelo a una pierna con carga",
    c: "De pie en un escalón, una sola pierna, mancuerna en la mano del mismo lado. Baja el talón por debajo del escalón en 3 segundos, pausa abajo, sube en 2. Rango completo: la mitad del beneficio está en esa parte baja." },
  shortfoot: { z: "Pie, tobillo y tibial", n: "Arco corto del pie (short foot)",
    c: "Descalzo, sin encoger los dedos, acerca la base del dedo gordo hacia el talón levantando el arco. Los dedos se quedan largos y relajados. Cuesta al principio; hazlo frente a un espejo para no hacer trampa con los dedos." },
  dedospie: { z: "Pie, tobillo y tibial", n: "Extensión y abanico de dedos del pie",
    c: "Descalzo: levanta solo el dedo gordo dejando los otros cuatro abajo, luego al revés. Termina abriendo los cinco dedos en abanico. Es torpe las primeras semanas — ese es justo el punto, estás recuperando control que perdiste dentro del zapato." },

  deadbug: { z: "Core, cuello y escápulas", n: "Dead bug",
    c: "Boca arriba, lumbar pegada al suelo todo el tiempo. Extiende brazo y pierna opuestos exhalando y vuelve. En cuanto la espalda baja se despegue, acorta el rango: la calidad aquí es todo." },
  planchalat: { z: "Core, cuello y escápulas", n: "Plancha lateral con abducción",
    c: "De lado con el codo bajo el hombro, cadera alta y cuerpo alineado. Levanta la pierna de arriba sin dejar caer la cadera. Trabaja el glúteo medio, el estabilizador que explica buena parte de las rodillas que se van hacia adentro." },
  cuelloiso: { z: "Core, cuello y escápulas", n: "Isométrico de cuello",
    c: "Mano en la frente, en cada lado y en la nuca: empuja contra la mano sin que la cabeza se mueva, 20 segundos por dirección. Progresión suave, sin sacudidas. Fuerza de cuello sin desgaste articular." }
};

// El orden en que se agrupa la biblioteca del final.
export const ORDEN_ZONAS = [
  'Movilidad y despertar',
  'Codo y antebrazo',
  'Muñeca y mano',
  'Hombro y manguito rotador',
  'Cadera e ingle',
  'Isquios y rodilla',
  'Pie, tobillo y tibial',
  'Core, cuello y escápulas',
]

// Un ciclo completo son 4 semanas (A → D). El siguiente se repite con más
// carga, no con más ejercicios.
export const PROGRESION = [
  {
    ciclo: 'Ciclo 1',
    t: 'Aprender posiciones. Isométricos al 60-70 % y cargas que te dejen 3-4 repeticiones en reserva. Prioriza el tempo sobre el peso.',
  },
  {
    ciclo: 'Ciclo 2',
    t: 'Sube 5-10 % la carga en cada ejercicio del bloque 3 solo si completaste todas las series con técnica y la regla de 24 h se cumplió.',
  },
  {
    ciclo: 'Ciclo 3',
    t: 'Alarga el tempo (4 s / 4 s) o suma una serie al ejercicio más flojo. Progresa una variable a la vez, nunca dos.',
  },
  {
    ciclo: 'Después',
    t: 'Si un patrón ya no molesta y se siente fácil, súbelo a tu entrenamiento normal y trae aquí el siguiente eslabón débil.',
  },
]

// Los movimientos son los que popularizó Squat University y compañía; la
// dosificación viene de estos trabajos. Todos están también en datos/papers.js.
export const REFS = [
  { ref: 'Cook JL, Purdam CR. Br J Sports Med, 2009.', tema: 'Modelo del continuum: el tendón no está roto, está en una fase — y cada fase pide una carga distinta.' },
  { ref: 'Rio E, et al. Br J Sports Med, 2015.', tema: 'Isométricos de 45 s al 70 % redujeron el dolor rotuliano de inmediato. Es el bloque 2.' },
  { ref: 'Kongsgaard M, et al. Scand J Med Sci Sports, 2009.', tema: 'Carga lenta y pesada (HSR) remodela el tendón rotuliano. Es el tempo 3-1-3 del bloque 3.' },
  { ref: 'Beyer R, et al. Am J Sports Med, 2015.', tema: 'En Aquiles, HSR y excéntrico funcionan parecido: elige el que puedas sostener.' },
  { ref: 'Silbernagel KG, et al. J Orthop Sports Phys Ther, 2020.', tema: 'Rehabilitación guiada por síntomas: de aquí salen el ≤ 4/10 y la regla de las 24 horas.' },
  { ref: 'van Dyk N, et al. Br J Sports Med, 2019.', tema: 'El nórdico redujo a la mitad las lesiones de isquios en el meta-análisis. Por eso aparece dos veces al ciclo.' },
  { ref: 'Harøy J, et al. Br J Sports Med, 2019.', tema: 'El Copenhagen redujo los problemas de ingle un 41 % en futbolistas. Es la respuesta a la rigidez inguinal.' },
  { ref: 'Tyler TF, et al. J Shoulder Elbow Surg, 2010.', tema: 'Excéntrico de extensores de muñeca con barra de goma para el codo de tenista: el Tyler twist.' },
  { ref: 'Bohm S, Mersmann F, Arampatzis A. Sports Med Open, 2015.', tema: 'El tendón se adapta a carga alta sostenida en el tiempo, no a repeticiones rápidas.' },
  { ref: 'Lauersen JB, et al. Br J Sports Med, 2018.', tema: 'El entrenamiento de fuerza reduce alrededor de un tercio las lesiones deportivas; el estiramiento solo, no.' },
]
