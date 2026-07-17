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
React 19 + Vite, estático (HashRouter, base './'), localStorage. Páginas: Inicio
(descarga del APK desde `web/public/bodymetria.apk` — COPIAR ahí el APK nuevo en
cada release), Alimentos (raciones de la Guía IMSS en `src/datos/alimentos.js`,
macros = promedio del grupo, micros aproximados; totales para pasar a la app),
Recetas (menú semanal por semilla), Sueño (ciclos + papers), FODMAP (protocolo
de 3 etapas para SII: listas altos/bajos, menú de eliminación de 7 días con
recetas mexicanas y calendario de reintroducción; datos en `src/datos/fodmap.js`).
Comandos: `npm run dev` / `npm run build` en `web/`. Preview: launch.json
"bodymetria-web".

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
SDK en `%LOCALAPPDATA%\Android\Sdk` (cmdline-tools; sin emulador). Las descargas con
curl necesitan `--ssl-no-revoke` en esta red.

## Decisiones
- Kotlin/Compose nativo (elegido por el usuario) pensando en fases futuras:
  UsageStatsManager (uso por app) y Health Connect (sueño/peso/ejercicio) automáticos.
- Gráficas de una sola serie con el color primario del tema (Material You dinámico
  en Android 12+); barras desde cero para magnitudes, líneas para niveles/medidas.
- minSdk 26, targetSdk 35. Sin Hilt, sin APIs en vivo.

## Sitio web (`web/`)
React 19 + Vite, 100% estático (HashRouter, base './'), datos en localStorage.
`npm run dev` en web/ (o preview "bodymetria-web" del launch.json). Páginas:
- Inicio (descarga del APK — copiar app-debug.apk a web/public/bodymetria.apk
  al desplegar; está gitignoreado), Alimentos, Recetas, Micros, Suplementos, Sueño.
- `datos/alimentos.js`: base POR RACIÓN según la Guía de Alimentos IMSS
  (macros = promedio del grupo de equivalentes) + marcas comerciales por
  etiqueta; micros aproximados (USDA) por ración. RANGOS_MICROS con dirección
  (min = no bajar; sodio max = no pasar).
- `datos/perfil.js`: meta kcal/macros con Mifflin-St Jeor × factor de actividad
  × ajuste por objetivo (mismos parámetros que la app).
- `datos/recetas.js`: ingredientes = [idAlimento, raciones] → kcal/macros/micros
  CALCULADOS con calcularReceta(); ENSALADA cruda diaria fija (garantía de
  micros). El menú semanal rota solo (semilla = semana ISO) y escala porciones
  ×1..×2.5 hacia la meta del perfil.
- Alimentos propios: se capturan POR 100 g (como la etiqueta NOM-051) + gramos
  de la porción; se convierten al guardar.

## Pendiente (fase 2)
- Health Connect (sueño/peso/ejercicio automáticos) — esperando a que tenga
  sentido con hardware del usuario (smartwatch/banda).
- Publicación en Play Store.
(Ya hechos: UsageStatsManager, correlaciones, rangos en gráficas, editar
sesiones + rutinas.)
