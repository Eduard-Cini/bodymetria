package com.vidasana.ui.componentes

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.nativeCanvas
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import java.time.LocalDate
import java.util.Locale

data class PuntoFecha(val fecha: LocalDate, val valor: Float)

/** Convierte pares (fechaIso, valor) a puntos ordenados por fecha ascendente. */
fun puntosDesde(pares: List<Pair<String, Float>>): List<PuntoFecha> =
    pares.map { PuntoFecha(LocalDate.parse(it.first), it.second) }.sortedBy { it.fecha }

fun formatear(v: Float, decimales: Int): String =
    String.format(Locale.US, "%.${decimales}f", v).removeSuffix(".0")

/** Media de los valores en la ventana [desde, hasta] (inclusive). */
private fun media(datos: List<PuntoFecha>, desde: LocalDate, hasta: LocalDate): Float? {
    val v = datos.filter { it.fecha in desde..hasta }.map { it.valor }
    return if (v.isEmpty()) null else v.sum() / v.size
}

/** Tiles con media de 7 días, media de 30 y tendencia (media 7d vs 7d previos). */
@Composable
fun PanelEstadisticas(datos: List<PuntoFecha>, unidad: String, decimales: Int = 1) {
    if (datos.isEmpty()) return
    val hoy = LocalDate.now()
    val media7 = media(datos, hoy.minusDays(6), hoy)
    val media30 = media(datos, hoy.minusDays(29), hoy)
    val media7Previa = media(datos, hoy.minusDays(13), hoy.minusDays(7))
    val tendencia = if (media7 != null && media7Previa != null) media7 - media7Previa else null

    Row(horizontalArrangement = Arrangement.spacedBy(8.dp), modifier = Modifier.fillMaxWidth()) {
        Tile("Media 7 días", media7?.let { "${formatear(it, decimales)} $unidad" } ?: "—", Modifier.weight(1f))
        Tile("Media 30 días", media30?.let { "${formatear(it, decimales)} $unidad" } ?: "—", Modifier.weight(1f))
        Tile(
            "Tendencia",
            tendencia?.let { (if (it >= 0) "▲ +" else "▼ ") + formatear(it, decimales) } ?: "—",
            Modifier.weight(1f),
        )
    }
}

@Composable
private fun Tile(titulo: String, valor: String, modifier: Modifier = Modifier) {
    Card(modifier = modifier) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                titulo,
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Text(
                valor,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
            )
        }
    }
}

private const val DIAS_VENTANA = 30L

/**
 * Gráfica de líneas de los últimos 30 días. Una sola serie (color primario),
 * rejilla discreta, etiquetas de mín/máx y del último valor.
 */
@Composable
fun GraficaLineas(
    datos: List<PuntoFecha>,
    unidad: String,
    decimales: Int = 1,
    desdeCero: Boolean = false,
) {
    GraficaBase(datos, unidad, decimales, desdeCero, barras = false)
}

/** Gráfica de barras (magnitudes desde cero) de los últimos 30 días. */
@Composable
fun GraficaBarras(
    datos: List<PuntoFecha>,
    unidad: String,
    decimales: Int = 0,
) {
    GraficaBase(datos, unidad, decimales, desdeCero = true, barras = true)
}

@Composable
private fun GraficaBase(
    datos: List<PuntoFecha>,
    unidad: String,
    decimales: Int,
    desdeCero: Boolean,
    barras: Boolean,
) {
    val hoy = LocalDate.now()
    val inicio = hoy.minusDays(DIAS_VENTANA - 1)
    val visibles = datos.filter { it.fecha >= inicio && it.fecha <= hoy }

    if (visibles.size < 2) {
        Card(modifier = Modifier.fillMaxWidth()) {
            Box(modifier = Modifier.fillMaxWidth().height(120.dp), contentAlignment = Alignment.Center) {
                Text(
                    "Registra al menos dos días para ver la gráfica",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
        return
    }

    val colorSerie = MaterialTheme.colorScheme.primary
    val colorTexto = MaterialTheme.colorScheme.onSurfaceVariant
    val colorRejilla = MaterialTheme.colorScheme.outlineVariant
    val tamTexto = with(LocalDensity.current) { 11.sp.toPx() }

    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(12.dp)) {
            Text(
                "Últimos 30 días",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Canvas(modifier = Modifier.fillMaxWidth().height(180.dp).padding(top = 8.dp)) {
                dibujarGrafica(
                    visibles, inicio, hoy, desdeCero, barras,
                    colorSerie, colorTexto, colorRejilla, tamTexto, decimales, unidad,
                )
            }
        }
    }
}

private fun DrawScope.dibujarGrafica(
    datos: List<PuntoFecha>,
    inicio: LocalDate,
    fin: LocalDate,
    desdeCero: Boolean,
    barras: Boolean,
    colorSerie: androidx.compose.ui.graphics.Color,
    colorTexto: androidx.compose.ui.graphics.Color,
    colorRejilla: androidx.compose.ui.graphics.Color,
    tamTexto: Float,
    decimales: Int,
    unidad: String,
) {
    val margenInf = tamTexto * 1.8f
    val margenSup = tamTexto * 1.6f
    val alto = size.height - margenInf - margenSup
    val ancho = size.width

    val valores = datos.map { it.valor }
    var vMin = if (desdeCero) 0f else valores.min()
    var vMax = valores.max()
    if (vMax == vMin) { vMax += 1f; vMin = if (desdeCero) 0f else vMin - 1f }

    fun y(v: Float) = margenSup + alto * (1 - (v - vMin) / (vMax - vMin))
    val totalDias = (fin.toEpochDay() - inicio.toEpochDay()).toInt() + 1
    fun x(fecha: LocalDate): Float {
        val i = (fecha.toEpochDay() - inicio.toEpochDay()).toFloat()
        return if (barras) ancho * (i + 0.5f) / totalDias
        else ancho * if (totalDias == 1) 0.5f else i / (totalDias - 1)
    }

    val pintura = android.graphics.Paint().apply {
        color = android.graphics.Color.argb(
            (colorTexto.alpha * 255).toInt(),
            (colorTexto.red * 255).toInt(),
            (colorTexto.green * 255).toInt(),
            (colorTexto.blue * 255).toInt(),
        )
        textSize = tamTexto
        isAntiAlias = true
    }

    // Rejilla discreta: mín, medio y máx
    listOf(vMin, (vMin + vMax) / 2, vMax).forEach { v ->
        drawLine(colorRejilla, Offset(0f, y(v)), Offset(ancho, y(v)), strokeWidth = 1f)
        drawContext.canvas.nativeCanvas.drawText(formatear(v, decimales), 4f, y(v) - 4f, pintura)
    }

    if (barras) {
        val anchoBarra = (ancho / totalDias) * 0.7f
        datos.forEach { p ->
            val yV = y(p.valor)
            drawRoundRect(
                color = colorSerie,
                topLeft = Offset(x(p.fecha) - anchoBarra / 2, yV),
                size = Size(anchoBarra, y(vMin) - yV),
                cornerRadius = CornerRadius(4f, 4f),
            )
        }
    } else {
        val camino = Path()
        datos.forEachIndexed { i, p ->
            if (i == 0) camino.moveTo(x(p.fecha), y(p.valor)) else camino.lineTo(x(p.fecha), y(p.valor))
        }
        drawPath(camino, colorSerie, style = Stroke(width = 2.dp.toPx()))
        datos.forEach { p -> drawCircle(colorSerie, radius = 3.dp.toPx(), center = Offset(x(p.fecha), y(p.valor))) }
    }

    // Etiqueta directa del último valor
    val ultimo = datos.last()
    val texto = "${formatear(ultimo.valor, decimales)} $unidad"
    val anchoTexto = pintura.measureText(texto)
    val xEtiqueta = (x(ultimo.fecha) - anchoTexto / 2).coerceIn(0f, ancho - anchoTexto)
    drawContext.canvas.nativeCanvas.drawText(
        texto, xEtiqueta, (y(ultimo.valor) - tamTexto * 0.6f).coerceAtLeast(tamTexto), pintura,
    )

    // Fechas de los extremos
    val pinturaFecha = android.graphics.Paint(pintura).apply { textSize = tamTexto * 0.9f }
    drawContext.canvas.nativeCanvas.drawText(
        fechaCorta(datos.first().fecha.toString()), 4f, size.height - 4f, pinturaFecha,
    )
    val fechaFin = fechaCorta(datos.last().fecha.toString())
    drawContext.canvas.nativeCanvas.drawText(
        fechaFin, ancho - pinturaFecha.measureText(fechaFin) - 4f, size.height - 4f, pinturaFecha,
    )
}
