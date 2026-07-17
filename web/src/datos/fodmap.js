// Protocolo de dieta baja en FODMAP (enfoque Monash, 3 etapas), adaptado a
// alimentos mexicanos. FODMAP = oligosacáridos (fructanos, GOS), disacáridos
// (lactosa), monosacáridos (fructosa en exceso) y polioles (sorbitol, manitol)
// fermentables. Los umbrales de porción vienen de las mediciones de Monash
// University (Muir JG, et al. 2007-2009); son aproximados y DEPENDEN DE LA DOSIS.

// ── Los 6 grupos FODMAP ──────────────────────────────────────────────
export const GRUPOS = [
  {
    clave: 'fructanos',
    nombre: 'Fructanos',
    fuentes: 'Trigo, centeno y cebada (pan, pasta, galletas), cebolla, ajo, inulina/achicoria en productos "con fibra"',
    nota: 'Nadie los absorbe (no tenemos la enzima); el problema en SII es la fermentación. Son el grupo que más se confunde con "intolerancia al gluten".',
  },
  {
    clave: 'gos',
    nombre: 'GOS (galacto-oligosacáridos)',
    fuentes: 'Frijol, lenteja, garbanzo, haba, soya texturizada, pistache, nuez de la India',
    nota: 'Tampoco se absorben. Las leguminosas de lata escurridas y enjuagadas pierden parte de sus GOS (son solubles en agua).',
  },
  {
    clave: 'lactosa',
    nombre: 'Lactosa',
    fuentes: 'Leche, yogur regular, helado, leche evaporada/condensada, quesos frescos en cantidad',
    nota: 'Solo es FODMAP si tienes hipolactasia (muy común en México). Los quesos madurados casi no tienen y los productos deslactosados no cuentan.',
  },
  {
    clave: 'fructosa',
    nombre: 'Fructosa en exceso',
    fuentes: 'Miel, agave, jarabe de maíz de alta fructosa (refrescos), manzana, pera, mango, sandía, espárragos',
    nota: '"En exceso" = más fructosa que glucosa. La fructosa acompañada de glucosa en partes iguales (azúcar de mesa) se absorbe bien.',
  },
  {
    clave: 'sorbitol',
    nombre: 'Sorbitol (poliol)',
    fuentes: 'Aguacate, manzana, pera, durazno, ciruela, cereza, zarzamora, chicles y dulces "sin azúcar"',
    nota: 'Los polioles se absorben lento e incompleto y arrastran agua al intestino (efecto laxante dosis-dependiente).',
  },
  {
    clave: 'manitol',
    nombre: 'Manitol (poliol)',
    fuentes: 'Champiñones y setas, coliflor, camote en porciones grandes, apio',
    nota: 'Mismo mecanismo que el sorbitol; se prueban por separado porque la tolerancia individual difiere.',
  },
]

// ── Listas de alimentos por categoría (eliminación) ──────────────────
// Porciones aproximadas por comida; en la etapa de eliminación las cantidades
// importan tanto como el alimento (los FODMAP se acumulan entre alimentos).
export const ALIMENTOS = [
  {
    categoria: 'Frutas',
    permitidos: [
      'Papaya (1 taza)', 'Fresas (5 medianas)', 'Piña (1 taza)', 'Kiwi (2 chicos)',
      'Naranja (1)', 'Mandarina (1)', 'Limón', 'Plátano poco maduro (1)',
      'Uvas (⅓ taza)', 'Melón cantaloupe (¾ taza)', 'Guayaba madura (1)',
      'Arándanos (¼ taza)', 'Maracuyá (1)',
    ],
    evitar: [
      'Manzana (fructosa + sorbitol)', 'Pera (fructosa + sorbitol)', 'Mango (fructosa)',
      'Sandía (fructosa + manitol)', 'Durazno (sorbitol)', 'Ciruela (sorbitol)',
      'Cereza (fructosa + sorbitol)', 'Zarzamora (sorbitol)', 'Higo (fructosa)',
      'Fruta seca y jugos de fruta (dosis concentrada)', 'Plátano muy maduro (fructanos)',
    ],
  },
  {
    categoria: 'Verduras',
    permitidos: [
      'Jitomate (1 chico)', 'Zanahoria (libre)', 'Calabacita (½ taza)', 'Chayote (½ taza)',
      'Espinaca (libre)', 'Lechuga (libre)', 'Pepino (libre)', 'Nopales (1 taza)',
      'Ejotes (15 piezas)', 'Papa (libre)', 'Pimiento rojo (⅓ taza)',
      'Brócoli, solo floretes (¾ taza)', 'Col (¾ taza)', 'Chile serrano/jalapeño (al gusto)',
      'Cebollín o cebolla cambray: SOLO la parte verde', 'Jengibre, cilantro, perejil (libres)',
    ],
    evitar: [
      'Cebolla, incluida morada y blanca (fructanos)', 'Ajo (fructanos)',
      'Coliflor (manitol)', 'Champiñones y setas (manitol)', 'Espárragos (fructosa)',
      'Alcachofa (fructanos)', 'Elote (GOS + sorbitol en porción normal)',
      'Betabel (GOS, más de 2 rebanadas)', 'Apio (manitol, más de ¼ tallo)',
      'Poro, parte blanca (fructanos)',
    ],
  },
  {
    categoria: 'Cereales y tubérculos',
    permitidos: [
      'Tortilla de maíz (la base ideal en México: 2-3 por comida)', 'Arroz (libre)',
      'Avena (½ taza en seco)', 'Quinoa (1 taza cocida)', 'Palomitas naturales (hasta 7 tazas)',
      'Pan 100% sin gluten', 'Pan de masa madre de espelta (2 rebanadas)',
      'Tostadas horneadas de maíz', 'Amaranto (¼ taza)', 'Papa y yuca',
    ],
    evitar: [
      'Pan de trigo, bolillo, pan dulce (fructanos)', 'Pasta de trigo (fructanos; ½ taza cocida suele tolerarse)',
      'Galletas y harinas de trigo (fructanos)', 'Cereales de caja con trigo o miel',
      'Centeno y cebada (fructanos)', 'Productos "con fibra añadida" (inulina/achicoria)',
    ],
  },
  {
    categoria: 'Lácteos',
    permitidos: [
      'Leche deslactosada', 'Yogur deslactosado o de coco', 'Quesos madurados: manchego, cheddar, gouda, parmesano (40 g)',
      'Queso panela u Oaxaca (40 g, porción moderada)', 'Mantequilla', 'Crema deslactosada',
      'Bebidas de almendra o coco (1 taza)',
    ],
    evitar: [
      'Leche entera/descremada regular (lactosa)', 'Yogur regular (lactosa)',
      'Helado y nieve de leche (lactosa)', 'Leche evaporada y condensada (lactosa)',
      'Queso fresco/ricotta en cantidad (lactosa)', 'Bebida de soya de grano entero (GOS)',
    ],
  },
  {
    categoria: 'Proteínas',
    permitidos: [
      'Res, pollo, cerdo, pescado y mariscos (sin FODMAP por naturaleza)', 'Huevo',
      'Atún y sardina en agua o aceite', 'Tofu firme (⅔ taza)', 'Tempeh (100 g)',
      'Jamón y embutidos SIN ajo ni cebolla (revisa etiqueta)',
    ],
    evitar: [
      'Carnes marinadas o adobadas con ajo/cebolla', 'Chorizo y longaniza (ajo)',
      'Embutidos con ajo o cebolla en polvo', 'Milanesas empanizadas con pan de trigo',
    ],
  },
  {
    categoria: 'Leguminosas',
    permitidos: [
      'Garbanzo de lata, escurrido y enjuagado (¼ taza)',
      'Lenteja de lata, escurrida y enjuagada (¼ taza)',
      'Edamame (½ taza)',
    ],
    evitar: [
      'Frijoles de olla o refritos (GOS) — el clásico a re-probar en reintroducción',
      'Haba (GOS)', 'Garbanzo y lenteja cocidos en casa en porción normal (GOS)',
      'Soya texturizada (GOS)',
    ],
  },
  {
    categoria: 'Nueces y semillas',
    permitidos: [
      'Cacahuates (32 piezas)', 'Nuez pecana (10 mitades)', 'Almendras (10 piezas)',
      'Semillas de calabaza / pepitas (2 cdas)', 'Chía (2 cdas)', 'Ajonjolí (1 cda)',
      'Crema de cacahuate (2 cdas)',
    ],
    evitar: [
      'Pistache (fructanos + GOS)', 'Nuez de la India / anacardo (fructanos + GOS)',
      'Más de 20 almendras (GOS se acumula)',
    ],
  },
  {
    categoria: 'Endulzantes, salsas y bebidas',
    permitidos: [
      'Azúcar de mesa y piloncillo (con moderación)', 'Jarabe de maple 100%', 'Stevia y sucralosa',
      'Café y té (pueden irritar por sí solos: obsérvate)', 'Agua de limón o jamaica sin miel',
      'Chocolate oscuro (30 g)', 'Salsa de jitomate casera sin ajo/cebolla', 'Mostaza, mayonesa',
      'Aceite infusionado con ajo (el sabor sin los fructanos: son solubles en agua, no en aceite)',
      'Vino (1 copa) o tequila/mezcal (1 caballito) — el alcohol irrita por sí mismo',
    ],
    evitar: [
      'Miel de abeja (fructosa)', 'Jarabe/miel de agave (fructosa, de lo más concentrado)',
      'Refrescos y jugos con jarabe de maíz de alta fructosa',
      'Chicles y dulces "sin azúcar" con sorbitol/manitol/xilitol/isomalt',
      'Catsup en cantidad (fructosa)', 'Consomé en polvo, sazonadores y aderezos con ajo/cebolla',
      'Ron (fructosa)',
    ],
  },
]

// ── Etapa 2: plan de reintroducción (un grupo a la vez) ──────────────
// Cada reto dura 3 días con dosis creciente + 3-4 días de lavado comiendo
// estrictamente bajo en FODMAP antes del siguiente. Si un día hay síntomas
// claros: suspende el reto, márcalo y deja pasar el lavado igual.
export const RETOS = [
  {
    semana: 1, grupo: 'lactosa', nombre: 'Lactosa',
    alimento: 'Leche de vaca',
    dosis: ['½ taza (125 ml)', '1 taza (250 ml)', '1½ tazas (375 ml)'],
    alternativa: 'Yogur natural regular: ½ → 1 → 1½ tazas.',
  },
  {
    semana: 2, grupo: 'fructosa', nombre: 'Fructosa en exceso',
    alimento: 'Miel de abeja',
    dosis: ['1 cucharadita', '2 cucharaditas', '1 cucharada'],
    alternativa: 'Mango: ⅓ → ½ → 1 taza.',
  },
  {
    semana: 3, grupo: 'sorbitol', nombre: 'Sorbitol',
    alimento: 'Aguacate',
    dosis: ['¼ pieza', '½ pieza', '1 pieza chica'],
    alternativa: 'Durazno amarillo: ½ → 1 → 1½ piezas.',
  },
  {
    semana: 4, grupo: 'manitol', nombre: 'Manitol',
    alimento: 'Champiñones cocidos',
    dosis: ['½ taza', '1 taza', '1½ tazas'],
    alternativa: 'Coliflor cocida: ½ → 1 → 1½ tazas.',
  },
  {
    semana: 5, grupo: 'gos', nombre: 'GOS (leguminosas)',
    alimento: 'Frijoles de olla escurridos',
    dosis: ['¼ taza', '½ taza', '¾ taza'],
    alternativa: 'Garbanzo cocido: ¼ → ½ → ¾ taza.',
  },
  {
    semana: 6, grupo: 'fructanos', nombre: 'Fructanos — trigo',
    alimento: 'Pan de caja de trigo',
    dosis: ['1 rebanada', '2 rebanadas', '3 rebanadas'],
    alternativa: 'Pasta de trigo cocida: ½ → 1 → 1½ tazas.',
  },
  {
    semana: 7, grupo: 'fructanos', nombre: 'Fructanos — cebolla',
    alimento: 'Cebolla cocida',
    dosis: ['1 cucharada', '2 cucharadas', '4 cucharadas (¼ pieza)'],
    alternativa: 'Se prueba aparte del trigo: la tolerancia a cada fuente de fructanos varía.',
  },
  {
    semana: 8, grupo: 'fructanos', nombre: 'Fructanos — ajo',
    alimento: 'Ajo fresco cocido',
    dosis: ['½ diente', '1 diente', '2 dientes'],
    alternativa: 'El reto más pequeño en volumen, pero de los que más disparan síntomas.',
  },
]

// ── Menú de eliminación: 7 días con recetas (rota las semanas que dure) ──
// Todo bajo en FODMAP en las porciones indicadas: sin trigo, cebolla, ajo,
// leguminosas (salvo lo indicado), lácteos con lactosa, miel/agave ni las
// frutas/verduras de la lista de evitar. Sazona con: parte verde de cebollín,
// aceite infusionado con ajo, cilantro, comino, laurel, orégano, chile y limón.
export const MENU = [
  {
    dia: 1,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Huevos revueltos con jitomate y espinaca',
        ingredientes: ['2 huevos', '1 jitomate chico picado', '1 puño de espinacas', '2 tortillas de maíz', '1 cdita de aceite', '1 taza de papaya'],
        preparacion: ['Sofríe el jitomate en el aceite 2 min, añade la espinaca hasta marchitar.', 'Agrega los huevos batidos con sal y revuelve a fuego medio.', 'Sirve con las tortillas calientes y la papaya de postre.'],
      },
      {
        tiempo: 'Colación', nombre: 'Yogur deslactosado con fresas y chía',
        ingredientes: ['1 taza de yogur deslactosado natural', '5 fresas en mitades', '1 cda de chía'],
        preparacion: ['Mezcla todo; si quieres endulzar usa 1 cdita de jarabe de maple.'],
      },
      {
        tiempo: 'Comida', nombre: 'Pollo a la plancha con arroz y verduras',
        ingredientes: ['150 g de pechuga de pollo', '1 taza de arroz cocido', '½ taza de calabacita', '½ taza de zanahoria', '1 cda de aceite infusionado con ajo', 'Limón, sal, pimienta y orégano'],
        preparacion: ['Salpimienta la pechuga y ásala en la plancha con la mitad del aceite.', 'Saltea calabacita y zanahoria con el resto del aceite y orégano.', 'Sirve con el arroz y limón al gusto.'],
      },
      {
        tiempo: 'Cena', nombre: 'Quesadillas de maíz con queso manchego',
        ingredientes: ['3 tortillas de maíz', '60 g de queso manchego rallado', '1 jitomate chico rebanado', 'Salsa verde casera sin ajo ni cebolla (tomate verde asado, chile serrano, cilantro, sal)'],
        preparacion: ['Calienta las tortillas con el queso hasta fundir.', 'Acompaña con jitomate y la salsa.'],
      },
    ],
  },
  {
    dia: 2,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Avena con plátano y nuez',
        ingredientes: ['½ taza de avena', '1 taza de leche deslactosada', '½ plátano poco maduro en rodajas', '5 mitades de nuez', 'Canela'],
        preparacion: ['Cuece la avena en la leche 5 min.', 'Sirve con el plátano, la nuez y canela.'],
      },
      {
        tiempo: 'Colación', nombre: 'Cacahuates y mandarina',
        ingredientes: ['30 g de cacahuates naturales', '1 mandarina'],
        preparacion: ['Listo para llevar.'],
      },
      {
        tiempo: 'Comida', nombre: 'Tacos de pescado con repollo',
        ingredientes: ['150 g de filete de pescado blanco', '3 tortillas de maíz', '1 taza de col morada rallada', 'Pico de gallo SIN cebolla: jitomate, cilantro, chile serrano y limón', '1 cda de mayonesa con limón'],
        preparacion: ['Asa el pescado con sal, pimienta y limón; desmenúzalo.', 'Arma los tacos con col, pescado, pico de gallo y la mayonesa.'],
      },
      {
        tiempo: 'Cena', nombre: 'Sopa de verduras con pollo',
        ingredientes: ['1 taza de caldo de pollo casero SIN cebolla ni ajo (hierve el pollo con laurel, zanahoria y la parte verde de un cebollín)', '½ taza de papa en cubos', '½ taza de calabacita', '½ taza de zanahoria', '½ taza de pollo desmenuzado', 'Cilantro y limón'],
        preparacion: ['Cuece las verduras en el caldo hasta suavizar.', 'Añade el pollo, cilantro y limón antes de servir.'],
      },
    ],
  },
  {
    dia: 3,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Omelette de espinaca y queso',
        ingredientes: ['2 huevos', '1 puño de espinacas', '30 g de queso cheddar', '2 tortillas de maíz', '1 cdita de mantequilla'],
        preparacion: ['Bate los huevos con sal y cuaja en la mantequilla.', 'Rellena con espinaca y queso; dobla y sirve con tortillas.'],
      },
      {
        tiempo: 'Colación', nombre: 'Palomitas naturales y uvas',
        ingredientes: ['3 tazas de palomitas naturales (sin mantequilla saborizada)', '⅓ taza de uvas'],
        preparacion: ['Revienta el maíz con poco aceite y sal.'],
      },
      {
        tiempo: 'Comida', nombre: 'Bistec con papas al horno y ensalada',
        ingredientes: ['150 g de bistec de res', '1 papa grande en gajos', 'Lechuga, pepino y zanahoria rallada', 'Aceite de oliva, limón, sal y pimienta', '1 cdita de aceite infusionado con ajo para el bistec'],
        preparacion: ['Hornea los gajos de papa con aceite y sal a 220 °C por 25 min.', 'Asa el bistec con el aceite infusionado.', 'Adereza la ensalada con aceite de oliva y limón.'],
      },
      {
        tiempo: 'Cena', nombre: 'Sopes de pollo',
        ingredientes: ['2 sopes de maíz', '½ taza de pollo deshebrado', 'Lechuga rallada', '2 cdas de crema deslactosada', 'Queso rallado (20 g)', 'Salsa de jitomate asado sin ajo ni cebolla'],
        preparacion: ['Calienta los sopes y úntales la salsa.', 'Monta pollo, lechuga, crema y queso.'],
      },
    ],
  },
  {
    dia: 4,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Licuado de fresa y avena + huevo cocido',
        ingredientes: ['1 taza de leche deslactosada', '5 fresas', '2 cdas de avena', '1 cdita de jarabe de maple', '1 huevo cocido'],
        preparacion: ['Licúa leche, fresas, avena y maple.', 'Acompaña con el huevo cocido con sal.'],
      },
      {
        tiempo: 'Colación', nombre: 'Zanahorias con limón y chile',
        ingredientes: ['2 zanahorias en bastones', 'Limón y chile piquín puro (verifica que no tenga ajo/cebolla)'],
        preparacion: ['Baña los bastones con limón y chile.'],
      },
      {
        tiempo: 'Comida', nombre: 'Pescado al limón con quinoa y ejotes',
        ingredientes: ['150 g de tilapia o salmón', '1 taza de quinoa cocida', '15 ejotes al vapor', 'Limón, eneldo u orégano, sal y pimienta', '1 cdita de mantequilla'],
        preparacion: ['Asa el pescado con mantequilla, limón y hierbas.', 'Sirve sobre la quinoa con los ejotes.'],
      },
      {
        tiempo: 'Cena', nombre: 'Tostadas de atún',
        ingredientes: ['2 tostadas horneadas de maíz', '1 lata de atún en agua', '1 jitomate chico picado', 'Lechuga', '1 cda de mayonesa', 'Cilantro y limón'],
        preparacion: ['Mezcla el atún con mayonesa, jitomate, cilantro y limón.', 'Sirve sobre las tostadas con lechuga.'],
      },
    ],
  },
  {
    dia: 5,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Chilaquiles caseros bajos en FODMAP',
        ingredientes: ['Totopos horneados de 3 tortillas de maíz', 'Salsa: 2 jitomates asados, chile serrano, cilantro, sal (SIN ajo ni cebolla)', '1 huevo estrellado', '2 cdas de crema deslactosada', 'Queso rallado (20 g)'],
        preparacion: ['Licúa y calienta la salsa; baña los totopos.', 'Corona con el huevo, crema y queso.'],
      },
      {
        tiempo: 'Colación', nombre: 'Kiwi y almendras',
        ingredientes: ['2 kiwis chicos', '10 almendras'],
        preparacion: ['Listo para llevar.'],
      },
      {
        tiempo: 'Comida', nombre: 'Milanesa empanizada sin trigo con arroz',
        ingredientes: ['150 g de milanesa de pollo', '½ taza de avena molida o pan molido sin gluten', '1 huevo batido', '1 taza de arroz cocido', 'Ensalada de lechuga y pepino con limón'],
        preparacion: ['Pasa la milanesa por huevo y luego por la avena molida con sal.', 'Dora en sartén con poco aceite hasta cocer.', 'Sirve con arroz y ensalada.'],
      },
      {
        tiempo: 'Cena', nombre: 'Tacos dorados de papa',
        ingredientes: ['3 tortillas de maíz', '1 papa cocida y machacada con sal', 'Lechuga rallada', 'Crema deslactosada y queso (20 g)', 'Salsa verde sin ajo ni cebolla'],
        preparacion: ['Rellena las tortillas con papa, enrolla y dora en poco aceite.', 'Sirve con lechuga, crema, queso y salsa.'],
      },
    ],
  },
  {
    dia: 6,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Hotcakes de avena y plátano',
        ingredientes: ['½ taza de avena molida', '1 plátano poco maduro', '1 huevo', 'Canela y 1 cdita de polvo para hornear', '1 cda de jarabe de maple 100%'],
        preparacion: ['Licúa avena, plátano, huevo, canela y polvo para hornear.', 'Cuece los hotcakes en sartén antiadherente.', 'Sirve con el maple.'],
      },
      {
        tiempo: 'Colación', nombre: 'Yogur deslactosado con arándanos',
        ingredientes: ['1 taza de yogur deslactosado', '¼ taza de arándanos'],
        preparacion: ['Mezcla y listo.'],
      },
      {
        tiempo: 'Comida', nombre: 'Carne asada con nopales',
        ingredientes: ['150 g de arrachera o bistec (SIN marinados con ajo)', '2 nopales asados', '3 tortillas de maíz', 'Salsa de jitomate asado con chile serrano y cilantro (sin ajo/cebolla)', 'Limón y sal'],
        preparacion: ['Asa la carne y los nopales con sal y limón.', 'Sirve en tacos con la salsa.'],
      },
      {
        tiempo: 'Cena', nombre: 'Ensalada de pollo con papa',
        ingredientes: ['½ taza de pollo deshebrado', '1 papa cocida en cubos', 'Lechuga, pepino y jitomate chico', '1 cda de mayonesa con limón', 'Cilantro'],
        preparacion: ['Mezcla todo con la mayonesa y el limón; sazona con sal y pimienta.'],
      },
    ],
  },
  {
    dia: 7,
    comidas: [
      {
        tiempo: 'Desayuno', nombre: 'Huevos a la mexicana (sin cebolla)',
        ingredientes: ['2 huevos', '1 jitomate chico', 'Chile serrano al gusto', 'Parte verde de 1 cebollín', '2 tortillas de maíz'],
        preparacion: ['Sofríe jitomate, chile y el cebollín (solo lo verde).', 'Añade los huevos batidos y revuelve.', 'Sirve con tortillas.'],
      },
      {
        tiempo: 'Colación', nombre: 'Piña con pepitas',
        ingredientes: ['1 taza de piña', '2 cdas de semillas de calabaza tostadas'],
        preparacion: ['Listo para llevar.'],
      },
      {
        tiempo: 'Comida', nombre: 'Caldo de pollo con arroz y verduras',
        ingredientes: ['1 pieza de pollo', 'Caldo casero sin cebolla/ajo (laurel, parte verde de cebollín, cilantro)', '½ taza de arroz cocido', 'Zanahoria, calabacita y papa en trozos', 'Limón y chile piquín puro'],
        preparacion: ['Hierve el pollo con las hierbas 30 min; cuela si quieres.', 'Añade las verduras hasta suavizar.', 'Sirve con arroz, limón y chile.'],
      },
      {
        tiempo: 'Cena', nombre: 'Pescado empapelado',
        ingredientes: ['150 g de filete de pescado', '1 jitomate chico rebanado', 'Limón, orégano, sal y pimienta', '1 cdita de mantequilla', '½ taza de arroz cocido'],
        preparacion: ['Envuelve el pescado en papel aluminio con jitomate, limón, hierbas y mantequilla.', 'Hornea o asa 15 min a fuego medio.', 'Sirve con el arroz.'],
      },
    ],
  },
]
