// Base de alimentos POR RACIÓN, basada en la "Guía de Alimentos para la
// Población Mexicana" (IMSS/Secretaría de Salud): cada alimento lista su
// porción equivalente y los macros son el PROMEDIO del grupo según la guía
// (p. ej. cereales sin grasa = 70 kcal, 15 C, 0 G, 2 P por ración).
// Los micronutrientes son APROXIMADOS (USDA) escalados al peso de la ración.
// Unidades: kcal; prot/carb/gras/fibra g; calcio/hierro/potasio/sodio/vitC mg;
// vitD/b12 µg.

export const ALIMENTOS = [
  // ── Cereales y tubérculos sin grasa (70 kcal · C15 · G0 · P2) ──
  { id: 'tortilla', nombre: 'Tortilla de maíz', grupo: 'Cereales', porcion: '1 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.9, calcio: 48, hierro: 0.4, potasio: 56, sodio: 14, vitC: 0, vitD: 0, b12: 0 },
  { id: 'tortillaharina', nombre: 'Tortilla de harina', grupo: 'Cereales', porcion: '1/2 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 0.8, calcio: 30, hierro: 0.7, potasio: 29, sodio: 147, vitC: 0, vitD: 0, b12: 0 },
  { id: 'arroz', nombre: 'Arroz blanco o integral cocido', grupo: 'Cereales', porcion: '1/2 taza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 0.3, calcio: 8, hierro: 1, potasio: 28, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'avena', nombre: 'Avena en hojuelas', grupo: 'Cereales', porcion: '1/3 taza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 2.9, calcio: 15, hierro: 1.3, potasio: 116, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'pan', nombre: 'Pan de caja (blanco o integral)', grupo: 'Cereales', porcion: '1 rebanada', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.8, calcio: 27, hierro: 0.6, potasio: 64, sodio: 113, vitC: 0, vitD: 0, b12: 0 },
  { id: 'bolillo', nombre: 'Bolillo sin migajón', grupo: 'Cereales', porcion: '1/2 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1, calcio: 10, hierro: 0.8, potasio: 30, sodio: 150, vitC: 0, vitD: 0, b12: 0 },
  { id: 'pasta', nombre: 'Pasta hervida', grupo: 'Cereales', porcion: '1/2 taza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.2, calcio: 5, hierro: 0.3, potasio: 29, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'papa', nombre: 'Papa hervida o al horno', grupo: 'Cereales', porcion: '1/2 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.6, calcio: 5, hierro: 0.3, potasio: 341, sodio: 4, vitC: 11.7, vitD: 0, b12: 0 },
  { id: 'camote', nombre: 'Camote', grupo: 'Cereales', porcion: '1/4 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 2.5, calcio: 29, hierro: 0.5, potasio: 356, sodio: 27, vitC: 14.7, vitD: 0, b12: 0 },
  { id: 'elote', nombre: 'Elote desgranado', grupo: 'Cereales', porcion: '1/2 taza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.9, calcio: 2, hierro: 0.4, potasio: 174, sodio: 1, vitC: 4.4, vitD: 0, b12: 0 },
  { id: 'tostada', nombre: 'Tostada horneada', grupo: 'Cereales', porcion: '1 pieza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 1.4, calcio: 35, hierro: 0.3, potasio: 41, sodio: 10, vitC: 0, vitD: 0, b12: 0 },
  { id: 'amaranto', nombre: 'Amaranto tostado', grupo: 'Cereales', porcion: '1/4 taza', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 2.3, calcio: 40, hierro: 1.9, potasio: 90, sodio: 5, vitC: 0, vitD: 0, b12: 0 },
  { id: 'palomitas', nombre: 'Palomitas naturales', grupo: 'Cereales', porcion: '3 tazas', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 3.5, calcio: 2, hierro: 0.8, potasio: 79, sodio: 2, vitC: 0, vitD: 0, b12: 0 },
  { id: 'galletamaria', nombre: 'Galleta María', grupo: 'Cereales', porcion: '5 piezas', kcal: 70, prot: 2, carb: 15, gras: 0, fibra: 0.9, calcio: 8, hierro: 0.6, potasio: 33, sodio: 100, vitC: 0, vitD: 0, b12: 0 },
  // ── Cereales con grasa (115 kcal · C15 · G5 · P2) ──
  { id: 'pandulce', nombre: 'Pan dulce (concha, cuernito)', grupo: 'Cereales con grasa', porcion: '1 pieza', kcal: 115, prot: 2, carb: 15, gras: 5, fibra: 0.8, calcio: 20, hierro: 0.8, potasio: 45, sodio: 120, vitC: 0, vitD: 0, b12: 0 },
  { id: 'tamal', nombre: 'Tamal', grupo: 'Cereales con grasa', porcion: '1/4 pieza', kcal: 115, prot: 2, carb: 15, gras: 5, fibra: 1, calcio: 20, hierro: 0.5, potasio: 60, sodio: 200, vitC: 0, vitD: 0, b12: 0 },
  { id: 'totopos', nombre: 'Totopos o nachos', grupo: 'Cereales con grasa', porcion: '4 piezas', kcal: 115, prot: 2, carb: 15, gras: 5, fibra: 1.1, calcio: 30, hierro: 0.3, potasio: 40, sodio: 80, vitC: 0, vitD: 0, b12: 0 },
  { id: 'hotcake', nombre: 'Hot cake', grupo: 'Cereales con grasa', porcion: '1 pieza chica', kcal: 115, prot: 2, carb: 15, gras: 5, fibra: 0.5, calcio: 60, hierro: 0.6, potasio: 60, sodio: 180, vitC: 0, vitD: 0.2, b12: 0.1 },
  // ── Verduras (25 kcal · C4 · G0 · P2) ──
  { id: 'espinaca', nombre: 'Espinaca cruda', grupo: 'Verduras', porcion: '2 tazas', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.3, calcio: 59, hierro: 1.6, potasio: 335, sodio: 47, vitC: 17, vitD: 0, b12: 0 },
  { id: 'brocoli', nombre: 'Brócoli cocido', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 2.6, calcio: 31, hierro: 0.5, potasio: 229, sodio: 32, vitC: 51, vitD: 0, b12: 0 },
  { id: 'nopal', nombre: 'Nopal cocido', grupo: 'Verduras', porcion: '1 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 3.3, calcio: 246, hierro: 0.9, potasio: 293, sodio: 32, vitC: 8, vitD: 0, b12: 0 },
  { id: 'jitomate', nombre: 'Jitomate bola', grupo: 'Verduras', porcion: '1 pieza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.4, calcio: 12, hierro: 0.4, potasio: 284, sodio: 6, vitC: 17, vitD: 0, b12: 0 },
  { id: 'zanahoria', nombre: 'Zanahoria picada', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.8, calcio: 21, hierro: 0.2, potasio: 205, sodio: 44, vitC: 3.8, vitD: 0, b12: 0 },
  { id: 'calabacita', nombre: 'Calabacita cocida', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 0.9, calcio: 14, hierro: 0.4, potasio: 235, sodio: 7, vitC: 16, vitD: 0, b12: 0 },
  { id: 'chayote', nombre: 'Chayote cocido', grupo: 'Verduras', porcion: '1/2 pieza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 2.2, calcio: 10, hierro: 0.2, potasio: 138, sodio: 1, vitC: 6, vitD: 0, b12: 0 },
  { id: 'champinon', nombre: 'Champiñón cocido', grupo: 'Verduras', porcion: '1 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.7, calcio: 5, hierro: 1.4, potasio: 278, sodio: 2, vitC: 3, vitD: 0.2, b12: 0 },
  { id: 'lechuga', nombre: 'Lechuga', grupo: 'Verduras', porcion: '3 tazas', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.1, calcio: 31, hierro: 0.8, potasio: 166, sodio: 24, vitC: 8, vitD: 0, b12: 0 },
  { id: 'cebolla', nombre: 'Cebolla cruda rebanada', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1, calcio: 13, hierro: 0.1, potasio: 85, sodio: 2, vitC: 4.3, vitD: 0, b12: 0 },
  { id: 'ejotes', nombre: 'Ejotes cocidos', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 2, calcio: 28, hierro: 0.5, potasio: 91, sodio: 1, vitC: 6, vitD: 0, b12: 0 },
  { id: 'coliflor', nombre: 'Coliflor cocida', grupo: 'Verduras', porcion: '1 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 2.9, calcio: 20, hierro: 0.4, potasio: 176, sodio: 19, vitC: 55, vitD: 0, b12: 0 },
  { id: 'chilepoblano', nombre: 'Chile poblano', grupo: 'Verduras', porcion: '1/2 pieza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.5, calcio: 6, hierro: 0.4, potasio: 100, sodio: 2, vitC: 40, vitD: 0, b12: 0 },
  { id: 'pepino', nombre: 'Pepino rebanado', grupo: 'Verduras', porcion: '1 1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1, calcio: 25, hierro: 0.4, potasio: 220, sodio: 3, vitC: 4, vitD: 0, b12: 0 },
  { id: 'salsa', nombre: 'Salsa mexicana / pico de gallo', grupo: 'Verduras', porcion: '1/2 taza', kcal: 25, prot: 2, carb: 4, gras: 0, fibra: 1.5, calcio: 12, hierro: 0.4, potasio: 260, sodio: 20, vitC: 15, vitD: 0, b12: 0 },
  // ── Frutas (60 kcal · C15 · G0 · P0) ──
  { id: 'platano', nombre: 'Plátano tabasco', grupo: 'Frutas', porcion: '1/2 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 1.6, calcio: 3, hierro: 0.2, potasio: 215, sodio: 1, vitC: 5.2, vitD: 0, b12: 0 },
  { id: 'manzana', nombre: 'Manzana chica', grupo: 'Frutas', porcion: '1 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 3.1, calcio: 8, hierro: 0.1, potasio: 139, sodio: 1, vitC: 6, vitD: 0, b12: 0 },
  { id: 'naranja', nombre: 'Naranja', grupo: 'Frutas', porcion: '1 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 3.1, calcio: 52, hierro: 0.1, potasio: 235, sodio: 0, vitC: 69, vitD: 0, b12: 0 },
  { id: 'papaya', nombre: 'Papaya picada', grupo: 'Frutas', porcion: '1 taza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 2.4, calcio: 28, hierro: 0.4, potasio: 255, sodio: 11, vitC: 85, vitD: 0, b12: 0 },
  { id: 'fresa', nombre: 'Fresa rebanada', grupo: 'Frutas', porcion: '1 taza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 3.3, calcio: 27, hierro: 0.7, potasio: 254, sodio: 2, vitC: 98, vitD: 0, b12: 0 },
  { id: 'mango', nombre: 'Mango ataulfo', grupo: 'Frutas', porcion: '1/2 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 1.8, calcio: 12, hierro: 0.2, potasio: 185, sodio: 1, vitC: 40, vitD: 0, b12: 0 },
  { id: 'melon', nombre: 'Melón picado', grupo: 'Frutas', porcion: '1 taza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 1.4, calcio: 14, hierro: 0.3, potasio: 427, sodio: 26, vitC: 59, vitD: 0, b12: 0 },
  { id: 'sandia', nombre: 'Sandía picada', grupo: 'Frutas', porcion: '1 taza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 0.6, calcio: 11, hierro: 0.4, potasio: 170, sodio: 2, vitC: 12, vitD: 0, b12: 0 },
  { id: 'guayaba', nombre: 'Guayaba', grupo: 'Frutas', porcion: '3 piezas', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 8.9, calcio: 30, hierro: 0.4, potasio: 688, sodio: 3, vitC: 377, vitD: 0, b12: 0 },
  { id: 'uva', nombre: 'Uva roja o verde', grupo: 'Frutas', porcion: '15 piezas', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 0.7, calcio: 8, hierro: 0.3, potasio: 143, sodio: 2, vitC: 2.4, vitD: 0, b12: 0 },
  { id: 'pina', nombre: 'Piña picada', grupo: 'Frutas', porcion: '3/4 taza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 1.7, calcio: 16, hierro: 0.4, potasio: 135, sodio: 1, vitC: 59, vitD: 0, b12: 0 },
  { id: 'toronja', nombre: 'Toronja', grupo: 'Frutas', porcion: '1 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 3, calcio: 27, hierro: 0.2, potasio: 320, sodio: 0, vitC: 76, vitD: 0, b12: 0 },
  { id: 'tuna', nombre: 'Tuna', grupo: 'Frutas', porcion: '2 piezas', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 4.3, calcio: 67, hierro: 0.4, potasio: 264, sodio: 6, vitC: 17, vitD: 0, b12: 0 },
  { id: 'kiwi', nombre: 'Kiwi', grupo: 'Frutas', porcion: '1 1/2 pieza', kcal: 60, prot: 0, carb: 15, gras: 0, fibra: 3.4, calcio: 39, hierro: 0.4, potasio: 356, sodio: 3, vitC: 106, vitD: 0, b12: 0 },
  // ── Origen animal muy bajo en grasa (40 kcal · C0 · G1 · P7) ──
  { id: 'pollo', nombre: 'Pechuga de pollo', grupo: 'Origen animal (muy bajo en grasa)', porcion: '30 g', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 5, hierro: 0.3, potasio: 77, sodio: 22, vitC: 0, vitD: 0, b12: 0.1 },
  { id: 'atun', nombre: 'Atún en agua', grupo: 'Origen animal (muy bajo en grasa)', porcion: '40 g', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 4, hierro: 0.6, potasio: 95, sodio: 99, vitC: 0, vitD: 0.7, b12: 1.2 },
  { id: 'pescado', nombre: 'Filete de pescado blanco', grupo: 'Origen animal (muy bajo en grasa)', porcion: '40 g', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 8, hierro: 0.3, potasio: 140, sodio: 30, vitC: 0, vitD: 1, b12: 1 },
  { id: 'clara', nombre: 'Clara de huevo', grupo: 'Origen animal (muy bajo en grasa)', porcion: '2 piezas', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 5, hierro: 0.1, potasio: 108, sodio: 110, vitC: 0, vitD: 0, b12: 0.1 },
  { id: 'bistec', nombre: 'Bistec de res', grupo: 'Origen animal (muy bajo en grasa)', porcion: '30 g', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 5, hierro: 0.8, potasio: 95, sodio: 22, vitC: 0, vitD: 0, b12: 0.8 },
  { id: 'camaron', nombre: 'Camarón cocido', grupo: 'Origen animal (muy bajo en grasa)', porcion: '5 piezas', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 32, hierro: 0.2, potasio: 82, sodio: 100, vitC: 0, vitD: 0, b12: 0.6 },
  { id: 'cottage', nombre: 'Queso cottage', grupo: 'Origen animal (muy bajo en grasa)', porcion: '3 cucharadas', kcal: 40, prot: 7, carb: 0, gras: 1, fibra: 0, calcio: 37, hierro: 0.1, potasio: 47, sodio: 165, vitC: 0, vitD: 0, b12: 0.2 },
  // ── Origen animal bajo en grasa (55 kcal · C0 · G3 · P7) ──
  { id: 'panela', nombre: 'Queso panela', grupo: 'Origen animal (bajo en grasa)', porcion: '40 g', kcal: 55, prot: 7, carb: 0, gras: 3, fibra: 0, calcio: 280, hierro: 0.2, potasio: 40, sodio: 240, vitC: 0, vitD: 0.2, b12: 0.4 },
  { id: 'cerdo', nombre: 'Lomo de cerdo', grupo: 'Origen animal (bajo en grasa)', porcion: '40 g', kcal: 55, prot: 7, carb: 0, gras: 3, fibra: 0, calcio: 6, hierro: 0.4, potasio: 140, sodio: 25, vitC: 0, vitD: 0.2, b12: 0.3 },
  { id: 'salmon', nombre: 'Salmón', grupo: 'Origen animal (bajo en grasa)', porcion: '30 g', kcal: 55, prot: 7, carb: 0, gras: 3, fibra: 0, calcio: 3, hierro: 0.1, potasio: 109, sodio: 18, vitC: 0, vitD: 3.3, b12: 1 },
  { id: 'jamonpavo', nombre: 'Jamón de pavo', grupo: 'Origen animal (bajo en grasa)', porcion: '2 rebanadas', kcal: 55, prot: 7, carb: 0, gras: 3, fibra: 0, calcio: 4, hierro: 0.4, potasio: 120, sodio: 400, vitC: 0, vitD: 0.1, b12: 0.2 },
  { id: 'higado', nombre: 'Hígado de res', grupo: 'Origen animal (bajo en grasa)', porcion: '30 g', kcal: 55, prot: 7, carb: 0, gras: 3, fibra: 0, calcio: 2, hierro: 1.9, potasio: 94, sodio: 24, vitC: 0.4, vitD: 0.4, b12: 21 },
  // ── Origen animal moderado en grasa (75 kcal · C0 · G5 · P7) ──
  { id: 'huevo', nombre: 'Huevo entero', grupo: 'Origen animal (moderado en grasa)', porcion: '1 pieza', kcal: 75, prot: 7, carb: 0, gras: 5, fibra: 0, calcio: 25, hierro: 0.6, potasio: 63, sodio: 62, vitC: 0, vitD: 1.1, b12: 0.6 },
  { id: 'mozzarella', nombre: 'Queso mozzarella', grupo: 'Origen animal (moderado en grasa)', porcion: '30 g', kcal: 75, prot: 7, carb: 0, gras: 5, fibra: 0, calcio: 150, hierro: 0.1, potasio: 23, sodio: 190, vitC: 0, vitD: 0.1, b12: 0.7 },
  { id: 'sardina', nombre: 'Sardina en tomate', grupo: 'Origen animal (moderado en grasa)', porcion: '1 pieza', kcal: 75, prot: 7, carb: 0, gras: 5, fibra: 0, calcio: 91, hierro: 1, potasio: 130, sodio: 157, vitC: 0, vitD: 1.8, b12: 3.4 },
  { id: 'molida', nombre: 'Carne molida de res', grupo: 'Origen animal (moderado en grasa)', porcion: '30 g', kcal: 75, prot: 7, carb: 0, gras: 5, fibra: 0, calcio: 6, hierro: 0.8, potasio: 95, sodio: 25, vitC: 0, vitD: 0, b12: 0.8 },
  // ── Origen animal alto en grasa (100 kcal · C0 · G8 · P7) ──
  { id: 'oaxaca', nombre: 'Queso Oaxaca', grupo: 'Origen animal (alto en grasa)', porcion: '30 g', kcal: 100, prot: 7, carb: 0, gras: 8, fibra: 0, calcio: 210, hierro: 0.2, potasio: 29, sodio: 210, vitC: 0, vitD: 0.2, b12: 0.4 },
  { id: 'manchego', nombre: 'Queso manchego', grupo: 'Origen animal (alto en grasa)', porcion: '25 g', kcal: 100, prot: 7, carb: 0, gras: 8, fibra: 0, calcio: 187, hierro: 0.2, potasio: 25, sodio: 150, vitC: 0, vitD: 0.2, b12: 0.4 },
  { id: 'salchicha', nombre: 'Salchicha', grupo: 'Origen animal (alto en grasa)', porcion: '3/4 pieza', kcal: 100, prot: 7, carb: 0, gras: 8, fibra: 0, calcio: 10, hierro: 0.5, potasio: 90, sodio: 350, vitC: 0, vitD: 0.3, b12: 0.3 },
  // ── Leche descremada (95 kcal · C12 · G2 · P9) ──
  { id: 'lechedesc', nombre: 'Leche descremada', grupo: 'Leche', porcion: '1 taza', kcal: 95, prot: 9, carb: 12, gras: 2, fibra: 0, calcio: 300, hierro: 0.1, potasio: 380, sodio: 100, vitC: 0, vitD: 2.5, b12: 1.2 },
  { id: 'yogurtlight', nombre: 'Yogurt light', grupo: 'Leche', porcion: '3/4 taza', kcal: 95, prot: 9, carb: 12, gras: 2, fibra: 0, calcio: 260, hierro: 0.1, potasio: 300, sodio: 90, vitC: 0.4, vitD: 0.1, b12: 0.8 },
  { id: 'lechesoya', nombre: 'Leche de soya baja en grasa', grupo: 'Leche', porcion: '1 taza', kcal: 95, prot: 9, carb: 12, gras: 2, fibra: 1, calcio: 300, hierro: 1, potasio: 290, sodio: 95, vitC: 0, vitD: 2.7, b12: 2.7 },
  // ── Leche entera (150 kcal · C12 · G8 · P9) ──
  { id: 'lecheentera', nombre: 'Leche entera', grupo: 'Leche entera', porcion: '1 taza', kcal: 150, prot: 9, carb: 12, gras: 8, fibra: 0, calcio: 276, hierro: 0.1, potasio: 322, sodio: 105, vitC: 0, vitD: 3.2, b12: 1.1 },
  { id: 'yogurt', nombre: 'Yogurt natural', grupo: 'Leche entera', porcion: '1 taza', kcal: 150, prot: 9, carb: 12, gras: 8, fibra: 0, calcio: 296, hierro: 0.1, potasio: 380, sodio: 113, vitC: 1.2, vitD: 0.2, b12: 0.9 },
  // ── Leguminosas (120 kcal · C20 · G1 · P8) ──
  { id: 'frijol', nombre: 'Frijol negro o canario cocido', grupo: 'Leguminosas', porcion: '1/2 taza', kcal: 120, prot: 8, carb: 20, gras: 1, fibra: 7.5, calcio: 23, hierro: 1.8, potasio: 305, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'lenteja', nombre: 'Lentejas cocidas', grupo: 'Leguminosas', porcion: '1/2 taza', kcal: 120, prot: 8, carb: 20, gras: 1, fibra: 7.8, calcio: 19, hierro: 3.3, potasio: 365, sodio: 2, vitC: 1.5, vitD: 0, b12: 0 },
  { id: 'garbanzo', nombre: 'Garbanzos cocidos', grupo: 'Leguminosas', porcion: '1/2 taza', kcal: 120, prot: 8, carb: 20, gras: 1, fibra: 6.2, calcio: 40, hierro: 2.4, potasio: 239, sodio: 6, vitC: 1, vitD: 0, b12: 0 },
  { id: 'haba', nombre: 'Habas cocidas', grupo: 'Leguminosas', porcion: '1/2 taza', kcal: 120, prot: 8, carb: 20, gras: 1, fibra: 4.6, calcio: 31, hierro: 1.3, potasio: 228, sodio: 4, vitC: 0.3, vitD: 0, b12: 0 },
  { id: 'soya', nombre: 'Soya cocida', grupo: 'Leguminosas', porcion: '1/3 taza', kcal: 120, prot: 8, carb: 20, gras: 1, fibra: 3, calcio: 59, hierro: 3, potasio: 297, sodio: 1, vitC: 1, vitD: 0, b12: 0 },
  // ── Grasas (45 kcal · G5) ──
  { id: 'aguacate', nombre: 'Aguacate', grupo: 'Grasas', porcion: '1/3 pieza', kcal: 45, prot: 0, carb: 0, gras: 5, fibra: 3, calcio: 5, hierro: 0.3, potasio: 218, sodio: 3, vitC: 4.5, vitD: 0, b12: 0 },
  { id: 'aceiteoliva', nombre: 'Aceite de oliva, canola o soya', grupo: 'Grasas', porcion: '1 cucharadita', kcal: 45, prot: 0, carb: 0, gras: 5, fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 0, vitC: 0, vitD: 0, b12: 0 },
  { id: 'crema', nombre: 'Crema', grupo: 'Grasas', porcion: '1 cucharada', kcal: 45, prot: 0, carb: 0, gras: 5, fibra: 0, calcio: 10, hierro: 0, potasio: 12, sodio: 10, vitC: 0, vitD: 0.1, b12: 0 },
  { id: 'mantequilla', nombre: 'Mantequilla', grupo: 'Grasas', porcion: '1 1/2 cucharaditas', kcal: 45, prot: 0, carb: 0, gras: 5, fibra: 0, calcio: 2, hierro: 0, potasio: 2, sodio: 45, vitC: 0, vitD: 0.1, b12: 0 },
  // ── Grasas con proteína (70 kcal · C3 · G5 · P3) ──
  { id: 'almendra', nombre: 'Almendras', grupo: 'Grasas con proteína', porcion: '10 piezas', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 1.5, calcio: 32, hierro: 0.4, potasio: 88, sodio: 0, vitC: 0, vitD: 0, b12: 0 },
  { id: 'cacahuate', nombre: 'Cacahuates', grupo: 'Grasas con proteína', porcion: '14 piezas', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 1.2, calcio: 13, hierro: 0.6, potasio: 99, sodio: 3, vitC: 0, vitD: 0, b12: 0 },
  { id: 'nuez', nombre: 'Nuez', grupo: 'Grasas con proteína', porcion: '3 piezas', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 0.8, calcio: 12, hierro: 0.3, potasio: 53, sodio: 0, vitC: 0.2, vitD: 0, b12: 0 },
  { id: 'pepitas', nombre: 'Pepitas sin cáscara', grupo: 'Grasas con proteína', porcion: '1 cucharada', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 0.6, calcio: 5, hierro: 0.9, potasio: 80, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'cremacacahuate', nombre: 'Mantequilla de cacahuate', grupo: 'Grasas con proteína', porcion: '2 cucharaditas', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 0.6, calcio: 5, hierro: 0.2, potasio: 63, sodio: 50, vitC: 0, vitD: 0, b12: 0 },
  { id: 'chia', nombre: 'Chía', grupo: 'Grasas con proteína', porcion: '1 cucharada', kcal: 70, prot: 3, carb: 3, gras: 5, fibra: 4.1, calcio: 76, hierro: 0.9, potasio: 49, sodio: 2, vitC: 0.2, vitD: 0, b12: 0 },
  // ── Azúcares (40 kcal · C10) ──
  { id: 'azucar', nombre: 'Azúcar blanca o morena', grupo: 'Azúcares', porcion: '2 1/2 cucharaditas', kcal: 40, prot: 0, carb: 10, gras: 0, fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 0, vitC: 0, vitD: 0, b12: 0 },
  { id: 'miel', nombre: 'Miel de abeja', grupo: 'Azúcares', porcion: '2 cucharaditas', kcal: 40, prot: 0, carb: 10, gras: 0, fibra: 0, calcio: 1, hierro: 0.1, potasio: 7, sodio: 1, vitC: 0, vitD: 0, b12: 0 },
  { id: 'mermelada', nombre: 'Mermelada de frutas', grupo: 'Azúcares', porcion: '2 1/2 cucharaditas', kcal: 40, prot: 0, carb: 10, gras: 0, fibra: 0.2, calcio: 3, hierro: 0.1, potasio: 13, sodio: 5, vitC: 1, vitD: 0, b12: 0 },
  // ── Marcas comerciales (datos de etiqueta, aproximados, por porción) ──
  { id: 'cornflakes', nombre: 'Corn Flakes (Kelloggs)', grupo: 'Marcas comerciales', porcion: '30 g (3/4 taza)', kcal: 110, prot: 2, carb: 25, gras: 0.2, fibra: 0.7, calcio: 5, hierro: 8, potasio: 35, sodio: 200, vitC: 6, vitD: 1, b12: 0.6 },
  { id: 'zucaritas', nombre: 'Zucaritas', grupo: 'Marcas comerciales', porcion: '30 g (3/4 taza)', kcal: 110, prot: 1, carb: 26, gras: 0.1, fibra: 0.5, calcio: 2, hierro: 4.5, potasio: 25, sodio: 150, vitC: 6, vitD: 1, b12: 0.5 },
  { id: 'avenaquaker', nombre: 'Avena instantánea (Quaker, sobre)', grupo: 'Marcas comerciales', porcion: '1 sobre (35 g)', kcal: 130, prot: 4, carb: 27, gras: 2, fibra: 3, calcio: 105, hierro: 3.9, potasio: 120, sodio: 80, vitC: 0, vitD: 0, b12: 0 },
  { id: 'panbimbo', nombre: 'Pan Bimbo blanco', grupo: 'Marcas comerciales', porcion: '1 rebanada', kcal: 74, prot: 2.4, carb: 13.6, gras: 1, fibra: 0.7, calcio: 40, hierro: 0.9, potasio: 35, sodio: 135, vitC: 0, vitD: 0, b12: 0 },
  { id: 'panbimboint', nombre: 'Pan Bimbo integral', grupo: 'Marcas comerciales', porcion: '1 rebanada', kcal: 71, prot: 3, carb: 12, gras: 1.2, fibra: 1.7, calcio: 45, hierro: 0.9, potasio: 70, sodio: 130, vitC: 0, vitD: 0, b12: 0 },
  { id: 'galletaemperador', nombre: 'Galletas Emperador', grupo: 'Marcas comerciales', porcion: '2 piezas', kcal: 130, prot: 1, carb: 18, gras: 6, fibra: 0.5, calcio: 5, hierro: 0.5, potasio: 25, sodio: 85, vitC: 0, vitD: 0, b12: 0 },
  { id: 'oreo', nombre: 'Galletas Oreo', grupo: 'Marcas comerciales', porcion: '3 piezas', kcal: 160, prot: 1, carb: 25, gras: 7, fibra: 1, calcio: 8, hierro: 1.4, potasio: 50, sodio: 135, vitC: 0, vitD: 0, b12: 0 },
  { id: 'chokis', nombre: 'Galletas Chokis', grupo: 'Marcas comerciales', porcion: '4 piezas', kcal: 150, prot: 2, carb: 20, gras: 7, fibra: 0.8, calcio: 10, hierro: 0.8, potasio: 60, sodio: 90, vitC: 0, vitD: 0, b12: 0 },
  { id: 'barrita', nombre: 'Barrita Marinela (fresa)', grupo: 'Marcas comerciales', porcion: '1 pieza', kcal: 150, prot: 2, carb: 25, gras: 5, fibra: 0.7, calcio: 15, hierro: 0.7, potasio: 40, sodio: 105, vitC: 0, vitD: 0, b12: 0 },
  { id: 'danone', nombre: 'Yogurt Danone con fruta', grupo: 'Marcas comerciales', porcion: '1 vaso (220 g)', kcal: 180, prot: 6, carb: 30, gras: 3.5, fibra: 0.5, calcio: 220, hierro: 0.1, potasio: 280, sodio: 105, vitC: 1, vitD: 0.8, b12: 0.6 },
  { id: 'yakult', nombre: 'Yakult', grupo: 'Marcas comerciales', porcion: '1 frasco (80 ml)', kcal: 65, prot: 1, carb: 15, gras: 0, fibra: 0, calcio: 30, hierro: 0, potasio: 40, sodio: 20, vitC: 0, vitD: 0, b12: 0.1 },
  { id: 'cocacola', nombre: 'Coca-Cola', grupo: 'Marcas comerciales', porcion: '1 lata (355 ml)', kcal: 149, prot: 0, carb: 37.5, gras: 0, fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 15, vitC: 0, vitD: 0, b12: 0 },
  { id: 'refrescolight', nombre: 'Refresco light/zero', grupo: 'Marcas comerciales', porcion: '1 lata (355 ml)', kcal: 1, prot: 0, carb: 0, gras: 0, fibra: 0, calcio: 0, hierro: 0, potasio: 0, sodio: 40, vitC: 0, vitD: 0, b12: 0 },
  { id: 'jugodelvalle', nombre: 'Jugo del Valle (néctar)', grupo: 'Marcas comerciales', porcion: '1 vaso (250 ml)', kcal: 110, prot: 0, carb: 27, gras: 0, fibra: 0.3, calcio: 5, hierro: 0.2, potasio: 90, sodio: 10, vitC: 30, vitD: 0, b12: 0 },
  { id: 'electrolit', nombre: 'Electrolit', grupo: 'Marcas comerciales', porcion: '1 botella (625 ml)', kcal: 140, prot: 0, carb: 34, gras: 0, fibra: 0, calcio: 10, hierro: 0, potasio: 90, sodio: 285, vitC: 0, vitD: 0, b12: 0 },
  { id: 'sabritas', nombre: 'Papas Sabritas originales', grupo: 'Marcas comerciales', porcion: '1 bolsa (45 g)', kcal: 240, prot: 3, carb: 23, gras: 15, fibra: 1.8, calcio: 10, hierro: 0.5, potasio: 570, sodio: 170, vitC: 9, vitD: 0, b12: 0 },
  { id: 'doritos', nombre: 'Doritos Nacho', grupo: 'Marcas comerciales', porcion: '1 bolsa (58 g)', kcal: 300, prot: 4, carb: 36, gras: 15, fibra: 2.3, calcio: 60, hierro: 0.7, potasio: 120, sodio: 340, vitC: 0, vitD: 0, b12: 0 },
  { id: 'cacahuatejap', nombre: 'Cacahuates japoneses', grupo: 'Marcas comerciales', porcion: '1 porción (50 g)', kcal: 250, prot: 8, carb: 22, gras: 14, fibra: 2, calcio: 25, hierro: 0.8, potasio: 240, sodio: 190, vitC: 0, vitD: 0, b12: 0 },
  { id: 'maruchan', nombre: 'Maruchan (vaso)', grupo: 'Marcas comerciales', porcion: '1 vaso (64 g)', kcal: 290, prot: 6, carb: 38, gras: 12, fibra: 2, calcio: 20, hierro: 2, potasio: 130, sodio: 1180, vitC: 0, vitD: 0, b12: 0 },
  { id: 'nutella', nombre: 'Nutella', grupo: 'Marcas comerciales', porcion: '1 cucharada (19 g)', kcal: 100, prot: 1, carb: 11, gras: 6, fibra: 0.6, calcio: 20, hierro: 0.6, potasio: 75, sodio: 10, vitC: 0, vitD: 0, b12: 0 },
]

// Rangos saludables de micronutrientes (RDA/AI adulto, NIH). Dirección:
// 'min' = no bajar de la meta; 'max' = no pasar el tope (sodio).
export const RANGOS_MICROS = [
  { clave: 'fibra', tipo: 'min', hombres: 38, mujeres: 25 },
  { clave: 'calcio', tipo: 'min', hombres: 1000, mujeres: 1000 },
  { clave: 'hierro', tipo: 'min', hombres: 8, mujeres: 18 },
  { clave: 'potasio', tipo: 'min', hombres: 3400, mujeres: 2600 },
  { clave: 'sodio', tipo: 'max', hombres: 2300, mujeres: 2300 },
  { clave: 'vitC', tipo: 'min', hombres: 90, mujeres: 75 },
  { clave: 'vitD', tipo: 'min', hombres: 15, mujeres: 15 },
  { clave: 'b12', tipo: 'min', hombres: 2.4, mujeres: 2.4 },
]

export function rangoDe(clave, sexo) {
  const r = RANGOS_MICROS.find((x) => x.clave === clave)
  if (!r) return null
  return { tipo: r.tipo, valor: sexo === 'masculino' ? r.hombres : r.mujeres }
}

export const NUTRIENTES = [
  { clave: 'kcal', nombre: 'Calorías', unidad: 'kcal', decimales: 0 },
  { clave: 'prot', nombre: 'Proteína', unidad: 'g', decimales: 1 },
  { clave: 'carb', nombre: 'Carbohidratos', unidad: 'g', decimales: 1 },
  { clave: 'gras', nombre: 'Grasa', unidad: 'g', decimales: 1 },
  { clave: 'fibra', nombre: 'Fibra', unidad: 'g', decimales: 1 },
  { clave: 'calcio', nombre: 'Calcio', unidad: 'mg', decimales: 0 },
  { clave: 'hierro', nombre: 'Hierro', unidad: 'mg', decimales: 1 },
  { clave: 'potasio', nombre: 'Potasio', unidad: 'mg', decimales: 0 },
  { clave: 'sodio', nombre: 'Sodio', unidad: 'mg', decimales: 0 },
  { clave: 'vitC', nombre: 'Vitamina C', unidad: 'mg', decimales: 1 },
  { clave: 'vitD', nombre: 'Vitamina D', unidad: 'µg', decimales: 1 },
  { clave: 'b12', nombre: 'Vitamina B12', unidad: 'µg', decimales: 1 },
]

// Los micros que la app registra (sección Micros), para el panel "pásalo a la app".
export const MICROS_APP = ['fibra', 'calcio', 'hierro', 'potasio', 'sodio', 'vitC', 'vitD', 'b12']
