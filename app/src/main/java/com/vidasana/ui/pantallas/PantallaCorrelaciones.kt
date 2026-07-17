package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.TipoDiario
import com.vidasana.datos.TipoFodmap
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.formatear
import java.time.LocalDate
import kotlin.math.abs
import kotlin.math.sqrt

private const val DIAS_ANALISIS = 90L
private const val MIN_DIAS = 10

/** Serie de un valor por día (fecha ISO → valor) para correlacionar. */
private data class SerieDiaria(
    val nombre: String,
    val valores: Map<String, Float>,
    /** Frase para el lado izquierdo: "Los días con <fraseCon>, …". */
    val fraseCon: String,
    /** Frases para el lado derecho cuando el par sube / baja junto con el izquierdo. */
    val fraseSube: String = "",
    val fraseBaja: String = "",
    /** true = un día sin registro vale 0 (p. ej. ejercicio: sin sesión = 0 min). */
    val ceroSiFalta: Boolean = false,
)

private data class ResultadoPar(
    val a: SerieDiaria,
    val b: SerieDiaria,
    val r: Float?, // null = sin datos suficientes o sin variación
    val n: Int,
)

/** Correlación de Pearson; null si alguna serie no varía. */
private fun pearson(x: List<Float>, y: List<Float>): Float? {
    val mx = x.average()
    val my = y.average()
    var sxy = 0.0
    var sxx = 0.0
    var syy = 0.0
    for (i in x.indices) {
        val dx = x[i] - mx
        val dy = y[i] - my
        sxy += dx * dy
        sxx += dx * dx
        syy += dy * dy
    }
    if (sxx == 0.0 || syy == 0.0) return null
    return (sxy / sqrt(sxx * syy)).toFloat()
}

/** Empareja por fecha (solo días con ambos datos, salvo series con ceroSiFalta). */
private fun correlacionar(a: SerieDiaria, b: SerieDiaria): ResultadoPar {
    val fechas = when {
        a.ceroSiFalta -> b.valores.keys
        b.ceroSiFalta -> a.valores.keys
        else -> a.valores.keys intersect b.valores.keys
    }
    val pares = fechas.mapNotNull { f ->
        val va = a.valores[f] ?: if (a.ceroSiFalta) 0f else return@mapNotNull null
        val vb = b.valores[f] ?: if (b.ceroSiFalta) 0f else return@mapNotNull null
        va to vb
    }
    val r = if (pares.size >= MIN_DIAS) pearson(pares.map { it.first }, pares.map { it.second }) else null
    return ResultadoPar(a, b, r, pares.size)
}

private fun fuerza(r: Float): String = when {
    abs(r) >= 0.6f -> "fuerte"
    abs(r) >= 0.3f -> "moderada"
    abs(r) >= 0.15f -> "débil"
    else -> "sin relación clara"
}

private fun lectura(p: ResultadoPar): String {
    val r = p.r ?: return ""
    return if (abs(r) < 0.15f) {
        "En tus datos no se ve una relación consistente entre " +
            "${p.a.nombre.lowercase()} y ${p.b.nombre.lowercase()}."
    } else {
        "Los días con ${p.a.fraseCon}, ${if (r > 0) p.b.fraseSube else p.b.fraseBaja}."
    }
}

/**
 * Correlaciones entre secciones sobre los últimos 90 días. Solo describe
 * asociaciones en TUS datos: correlación no implica causalidad.
 */
@Composable
fun PantallaCorrelaciones(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val desde = remember { LocalDate.now().minusDays(DIAS_ANALISIS - 1).toString() }

    val sueno by remember { db.sueno().todos() }.collectAsState(initial = emptyList())
    val animo by remember { db.diario().porTipo(TipoDiario.ANIMO) }.collectAsState(initial = emptyList())
    val estres by remember { db.diario().porTipo(TipoDiario.ESTRES) }.collectAsState(initial = emptyList())
    val meditacion by remember { db.diario().porTipo(TipoDiario.MEDITACION) }.collectAsState(initial = emptyList())
    val sintomas by remember { db.diario().porTipo(TipoFodmap.SINTOMAS) }.collectAsState(initial = emptyList())
    val sesiones by remember { db.ejercicio().sesionesCompletas() }.collectAsState(initial = emptyList())
    val celular by remember { db.usoApps().totalesPorDia() }.collectAsState(initial = emptyList())

    val resultados = remember(sueno, animo, estres, meditacion, sintomas, sesiones, celular) {
        fun deDiario(lista: List<com.vidasana.datos.ValorDiario>) =
            lista.filter { it.fecha >= desde }.associate { it.fecha to it.valor }

        val horasSueno = SerieDiaria(
            "Horas de sueño",
            sueno.filter { it.fecha >= desde }.associate { it.fecha to it.duracionHoras },
            fraseCon = "más horas de sueño",
            fraseSube = "duermes más", fraseBaja = "duermes menos",
        )
        val califSueno = SerieDiaria(
            "Calificación del sueño",
            sueno.filter { it.fecha >= desde }.associate { it.fecha to it.calificacion.toFloat() },
            fraseCon = "sueño mejor calificado",
            fraseSube = "calificas mejor tu sueño", fraseBaja = "calificas peor tu sueño",
        )
        val sAnimo = SerieDiaria(
            "Ánimo", deDiario(animo),
            fraseCon = "mejor ánimo",
            fraseSube = "tu ánimo tiende a ser mejor", fraseBaja = "tu ánimo tiende a ser peor",
        )
        val sEstres = SerieDiaria(
            "Estrés", deDiario(estres),
            fraseCon = "más estrés",
            fraseSube = "tu estrés tiende a ser mayor", fraseBaja = "tu estrés tiende a ser menor",
        )
        val sMeditacion = SerieDiaria(
            "Meditación", deDiario(meditacion),
            fraseCon = "meditación", // binaria: "los días con meditación"
        )
        val sSintomas = SerieDiaria(
            "Síntomas digestivos", deDiario(sintomas),
            fraseCon = "más síntomas digestivos",
            fraseSube = "tus síntomas digestivos tienden a ser mayores",
            fraseBaja = "tus síntomas digestivos tienden a ser menores",
        )
        val ejercicioMin = SerieDiaria(
            "Minutos de ejercicio",
            sesiones.map { it.sesion }.filter { it.fecha >= desde }
                .groupBy { it.fecha }
                .mapValues { (_, lista) -> lista.sumOf { it.duracionMin }.toFloat() },
            fraseCon = "más minutos de ejercicio",
            ceroSiFalta = true, // sin sesión registrada = 0 min ese día
        )
        val celularMin = SerieDiaria(
            "Minutos de celular",
            celular.filter { it.fecha >= desde }.associate { it.fecha to it.minutos.toFloat() },
            fraseCon = "más minutos de celular",
        )

        listOf(
            correlacionar(horasSueno, sAnimo),
            correlacionar(horasSueno, sEstres),
            correlacionar(califSueno, sAnimo),
            correlacionar(sEstres, sAnimo),
            correlacionar(sMeditacion, sEstres),
            correlacionar(ejercicioMin, sAnimo),
            correlacionar(ejercicioMin, califSueno),
            correlacionar(celularMin, horasSueno),
            correlacionar(sEstres, sSintomas),
        )
    }

    val conDatos = resultados.filter { it.r != null }.sortedByDescending { abs(it.r!!) }
    val sinDatos = resultados.filter { it.r == null }

    MarcoPantalla("Correlaciones", nav) {
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    "Cruza tus registros de los últimos 90 días y mide qué tan juntos " +
                        "se mueven (correlación de Pearson). Cada par necesita al menos " +
                        "$MIN_DIAS días con ambos datos.",
                    style = MaterialTheme.typography.bodyMedium,
                )
                Text(
                    "Correlación no es causalidad: dormir poco puede bajar tu ánimo, " +
                        "pero un mal día también puede quitarte el sueño. Úsalo como " +
                        "pista de qué observar, no como veredicto.",
                    style = MaterialTheme.typography.bodySmall,
                    fontStyle = FontStyle.Italic,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        if (conDatos.isEmpty()) {
            Text(
                "Todavía no hay pares con suficientes días en común. Sigue registrando " +
                    "(sueño, ánimo, estrés, ejercicio…) y aquí aparecerán tus patrones.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        conDatos.forEach { p ->
            val r = p.r!!
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        Text(
                            "${p.a.nombre} ↔ ${p.b.nombre}",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.weight(1f),
                        )
                        Text(
                            "r = ${if (r >= 0) "+" else ""}${formatear(r, 2)}",
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.Bold,
                            color = if (abs(r) >= 0.3f) MaterialTheme.colorScheme.primary
                            else MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                    Text(lectura(p), style = MaterialTheme.typography.bodyMedium)
                    Text(
                        "Relación ${fuerza(r)} · ${p.n} días con ambos datos",
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }

        if (sinDatos.isNotEmpty()) {
            TituloApartado("Aún sin datos suficientes")
            sinDatos.forEach { p ->
                Text(
                    "• ${p.a.nombre} ↔ ${p.b.nombre} (${p.n} de $MIN_DIAS días necesarios)",
                    style = MaterialTheme.typography.bodySmall,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}
