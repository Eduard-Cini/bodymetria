package com.vidasana

import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.vidasana.datos.flujoPerfil
import java.util.Calendar
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking

/**
 * Recordatorio diario para registrar el día: alarma inexacta (no necesita el
 * permiso de alarmas exactas) que lanza una notificación local a la hora
 * elegida en Configuración. Sin red, como todo lo demás.
 */

private const val CANAL_ID = "recordatorio"
private const val PETICION_ALARMA = 100
private const val PETICION_ABRIR = 101
private const val ID_NOTIFICACION = 1

private fun crearCanal(context: Context) {
    val canal = NotificationChannel(
        CANAL_ID,
        "Recordatorio diario",
        NotificationManager.IMPORTANCE_DEFAULT,
    ).apply { description = "Aviso para registrar tu día en Bodymetria" }
    (context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager)
        .createNotificationChannel(canal)
}

private fun intentAlarma(context: Context): PendingIntent = PendingIntent.getBroadcast(
    context,
    PETICION_ALARMA,
    Intent(context, ReceptorRecordatorio::class.java),
    PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
)

/** Programa (o reprograma) la alarma diaria a la hora "HH:mm". */
fun programarRecordatorio(context: Context, hora: String) {
    crearCanal(context)
    val partes = hora.split(":")
    val h = partes.getOrNull(0)?.toIntOrNull() ?: return
    val m = partes.getOrNull(1)?.toIntOrNull() ?: return

    val ahora = Calendar.getInstance()
    val primera = Calendar.getInstance().apply {
        set(Calendar.HOUR_OF_DAY, h)
        set(Calendar.MINUTE, m)
        set(Calendar.SECOND, 0)
        set(Calendar.MILLISECOND, 0)
        if (!after(ahora)) add(Calendar.DAY_OF_YEAR, 1)
    }
    val alarmas = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    alarmas.setInexactRepeating(
        AlarmManager.RTC_WAKEUP,
        primera.timeInMillis,
        AlarmManager.INTERVAL_DAY,
        intentAlarma(context),
    )
}

fun cancelarRecordatorio(context: Context) {
    val alarmas = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
    alarmas.cancel(intentAlarma(context))
}

/** Lee el perfil y programa/cancela según lo guardado (arranque y reinicios). */
fun sincronizarRecordatorio(context: Context) {
    val perfil = runBlocking { flujoPerfil(context).first() }
    if (perfil.recordatorio) programarRecordatorio(context, perfil.horaRecordatorio)
    else cancelarRecordatorio(context)
}

/** Muestra la notificación diaria. */
class ReceptorRecordatorio : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        // Sin permiso de notificaciones (Android 13+) no hay nada que hacer.
        if (!NotificationManagerCompat.from(context).areNotificationsEnabled()) return
        crearCanal(context)

        val abrir = PendingIntent.getActivity(
            context,
            PETICION_ABRIR,
            Intent(context, MainActivity::class.java),
            PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
        )
        val notificacion = NotificationCompat.Builder(context, CANAL_ID)
            .setSmallIcon(R.drawable.ic_launcher_foreground)
            .setContentTitle("¿Ya registraste tu día?")
            .setContentText("Dos minutos: macros, ejercicio, sueño, ánimo… tu yo del futuro lo agradece.")
            .setContentIntent(abrir)
            .setAutoCancel(true)
            .build()
        try {
            NotificationManagerCompat.from(context).notify(ID_NOTIFICACION, notificacion)
        } catch (e: SecurityException) {
            // Permiso revocado entre el chequeo y el notify: ignorar.
        }
    }
}

/** Las alarmas se pierden al reiniciar o actualizar la app: reprogramar. */
class ReceptorArranque : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        if (intent.action == Intent.ACTION_BOOT_COMPLETED ||
            intent.action == Intent.ACTION_MY_PACKAGE_REPLACED
        ) {
            sincronizarRecordatorio(context)
        }
    }
}
