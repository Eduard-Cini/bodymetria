# Bodymetria — registro de vida saludable (Android)

App Android nativa (Kotlin + Jetpack Compose) para registrar a mano datos de vida
saludable (fase 1: los datos vienen de otras apps del teléfono; esta app solo
recopila, grafica y saca estadísticas). Todo local, sin red: Room (SQLite) +
DataStore, con export/import JSON como respaldo. El paquete sigue siendo
`com.vidasana` (cambiarlo desinstalaría la app en los usuarios); solo el nombre
visible es Bodymetria.

## Secciones (rutas de navegación)
0. `config` — edad, sexo, estatura, objetivos (chips multi) + export/import JSON.
1. `macros` — proteína/carbos/grasa por día, kcal calculadas (4/4/9).
2. `ejercicio` — sesiones: disciplina, duración, gasto kcal, esfuerzo RPE 1-10,
   notas y desglose opcional ejercicios → series (repes × peso). El desglose está
   en TODAS las disciplinas; con Gym/Calistenia se abre una tarjeta sola. Las
   sugerencias de ejercicio = catálogo fijo + los ya registrados (propios).
   Editar sesión = lápiz en la fila precarga el formulario y al guardar se
   REEMPLAZA (borrar + reinsertar). Rutinas: plantillas de sesión reutilizables
   (tabla `rutinas`, BD v4; desglose como JSON en `ejerciciosJson`); se guardan
   desde el formulario y "Usar" lo precarga. Entran al respaldo.
3. `composicion` — peso, músculo (kg), grasa (%).
4. `sueno` — hora dormir/despertar (HH:mm, cruza medianoche), calificación 1-5.
5-8, 10. `diario/{tipo}` — pantalla genérica de UN valor por día: `estres` (1-10),
   `agua` (ml), `lectura` (min + campo `texto` = libro, con sugerencias),
   `meditacion` (sí/no), `animo` (1-10), `regla` (sí/no; SOLO si perfil femenino).
9. `usoCelular` — minutos por app y por día (filas app+minutos; sugerencias
   comunes + ya usadas). Importación automática del sistema (datos/UsoSistema.kt:
   UsageStatsManager por eventos de primer plano, filtra apps sin lanzador y <1
   min); pide el permiso especial "Acceso de uso" con diálogo → Ajustes. Es el
   ÚNICO permiso de la app y es opcional.

Además (v1):
- `diario/verduras` — sección "Micronutrientes": registra PORCIONES DE VERDURA
  al día (meta 3+) como proxy de micros; los totales finos viven en el sitio
  web. (Sustituyó a la antigua pantalla de 8 micros; los datos "micro.<clave>"
  viejos siguen en la BD y en respaldos, inofensivos.)
- `doctor` — métricas médicas definidas por el usuario (tabla metricas_medicas,
  v3; valores en `diario` como "med.<id>"); SOLO visible si se activa el switch
  en Configuración (perfil.seccionMedica).
- `fodmap` — protocolo de dieta baja en FODMAP (acceso por tarjeta dentro de
  Doctor): etapa actual, síntomas diarios 1-10 y resultado de los 8 retos de
  reintroducción. TODO su estado vive en `diario` (tipos "fodmap.fase",
  "fodmap.sintomas", "fodmap.reto.<grupo>") — sin cambios de esquema y entra al
  respaldo tal cual. Listas de alimentos, menú de 7 días con recetas y dosis de
  los retos: en el sitio web (página FODMAP).
- `consejos` — estático, papers reales resumidos como asociaciones; acceso por
  el foco de la barra superior.
- `correlaciones` — Pearson entre pares de series diarias (sueño↔ánimo,
  estrés↔sueño, meditación↔estrés, ejercicio↔ánimo, celular↔sueño,
  estrés↔síntomas FODMAP…) sobre 90 días, mínimo 10 días pareados; ejercicio
  cuenta días sin sesión como 0. Acceso por el icono de estadísticas en Inicio.
  Siempre con el aviso correlación ≠ causalidad.
- Gráficas con rango elegible (30/90/180/365 días) vía desplegable compacto en
  el encabezado de la propia gráfica (estado interno de GraficaBase; los call
  sites no cambian). PanelEstadisticas sigue fijo en 7/30 días.
- Recordatorio diario (Recordatorios.kt): switch + hora en Configuración
  (perfil.recordatorio / horaRecordatorio); AlarmManager INEXACTO diario →
  ReceptorRecordatorio (notificación local, canal "recordatorio") y
  ReceptorArranque reprograma en BOOT_COMPLETED / MY_PACKAGE_REPLACED.
  POST_NOTIFICATIONS se pide al activar el switch (API 33+). Al importar un
  respaldo se re-sincroniza la alarma con el perfil importado.
- Metas (datos/Metas.kt): kcal/macros por Mifflin-St Jeor ×1.3 + media real de
  gasto por ejercicio 7d; prioridad pérdida>ganancia>longevidad (longevidad =
  déficit 8%, proteína 1.2 g/kg CON ÉNFASIS VEGETAL, nota de mucha verdura);
  agua = 35 ml/kg. Tarjeta de meta en Macros; barra de progreso en Agua.
- PanelEstadisticas: media 7/30 + desviación estándar + varianza (30d) + tendencia.
- Uso celular: top 5 apps de 30 días (query top5).
- Import JSON: validarRespaldo() (rangos/fechas/tamaños) + diálogo de vista
  previa con resumenRespaldo() antes de aplicarRespaldo(); NUNCA aplicar sin
  confirmar. El respaldo incluye métricas médicas (re-mapeo de ids "med.<id>").

La portada ordena las tarjetas según los objetivos del perfil (PESOS_OBJETIVO en
PantallaInicio.kt); tarjeta con dato de hoy = icono en color primario.

## Sitio web (`web/`)
React 19 + Vite, 100% estático (HashRouter, base './'), datos en localStorage.
`npm run dev` / `npm run build` en `web/`; preview "bodymetria-web" del launch.json.
Desplegado en Netlify conectado al repo GitHub `Eduard-Cini/bodymetria`: cada push
a `main` republica solo. `netlify.toml` va en la RAÍZ (Netlify lo lee de ahí) con
base = "web", publish = "dist" (relativo a base), command = "npm run build".

13 páginas (rutas en `src/App.jsx`):
- **Inicio** — descarga del APK. NO se sirve desde Netlify: vive como *release* de
  GitHub y el botón apunta a `releases/latest/download/bodymetria.apk`
  (`web/public/bodymetria.apk` está gitignoreado). Subirlo con `scripts/release.ps1`.
- **Alimentos** — registro del día por raciones; buscador, alimentos propios y
  totales para pasar a la app. Sin comida basura en el catálogo (fuera Coca/Zucaritas).
- **Recetas** — menú semanal: ~65 platillos (mexicanos + internacionales adaptados)
  y 9 postres. Rota solo por semana ISO; máx. UNA receta internacional por semana.
- **Micros** — guía de 16 micronutrientes: rango con dirección, evidencia con paper
  y fuentes naturales (marcas solo en sodio, para saber dónde se esconde).
- **Ejercicio** — recomposición corporal + recomendaciones por objetivo con papers
  (`datos/ejercicio.js`); incluye Shailendra/Baldock 2022 (fuerza 30-60 min/sem).
- **Entrenos** — 12 programas + 8 protocolos de cardio + planeación: mesociclo de
  4 semanas con descarga (MESOCICLO) y planes anuales (PLANES_ANUALES) por objetivo
  con mes de inicio elegible; `datos/rutinas.js`. Cada día se guarda como rutina en la app.
- **Tendones** — carga de tendones, 4 fases isométrico→HSR y protocolos por
  tendinopatía rotuliana/aquíleo/codo/hombro/muñeca; `datos/tendones.js`.
- **Blindaje** — "Blindaje Articular": sesión semanal de 50 min de prehabilitación
  (codo/muñeca, manguito rotador, aductores, isquios, rotuliano, tibial y pies), con
  las reglas de dolor (≤4/10 y regla de 24 h), 4 semanas que rotan (selector A-D) y
  los 46 ejercicios ANIMADOS; `datos/blindaje.js` (semanas + CUES, una clave por
  ejercicio compartida con el motor) y `componentes/AnimacionEjercicio.jsx`.
- **Suplementos** — naturales por objetivo y sintéticos con GRADO de evidencia
  (creatina y proteína fuertes; beta-alanina y citrulina moderadas y prescindibles),
  más un pre-entreno natural. Sin estimulantes.
- **Sueño** — calculadora de hora de dormir (ciclos de ~90 min como heurístico
  declarado; el óptimo marcado son 7-8 h, NO 9) + recomendaciones con evidencia.
- **FODMAP** — protocolo de 3 etapas para SII: listas, menú de 7 días y calendario
  de reintroducción; `datos/fodmap.js`.
- **Tiroides** — hipotiroidismo: levotiroxina, dieta/yodo, estilo de vida.
  Educativo, sin dosis; `datos/tiroides.js`.
- **Papers** — toda la bibliografía citada agrupada por sección; `datos/papers.js`.
  Al añadir evidencia en cualquier página, agrégala también aquí.

Datos clave:
- `datos/alimentos.js`: base POR RACIÓN según la Guía de Alimentos IMSS (macros =
  promedio del grupo de equivalentes) + marcas comerciales por etiqueta; micros
  aproximados (USDA). 11 micros por alimento (magnesio, zinc y folato se fusionan
  desde MICROS_EXTRA al final del archivo). RANGOS_MICROS con dirección
  (min = no bajar; sodio max = no pasar).
- `datos/perfil.js`: meta kcal/macros con Mifflin-St Jeor × factor de actividad ×
  ajuste por objetivo (mismos parámetros que la app).
- `datos/recetas.js`: ingredientes = [idAlimento, raciones] → kcal/macros/micros
  CALCULADOS con calcularReceta(); nada de números a mano. TOPES_GRUPO limita las
  raciones al escalar (leguminosas 2.5, cereales 3, origen animal 6…) para que no
  salgan porciones absurdas; por eso el factor hacia la meta se busca por
  BÚSQUEDA BINARIA (la relación ya no es lineal). ENSALADAS = 5 ensaladas crudas
  que rotan por semana; es la garantía de micros.
- Alimentos propios: se capturan POR 100 g (como la etiqueta NOM-051) + gramos de
  la porción; se convierten al guardar.
- `datos/animaciones.js`: motor de las animaciones de Blindaje (46 ejercicios) y
  reutilizable en cualquier página. Esqueleto de ángulos ABSOLUTOS con huesos de
  longitud fija (el cuerpo nunca se estira) + un rig "linea" para primeros planos
  de mano/pie/cuello; el encuadre lo calcula `caja()` solo desde las poses. CUIDADO
  al tocar `mezclar()`: interpola arreglos de CUALQUIER longitud, no solo pares
  [x,y] — los círculos son [x,y,radio] y truncarlos genera NaN que rompe todo.
  El pintado NO pasa por React: un solo requestAnimationFrame compartido mueve las
  animaciones a la vista (IntersectionObserver) y respeta prefers-reduced-motion.

## Arquitectura
- `app/src/main/java/com/vidasana/datos/` — Room: `Entidades.kt` (fechas como texto
  ISO yyyy-MM-dd; tabla `diario` unifica las secciones de un valor/día con clave
  (fecha,tipo) + columna `texto`), `Daos.kt` (Flows + upsert), `BaseDatos.kt`
  (singleton; **v4** con MIGRACION_1_2/2_3/3_4 — al tocar el esquema, añadir
  migración, NUNCA fallbackToDestructiveMigration),
  `Perfil.kt` (DataStore), `Respaldo.kt` (export/import JSON con kotlinx.serialization;
  re-importa sesiones re-mapeando ids autogenerados).
- `ui/componentes/` — `Componentes.kt` (MarcoPantalla, SelectorFecha ←hoy→,
  CampoNumero filtrado, SelectorNivel slider, FilaHistorial) y `Graficas.kt`
  (Canvas propio: GraficaLineas/GraficaBarras últimos 30 días, PanelEstadisticas
  media 7d/30d/tendencia). Sin librerías de gráficas.
- `ui/pantallas/` — una pantalla por sección; sin ViewModels: los composables
  coleccionan Flows del DAO directamente (`collectAsState`) y escriben con
  `rememberCoroutineScope`.
- Al abrir, si el perfil no está configurado, Inicio manda a `config`.

## Compilar (sin Android Studio)
En PowerShell:
```
$env:JAVA_HOME = "C:\Users\robot\.jdks\jdk-17.0.19+10"
$env:JAVA_TOOL_OPTIONS = "-Djavax.net.ssl.trustStoreType=Windows-ROOT"   # TLS interceptado: JVM debe usar el almacén de Windows
.\gradlew.bat assembleDebug
```
APK: `app/build/outputs/apk/debug/app-debug.apk` (instalar por adb o copiando al teléfono).
Release completo: `.\scripts\release.ps1` — compila, copia el APK a
web/public/bodymetria.apk y lo sube al release de GitHub con `gh release upload
--clobber` (gh CLI portable en `%LOCALAPPDATA%\gh-cli\bin`, ya autenticado).
SDK en `%LOCALAPPDATA%\Android\Sdk` (cmdline-tools; sin emulador). Las descargas con
curl necesitan `--ssl-no-revoke` en esta red.

## Decisiones
- Kotlin/Compose nativo (elegido por el usuario) pensando en fases futuras:
  UsageStatsManager (uso por app) y Health Connect (sueño/peso/ejercicio) automáticos.
- Gráficas de una sola serie con el color primario del tema (Material You dinámico
  en Android 12+); barras desde cero para magnitudes, líneas para niveles/medidas.
- minSdk 26, targetSdk 35. Sin Hilt, sin APIs en vivo.

## Pendiente (fase 2)
- **Mi Band 9 → Health Connect.** El usuario YA tiene la banda (julio 2026). Ruta:
  Mi Band 9 → app Mi Fitness → Health Connect → Bodymetria lee. Bloqueado hasta que
  el usuario confirme que su Mi Fitness expone Health Connect (Perfil → Ajustes →
  Health Connect). Implementación prevista: `androidx.health.connect:connect-client`,
  permisos de LECTURA de sueño, ejercicio, pasos, peso y FC, y una pantalla
  "Importar del reloj" que rellene Sueño/Ejercicio/Composición respetando la regla
  de vista previa antes de escribir. OJO: leer datos de salud exige un formulario
  de declaración extra en Play Store.
- **Publicación en Play Store**: keystore de release (guardarla como oro), AAB,
  ficha, política de privacidad y prueba cerrada de 14 días con ~12 testers.
- **Análisis de mercado para iOS** antes de decidir (Compose Multiplatform
  reutilizaría casi todo). Por ahora el foco es Android.

## Decisiones de contenido (no revertir sin avisar)
- Nada de comida basura en el catálogo de Alimentos; en Micros las marcas solo
  aparecen en el sodio.
- La evidencia se enuncia como ASOCIACIÓN en poblaciones, nunca como promesa; cada
  afirmación lleva su paper y termina en la página Papers.
- Se dice lo incómodo: la vitamina D casi no viene de la comida (sale "del sol"),
  el ciclo de 90 min de sueño es un heurístico, y una sesión semanal es blindaje,
  no rehabilitación (una tendinopatía activa necesita 2-3×/semana × 12 semanas).
