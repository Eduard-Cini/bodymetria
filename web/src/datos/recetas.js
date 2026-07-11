// Recetario para el generador semanal. kcal aproximadas por porción,
// compuestas con raciones de la guía IMSS. Objetivos: longevidad (énfasis
// vegetal), perdida (déficit), ganancia (proteína alta), general.
export const RECETAS = [
  // Desayunos
  { id: 'avena-fruta', nombre: 'Avena con plátano, chía y nuez', tiempo: 'desayuno', objetivos: ['longevidad', 'general'], kcal: 380, ingredientes: ['2/3 taza de avena', '1/2 plátano', '1 cda de chía', '3 nueces', '1 taza de leche descremada'] },
  { id: 'huevos-nopal', nombre: 'Huevo con nopales y tortilla', tiempo: 'desayuno', objetivos: ['perdida', 'general'], kcal: 330, ingredientes: ['2 huevos', '1 taza de nopal cocido', '1 tortilla de maíz', 'salsa mexicana'] },
  { id: 'claras-verdura', nombre: 'Claras revueltas con espinaca y champiñón', tiempo: 'desayuno', objetivos: ['perdida', 'ganancia'], kcal: 280, ingredientes: ['4 claras + 1 huevo', '2 tazas de espinaca', '1/2 taza de champiñón', '1 tortilla de maíz'] },
  { id: 'yogurt-granola', nombre: 'Yogurt con fruta, amaranto y almendras', tiempo: 'desayuno', objetivos: ['longevidad', 'general'], kcal: 350, ingredientes: ['1 taza de yogurt natural', '1 taza de fresa', '1/4 taza de amaranto', '10 almendras'] },
  { id: 'molletes', nombre: 'Molletes de frijol con pico de gallo', tiempo: 'desayuno', objetivos: ['longevidad', 'general'], kcal: 420, ingredientes: ['1 bolillo sin migajón', '1/2 taza de frijoles', '40 g de queso panela', 'pico de gallo'] },
  { id: 'licuado-prote', nombre: 'Licuado de plátano, avena y cacahuate', tiempo: 'desayuno', objetivos: ['ganancia'], kcal: 520, ingredientes: ['1 taza de leche entera', '1 plátano', '1/3 taza de avena', '2 cditas de mantequilla de cacahuate', 'canela'] },
  // Comidas
  { id: 'pollo-arroz', nombre: 'Pechuga asada con arroz y ensalada', tiempo: 'comida', objetivos: ['ganancia', 'general'], kcal: 520, ingredientes: ['120 g de pechuga', '1 taza de arroz cocido', 'lechuga, jitomate y pepino', '1 cdita de aceite de oliva'] },
  { id: 'lentejas-guisadas', nombre: 'Lentejas guisadas con verdura y tortilla', tiempo: 'comida', objetivos: ['longevidad', 'perdida'], kcal: 430, ingredientes: ['1 taza de lentejas cocidas', 'zanahoria, jitomate y cebolla', '2 tortillas de maíz', '1/3 de aguacate'] },
  { id: 'pescado-verduras', nombre: 'Pescado al horno con camote y brócoli', tiempo: 'comida', objetivos: ['longevidad', 'perdida'], kcal: 450, ingredientes: ['160 g de filete de pescado', '1/2 camote', '1 taza de brócoli', '1 cdita de aceite de oliva'] },
  { id: 'tacos-frijol', nombre: 'Tacos de frijol con nopal y aguacate', tiempo: 'comida', objetivos: ['longevidad'], kcal: 460, ingredientes: ['3 tortillas de maíz', '1 taza de frijoles', '1 taza de nopal', '1/3 de aguacate', 'salsa'] },
  { id: 'res-papas', nombre: 'Bistec con papa y calabacitas', tiempo: 'comida', objetivos: ['ganancia', 'general'], kcal: 540, ingredientes: ['120 g de bistec de res', '1 papa hervida', '1 taza de calabacita', '1 cdita de aceite'] },
  { id: 'tostadas-atun', nombre: 'Tostadas de atún con verdura', tiempo: 'comida', objetivos: ['perdida', 'general'], kcal: 380, ingredientes: ['2 tostadas horneadas', '120 g de atún en agua', 'lechuga, jitomate y cebolla', 'limón'] },
  // Cenas
  { id: 'sopa-verdura-panela', nombre: 'Sopa de verduras con queso panela', tiempo: 'cena', objetivos: ['perdida', 'longevidad'], kcal: 300, ingredientes: ['2 tazas de verduras en caldo', '60 g de queso panela', '1 tortilla de maíz'] },
  { id: 'quesadillas-nopal', nombre: 'Quesadillas de champiñón y nopal', tiempo: 'cena', objetivos: ['longevidad', 'general'], kcal: 360, ingredientes: ['2 tortillas de maíz', '40 g de queso Oaxaca', 'champiñón y nopal guisados', 'salsa'] },
  { id: 'ensalada-garbanzo', nombre: 'Ensalada de garbanzo con jitomate', tiempo: 'cena', objetivos: ['longevidad', 'perdida'], kcal: 340, ingredientes: ['1 taza de garbanzos', 'jitomate, pepino y cebolla', '1 cdita de aceite de oliva', 'limón y orégano'] },
  { id: 'sincronizadas-pavo', nombre: 'Sincronizadas de pavo', tiempo: 'cena', objetivos: ['ganancia', 'general'], kcal: 420, ingredientes: ['2 tortillas de harina', '4 rebanadas de jamón de pavo', '40 g de queso panela', 'salsa'] },
  { id: 'omelette-cena', nombre: 'Omelette de espinaca con avena', tiempo: 'cena', objetivos: ['ganancia'], kcal: 430, ingredientes: ['2 huevos + 2 claras', '2 tazas de espinaca', '1/3 taza de avena en el batido', 'salsa'] },
  { id: 'yogurt-cena', nombre: 'Yogurt con guayaba y semillas', tiempo: 'cena', objetivos: ['perdida', 'longevidad'], kcal: 280, ingredientes: ['3/4 taza de yogurt light', '3 guayabas', '1 cda de pepitas'] },
]
