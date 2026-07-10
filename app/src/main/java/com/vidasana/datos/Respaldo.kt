package com.vidasana.datos

import java.time.LocalDate
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
    val metricasMedicas: List<MetricaMedica> = emptyList(),
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
        metricasMedicas = db.medica().exportar(),
    )
    return json.encodeToString(Respaldo.serializer(), r)
}

// ── Validación del import (el JSON puede venir editado o corrupto) ───

class RespaldoInvalido(mensaje: String) : Exception(mensaje)

private const val MAX_REGISTROS = 100_000
private const val MAX_TEXTO = 300
private val RANGO_VALOR = -1_000_000f..1_000_000f
private val PATRON_HORA = Regex("^([01]?\\d|2[0-3]):[0-5]\\d$")

private fun exigir(condicion: Boolean, mensaje: String) {
    if (!condicion) throw RespaldoInvalido(mensaje)
}

private fun validarFecha(f: String, donde: String) {
    try {
        LocalDate.parse(f)
    } catch (e: Exception) {
        throw RespaldoInvalido("Fecha inválida en $donde: \"$f\"")
    }
}

private fun validarValor(v: Float, donde: String) {
    exigir(v.isFinite() && v in RANGO_VALOR, "Valor fuera de rango en $donde: $v")
}

private fun validarTexto(t: String, donde: String) {
    exigir(t.length <= MAX_TEXTO, "Texto demasiado largo en $donde (${t.length} caracteres)")
}

/**
 * Parsea y valida un respaldo SIN tocar la base de datos.
 * Lanza [RespaldoInvalido] con un mensaje claro si algo no cuadra.
 */
fun validarRespaldo(texto: String): Respaldo {
    val r = try {
        json.decodeFromString(Respaldo.serializer(), texto)
    } catch (e: Exception) {
        throw RespaldoInvalido("El archivo no es un respaldo de Bodymetria válido.")
    }

    val total = r.macros.size + r.sesiones.size + r.ejercicios.size + r.series.size +
        r.composicion.size + r.sueno.size + r.diario.size + r.usoApps.size
    exigir(total <= MAX_REGISTROS, "El respaldo excede el máximo de registros ($total).")

    exigir(r.perfil.edad in 0..130, "Edad fuera de rango: ${r.perfil.edad}")
    exigir(r.perfil.estaturaCm in 0..300, "Estatura fuera de rango: ${r.perfil.estaturaCm}")

    r.macros.forEach {
        validarFecha(it.fecha, "macros")
        validarValor(it.proteinasG, "macros"); validarValor(it.carbohidratosG, "macros")
        validarValor(it.grasasG, "macros")
        exigir(it.proteinasG >= 0 && it.carbohidratosG >= 0 && it.grasasG >= 0, "Macros negativos en ${it.fecha}")
    }
    r.sesiones.forEach {
        validarFecha(it.fecha, "sesiones"); validarTexto(it.disciplina, "sesiones")
        validarTexto(it.notas, "sesiones")
        exigir(it.duracionMin in 0..1440, "Duración fuera de rango en sesión de ${it.fecha}")
        exigir(it.gastoKcal in 0..20000, "Gasto fuera de rango en sesión de ${it.fecha}")
        exigir(it.esfuerzo in 0..10, "Esfuerzo fuera de rango en sesión de ${it.fecha}")
    }
    r.ejercicios.forEach { validarTexto(it.nombre, "ejercicios") }
    r.series.forEach {
        exigir(it.repeticiones in 0..10000, "Repeticiones fuera de rango")
        it.pesoKg?.let { p -> validarValor(p, "series"); exigir(p >= 0, "Peso negativo en una serie") }
    }
    r.composicion.forEach {
        validarFecha(it.fecha, "composición")
        exigir(it.pesoKg in 1f..500f, "Peso fuera de rango en ${it.fecha}: ${it.pesoKg}")
        it.musculoKg?.let { m -> exigir(m in 0f..300f, "Músculo fuera de rango en ${it.fecha}") }
        it.grasaPct?.let { g -> exigir(g in 0f..100f, "% de grasa fuera de rango en ${it.fecha}") }
    }
    r.sueno.forEach {
        validarFecha(it.fecha, "sueño")
        exigir(PATRON_HORA.matches(it.horaDormir), "Hora de dormir inválida en ${it.fecha}")
        exigir(PATRON_HORA.matches(it.horaDespertar), "Hora de despertar inválida en ${it.fecha}")
        exigir(it.calificacion in 1..5, "Calificación fuera de rango en ${it.fecha}")
    }
    r.diario.forEach {
        validarFecha(it.fecha, "diario"); validarValor(it.valor, "diario (${it.tipo})")
        validarTexto(it.tipo, "diario"); validarTexto(it.texto, "diario")
    }
    r.usoApps.forEach {
        validarFecha(it.fecha, "uso de apps"); validarTexto(it.app, "uso de apps")
        exigir(it.minutos in 0..1440, "Minutos fuera de rango en ${it.fecha} (${it.app})")
    }
    r.metricasMedicas.forEach {
        validarTexto(it.nombre, "métricas médicas"); validarTexto(it.unidad, "métricas médicas")
        exigir(
            it.tipo in setOf(TipoMetrica.NUMERO, TipoMetrica.BOOL, TipoMetrica.ESCALA),
            "Tipo de métrica desconocido: ${it.tipo}",
        )
    }
    return r
}

/** Resumen legible para la vista previa antes de confirmar el import. */
fun resumenRespaldo(r: Respaldo): String {
    val partes = mutableListOf<String>()
    fun agregar(n: Int, nombre: String) { if (n > 0) partes += "$n de $nombre" }
    agregar(r.macros.size, "macros")
    agregar(r.sesiones.size, "ejercicio")
    agregar(r.composicion.size, "composición")
    agregar(r.sueno.size, "sueño")
    agregar(r.diario.size, "diario (agua, lectura, ánimo…)")
    agregar(r.usoApps.size, "uso del celular")
    agregar(r.metricasMedicas.size, "métricas médicas")
    return if (partes.isEmpty()) "El respaldo no contiene registros."
    else "Se importarán:\n• " + partes.joinToString("\n• ")
}

/** Aplica un respaldo YA VALIDADO, sumándolo a lo existente (upsert por clave). */
suspend fun aplicarRespaldo(db: BaseDatos, r: Respaldo) {
    r.macros.forEach { db.macros().guardar(it) }
    r.composicion.forEach { db.composicion().guardar(it) }
    r.sueno.forEach { db.sueno().guardar(it) }
    r.usoApps.forEach { db.usoApps().guardar(it) }

    // Métricas médicas: ids autogenerados → re-mapear los valores "med.<id>".
    val mapaIds = mutableMapOf<Long, Long>()
    r.metricasMedicas.forEach { m ->
        mapaIds[m.id] = db.medica().insertar(m.copy(id = 0))
    }
    r.diario.forEach { v ->
        val tipo = if (v.tipo.startsWith(PREFIJO_MEDICA)) {
            val idViejo = v.tipo.removePrefix(PREFIJO_MEDICA).toLongOrNull()
            val idNuevo = idViejo?.let { mapaIds[it] }
            if (idNuevo == null) return@forEach // valor huérfano: se descarta
            "$PREFIJO_MEDICA$idNuevo"
        } else v.tipo
        db.diario().guardar(v.copy(tipo = tipo))
    }

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
}
