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

  // ── Platillos mexicanos (mapeados a equivalentes IMSS; se omiten
  // aromáticos como limón, cebolla, ajo y cilantro, que van en "extras"). ──
  // Desayunos
  {
    id: 'chilaquiles', nombre: 'Chilaquiles verdes con huevo', tiempo: 'desayuno',
    objetivos: ['general', 'ganancia'],
    ingredientes: [['tortilla', 3], ['huevo', 2], ['salsa', 1], ['oaxaca', 1], ['frijol', 1]],
    extras: ['cebolla', 'crema'],
  },
  {
    id: 'huevos-mexicana', nombre: 'Huevos a la mexicana con frijoles', tiempo: 'desayuno',
    objetivos: ['perdida', 'general'],
    ingredientes: [['huevo', 2], ['jitomate', 1], ['tortilla', 2], ['frijol', 1]],
    extras: ['cebolla', 'chile'],
  },
  {
    id: 'toast-aguacate', nombre: 'Pan integral con aguacate y huevo', tiempo: 'desayuno',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['panbimboint', 2], ['huevo', 2], ['aguacate', 1]],
    extras: ['limón', 'chile'],
  },
  {
    id: 'enfrijoladas', nombre: 'Enfrijoladas con panela', tiempo: 'desayuno',
    objetivos: ['longevidad', 'general'],
    ingredientes: [['tortilla', 3], ['frijol', 2], ['panela', 1]],
    extras: ['cebolla', 'crema'],
  },
  {
    id: 'machaca', nombre: 'Machaca con huevo y tortillas de harina', tiempo: 'desayuno',
    objetivos: ['ganancia'],
    ingredientes: [['bistec', 2], ['huevo', 2], ['jitomate', 1], ['tortillaharina', 2]],
    extras: ['cebolla'],
  },
  // Comidas
  {
    id: 'tinga', nombre: 'Tinga de pollo con arroz', tiempo: 'comida',
    objetivos: ['ganancia', 'general', 'perdida'],
    ingredientes: [['pollo', 4], ['jitomate', 1], ['chilepoblano', 0.5], ['arroz', 2], ['tortilla', 1]],
    extras: ['cebolla'],
  },
  {
    id: 'enchiladas', nombre: 'Enchiladas verdes de pollo', tiempo: 'comida',
    objetivos: ['general', 'ganancia'],
    ingredientes: [['tortilla', 3], ['pollo', 3], ['salsa', 1], ['panela', 1]],
    extras: ['cebolla', 'crema'],
  },
  {
    id: 'fajitas', nombre: 'Fajitas de res con tortillas', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['bistec', 4], ['chilepoblano', 0.5], ['cebolla', 0.5], ['tortilla', 2], ['aguacate', 1]],
  },
  {
    id: 'ceviche', nombre: 'Ceviche de pescado con tostadas', tiempo: 'comida',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['pescado', 4], ['jitomate', 1], ['pepino', 1], ['aguacate', 1], ['tostada', 2]],
    extras: ['limón', 'cebolla', 'cilantro'],
  },
  {
    id: 'caldo-pollo', nombre: 'Caldo de pollo con verduras y arroz', tiempo: 'comida',
    objetivos: ['perdida', 'general', 'longevidad'],
    ingredientes: [['pollo', 3], ['zanahoria', 1], ['calabacita', 1], ['chayote', 1], ['arroz', 1]],
  },
  {
    id: 'tacos-pescado', nombre: 'Tacos de pescado con col', tiempo: 'comida',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['tortilla', 3], ['pescado', 3], ['lechuga', 1], ['jitomate', 1], ['aguacate', 1]],
    extras: ['limón'],
  },
  {
    id: 'albondigas', nombre: 'Albóndigas de res en caldillo', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['molida', 3], ['arroz', 1], ['jitomate', 1], ['calabacita', 1]],
    extras: ['cebolla'],
  },
  {
    id: 'chiles-rellenos', nombre: 'Chiles rellenos de queso', tiempo: 'comida',
    objetivos: ['general'],
    ingredientes: [['chilepoblano', 2], ['oaxaca', 1.5], ['huevo', 1], ['jitomate', 1], ['arroz', 1]],
  },
  {
    id: 'salmon-verduras', nombre: 'Salmón con arroz y brócoli', tiempo: 'comida',
    objetivos: ['longevidad', 'ganancia'],
    ingredientes: [['salmon', 4], ['arroz', 2], ['brocoli', 2], ['aceiteoliva', 1]],
  },
  {
    id: 'milanesa', nombre: 'Milanesa de pollo con ensalada', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['pollo', 4], ['pan', 1], ['papa', 1], ['lechuga', 1], ['jitomate', 1]],
  },
  // Cenas
  {
    id: 'huevos-rancheros', nombre: 'Huevos rancheros con frijoles', tiempo: 'cena',
    objetivos: ['general', 'perdida'],
    ingredientes: [['tortilla', 2], ['huevo', 2], ['salsa', 1], ['frijol', 1]],
  },
  {
    id: 'sopa-lentejas', nombre: 'Sopa de lentejas', tiempo: 'cena',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['lenteja', 2], ['zanahoria', 0.5], ['jitomate', 0.5], ['tortilla', 1]],
    extras: ['cebolla'],
  },
  {
    id: 'ensalada-pollo', nombre: 'Ensalada de pollo', tiempo: 'cena',
    objetivos: ['perdida', 'ganancia'],
    ingredientes: [['pollo', 3], ['lechuga', 1], ['jitomate', 1], ['pepino', 1], ['aguacate', 1]],
    extras: ['limón'],
  },
  {
    id: 'tacos-papa', nombre: 'Tacos dorados de papa', tiempo: 'cena',
    objetivos: ['general', 'longevidad'],
    ingredientes: [['tortilla', 3], ['papa', 2], ['lechuga', 1], ['salsa', 0.5]],
    extras: ['crema'],
  },
  {
    id: 'tostadas-tinga', nombre: 'Tostadas de tinga de pollo', tiempo: 'cena',
    objetivos: ['perdida', 'general'],
    ingredientes: [['tostada', 2], ['pollo', 3], ['jitomate', 1], ['lechuga', 1], ['aguacate', 1]],
  },
  {
    id: 'esquites', nombre: 'Esquites con panela', tiempo: 'cena',
    objetivos: ['general', 'longevidad'],
    ingredientes: [['elote', 2], ['panela', 1]],
    extras: ['limón', 'chile', 'mayonesa'],
  },

  // ── Cocina internacional adaptada con ingredientes sustituibles.
  // Lo especial (nori, salsa de soya, azafrán, albahaca, curry) va en "extras". ──
  // Desayunos
  {
    id: 'sando-fruta', nombre: 'Sándwich de fruta (estilo japonés)', tiempo: 'desayuno',
    objetivos: ['general'],
    ingredientes: [['panbimbo', 2], ['fresa', 1], ['platano', 0.5], ['yogurt', 1]],
  },
  {
    id: 'shakshuka', nombre: 'Shakshuka (huevos en salsa de jitomate)', tiempo: 'desayuno',
    objetivos: ['perdida', 'general'],
    ingredientes: [['huevo', 2], ['jitomate', 1], ['chilepoblano', 0.5], ['pan', 1], ['garbanzo', 0.5]],
    extras: ['cebolla', 'comino'],
  },
  // Comidas
  {
    id: 'pasta-pollo', nombre: 'Pasta al pomodoro con pollo (italiana)', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['pasta', 3], ['jitomate', 1.5], ['pollo', 3], ['aceiteoliva', 1], ['manchego', 0.5]],
    extras: ['albahaca', 'ajo'],
  },
  {
    id: 'pizza', nombre: 'Pizza casera de verduras y jamón (italiana)', tiempo: 'comida',
    objetivos: ['general'],
    ingredientes: [['tortillaharina', 3], ['jitomate', 1], ['mozzarella', 1.5], ['champinon', 0.5], ['jamonpavo', 1]],
    extras: ['orégano'],
  },
  {
    id: 'ramen', nombre: 'Ramen saludable de pollo (japonesa)', tiempo: 'comida',
    objetivos: ['general', 'perdida'],
    ingredientes: [['pasta', 2], ['pollo', 3], ['huevo', 1], ['espinaca', 1], ['champinon', 0.5], ['elote', 0.5]],
    extras: ['salsa de soya', 'jengibre'],
  },
  {
    id: 'teriyaki', nombre: 'Pollo teriyaki con arroz (japonesa)', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['pollo', 4], ['arroz', 2], ['brocoli', 1], ['ajonjoli', 1]],
    extras: ['salsa de soya', 'miel'],
  },
  {
    id: 'poke-atun', nombre: 'Tazón de atún y arroz (poke)', tiempo: 'comida',
    objetivos: ['perdida', 'ganancia'],
    ingredientes: [['arroz', 2], ['atun', 4], ['aguacate', 1], ['pepino', 1], ['soya', 0.5]],
    extras: ['salsa de soya', 'ajonjolí'],
  },
  {
    id: 'california', nombre: 'Rollitos California (japonesa)', tiempo: 'comida',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['arroz', 2], ['camaron', 2], ['aguacate', 1], ['pepino', 1]],
    extras: ['alga nori', 'salsa de soya'],
  },
  {
    id: 'arroz-persa', nombre: 'Arroz persa con pollo y almendra', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['arroz', 3], ['pollo', 3], ['zanahoria', 1], ['almendra', 1]],
    extras: ['azafrán', 'pasas'],
  },
  {
    id: 'curry-garbanzo', nombre: 'Curry de garbanzo con arroz (india)', tiempo: 'comida',
    objetivos: ['longevidad'],
    ingredientes: [['garbanzo', 2], ['jitomate', 1], ['espinaca', 1], ['arroz', 2], ['aceiteoliva', 1]],
    extras: ['curry', 'ajo', 'jengibre'],
  },
  {
    id: 'hamburguesa', nombre: 'Hamburguesa casera con ensalada', tiempo: 'comida',
    objetivos: ['ganancia', 'general'],
    ingredientes: [['pan', 2], ['molida', 3], ['lechuga', 1], ['jitomate', 1], ['oaxaca', 1]],
    extras: ['cebolla', 'mostaza'],
  },
  {
    id: 'wrap-pollo', nombre: 'Wrap de pollo con frijol y aguacate', tiempo: 'comida',
    objetivos: ['ganancia', 'general', 'perdida'],
    ingredientes: [['tortillaharina', 2], ['pollo', 3], ['frijol', 1], ['lechuga', 1], ['aguacate', 1]],
  },
  {
    id: 'stir-fry-tofu', nombre: 'Salteado de tofu y verduras con arroz (asiática)', tiempo: 'comida',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['tofu', 3], ['brocoli', 1], ['zanahoria', 1], ['champinon', 0.5], ['arroz', 2], ['ajonjoli', 1]],
    extras: ['salsa de soya', 'ajo'],
  },
  // Cenas
  {
    id: 'caprese', nombre: 'Ensalada caprese con pan (italiana)', tiempo: 'cena',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['jitomate', 2], ['mozzarella', 1.5], ['pan', 1], ['aceiteoliva', 1]],
    extras: ['albahaca'],
  },
  {
    id: 'minestrone', nombre: 'Minestrone (sopa de verduras y pasta)', tiempo: 'cena',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['frijol', 1], ['zanahoria', 1], ['calabacita', 1], ['jitomate', 1], ['pasta', 1]],
    extras: ['ajo', 'albahaca'],
  },
  {
    id: 'griega', nombre: 'Ensalada griega', tiempo: 'cena',
    objetivos: ['perdida', 'longevidad'],
    ingredientes: [['lechuga', 1], ['pepino', 1], ['jitomate', 1], ['panela', 1], ['aceiteoliva', 1]],
    extras: ['aceituna', 'orégano'],
  },
  {
    id: 'hummus', nombre: 'Hummus con pan y verduras (árabe)', tiempo: 'cena',
    objetivos: ['longevidad', 'perdida'],
    ingredientes: [['garbanzo', 2], ['pan', 1], ['pepino', 1], ['zanahoria', 1], ['aceiteoliva', 1], ['ajonjoli', 1]],
    extras: ['limón', 'ajo'],
  },
]

// Ensalada cruda DIARIA: acompaña todos los planes, para cualquier objetivo.
// Es la garantía de micronutrientes vegetales (hierro, calcio, folato,
// potasio, vitamina C y A). Rota cada semana (misma semilla del menú).
export const ENSALADAS = [
  {
    id: 'ens-verde', nombre: 'Ensalada verde con amaranto y ajonjolí',
    ingredientes: [['espinaca', 1], ['lechuga', 1], ['jitomate', 1], ['zanahoria', 1], ['aguacate', 1], ['amaranto', 1], ['ajonjoli', 1], ['aceiteoliva', 1]],
    extras: ['limón', 'sal mínima'],
  },
  {
    id: 'ens-kale', nombre: 'Ensalada de kale y garbanzo',
    ingredientes: [['kale', 1], ['jitomate', 1], ['pepino', 1], ['cebolla', 0.5], ['garbanzo', 0.5], ['ajonjoli', 1], ['aceiteoliva', 1]],
    extras: ['limón', 'orégano'],
  },
  {
    id: 'ens-berro', nombre: 'Ensalada de berro, nopal y aguacate',
    ingredientes: [['berro', 1], ['nopal', 1], ['jitomate', 1], ['aguacate', 1], ['ajonjoli', 1], ['aceiteoliva', 1]],
    extras: ['limón', 'chile'],
  },
  {
    id: 'ens-fresa', nombre: 'Ensalada de espinaca, fresa y nuez',
    ingredientes: [['espinaca', 1], ['lechuga', 1], ['fresa', 1], ['nuez', 1], ['ajonjoli', 1], ['aceiteoliva', 1]],
    extras: ['limón'],
  },
  {
    id: 'ens-mixta', nombre: 'Ensalada mixta con amaranto y pepitas',
    ingredientes: [['lechuga', 1], ['espinaca', 1], ['zanahoria', 1], ['pepino', 1], ['jitomate', 1], ['amaranto', 1], ['pepitas', 1], ['aguacate', 1], ['aceiteoliva', 1]],
    extras: ['limón', 'sal mínima'],
  },
]

/** La ensalada de la semana (rota con la semilla del menú). */
export function ensaladaSemana(semilla) {
  return ENSALADAS[Math.abs(Math.floor(semilla)) % ENSALADAS.length]
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
