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
3. `composicion` — peso, músculo (kg), grasa (%).
4. `sueno` — hora dormir/despertar (HH:mm, cruza medianoche), calificación 1-5.
5-8, 10. `diario/{tipo}` — pantalla genérica de UN valor por día: `estres` (1-10),
   `agua` (ml), `lectura` (min + campo `texto` = libro, con sugerencias),
   `meditacion` (sí/no), `animo` (1-10), `regla` (sí/no; SOLO si perfil femenino).
9. `usoCelular` — minutos por app y por día (filas app+minutos; sugerencias
   comunes + ya usadas).

Además (v1):
- `micros` — metas RDA por sexo (Metas.kt: MICROS; sodio es tope) + registro del
  total diario; los valores viven en `diario` como "micro.<clave>".
- `doctor` — métricas médicas definidas por el usuario (tabla metricas_medicas,
  v3; valores en `diario` como "med.<id>"); SOLO visible si se activa el switch
  en Configuración (perfil.seccionMedica).
- `consejos` — estático, papers reales resumidos como asociaciones; acceso por
  el foco de la barra superior.
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
Recetas (menú semanal por semilla), Sueño (ciclos + papers). Comandos:
`npm run dev` / `npm run build` en `web/`. Preview: launch.json "bodymetria-web".

## Arquitectura
- `app/src/main/java/com/vidasana/datos/` — Room: `Entidades.kt` (fechas como texto
  ISO yyyy-MM-dd; tabla `diario` unifica las secciones de un valor/día con clave
  (fecha,tipo) + columna `texto`), `Daos.kt` (Flows + upsert), `BaseDatos.kt`
  (singleton; **v2** con MIGRACION_1_2 — al tocar el esquema, añadir migración,
  NUNCA fallbackToDestructiveMigration),
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

## Pendiente (fase 2)
- Captura automática: UsageStatsManager, Health Connect.
- Correlaciones entre secciones (p. ej. sueño vs ánimo), rangos de tiempo en gráficas.
- Editar sesiones de ejercicio existentes (hoy: borrar y recrear).
