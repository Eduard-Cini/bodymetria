// Motor de animación de los ejercicios de Blindaje Articular.
//
// Dos tipos de figura:
//  - cuerpo entero: poses = ángulos ABSOLUTOS en grados (0 = derecha, 90 = abajo,
//    -90 = arriba) sobre un esqueleto de huesos de longitud fija (RIG), así que
//    el cuerpo nunca se estira; los sufijos 2 (muslo2, brazo2…) son el lado lejano.
//  - tipo "linea": listas de puntos sueltos para primeros planos de mano, pie o
//    cuello, donde el esqueleto completo no aporta nada.
//
// Con 2 poses el movimiento va y viene; con 3 o más recorre el ciclo completo.
// CUIDADO al tocar mezclar(): interpola arreglos de CUALQUIER longitud, no solo
// pares [x,y] — los círculos son [x,y,radio] y truncarlos genera NaN.

export const RIG = { tronco: 42, cuello: 12, brazo: 20, antebrazo: 20, muslo: 26, pierna: 26, pie: 12, r: 9 };
const SUELO = { t: "suelo", y: 132 };

function dePie(extra) {
  var p = { cadera: [95, 78], tronco: -90, brazo: 76, antebrazo: 84, muslo: 90, pierna: 90, pie: 0 };
  if (extra) Object.keys(extra).forEach(function (k) { p[k] = extra[k]; });
  return p;
}

// Poses del cuerpo: ángulos ABSOLUTOS en grados (0 = derecha, 90 = abajo,
// -90 = arriba). Los huesos tienen longitud fija: el cuerpo nunca se estira.
// Con 2 poses el movimiento va y viene; con 3+ recorre el ciclo completo.
export const ANIM = {
  cars: {
    nota: "Círculo grande y lento, el resto del cuerpo quieto",
    props: [SUELO],
    poses: [
      dePie({ brazo: -88, antebrazo: -88 }),
      dePie({ brazo: -10, antebrazo: -6 }),
      dePie({ brazo: 76, antebrazo: 84 }),
      dePie({ brazo: 190, antebrazo: 186 })
    ]
  },
  bisagra: {
    nota: "El palo no pierde contacto con nuca, dorsales y sacro",
    props: [SUELO, { t: "union", de: "cabeza", a: "cadera" }],
    poses: [
      dePie({ brazo: 60, antebrazo: 95 }),
      { cadera: [86, 80], tronco: -32, brazo: 78, antebrazo: 88, muslo: 84, pierna: 66, pie: 0 }
    ]
  },
  desliz: {
    nota: "Antebrazos pegados al muro, lumbar sin despegarse",
    props: [SUELO, { t: "pared", x: 74 }],
    poses: [
      { cadera: [78, 78], tronco: -90, brazo: -30, antebrazo: -78, muslo: 84, pierna: 84, pie: 0 },
      { cadera: [78, 78], tronco: -90, brazo: -68, antebrazo: -84, muslo: 84, pierna: 84, pie: 0 }
    ]
  },
  openbook: {
    nota: "Las rodillas no se despegan: el giro sale de la espalda alta",
    props: [{ t: "suelo", y: 126 }],
    poses: [
      { cadera: [128, 116], tronco: 180, brazo: -22, antebrazo: -18, muslo: -132, pierna: -46, pie: 10,
        muslo2: -132, pierna2: -46, pie2: 10 },
      { cadera: [128, 116], tronco: 180, brazo: 196, antebrazo: 192, muslo: -132, pierna: -46, pie: 10,
        muslo2: -132, pierna2: -46, pie2: 10 }
    ]
  },
  balanceo: {
    nota: "Tronco firme, el movimiento sale de la cadera",
    props: [SUELO, { t: "pared", x: 152 }],
    poses: [
      dePie({ brazo: 4, antebrazo: 0, muslo2: 52, pierna2: 48, pie2: 0 }),
      dePie({ brazo: 4, antebrazo: 0, muslo2: 124, pierna2: 128, pie2: 0 })
    ]
  },
  rodillapared: {
    nota: "La rodilla busca el muro sin que el talón se levante",
    props: [SUELO, { t: "pared", x: 134 }],
    poses: [
      { cadera: [95, 80], tronco: -84, brazo: 40, antebrazo: 20, muslo: 88, pierna: 92, pie: 0 },
      { cadera: [88, 92], tronco: -74, brazo: 30, antebrazo: 14, muslo: 62, pierna: 116, pie: 0 }
    ]
  },

  tyler: {
    tipo: "linea",
    nota: "Giras con la mano sana y frenas con la lesionada",
    poses: [
      { pts: [[46, 62], [104, 62]], pts2: [[46, 108], [104, 108]], barra: [[104, 40], [104, 130]] },
      { pts: [[46, 62], [104, 62]], pts2: [[46, 108], [104, 108]], barra: [[128, 52], [80, 118]] }
    ]
  },
  isoext: {
    tipo: "linea",
    nota: "Palma abajo: la muñeca no cede",
    poses: [
      { pts: [[40, 84], [116, 84], [140, 68]], disco: [140, 68] },
      { pts: [[40, 84], [116, 84], [139, 72]], disco: [139, 72] }
    ]
  },
  isoflex: {
    tipo: "linea",
    nota: "Palma arriba: se siente por dentro del codo",
    poses: [
      { pts: [[40, 84], [116, 84], [140, 100]], disco: [140, 100] },
      { pts: [[40, 84], [116, 84], [139, 96]], disco: [139, 96] }
    ]
  },
  supinacion: {
    tipo: "linea",
    nota: "Solo gira el antebrazo, el codo pegado al costado",
    poses: [
      { pts: [[54, 116], [54, 66], [112, 66]], barra: [[112, 24], [112, 104]], disco: [112, 24] },
      { pts: [[54, 116], [54, 66], [112, 66]], barra: [[112, 108], [112, 28]], disco: [112, 108] }
    ]
  },
  flexoext: {
    tipo: "linea",
    nota: "3 segundos por fase, rango completo",
    poses: [
      { pts: [[40, 84], [116, 84], [138, 62]], disco: [138, 62] },
      { pts: [[40, 84], [116, 84], [138, 108]], disco: [138, 108] }
    ]
  },

  mecidas: {
    nota: "La palma no se despega mientras meces adelante y atrás",
    props: [SUELO],
    poses: [
      { cadera: [78, 88], tronco: -8, brazo: 84, antebrazo: 92, muslo: 92, pierna: 30, pie: 0 },
      { cadera: [70, 88], tronco: -14, brazo: 62, antebrazo: 100, muslo: 92, pierna: 30, pie: 0 }
    ]
  },
  dedosatras: {
    nota: "Dedos hacia las rodillas: te sientas atrás muy lento",
    props: [SUELO],
    poses: [
      { cadera: [76, 88], tronco: -10, brazo: 88, antebrazo: 92, muslo: 94, pierna: 26, pie: 0 },
      { cadera: [62, 96], tronco: -4, brazo: 62, antebrazo: 68, muslo: 100, pierna: 20, pie: 0 }
    ]
  },
  pinza: {
    nota: "Solo con las yemas, hombro relajado",
    props: [SUELO, { t: "discoEn", de: "muneca" }],
    poses: [
      dePie({ brazo: 86, antebrazo: 90 }),
      dePie({ brazo: 90, antebrazo: 92 })
    ]
  },
  extdedos: {
    tipo: "linea",
    nota: "Abre lento y cierra aún más lento",
    poses: [
      { pts: [[40, 84], [96, 84]], dedos: { o: [96, 84], ang: [-16, -6, 4, 14], largo: 26 }, aro: [116, 84, 22] },
      { pts: [[40, 84], [96, 84]], dedos: { o: [96, 84], ang: [-46, -18, 8, 34], largo: 26 }, aro: [116, 84, 34] }
    ]
  },
  colgarse: {
    nota: "Hombros guardados: escápulas abajo, no orejas arriba",
    props: [{ t: "barra", y: 22 }],
    poses: [
      { cadera: [95, 82], tronco: -90, brazo: -86, antebrazo: -88, muslo: 90, pierna: 90, pie: -10 },
      { cadera: [95, 74], tronco: -90, brazo: -86, antebrazo: -88, muslo: 90, pierna: 90, pie: -10 }
    ]
  },

  rotext: {
    tipo: "linea",
    nota: "El codo no se separa del costado",
    poses: [
      { pts: [[62, 40], [62, 96], [110, 112]], banda: [[110, 112], [152, 130]] },
      { pts: [[62, 40], [62, 96], [116, 74]], banda: [[116, 74], [152, 130]] }
    ]
  },
  isorotext: {
    tipo: "linea",
    nota: "Sostienes a media apertura, sin moverte",
    poses: [
      { pts: [[62, 40], [62, 96], [114, 92]], banda: [[114, 92], [152, 130]] },
      { pts: [[62, 40], [62, 96], [115, 89]], banda: [[115, 89], [152, 130]] }
    ]
  },
  ytw: {
    nota: "Pulgares al techo, escápulas juntas, nuca larga",
    props: [{ t: "suelo", y: 126 }],
    poses: [
      { cadera: [130, 116], tronco: 180, brazo: 214, antebrazo: 214, muslo: 4, pierna: 2, pie: -14,
        brazo2: 214, antebrazo2: 214, muslo2: 4, pierna2: 2, pie2: -14 },
      { cadera: [130, 116], tronco: 180, brazo: 180, antebrazo: 180, muslo: 4, pierna: 2, pie: -14,
        brazo2: 180, antebrazo2: 180, muslo2: 4, pierna2: 2, pie2: -14 },
      { cadera: [130, 116], tronco: 180, brazo: 152, antebrazo: 224, muslo: 4, pierna: 2, pie: -14,
        brazo2: 152, antebrazo2: 224, muslo2: 4, pierna2: 2, pie2: -14 }
    ]
  },
  cubano: {
    nota: "Remo alto, giras, y hasta entonces presionas",
    props: [SUELO],
    poses: [
      dePie({ brazo: 74, antebrazo: 86, brazo2: 106, antebrazo2: 94 }),
      dePie({ brazo: 10, antebrazo: 96, brazo2: 170, antebrazo2: 84 }),
      dePie({ brazo: 6, antebrazo: -70, brazo2: 174, antebrazo2: -110 }),
      dePie({ brazo: -70, antebrazo: -84, brazo2: -110, antebrazo2: -96 })
    ]
  },
  facepull: {
    nota: "Codos altos, manos separándose a la altura de la cara",
    props: [SUELO, { t: "banda", desde: "muneca", a: [186, 44] }],
    poses: [
      dePie({ brazo: -14, antebrazo: -12 }),
      dePie({ brazo: -46, antebrazo: 174 })
    ]
  },

  copenhagen: {
    nota: "La cadera sube hasta la línea recta hombro-tobillo",
    props: [SUELO, { t: "caja", x: 158, y: 104, w: 46, h: 28 }],
    poses: [
      { cadera: [110, 108], tronco: 196, brazo: 112, antebrazo: 4, muslo: 6, pierna: 4, pie: 0,
        muslo2: 44, pierna2: 40, pie2: 0 },
      { cadera: [110, 92], tronco: 186, brazo: 96, antebrazo: 6, muslo: -4, pierna: -2, pie: 0,
        muslo2: 40, pierna2: 44, pie2: 0 }
    ]
  },
  copeniso: {
    nota: "Rodilla apoyada y te quedas arriba, en línea",
    props: [SUELO, { t: "caja", x: 140, y: 104, w: 50, h: 28 }],
    poses: [
      { cadera: [104, 94], tronco: 186, brazo: 96, antebrazo: 6, muslo: 0, pierna: 42, pie: 0,
        muslo2: 42, pierna2: 46, pie2: 0 },
      { cadera: [104, 90], tronco: 185, brazo: 95, antebrazo: 6, muslo: -3, pierna: 42, pie: 0,
        muslo2: 42, pierna2: 46, pie2: 0 }
    ]
  },
  squeeze: {
    nota: "Aprietas al 70 % y respiras normal",
    props: [{ t: "suelo", y: 126 }, { t: "discoEn", de: "rodilla" }],
    poses: [
      { cadera: [128, 116], tronco: 180, brazo: 150, antebrazo: 160, muslo: -54, pierna: 28, pie: 0,
        muslo2: -54, pierna2: 28, pie2: 0 },
      { cadera: [128, 116], tronco: 180, brazo: 150, antebrazo: 160, muslo: -50, pierna: 24, pie: 0,
        muslo2: -58, pierna2: 32, pie2: 0 }
    ]
  },
  airplane: {
    nota: "Giras desde la cadera de apoyo, no desde la lumbar",
    props: [SUELO, { t: "pared", x: 156 }],
    poses: [
      { cadera: [92, 86], tronco: -26, brazo: 24, antebrazo: 16, muslo: 90, pierna: 90, pie: 0,
        muslo2: 168, pierna2: 172, pie2: 150 },
      { cadera: [92, 86], tronco: -26, brazo: 24, antebrazo: 16, muslo: 90, pierna: 90, pie: 0,
        muslo2: 192, pierna2: 196, pie2: 174 }
    ]
  },
  cosaco: {
    nota: "Talón del lado que carga siempre en el suelo",
    props: [SUELO],
    poses: [
      { cadera: [95, 78], tronco: -90, brazo: 0, antebrazo: 0, muslo: 104, pierna: 76, pie: 0,
        muslo2: 76, pierna2: 104, pie2: 0 },
      { cadera: [74, 108], tronco: -78, brazo: 0, antebrazo: 0, muslo: -6, pierna: 118, pie: 0,
        muslo2: 12, pierna2: 10, pie2: -40 }
    ]
  },
  noventa: {
    nota: "Cambias de lado sin usar las manos",
    props: [{ t: "suelo", y: 130 }],
    poses: [
      { cadera: [104, 106], tronco: -86, brazo: 30, antebrazo: 20, muslo: 6, pierna: 74, pie: 0,
        muslo2: 168, pierna2: 106, pie2: 0 },
      { cadera: [104, 106], tronco: -86, brazo: 30, antebrazo: 20, muslo: 172, pierna: 106, pie: 0,
        muslo2: 10, pierna2: 74, pie2: 0 }
    ]
  },
  rana: {
    nota: "Meces atrás con la espalda larga, sin rebotar",
    props: [SUELO],
    poses: [
      { cadera: [92, 92], tronco: -14, brazo: 82, antebrazo: 94, muslo: 26, pierna: 96, pie: 0,
        muslo2: 26, pierna2: 96, pie2: 0 },
      { cadera: [76, 98], tronco: -8, brazo: 60, antebrazo: 78, muslo: 20, pierna: 100, pie: 0,
        muslo2: 20, pierna2: 100, pie2: 0 }
    ]
  },
  sofa: {
    nota: "Mete la pelvis apretando el glúteo, tronco vertical",
    props: [SUELO, { t: "pared", x: 62 }],
    poses: [
      { cadera: [96, 96], tronco: -66, brazo: 40, antebrazo: 60, muslo: 156, pierna: 196, pie: 210,
        muslo2: 44, pierna2: 108, pie2: 0 },
      { cadera: [96, 92], tronco: -84, brazo: 46, antebrazo: 66, muslo: 152, pierna: 196, pie: 210,
        muslo2: 44, pierna2: 108, pie2: 0 }
    ]
  },

  nordico: {
    nota: "Rodilla, cadera y hombro en línea recta",
    props: [SUELO],
    poses: [
      { cadera: [110, 104], tronco: -90, brazo: 74, antebrazo: 84, muslo: 90, pierna: 180, pie: 180 },
      { cadera: [125, 109], tronco: -55, brazo: 45, antebrazo: 80, muslo: 125, pierna: 180, pie: 180 }
    ]
  },
  espsquat: {
    nota: "Tronco vertical, espinillas verticales",
    props: [SUELO, { t: "banda", desde: "rodilla", a: [206, 122] }],
    poses: [
      { cadera: [95, 78], tronco: -90, brazo: 0, antebrazo: 0, muslo: 90, pierna: 90, pie: 0 },
      { cadera: [69, 104], tronco: -90, brazo: 0, antebrazo: 0, muslo: 0, pierna: 90, pie: 0 }
    ]
  },
  isopared: {
    nota: "Rodillas y cadera a 90°, espalda plana en la pared",
    props: [SUELO, { t: "pared", x: 74 }],
    poses: [
      { cadera: [78, 104], tronco: -90, brazo: 72, antebrazo: 2, muslo: 0, pierna: 90, pie: 0 }
    ]
  },
  nordicoinv: {
    nota: "Te inclinas atrás sin arquear la lumbar",
    props: [SUELO],
    poses: [
      { cadera: [110, 104], tronco: -90, brazo: 0, antebrazo: 0, muslo: 90, pierna: 180, pie: 180 },
      { cadera: [97, 108], tronco: -120, brazo: 0, antebrazo: 0, muslo: 60, pierna: 180, pie: 180 }
    ]
  },
  rdl: {
    nota: "La cadera va atrás, la espalda no se redondea",
    props: [SUELO],
    poses: [
      { cadera: [110, 78], tronco: -90, brazo: 78, antebrazo: 84, muslo: 90, pierna: 90, pie: 0 },
      { cadera: [96, 80], tronco: -35, brazo: 90, antebrazo: 90, muslo: 85, pierna: 65, pie: 0 }
    ]
  },
  hipthrust: {
    nota: "Barbilla metida y 2 segundos de apretón arriba",
    props: [SUELO, { t: "caja", x: 32, y: 84, w: 44, h: 48 }],
    poses: [
      { cadera: [104, 112], tronco: 168, brazo: 118, antebrazo: 150, muslo: 22, pierna: 108, pie: 0 },
      { cadera: [104, 88], tronco: 176, brazo: 122, antebrazo: 150, muslo: 36, pierna: 112, pie: 0 }
    ]
  },
  bulgara: {
    nota: "La rodilla viaja sobre el pie, talón siempre pegado",
    props: [SUELO, { t: "caja", x: 24, y: 100, w: 44, h: 32 }],
    poses: [
      { cadera: [104, 80], tronco: -84, brazo: 66, antebrazo: 88, muslo: 92, pierna: 90, pie: 0,
        muslo2: 152, pierna2: 76, pie2: 20 },
      { cadera: [100, 100], tronco: -76, brazo: 62, antebrazo: 86, muslo: 66, pierna: 118, pie: 0,
        muslo2: 158, pierna2: 62, pie2: 20 }
    ]
  },
  cuadriceps: {
    nota: "Rodillas juntas y pelvis metida, o estiras la rodilla",
    props: [SUELO],
    poses: [
      { cadera: [95, 78], tronco: -90, brazo: 130, antebrazo: 118, muslo: 90, pierna: 90, pie: 0,
        muslo2: 106, pierna2: 200, pie2: 236 },
      { cadera: [95, 78], tronco: -94, brazo: 134, antebrazo: 122, muslo: 90, pierna: 90, pie: 0,
        muslo2: 96, pierna2: 212, pie2: 250 }
    ]
  },
  sentprofunda: {
    nota: "Talones en el suelo, codos empujando las rodillas",
    props: [SUELO],
    poses: [
      { cadera: [100, 78], tronco: -90, brazo: 76, antebrazo: 84, muslo: 90, pierna: 90, pie: 0 },
      { cadera: [88, 114], tronco: -74, brazo: 48, antebrazo: 92, muslo: -12, pierna: 120, pie: 0 }
    ]
  },
  planchalat: {
    nota: "Cadera alta y alineada mientras sube la pierna",
    props: [{ t: "suelo", y: 130 }],
    poses: [
      { cadera: [116, 96], tronco: 194, brazo: 108, antebrazo: 2, muslo: 12, pierna: 10, pie: 0,
        muslo2: 12, pierna2: 10, pie2: 0 },
      { cadera: [116, 94], tronco: 194, brazo: 106, antebrazo: 2, muslo: 12, pierna: 10, pie: 0,
        muslo2: -14, pierna2: -16, pie2: -26 }
    ]
  },

  tibial: {
    nota: "Solo se mueve el tobillo: puntas arriba",
    props: [SUELO, { t: "pared", x: 74 }],
    poses: [
      { cadera: [77, 78], tronco: -90, brazo: 76, antebrazo: 84, muslo: 72, pierna: 72, pie: 0 },
      { cadera: [77, 78], tronco: -90, brazo: 76, antebrazo: 84, muslo: 72, pierna: 72, pie: -55 }
    ]
  },
  gemelosentado: {
    nota: "Rodilla a 90°: así trabaja el sóleo",
    props: [SUELO, { t: "caja", x: 36, y: 104, w: 46, h: 28 }, { t: "discoEn", de: "rodilla" }],
    poses: [
      { cadera: [64, 104], tronco: -88, brazo: 74, antebrazo: 84, muslo: 0, pierna: 90, pie: 0 },
      { cadera: [64, 104], tronco: -88, brazo: 74, antebrazo: 84, muslo: 0, pierna: 90, pie: -46 }
    ]
  },
  gemelo1p: {
    nota: "El talón baja por debajo del escalón y sube completo",
    props: [{ t: "suelo", y: 140 }, { t: "caja", x: 40, y: 118, w: 66, h: 22 }],
    poses: [
      { cadera: [95, 72], tronco: -90, brazo: 76, antebrazo: 84, muslo: 90, pierna: 90, pie: -30,
        muslo2: 110, pierna2: 205, pie2: 250 },
      { cadera: [96, 58], tronco: -90, brazo: 76, antebrazo: 84, muslo: 90, pierna: 90, pie: 40,
        muslo2: 110, pierna2: 205, pie2: 250 }
    ]
  },
  shortfoot: {
    tipo: "linea",
    nota: "El arco sube sin que los dedos se encojan",
    poses: [
      { pts: [[44, 108], [78, 104], [116, 106], [148, 106]], suelo: 112 },
      { pts: [[44, 108], [78, 88], [116, 106], [148, 106]], suelo: 112 }
    ]
  },
  dedospie: {
    tipo: "linea",
    nota: "Primero solo el gordo, luego solo los otros cuatro",
    poses: [
      { pts: [[44, 106], [96, 102], [130, 104]], dedos: { o: [130, 104], ang: [-40, 2, 8, 14], largo: 22 }, suelo: 112 },
      { pts: [[44, 106], [96, 102], [130, 104]], dedos: { o: [130, 104], ang: [8, -34, -30, -26], largo: 22 }, suelo: 112 }
    ]
  },

  deadbug: {
    nota: "La lumbar no se despega del suelo",
    props: [{ t: "suelo", y: 126 }],
    poses: [
      { cadera: [130, 118], tronco: 180, brazo: -90, antebrazo: -90, muslo: -90, pierna: 0, pie: -60,
        brazo2: -90, antebrazo2: -90, muslo2: -90, pierna2: 0, pie2: -60 },
      { cadera: [130, 118], tronco: 180, brazo: 178, antebrazo: 178, muslo: -90, pierna: 0, pie: -60,
        brazo2: -90, antebrazo2: -90, muslo2: 2, pierna2: 2, pie2: -50 }
    ]
  },
  cuelloiso: {
    tipo: "linea",
    nota: "Empujas contra la mano y la cabeza no se mueve",
    poses: [
      { pts: [[86, 122], [86, 78]], aro: [86, 62, 15], mano: [[114, 56], [132, 62]] },
      { pts: [[86, 122], [86, 78]], aro: [86, 62, 15], mano: [[109, 56], [127, 62]] }
    ]
  }
};

function rad(d) { return d * Math.PI / 180; }
export function avanzar(p, a, l) { return [p[0] + Math.cos(rad(a)) * l, p[1] + Math.sin(rad(a)) * l]; }

export function esqueleto(p) {
  var cadera = p.cadera;
  var cuello = avanzar(cadera, p.tronco, RIG.tronco);
  var e = {
    cadera: cadera, cuello: cuello,
    cabeza: avanzar(cuello, p.tronco, RIG.cuello),
    codo: avanzar(cuello, p.brazo, RIG.brazo),
    rodilla: avanzar(cadera, p.muslo, RIG.muslo)
  };
  e.muneca = avanzar(e.codo, p.antebrazo, RIG.antebrazo);
  e.tobillo = avanzar(e.rodilla, p.pierna, RIG.pierna);
  e.punta = avanzar(e.tobillo, p.pie, RIG.pie);
  if (p.muslo2 != null) {
    e.rodilla2 = avanzar(cadera, p.muslo2, RIG.muslo);
    e.tobillo2 = avanzar(e.rodilla2, p.pierna2, RIG.pierna);
    e.punta2 = avanzar(e.tobillo2, p.pie2, RIG.pie);
  }
  if (p.brazo2 != null) {
    e.codo2 = avanzar(cuello, p.brazo2, RIG.brazo);
    e.muneca2 = avanzar(e.codo2, p.antebrazo2, RIG.antebrazo);
  }
  return e;
}

function lerp(a, b, t) { return a + (b - a) * t; }
function lerpPt(a, b, t) { return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]; }

function mezclar(a, b, t) {
  var r = {};
  Object.keys(a).forEach(function (k) {
    var va = a[k], vb = b[k];
    if (vb === undefined) { r[k] = va; return; }
    if (typeof va === "number") { r[k] = lerp(va, vb, t); return; }
    if (Array.isArray(va)) {
      // puede ser [x,y], [x,y,r] o una lista de puntos: se mezcla elemento a elemento
      r[k] = typeof va[0] === "number"
        ? va.map(function (n, i) { return lerp(n, vb[i] != null ? vb[i] : n, t); })
        : va.map(function (q, i) { return lerpPt(q, vb[i] || q, t); });
      return;
    }
    if (va && typeof va === "object") {
      var o = {};
      Object.keys(va).forEach(function (kk) {
        var x = va[kk], y = vb[kk];
        if (typeof x === "number") o[kk] = lerp(x, y, t);
        else if (Array.isArray(x) && typeof x[0] === "number") o[kk] = x.map(function (n, i) { return lerp(n, y[i], t); });
        else o[kk] = x;
      });
      r[k] = o;
      return;
    }
    r[k] = va;
  });
  return r;
}

export function poseEn(def, fase) {
  var ps = def.poses;
  function suave(t) { return t * t * (3 - 2 * t); }
  if (ps.length === 1) return ps[0];
  if (ps.length === 2) return mezclar(ps[0], ps[1], suave(fase < 1 ? fase : 2 - fase));
  var u = (fase / 2) * ps.length;
  var i = Math.floor(u) % ps.length;
  return mezclar(ps[i], ps[(i + 1) % ps.length], suave(u - Math.floor(u)));
}

export function puntosDe(def, pose) {
  if (def.tipo === "linea") {
    var xs = (pose.pts || []).slice();
    ["pts2", "barra", "banda", "mano"].forEach(function (k) { if (pose[k]) xs = xs.concat(pose[k]); });
    if (pose.disco) xs.push(pose.disco);
    if (pose.aro) xs.push([pose.aro[0] - pose.aro[2], pose.aro[1] - pose.aro[2]], [pose.aro[0] + pose.aro[2], pose.aro[1] + pose.aro[2]]);
    if (pose.dedos) {
      xs.push(pose.dedos.o);
      pose.dedos.ang.forEach(function (a) { xs.push(avanzar(pose.dedos.o, a, pose.dedos.largo)); });
    }
    if (pose.suelo) xs.push([xs[0][0], pose.suelo]);
    return xs;
  }
  var e = esqueleto(pose);
  return Object.keys(e).map(function (k) { return e[k]; });
}

export function caja(def) {
  var xs = [], ys = [];
  var muestras = def.poses.length === 1 ? [0] : [0, 0.5, 1, 1.5];
  muestras.forEach(function (f) {
    puntosDe(def, poseEn(def, f)).forEach(function (p) { xs.push(p[0]); ys.push(p[1]); });
  });
  (def.props || []).forEach(function (pr) {
    if (pr.t === "caja") { xs.push(pr.x, pr.x + pr.w); ys.push(pr.y, pr.y + pr.h); }
    if (pr.t === "banda") { xs.push(pr.a[0]); ys.push(pr.a[1]); }
    if (pr.t === "suelo" || pr.t === "barra") ys.push(pr.y);
    if (pr.t === "pared") xs.push(pr.x);
  });
  var m = 12 + RIG.r;
  var x0 = Math.min.apply(null, xs) - m, x1 = Math.max.apply(null, xs) + m;
  var y0 = Math.min.apply(null, ys) - m, y1 = Math.max.apply(null, ys) + m;
  var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  var w = Math.max(200, x1 - x0), h = Math.max(140, y1 - y0), ar = 200 / 140;
  if (w / h < ar) w = h * ar; else h = w / ar;
  return [cx - w / 2, cy - h / 2, w, h].map(function (v) { return v.toFixed(1); }).join(" ");
}
