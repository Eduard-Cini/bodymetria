package com.vidasana.datos

import android.app.AppOpsManager
import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.content.Context
import android.os.Process
import java.time.LocalDate
import java.time.ZoneId

/**
 * Lectura del tiempo de pantalla del sistema (UsageStatsManager). Requiere el
 * permiso especial "Acceso de uso" que el usuario concede a mano en Ajustes;
 * la app funciona igual sin él (captura manual).
 */

fun tienePermisoUso(context: Context): Boolean {
    val appOps = context.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager
    @Suppress("DEPRECATION") // checkOpNoThrow: el reemplazo pide API 29 y minSdk es 26
    val modo = appOps.checkOpNoThrow(
        AppOpsManager.OPSTR_GET_USAGE_STATS,
        Process.myUid(),
        context.packageName,
    )
    return modo == AppOpsManager.MODE_ALLOWED
}

/**
 * Minutos en primer plano por app (etiqueta legible) durante un día local,
 * calculados con los eventos de primer plano (más fiable que los "buckets"
 * diarios de queryUsageStats). Filtra apps sin lanzador (procesos de sistema)
 * y usos menores a 1 minuto.
 */
fun usoPorApp(context: Context, fechaIso: String): Map<String, Int> {
    val zona = ZoneId.systemDefault()
    val dia = LocalDate.parse(fechaIso)
    val inicio = dia.atStartOfDay(zona).toInstant().toEpochMilli()
    val fin = minOf(
        dia.plusDays(1).atStartOfDay(zona).toInstant().toEpochMilli(),
        System.currentTimeMillis(),
    )
    if (inicio >= fin) return emptyMap()

    val usm = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
    val eventos = usm.queryEvents(inicio, fin)
    val alFrenteDesde = mutableMapOf<String, Long>()
    val totalMs = mutableMapOf<String, Long>()
    val evento = UsageEvents.Event()
    @Suppress("DEPRECATION") // MOVE_TO_* siguen emitiéndose; ACTIVITY_RESUMED/PAUSED piden API 29
    while (eventos.hasNextEvent()) {
        eventos.getNextEvent(evento)
        when (evento.eventType) {
            UsageEvents.Event.MOVE_TO_FOREGROUND ->
                alFrenteDesde[evento.packageName] = evento.timeStamp
            UsageEvents.Event.MOVE_TO_BACKGROUND -> {
                val desde = alFrenteDesde.remove(evento.packageName)
                if (desde != null) {
                    totalMs.merge(evento.packageName, evento.timeStamp - desde, Long::plus)
                }
            }
        }
    }
    // Apps que siguen al frente al cerrar la ventana (p. ej. esta misma hoy).
    alFrenteDesde.forEach { (paquete, desde) ->
        totalMs.merge(paquete, fin - desde, Long::plus)
    }

    val pm = context.packageManager
    val resultado = mutableMapOf<String, Int>()
    totalMs.forEach { (paquete, ms) ->
        val minutos = (ms / 60_000L).toInt()
        if (minutos >= 1 && paquete != context.packageName &&
            pm.getLaunchIntentForPackage(paquete) != null
        ) {
            val etiqueta = try {
                pm.getApplicationLabel(pm.getApplicationInfo(paquete, 0)).toString()
            } catch (e: Exception) {
                paquete
            }
            resultado.merge(etiqueta, minutos, Int::plus)
        }
    }
    return resultado
}
