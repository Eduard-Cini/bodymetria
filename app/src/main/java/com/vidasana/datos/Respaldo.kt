package com.vidasana.datos

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

/** Export/import de TODOS los datos en un solo JSON (respaldo sin servidor). */
@Serializable
data class Respaldo(
    val version: Int = 1,
    val perfil: Perfil,
    val macros: List<RegistroMacros>,
    val sesiones: List<Sesion>,
    val ejercicios: List<Ejercicio>,
    val series: List<Serie>,
    val composicion: List<RegistroComposicion>,
    val sueno: List<RegistroSueno>,
    val diario: List<ValorDiario>,
    val usoApps: List<UsoApp>,
)

private val json = Json { ignoreUnknownKeys = true; encodeDefaults = true }

suspend fun crearRespaldo(db: BaseDatos, perfil: Perfil): String {
    val r = Respaldo(
        perfil = perfil,
        macros = db.macros().exportar(),
        sesiones = db.ejercicio().exportarSesiones(),
        ejercicios = db.ejercicio().exportarEjercicios(),
        series = db.ejercicio().exportarSeries(),
        composicion = db.composicion().exportar(),
        sueno = db.sueno().exportar(),
        diario = db.diario().exportar(),
        usoApps = db.usoApps().exportar(),
    )
    return json.encodeToString(Respaldo.serializer(), r)
}

/** Importa un respaldo SUMÁNDOLO a lo existente (upsert por clave primaria). */
suspend fun importarRespaldo(db: BaseDatos, texto: String): Respaldo {
    val r = json.decodeFromString(Respaldo.serializer(), texto)
    r.macros.forEach { db.macros().guardar(it) }
    r.composicion.forEach { db.composicion().guardar(it) }
    r.sueno.forEach { db.sueno().guardar(it) }
    r.diario.forEach { db.diario().guardar(it) }
    r.usoApps.forEach { db.usoApps().guardar(it) }
    // Las sesiones llevan ids autogenerados: se reinsertan re-mapeando ids.
    val ejerciciosPorSesion = r.ejercicios.groupBy { it.sesionId }
    val seriesPorEjercicio = r.series.groupBy { it.ejercicioId }
    r.sesiones.forEach { s ->
        db.ejercicio().guardarSesion(
            s.copy(id = 0),
            (ejerciciosPorSesion[s.id] ?: emptyList()).sortedBy { it.orden }.map { e ->
                e.nombre to (seriesPorEjercicio[e.id] ?: emptyList()).sortedBy { it.orden }
                    .map { it.repeticiones to it.pesoKg }
            },
        )
    }
    return r
}
