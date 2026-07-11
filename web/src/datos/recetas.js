// Recetario del generador semanal. Los ingredientes REFERENCIAN la base de
// alimentos (id + raciones IMSS): kcal, macros y micronutrientes de cada
// receta se CALCULAN, no se inventan. `extras` son condimentos sin aporte.
import { ALIMENTOS, NUTRIENTES } from './alimentos.js'

const POR_ID = Object.fromEntries(ALIMENTOS.map((a) => [a.id, a]))

export const RECETAS = [
  // ── Desayunos ──
  {
    id: 'avena-fruta', nombre: 'Avena con plátano, chía y nuez', tiempo: 'desayuno',
    objetivos: ['longevidad', 'general'],
    ingredientes: [['avena', 2], ['platano', 1], ['chia', 1], ['nuez', 1], ['lechedesc', 1]],
    extras: ['canela'],
  },
  {
    id: 'huevos-nopal', nombre: 'Huevo con nopales y tortilla', tiempo: 'desayuno',
    objetivos: ['perdida', 'general'],
    ingredientes: [['huevo', 2], ['nopal', 1], ['tortilla', 1], ['salsa', 0.5]],
  },
  {
    id: 'claras-verdura', nombre: 'Claras revueltas con espinaca y champiñón', tiempo: 'desayuno',
    objetivos: ['perdida', 'ganancia'],
    ingredientes: [['clara', 2], ['huevo', 1], ['espinaca', 1], ['champinon', 0.5], ['tortilla', 1]],
  },
  {
    id: 'yogurt-granola', nombre: 'Yogurt con fresa, amaranto y almendras', tiempo: 'desayuno',
    objetivos: ['longevidad', 'general'],
    ingredientes: [['yogurt', 1], ['fresa', 1], ['amaranto', 1], ['almendra', 1]],
  },
  {
    id: 'molletes', nombre: 'Molletes de frijol con pico de gallo', tiempo: 'desayuno',
    objetivos: ['longevidad', 'general'],
    ingredientes: [['bolillo', 2], ['frijol', 1], ['panela', 1], ['salsa', 0.5]],
  },
  {
    id: 'licuado-prote', nombre: 'Licuado de plátano, avena y cacahuate', tiempo: 'desayuno',
    objetivos: ['ganancia'],
    ingredientes: [['lecheentera', 1], ['platano', 2], ['avena', 1.5], ['cremacacahuate', 1]],
    extras: ['canela'],
  },
  // ── Comidas ──
  {
    id: 'pollo-arroz', nombre: 'Pechuga a la plancha con arroz y ensalada', tiempo: 'comida',
    objetivos: ['ganancia', 'general', 'perdida'],
    ingredientes: [['pollo', 4], ['arroz', 2], ['jitomate', 0.5], ['pepino', 0.5], ['aceiteoliva', 1]],
  },
  {
    id: 'lentejas-guisadas', nombre: 'Lentejas guisadas con verdura y tortillas', tiempo: 'comida',
    objetivos: ['longevidad', 'general'],
    ingredientes: [['lenteja', 2], ['zanahoria', 0.5], ['jitomate', 0.5], ['cebolla', 0.5], ['tortilla', 2], ['aguacate', 1]],
  },
  {
    id: 'pescado-verduras', nombre: 'Pescado al horno con camote y brócoli', tiempo: 'comida',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['pescado', 4], ['camote', 2], ['brocoli', 2], ['aceiteoliva', 1]],
  },
  {
    id: 'tacos-frijol', nombre: 'Tacos de frijol con nopales y aguacate', tiempo: 'comida',
    objetivos: ['longevidad'],
    ingredientes: [['tortilla', 3], ['frijol', 2], ['nopal', 1], ['aguacate', 1], ['salsa', 1]],
  },
  {
    id: 'res-papas', nombre: 'Bistec de res con papas y calabacitas', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['bistec', 4], ['papa', 2], ['calabacita', 2], ['aceiteoliva', 1]],
  },
  {
    id: 'garbanzo-ensalada', nombre: 'Ensalada grande de garbanzo', tiempo: 'comida',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['garbanzo', 2], ['jitomate', 1], ['pepino', 1], ['cebolla', 0.5], ['aceiteoliva', 1]],
    extras: ['limón', 'orégano'],
  },
  // ── Cenas ──
  {
    id: 'tostadas-atun', nombre: 'Tostadas de atún con aguacate', tiempo: 'cena',
    objetivos: ['perdida', 'ganancia', 'general'],
    ingredientes: [['tostada', 2], ['atun', 3], ['jitomate', 1], ['aguacate', 1]],
    extras: ['limón'],
  },
  {
    id: 'sopa-verdura', nombre: 'Sopa de verduras con panela y elote', tiempo: 'cena',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['zanahoria', 1], ['calabacita', 1], ['elote', 1], ['panela', 1.5], ['tortilla', 1]],
  },
  {
    id: 'quesadillas-nopal', nombre: 'Quesadillas con champiñón y nopal', tiempo: 'cena',
    objetivos: ['general', 'longevidad'],
    ingredientes: [['tortilla', 2], ['oaxaca', 1.5], ['champinon', 0.5], ['nopal', 0.5], ['salsa', 0.5]],
  },
  {
    id: 'sincronizadas', nombre: 'Sincronizadas de pavo', tiempo: 'cena',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['tortillaharina', 2], ['jamonpavo', 2], ['panela', 1], ['salsa', 0.5]],
  },
  {
    id: 'omelette-cena', nombre: 'Omelette de espinaca con avena', tiempo: 'cena',
    objetivos: ['perdida', 'ganancia'],
    ingredientes: [['huevo', 2], ['clara', 1], ['espinaca', 1], ['avena', 1], ['salsa', 0.5]],
  },
  {
    id: 'yogurt-cena', nombre: 'Yogurt light con guayaba y pepitas', tiempo: 'cena',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['yogurtlight', 1], ['guayaba', 1], ['pepitas', 1]],
  },
]

// Ensalada cruda DIARIA: acompaña todos los planes, para cualquier objetivo.
// Es la garantía de micronutrientes (potasio, vitamina C, fibra, hierro).
export const ENSALADA = {
  id: 'ensalada-diaria', nombre: 'Ensalada cruda del día (fija)',
  ingredientes: [['espinaca', 1], ['jitomate', 1], ['zanahoria', 1], ['pepino', 1], ['aguacate', 1]],
  extras: ['limón', 'sal mínima'],
}

/** Suma kcal, macros y micros de una receta a partir de sus raciones. */
export function calcularReceta(receta, factor = 1) {
  const total = {}
  for (const n of NUTRIENTES) total[n.clave] = 0
  for (const [id, raciones] of receta.ingredientes) {
    const a = POR_ID[id]
    if (!a) continue
    for (const n of NUTRIENTES) total[n.clave] += (a[n.clave] || 0) * raciones * factor
  }
  return total
}

/** Lista legible de ingredientes ("Lentejas cocidas: 2 raciones (1/2 taza c/u)"). */
export function ingredientesLegibles(receta, factor = 1) {
  const lineas = receta.ingredientes.map(([id, raciones]) => {
    const a = POR_ID[id]
    if (!a) return id
    const r = raciones * factor
    const cant = Number(r.toFixed(1)).toLocaleString('es-MX')
    return `${a.nombre}: ${cant} ración${r !== 1 ? 'es' : ''} (${a.porcion} c/u)`
  })
  return [...lineas, ...(receta.extras ?? []).map((e) => `${e} (al gusto)`)]
}
