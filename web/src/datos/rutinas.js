// Rutinas de entrenamiento listas para usar, organizadas por categoría.
// Esquemas: "series × repes" (o tiempo). RIR = repeticiones en reserva
// (RIR 2 = paras cuando podrías hacer 2 más); RPE 1-10 es lo que registra la app.
// Cada día se puede guardar en la app como rutina (Ejercicio → Guardar como rutina).

export const CATEGORIAS = ['Gym / pesas', 'Calistenia (habilidades)', 'Movilidad y flexibilidad', 'Enfoques específicos']

export const PROGRAMAS = [
  // ── Gym / pesas ──────────────────────────────────────────────────
  {
    clave: 'hit',
    categoria: 'Gym / pesas',
    nombre: 'Alta intensidad, bajo volumen (HIT)',
    paraQuien: 'Poco tiempo disponible; fuerza y músculo con la dosis mínima que funciona.',
    frecuencia: '2-3 días/semana · 30-40 min · alternar A y B',
    metodo: 'Pocas series pero llevadas MUY cerca del fallo (RIR 0-1, RPE 9-10), cargas altas y descansos completos de 3-5 min. Calienta cada básico con 2-3 aproximaciones ligeras que no cuentan.',
    dias: [
      {
        nombre: 'Día A',
        ejercicios: [
          { n: 'Sentadilla', esquema: '2 × 5-8', descanso: '3-5 min' },
          { n: 'Press banca', esquema: '2 × 5-8', descanso: '3-5 min' },
          { n: 'Remo con barra', esquema: '2 × 6-10', descanso: '3 min' },
          { n: 'Press militar', esquema: '1 × 6-10', descanso: '3 min' },
          { n: 'Plancha abdominal', esquema: '2 × 30-45 s', descanso: '1 min' },
        ],
      },
      {
        nombre: 'Día B',
        ejercicios: [
          { n: 'Peso muerto', esquema: '2 × 4-6', descanso: '3-5 min' },
          { n: 'Press militar', esquema: '2 × 5-8', descanso: '3 min' },
          { n: 'Dominadas (lastradas si puedes +8)', esquema: '2 × 5-8', descanso: '3 min' },
          { n: 'Fondos', esquema: '1 × 6-10', descanso: '3 min' },
          { n: 'Paseo del granjero', esquema: '2 × 30 m', descanso: '2 min' },
        ],
      },
    ],
    progresion: 'Cuando completes el tope de repes en todas las series con buena técnica: +2.5 kg arriba, +5 kg abajo. Si fallas 2 sesiones seguidas, baja 10% y vuelve a subir.',
    evidencia: 'Androulakis-Korakakis 2020 (dosis mínima efectiva de fuerza); Shailendra 2022 (30-60 min/semana de fuerza, máximo beneficio en mortalidad).',
  },
  {
    clave: 'volumen',
    categoria: 'Gym / pesas',
    nombre: 'Peso moderado, alto volumen (Empuje/Jalón/Pierna)',
    paraQuien: 'Hipertrofia como prioridad y 3-6 días disponibles; cargas cómodas para la técnica y las articulaciones.',
    frecuencia: '6 días/semana (cada día ×2) o 3 días (cada día ×1) · 60-75 min',
    metodo: 'Repes moderadas (8-15) con RIR 2-3 (RPE 7-8), 10-20 series semanales por músculo, descansos 1.5-2 min. La carga importa menos que acercarse al fallo: sube peso cuando el tope de repes se sienta a RIR 3+.',
    dias: [
      {
        nombre: 'Empuje',
        ejercicios: [
          { n: 'Press banca', esquema: '4 × 8-12', descanso: '2 min' },
          { n: 'Press inclinado con mancuernas', esquema: '3 × 10-15', descanso: '90 s' },
          { n: 'Press militar', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Elevaciones laterales', esquema: '3 × 12-20', descanso: '60 s' },
          { n: 'Extensión de tríceps en polea', esquema: '3 × 10-15', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Jalón',
        ejercicios: [
          { n: 'Dominadas o jalón al pecho', esquema: '4 × 8-12', descanso: '2 min' },
          { n: 'Remo con barra', esquema: '4 × 8-12', descanso: '2 min' },
          { n: 'Remo en polea baja', esquema: '3 × 10-15', descanso: '90 s' },
          { n: 'Face pull', esquema: '3 × 15-20', descanso: '60 s' },
          { n: 'Curl de bíceps', esquema: '3 × 10-15', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Pierna',
        ejercicios: [
          { n: 'Sentadilla', esquema: '4 × 8-12', descanso: '2-3 min' },
          { n: 'Peso muerto rumano', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Prensa o desplantes', esquema: '3 × 10-15', descanso: '90 s' },
          { n: 'Curl femoral', esquema: '3 × 10-15', descanso: '60 s' },
          { n: 'Elevación de gemelos', esquema: '4 × 12-20', descanso: '60 s' },
        ],
      },
    ],
    progresion: 'Progresión doble: primero sube repes dentro del rango, luego sube peso y vuelve al piso del rango. Descarga (mitad de series) cada 6-8 semanas.',
    evidencia: 'Schoenfeld 2017 (dosis-respuesta de volumen); Schoenfeld 2021 (cargas moderadas rinden igual que altas si te acercas al fallo).',
  },
  {
    clave: 'torso-pierna',
    categoria: 'Gym / pesas',
    nombre: 'Split torso / pierna — 4 días',
    paraQuien: 'El punto medio clásico: frecuencia 2× por músculo, mezcla fuerza + hipertrofia, cabe en lunes-martes-jueves-viernes.',
    frecuencia: '4 días/semana · 60 min · fuerza al inicio de semana, volumen al final',
    metodo: 'Días 1-2 pesados (5-8 repes, RIR 1-2, descansos largos); días 3-4 de volumen (8-15 repes, RIR 2-3). Mismos patrones, distinto estímulo.',
    dias: [
      {
        nombre: 'Día 1 — Torso fuerza',
        ejercicios: [
          { n: 'Press banca', esquema: '4 × 5-8', descanso: '3 min' },
          { n: 'Remo con barra', esquema: '4 × 5-8', descanso: '3 min' },
          { n: 'Press militar', esquema: '3 × 6-8', descanso: '2-3 min' },
          { n: 'Dominadas', esquema: '3 × 6-8', descanso: '2-3 min' },
          { n: 'Curl de bíceps', esquema: '2 × 8-10', descanso: '90 s' },
        ],
      },
      {
        nombre: 'Día 2 — Pierna fuerza',
        ejercicios: [
          { n: 'Sentadilla', esquema: '4 × 5-8', descanso: '3 min' },
          { n: 'Peso muerto', esquema: '3 × 4-6', descanso: '3-5 min' },
          { n: 'Zancadas con mancuernas', esquema: '3 × 8-10', descanso: '2 min' },
          { n: 'Elevación de gemelos', esquema: '3 × 8-12', descanso: '90 s' },
          { n: 'Plancha abdominal', esquema: '3 × 30-60 s', descanso: '1 min' },
        ],
      },
      {
        nombre: 'Día 3 — Torso volumen',
        ejercicios: [
          { n: 'Press inclinado con mancuernas', esquema: '4 × 10-15', descanso: '90 s' },
          { n: 'Remo en polea baja', esquema: '4 × 10-15', descanso: '90 s' },
          { n: 'Elevaciones laterales', esquema: '3 × 12-20', descanso: '60 s' },
          { n: 'Face pull', esquema: '3 × 15-20', descanso: '60 s' },
          { n: 'Superserie curl + tríceps en polea', esquema: '3 × 10-15', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 4 — Pierna volumen',
        ejercicios: [
          { n: 'Prensa', esquema: '4 × 10-15', descanso: '2 min' },
          { n: 'Peso muerto rumano', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Hip thrust', esquema: '3 × 10-12', descanso: '90 s' },
          { n: 'Curl femoral', esquema: '3 × 10-15', descanso: '60 s' },
          { n: 'Gemelos sentado', esquema: '4 × 15-20', descanso: '60 s' },
        ],
      },
    ],
    progresion: 'Días de fuerza: +2.5/5 kg al completar el tope de repes. Días de volumen: progresión doble (repes → peso).',
    evidencia: 'Schoenfeld 2016 (frecuencia 2×/músculo ≥ 1×); Schoenfeld 2017 (volumen).',
  },

  // ── Calistenia (habilidades) ─────────────────────────────────────
  {
    clave: 'plancha',
    categoria: 'Calistenia (habilidades)',
    nombre: 'Preparación para plancha (planche)',
    paraQuien: 'Ya haces 15+ lagartijas y 10+ fondos limpios. La plancha es fuerza de empuje con brazo recto: tardan MESES por progresión, es normal.',
    frecuencia: '3-4 días/semana · la habilidad SIEMPRE al inicio, fresco',
    metodo: 'Acumula tiempo en la progresión que aguantes 5-15 s con codos bloqueados y escápulas protraídas (empujando el piso). Cuando sumes 60 s totales en holds sólidos de 15 s, pasa a la siguiente: apoyo → tuck → tuck avanzado → straddle.',
    dias: [
      {
        nombre: 'Sesión tipo',
        ejercicios: [
          { n: 'Calentamiento de muñecas (círculos, rebotes suaves)', esquema: '5 min', descanso: '—' },
          { n: 'Planche lean (inclinación adelante, brazos rectos)', esquema: '4 × 10-20 s', descanso: '2 min' },
          { n: 'Tuck planche (rodillas al pecho)', esquema: '4 × 5-15 s', descanso: '2-3 min' },
          { n: 'Lagartijas pseudo-planche (manos a la cadera)', esquema: '3 × 5-8', descanso: '2 min' },
          { n: 'Compresión: L-sit o elevaciones de piernas', esquema: '3 × 10-20 s', descanso: '90 s' },
          { n: 'Antagonista: remo invertido o curl escapular', esquema: '3 × 8-12', descanso: '90 s' },
        ],
      },
    ],
    progresion: 'Sube el tiempo por hold antes de cambiar de progresión; puedes usar banda elástica en la cadera como asistencia para "probar" el siguiente nivel. Muñecas con molestia = para y refuerza.',
    evidencia: 'Sin ensayos específicos: progresiones estándar de gimnasia/calistenia. Los principios de sobrecarga y frecuencia sí son los de siempre (Schoenfeld 2016-2017).',
  },
  {
    clave: 'pino',
    categoria: 'Calistenia (habilidades)',
    nombre: 'Pino (handstand)',
    paraQuien: 'Cualquiera constante: es más equilibrio que fuerza. Meta razonable: 30 s libres en 3-6 meses practicando casi a diario.',
    frecuencia: '5-6 días/semana, 10-20 min (habilidad: mucha práctica, nunca al fallo)',
    metodo: 'La pared es tu maestro: pecho HACIA la pared (no de espaldas) para alinear cadera-hombro-muñeca. El balance se gana con los dedos, no moviendo los brazos.',
    dias: [
      {
        nombre: 'Práctica diaria',
        ejercicios: [
          { n: 'Muñecas: calentamiento completo', esquema: '5 min', descanso: '—' },
          { n: 'Hollow body en el piso (línea del pino acostado)', esquema: '3 × 20-30 s', descanso: '60 s' },
          { n: 'Pino pecho a la pared', esquema: '4 × 30-60 s', descanso: '2 min' },
          { n: 'Toe pulls / despegues de pared (quitar un pie, luego ambos)', esquema: '5-10 intentos', descanso: 'al gusto' },
          { n: 'Intentos libres (con pared cerca o colchoneta)', esquema: '5-10 min', descanso: 'al gusto' },
        ],
      },
    ],
    progresion: 'Pared 60 s cómodo → despegues → holds libres de 5 s → 15 s → 30 s. Graba tus intentos: la app registra la sesión y el video te corrige la línea. Aprende a salir en rueda de carro ANTES de intentar libre.',
    evidencia: 'Práctica motora distribuida (poco y diario gana a mucho y esporádico) — principio general del aprendizaje motor.',
  },
  {
    clave: 'front-lever',
    categoria: 'Calistenia (habilidades)',
    nombre: 'Front lever',
    paraQuien: 'Ya haces 8-10 dominadas estrictas. Es jalón con brazo recto: dorsal y core trabajando contra palanca.',
    frecuencia: '3 días/semana · al inicio de tus días de jalón',
    metodo: 'Igual que la plancha: acumula tiempo por progresión (tuck → tuck avanzado → una pierna → straddle → completo) con cadera extendida y brazos rectos, cuerpo paralelo al piso.',
    dias: [
      {
        nombre: 'Sesión tipo',
        ejercicios: [
          { n: 'Dominadas escapulares (colgado, solo escápulas)', esquema: '3 × 5-8', descanso: '90 s' },
          { n: 'Tuck front lever', esquema: '4 × 5-15 s', descanso: '2-3 min' },
          { n: 'Negativas de front lever (arriba → abajo lento)', esquema: '3 × 3-5 (3-5 s cada una)', descanso: '2 min' },
          { n: 'Remos en tuck front lever', esquema: '3 × 5-8', descanso: '2 min' },
          { n: 'Dragon flag o hollow body', esquema: '3 × 5-8 / 20-30 s', descanso: '90 s' },
        ],
      },
    ],
    progresion: '60 s acumulados sólidos en una progresión → siguiente. Las negativas lentas son el mejor puente entre niveles.',
    evidencia: 'Progresiones estándar de calistenia; principios de tensión mecánica y sobrecarga (Schoenfeld 2016-2017).',
  },
  {
    clave: 'bandera',
    categoria: 'Calistenia (habilidades)',
    nombre: 'Human flag (bandera)',
    paraQuien: 'Nivel avanzado: 10+ dominadas y 15+ fondos, hombros sanos. Necesitas espaldera, poste o barra vertical.',
    frecuencia: '2-3 días/semana (exige mucho al hombro: no lo peguees a tus días pesados de empuje)',
    metodo: 'El truco: el brazo de abajo EMPUJA y el de arriba JALA, ambos rectos. Se aprende de arriba hacia abajo: sostén vertical → baja el ángulo grado a grado.',
    dias: [
      {
        nombre: 'Sesión tipo',
        ejercicios: [
          { n: 'Bandera vertical (cuerpo casi arriba del agarre)', esquema: '4 × 5-10 s por lado', descanso: '2 min' },
          { n: 'Negativas: de vertical bajar a horizontal lento', esquema: '3 × 3-5 por lado', descanso: '2-3 min' },
          { n: 'Plancha lateral con pies elevados', esquema: '3 × 20-30 s por lado', descanso: '90 s' },
          { n: 'Limpiaparabrisas colgado (o rodillas al pecho en L)', esquema: '3 × 6-10', descanso: '90 s' },
          { n: 'Press militar unilateral con mancuerna', esquema: '3 × 8-10 por lado', descanso: '90 s' },
        ],
      },
    ],
    progresion: 'Cuando la negativa se detenga 2-3 s en horizontal, intenta holds horizontales con las piernas en straddle (abiertas) primero. Trabaja SIEMPRE ambos lados.',
    evidencia: 'Progresiones estándar de calistenia/street workout.',
  },

  // ── Movilidad y flexibilidad ─────────────────────────────────────
  {
    clave: 'movilidad',
    categoria: 'Movilidad y flexibilidad',
    nombre: 'Movilidad diaria (12-15 min)',
    paraQuien: 'Todos — en especial si pasas el día sentado o tus sentadillas/press se sienten "atorados". Movilidad = rango CON control, no solo estirar.',
    frecuencia: 'Diario o mínimo 4 días/semana · ideal como calentamiento o pausa del trabajo',
    metodo: 'Movimientos activos por las articulaciones completas (CARs), lento y sin dolor. 8-10 repes o 45-60 s por posición.',
    dias: [
      {
        nombre: 'Circuito (1-2 vueltas)',
        ejercicios: [
          { n: 'CARs de hombro (círculos máximos, lentos)', esquema: '5 por lado', descanso: '—' },
          { n: 'Gato-vaca + rotación torácica en cuadrupedia', esquema: '8 + 8 por lado', descanso: '—' },
          { n: 'Cadera 90/90 con transiciones', esquema: '8 por lado', descanso: '—' },
          { n: 'Sentadilla profunda sostenida (agárrate si hace falta)', esquema: '60 s', descanso: '—' },
          { n: 'Dorsiflexión de tobillo contra pared (rodilla a la pared)', esquema: '10 por lado', descanso: '—' },
          { n: 'Muñecas: círculos + extensión en el piso', esquema: '60 s', descanso: '—' },
          { n: 'Colgarse de la barra (descompresión + hombro)', esquema: '30-60 s', descanso: '—' },
        ],
      },
    ],
    progresion: 'Busca cada semana un poco más de rango con el MISMO control. Si un lado va peor, dale una vuelta extra a ese lado.',
    evidencia: 'La movilidad activa mejora rango útil; el ejercicio regular reduce dolor articular inespecífico (Warburton 2006; Thomas 2018 para la parte de rango).',
  },
  {
    clave: 'flexibilidad',
    categoria: 'Movilidad y flexibilidad',
    nombre: 'Flexibilidad (estiramiento estático)',
    paraQuien: 'Quien quiere tocarse los pies, abrir cadera o preparar spagat. La dosis semanal TOTAL por músculo importa más que la sesión perfecta.',
    frecuencia: '5+ días/semana · 30-60 s × 2-3 series por músculo (~5-10 min semanales por zona ya dan mejora)',
    metodo: 'Llega a molestia 6-7/10 (nunca dolor punzante), respira y afloja. Mejor con el músculo caliente: después de entrenar o tras 5 min de caminata. Evita estático intenso JUSTO antes de fuerza explosiva.',
    dias: [
      {
        nombre: 'Sesión tipo (elige 4-6 según tu meta)',
        ejercicios: [
          { n: 'Isquios: pie elevado, espalda larga', esquema: '2-3 × 45 s por lado', descanso: '—' },
          { n: 'Flexores de cadera: zancada baja con glúteo apretado', esquema: '2-3 × 45 s por lado', descanso: '—' },
          { n: 'Aductores: mariposa o rana', esquema: '2-3 × 45-60 s', descanso: '—' },
          { n: 'Glúteo/piriforme: paloma', esquema: '2 × 45 s por lado', descanso: '—' },
          { n: 'Pecho: antebrazo en marco de puerta', esquema: '2 × 30-45 s por lado', descanso: '—' },
          { n: 'Dorsal: colgado o manos en banca, pecho al piso', esquema: '2 × 30-45 s', descanso: '—' },
        ],
      },
    ],
    progresion: 'Misma postura, más profundidad; mide tu avance (dedos-piso en cm, foto del spagat). Ganancias notorias toman 4-8 semanas de constancia.',
    evidencia: 'Thomas 2018 (dosis semanal de estiramiento y rango); Behm 2016 (estático largo justo antes de explosivo puede restar rendimiento agudo).',
  },

  // ── Enfoques específicos ─────────────────────────────────────────
  {
    clave: 'estetica',
    categoria: 'Enfoques específicos',
    nombre: 'Estética: dorsal, hombro lateral y brazos',
    paraQuien: 'Prioriza lo que más "se ve": espalda ancha (dorsal), hombros 3D (deltoide lateral), bíceps, tríceps y antebrazo. El resto queda en mantenimiento.',
    frecuencia: '4 días/semana · los músculos prioridad van 2×/semana y AL INICIO de la sesión',
    metodo: 'Prioritarios: 12-20 series/semana, RIR 1-2, mucho cuidado con la técnica (el dorsal y el deltoide lateral se roban fácil con trapecio y balanceo). Resto del cuerpo: 4-6 series de mantenimiento.',
    dias: [
      {
        nombre: 'Día 1 — Dorsal + bíceps',
        ejercicios: [
          { n: 'Jalón al pecho agarre amplio (o dominadas)', esquema: '4 × 8-12', descanso: '2 min' },
          { n: 'Remo unilateral con mancuerna', esquema: '3 × 10-12', descanso: '90 s' },
          { n: 'Pullover en polea (brazos rectos)', esquema: '3 × 12-15', descanso: '60 s' },
          { n: 'Curl con barra', esquema: '3 × 8-12', descanso: '90 s' },
          { n: 'Curl martillo (braquial + antebrazo)', esquema: '3 × 10-15', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 2 — Hombro lateral + tríceps',
        ejercicios: [
          { n: 'Press militar', esquema: '3 × 6-10', descanso: '2 min' },
          { n: 'Elevaciones laterales con mancuerna', esquema: '4 × 12-20', descanso: '60 s' },
          { n: 'Elevación lateral en polea (constante abajo)', esquema: '3 × 15-20', descanso: '60 s' },
          { n: 'Press francés', esquema: '3 × 8-12', descanso: '90 s' },
          { n: 'Extensión de tríceps en polea', esquema: '3 × 12-15', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 3 — Mantenimiento pierna + pecho',
        ejercicios: [
          { n: 'Sentadilla o prensa', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Peso muerto rumano', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Press banca', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Elevación de gemelos', esquema: '3 × 12-20', descanso: '60 s' },
          { n: 'Core: plancha o rueda', esquema: '3 series', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 4 — Brazos + hombro + antebrazo',
        ejercicios: [
          { n: 'Curl inclinado con mancuernas', esquema: '3 × 10-12', descanso: '90 s' },
          { n: 'Fondos lastrados (o en máquina)', esquema: '3 × 8-12', descanso: '90 s' },
          { n: 'Elevaciones laterales (2ª vez en la semana)', esquema: '4 × 12-20', descanso: '60 s' },
          { n: 'Extensión sobre cabeza con mancuerna', esquema: '3 × 10-15', descanso: '60 s' },
          { n: 'Curl de muñeca + extensión de muñeca', esquema: '3 × 15-20 c/u', descanso: '45 s' },
          { n: 'Paseo del granjero (agarre = antebrazo)', esquema: '3 × 30 m', descanso: '90 s' },
        ],
      },
    ],
    progresion: 'Progresión doble en todo. En laterales y antebrazo los saltos de peso son chicos: sube repes y series antes que kilos.',
    evidencia: 'Schoenfeld 2017 (volumen por músculo); Schoenfeld 2016 (frecuencia 2×). La priorización por orden dentro de la sesión es práctica estándar.',
  },
  {
    clave: 'gluteo',
    categoria: 'Enfoques específicos',
    nombre: 'Énfasis en glúteo',
    paraQuien: 'Glúteo como prioridad (estética o rendimiento en cadera) manteniendo el resto del cuerpo. Sirve igual para hombres y mujeres.',
    frecuencia: '3 días/semana (2 de pierna-glúteo + 1 de torso) · glúteo 12-20 series/semana',
    metodo: 'Combina los dos mejores estímulos: empuje de cadera con pico de tensión arriba (hip thrust) y estiramiento bajo carga (sentadilla profunda, RDL, búlgaras). Aprieta el glúteo 1 s arriba en cada repe de empuje.',
    dias: [
      {
        nombre: 'Día 1 — Glúteo pesado',
        ejercicios: [
          { n: 'Hip thrust con barra', esquema: '4 × 6-10', descanso: '2-3 min' },
          { n: 'Sentadilla profunda', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Abducción en máquina o con banda', esquema: '3 × 15-20', descanso: '60 s' },
          { n: 'Patada de glúteo en polea', esquema: '3 × 12-15 por lado', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 2 — Torso (mantenimiento)',
        ejercicios: [
          { n: 'Press banca o lagartijas lastradas', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Remo con barra o polea', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Press militar', esquema: '2 × 8-12', descanso: '90 s' },
          { n: 'Jalón al pecho', esquema: '2 × 10-12', descanso: '90 s' },
          { n: 'Core: plancha lateral', esquema: '3 × 30 s por lado', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día 3 — Glúteo volumen',
        ejercicios: [
          { n: 'Peso muerto rumano', esquema: '4 × 8-12', descanso: '2 min' },
          { n: 'Sentadilla búlgara', esquema: '3 × 8-12 por pierna', descanso: '90 s' },
          { n: 'Hip thrust con pausa de 2 s arriba', esquema: '3 × 12-15', descanso: '90 s' },
          { n: 'Puente unilateral', esquema: '3 × 12-15 por lado', descanso: '60 s' },
          { n: 'Caminata lateral con banda', esquema: '3 × 20 pasos', descanso: '45 s' },
        ],
      },
    ],
    progresion: 'El hip thrust progresa rápido en kilos: no sacrifiques la pausa arriba. Búlgaras y RDL: progresión doble.',
    evidencia: 'Plotkin 2023 (hip thrust y sentadilla generan crecimiento de glúteo similar → combinarlos cubre ambos estímulos); Schoenfeld 2017 (volumen).',
  },
  {
    clave: 'fullbody-2d',
    categoria: 'Enfoques específicos',
    nombre: 'Fullbody — 2 días',
    paraQuien: 'La rutina "de por vida": mínimo tiempo, todo el cuerpo, sostenible por décadas. Ideal si tu prioridad es salud/longevidad más que maximizar músculo.',
    frecuencia: '2 días/semana (separados 2-3 días) · 45-60 min',
    metodo: 'Solo básicos multiarticulares, 2-3 series a RIR 1-2. Justo en la zona de 30-60 min semanales de fuerza donde el beneficio en mortalidad es máximo.',
    dias: [
      {
        nombre: 'Día A',
        ejercicios: [
          { n: 'Sentadilla', esquema: '3 × 6-10', descanso: '2-3 min' },
          { n: 'Press banca', esquema: '3 × 6-10', descanso: '2-3 min' },
          { n: 'Remo con barra', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Elevaciones laterales', esquema: '2 × 12-15', descanso: '60 s' },
          { n: 'Curl de bíceps', esquema: '2 × 10-15', descanso: '60 s' },
          { n: 'Plancha abdominal', esquema: '2 × 30-60 s', descanso: '60 s' },
        ],
      },
      {
        nombre: 'Día B',
        ejercicios: [
          { n: 'Peso muerto', esquema: '3 × 5-8', descanso: '3 min' },
          { n: 'Press militar', esquema: '3 × 6-10', descanso: '2-3 min' },
          { n: 'Dominadas o jalón al pecho', esquema: '3 × 8-12', descanso: '2 min' },
          { n: 'Zancadas', esquema: '2 × 10-12 por pierna', descanso: '90 s' },
          { n: 'Extensión de tríceps', esquema: '2 × 10-15', descanso: '60 s' },
          { n: 'Elevación de gemelos', esquema: '2 × 12-20', descanso: '60 s' },
        ],
      },
    ],
    progresion: 'Progresión doble sin prisa; con 2 días/semana la recuperación sobra, así que cada sesión puede ser intensa.',
    evidencia: 'Shailendra 2022 y Momma 2022 (fuerza 2 días/sem y 30-60 min/sem: máximo beneficio en mortalidad); Schoenfeld 2016 (a igual volumen, la frecuencia importa poco).',
  },
]

// ── Cardio y acondicionamiento ─────────────────────────────────────
export const CARDIO = [
  {
    nombre: 'Caminata diaria',
    para: 'La base de todos: NEAT y salud general sin recuperación que pagar.',
    protocolo: ['7,000-10,000 pasos al día (el beneficio crece fuerte hasta ~7-9 mil).', 'Súbela con reglas fáciles: bajarte una parada antes, llamadas caminando, caminata post-comida.'],
    intensidad: 'Puedes hablar sin cortar frases (RPE 2-3).',
    evidencia: 'Paluch 2022 (pasos diarios y mortalidad).',
  },
  {
    nombre: 'Protocolo japonés (caminata por intervalos)',
    para: 'Adultos que quieren más que caminar sin llegar a correr; evidencia sólida en presión, condición y fuerza de pierna.',
    protocolo: ['5 ciclos de: 3 min caminata RÁPIDA (RPE 6-7, casi no puedes platicar) + 3 min caminata suave.', 'Total 30 min, 4-5 días/semana.', 'El estudio original lo sostuvo 5 meses: la magia es la constancia.'],
    intensidad: 'Los 3 min rápidos deben exigirte de verdad; los suaves son recuperación real.',
    evidencia: 'Nemoto 2007, Mayo Clin Proc (interval walking training en adultos mayores).',
  },
  {
    nombre: 'Zona 2 (base aeróbica)',
    para: 'Construir el motor: mitocondrias, recuperación entre series, FC en reposo.',
    protocolo: ['30-90 min continuos: trote suave, bici, elíptica o caminata rápida con pendiente.', '2-4 sesiones/semana; debe ser la MAYORÍA de tu cardio semanal.'],
    intensidad: 'Prueba del habla: puedes conversar en frases completas pero no cantar (~60-70% FC máx, RPE 3-4). Si dudas, ve más lento.',
    evidencia: 'Seiler 2010 (distribución polarizada: mucho suave, poco intenso).',
  },
  {
    nombre: 'Rodaje largo / distancia',
    para: 'Correr 5-10 km o más: resistencia específica y economía de carrera.',
    protocolo: ['1 vez/semana, tu carrera más larga, en ritmo de zona 2.', 'Progresa el kilometraje TOTAL semanal ~10% por semana, con una semana suave cada 4.', 'Alterna con 1-2 rodajes cortos fáciles entre semana.'],
    intensidad: 'Cómodo de principio a fin; termina sintiendo que podrías dar 2 km más.',
    evidencia: 'Progresión gradual = prevención de lesiones por sobreuso (principio estándar de periodización).',
  },
  {
    nombre: 'Fartlek (juego de ritmos)',
    para: 'Meter intensidad al correr sin la rigidez de la pista; divertido y flexible.',
    protocolo: ['Tras 10 min de trote suave: 8-12 aceleraciones "a ese poste/esquina" de 30 s a 2 min, recuperando en trote suave lo que necesites.', '1 vez/semana en lugar de un rodaje corto.'],
    intensidad: 'Las aceleraciones a RPE 7-8; la recuperación de verdad suave.',
    evidencia: 'Variante de entrenamiento interválico (Milanović 2015: los intervalos mejoran el VO₂máx más que el continuo).',
  },
  {
    nombre: 'Intervalos 4×4',
    para: 'Subir VO₂máx — uno de los mejores predictores de longevidad — con estructura simple.',
    protocolo: ['Calienta 10 min.', '4 ciclos de: 4 min fuerte (RPE 8, puedes decir frases cortas) + 3 min suave.', '1-2 veces/semana máximo, en días sin pierna pesada.'],
    intensidad: '~85-95% FC máx en los bloques de 4 min; el último debe costar terminarlo.',
    evidencia: 'Milanović 2015 (HIIT vs continuo para VO₂máx).',
  },
  {
    nombre: 'Sprints (SIT)',
    para: 'Potencia, velocidad y mucho estímulo en poco tiempo. Exigente: gana base primero.',
    protocolo: ['Calienta MUY bien: 10 min trote + aceleraciones progresivas.', '4-8 sprints de 20-30 s casi al máximo, con 2-4 min caminando entre cada uno.', '1-2 veces/semana; en pasto o cuesta arriba es más amable con los isquios.'],
    intensidad: 'RPE 9; las primeras 2-3 semanas corre al 80-90%, no al 100%.',
    evidencia: 'Gibala 2012 (adaptaciones del sprint interval training con volumen mínimo).',
  },
  {
    nombre: 'Saltos / pliometría',
    para: 'Salto vertical, potencia y hueso; complemento perfecto de la fuerza.',
    protocolo: ['2-3 veces/semana ANTES de la fuerza, fresco: 60-100 contactos totales.', 'Ejemplo: saltos al cajón 4×5, saltos con contramovimiento 3×5, brincos de tobillo (soga) 3×20.', 'Aterriza suave y en silencio; si el aterrizaje suena, baja la altura.'],
    intensidad: 'Calidad sobre cantidad: cada salto con intención máxima y pausa entre repes.',
    evidencia: 'Markovic 2007 (la pliometría mejora el salto vertical de forma consistente).',
  },
]

// Principios que aplican a TODOS los programas de arriba.
export const PRINCIPIOS = [
  ['Calienta con intención', '5-10 min: pulso arriba + movilidad de lo que vas a usar + series de aproximación. No es opcional con cargas altas.'],
  ['Técnica antes que peso', 'Una repe fea no cuenta: reduce el peso hasta que el rango completo sea tuyo. El ego es la primera causa de lesión.'],
  ['Progresión doble', 'Dentro del rango de repes: primero sube repes, luego sube peso y regresa al piso del rango. Apunta tus series en la app para no adivinar.'],
  ['RIR / RPE honesto', 'La mayoría del trabajo a RIR 1-3 (RPE 7-9). Llegar al fallo tiene su lugar (HIT, últimas series), no en cada serie.'],
  ['Descarga cada 6-8 semanas', 'Una semana con la mitad de series o -30% de peso. Las articulaciones y el ánimo lo cobran igual que los músculos.'],
  ['Dolor articular ≠ dolor muscular', 'Punzadas en articulación o tendón: cambia el ejercicio y baja carga. Persistente por 2+ semanas: profesional.'],
]
