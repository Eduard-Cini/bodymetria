# Bodymetria

App Android + sitio web para registrar y mejorar tu vida saludable. Todo el
seguimiento vive en tu dispositivo: sin cuentas, sin servidores, sin publicidad.

## App Android (`app/`)
Kotlin + Jetpack Compose. Registra macros, ejercicio (con series y RPE),
composición corporal, sueño, estrés, agua, lectura, meditación, uso del celular,
ánimo y una sección médica personalizable. Calcula metas de calorías y macros
(Mifflin-St Jeor), muestra gráficas y estadísticas (media, desviación estándar,
varianza y tendencia) y guarda todo en una base local (Room). Respaldo y
restauración por archivo JSON.

- Datos: `app/src/main/java/com/vidasana/datos/` (Room + DataStore).
- UI: `app/src/main/java/com/vidasana/ui/` (Compose + Navigation).

## Sitio web (`web/`)
React + Vite (100% estático). Complementa a la app:
- **Alimentos:** registro por porciones del sistema de equivalentes de la Guía de
  Alimentos para la Población Mexicana (IMSS), con desglose de macros y micros.
- **Recetas:** menú semanal que rota solo y escala las porciones a tu meta
  (cocina mexicana e internacional adaptada).
- **Micros:** guía de micronutrientes con rangos y evidencia científica.
- **Suplementos:** qué tiene respaldo real y qué no.
- **Sueño:** calculadora de horas y recomendaciones con evidencia.

## Construir
```
# App (necesita Android SDK + JDK 17)
./gradlew assembleDebug        # APK en app/build/outputs/apk/debug/

# Sitio
cd web && npm install && npm run dev
```

## Documentación
En `docs/`: documentación técnica y manual de aprendizaje (Markdown y PDF).

## Licencia
Uso personal. © Eduard-Cini.
