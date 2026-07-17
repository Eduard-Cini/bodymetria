package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.FilterChip
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.TipoFodmap
import com.vidasana.datos.ValorDiario
import com.vidasana.ui.componentes.GraficaLineas
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.SelectorNivel
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.fechaCorta
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import kotlinx.coroutines.launch

/** Reto de reintroducción: un grupo FODMAP con su alimento de prueba y dosis. */
private data class Reto(
    val clave: String,
    val nombre: String,
    val alimento: String,
    val dosis: String, // día 1 · día 2 · día 3
)

// Orden sugerido (Tuck & Barrett 2017); un reto por semana: 3 días de dosis
// creciente + 3-4 días de lavado con la dieta de eliminación estricta.
private val RETOS = listOf(
    Reto("lactosa", "Lactosa", "Leche de vaca", "½ taza · 1 taza · 1½ tazas"),
    Reto("fructosa", "Fructosa en exceso", "Miel de abeja", "1 cdita · 2 cditas · 1 cda"),
    Reto("sorbitol", "Sorbitol", "Aguacate", "¼ pieza · ½ pieza · 1 chica"),
    Reto("manitol", "Manitol", "Champiñones cocidos", "½ taza · 1 taza · 1½ tazas"),
    Reto("gos", "GOS (leguminosas)", "Frijoles escurridos", "¼ taza · ½ taza · ¾ taza"),
    Reto("fructanos_trigo", "Fructanos — trigo", "Pan de caja", "1 · 2 · 3 rebanadas"),
    Reto("fructanos_cebolla", "Fructanos — cebolla", "Cebolla cocida", "1 cda · 2 cdas · 4 cdas"),
    Reto("fructanos_ajo", "Fructanos — ajo", "Ajo cocido", "½ diente · 1 diente · 2 dientes"),
)

private val NOMBRES_FASE = mapOf(
    1 to "Eliminación",
    2 to "Reintroducción",
    3 to "Personalización",
)

private val GUIA_FASE = mapOf(
    1 to "Retira TODOS los alimentos altos en FODMAP durante 2-6 semanas: sin trigo, " +
        "cebolla, ajo, frijoles, lácteos con lactosa, miel/agave ni manzana, pera, mango o " +
        "sandía. Base segura: tortilla de maíz, arroz, papa, avena, carnes y huevo, " +
        "deslactosados y las frutas/verduras permitidas. Registra tus síntomas cada día: " +
        "si en 4-6 semanas no mejoran, esta dieta no es tu herramienta — suspéndela y " +
        "coméntalo con tu médico. El menú completo con recetas está en el sitio web " +
        "(sección FODMAP).",
    2 to "Mantén la base de eliminación y prueba UN grupo a la vez: 3 días con la dosis " +
        "creciente indicada y 3-4 días de lavado antes del siguiente reto. Si un día hay " +
        "síntomas claros, suspende ese reto y márcalo como disparador. Aunque toleres un " +
        "grupo, vuelve a retirarlo hasta terminar todos los retos. Marca abajo el " +
        "resultado de cada grupo.",
    3 to "Arma tu dieta definitiva con los resultados: reincorpora por completo los grupos " +
        "tolerados, modera los de síntomas leves y limita solo los disparadores (re-pruébalos " +
        "en unos meses: la tolerancia cambia). La meta es comer con la MÁXIMA variedad posible; " +
        "la restricción innecesaria empobrece la microbiota.",
)

private val ETIQUETAS_RESULTADO = listOf("Tolerado", "Leve", "Disparador")

/**
 * Protocolo de dieta baja en FODMAP (estándar de oro para SII): eliminación,
 * reintroducción por retos y personalización. Parte de la sección Doctor.
 */
@Composable
fun PantallaFodmap(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()
    val hoy = hoyIso()

    val fases by remember { db.diario().porTipo(TipoFodmap.FASE) }.collectAsState(initial = emptyList())
    val faseActual = fases.firstOrNull() // más reciente (orden DESC)
    val fase = faseActual?.valor?.toInt() ?: 0
    val diasEnFase = faseActual?.let {
        ChronoUnit.DAYS.between(LocalDate.parse(it.fecha), LocalDate.now()).toInt() + 1
    } ?: 0

    val retos by remember { db.diario().porPrefijo(TipoFodmap.PREFIJO_RETO) }.collectAsState(initial = emptyList())
    // Resultado vigente de cada reto = su registro más reciente.
    val resultados = retos.groupBy { it.tipo }.mapValues { (_, lista) -> lista.first() }

    var fecha by remember { mutableStateOf(hoy) }
    val sintomaGuardado by remember(fecha) {
        db.diario().porFecha(fecha, TipoFodmap.SINTOMAS)
    }.collectAsState(initial = null)
    var sintomas by remember { mutableIntStateOf(5) }
    LaunchedEffect(sintomaGuardado, fecha) {
        sintomas = sintomaGuardado?.valor?.toInt() ?: 5
    }
    val historialSintomas by remember {
        db.diario().porTipo(TipoFodmap.SINTOMAS)
    }.collectAsState(initial = emptyList())

    fun guardarFase(nueva: Int) {
        ambito.launch { db.diario().guardar(ValorDiario(hoy, TipoFodmap.FASE, nueva.toFloat())) }
    }

    MarcoPantalla("Dieta FODMAP", nav) {
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(6.dp)) {
                Text(
                    "Protocolo para detectar qué carbohidratos fermentables (FODMAP) te " +
                        "disparan síntomas digestivos: se eliminan todos 2-6 semanas y se " +
                        "reintroducen grupo por grupo. Pensado para intestino irritable ya " +
                        "diagnosticado y, de preferencia, acompañado por un profesional.",
                    style = MaterialTheme.typography.bodyMedium,
                )
                Text(
                    "Si hay sangre en heces, pérdida de peso sin explicación, fiebre o " +
                        "anemia, ve al médico antes de cambiar tu dieta.",
                    style = MaterialTheme.typography.bodySmall,
                    fontStyle = FontStyle.Italic,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        // ── Fase actual ──────────────────────────────────────────────
        TituloApartado("Tu etapa")
        Card(modifier = Modifier.fillMaxWidth()) {
            Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                if (fase == 0) {
                    Text(
                        "Aún no empiezas el protocolo. Revisa primero las listas de " +
                            "alimentos y el menú por etapas en el sitio web y, cuando " +
                            "estés listo, arranca la eliminación.",
                        style = MaterialTheme.typography.bodyMedium,
                    )
                    Button(onClick = { guardarFase(1) }, modifier = Modifier.fillMaxWidth()) {
                        Text("Empezar etapa 1: eliminación")
                    }
                } else {
                    Text(
                        "Etapa $fase de 3: ${NOMBRES_FASE[fase]} — día $diasEnFase " +
                            "(desde ${fechaCorta(faseActual!!.fecha)})",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                        color = MaterialTheme.colorScheme.primary,
                    )
                    Text(GUIA_FASE[fase] ?: "", style = MaterialTheme.typography.bodyMedium)
                    when (fase) {
                        1 -> Button(onClick = { guardarFase(2) }, modifier = Modifier.fillMaxWidth()) {
                            Text("Pasar a etapa 2: reintroducción")
                        }
                        2 -> Button(onClick = { guardarFase(3) }, modifier = Modifier.fillMaxWidth()) {
                            Text("Pasar a etapa 3: personalización")
                        }
                        else -> OutlinedButton(onClick = { guardarFase(1) }, modifier = Modifier.fillMaxWidth()) {
                            Text("Reiniciar protocolo (volver a eliminación)")
                        }
                    }
                }
            }
        }

        // ── Síntomas diarios ─────────────────────────────────────────
        TituloApartado("Síntomas digestivos del día")
        Text(
            "Califica dolor, inflamación, gases o cambios en evacuaciones. En " +
                "eliminación deberían bajar; en los retos, un pico señala al grupo.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        SelectorFecha(fecha) { fecha = it }
        SelectorNivel("Severidad (1 = sin molestias, 10 = muy fuertes)", sintomas, { sintomas = it })
        Button(
            onClick = {
                ambito.launch {
                    db.diario().guardar(ValorDiario(fecha, TipoFodmap.SINTOMAS, sintomas.toFloat()))
                }
            },
            modifier = Modifier.fillMaxWidth(),
        ) { Text(if (sintomaGuardado != null) "Actualizar" else "Guardar") }

        val puntos = puntosDesde(historialSintomas.map { it.fecha to it.valor })
        if (puntos.isNotEmpty()) {
            PanelEstadisticas(puntos, "/10", decimales = 1)
            GraficaLineas(puntos, "/10", decimales = 0)
        }

        // ── Retos de reintroducción ──────────────────────────────────
        TituloApartado("Retos de reintroducción (etapa 2)")
        Text(
            "Un grupo por semana, en este orden sugerido. Al terminar cada reto " +
                "marca cómo te fue; con eso se arma tu resumen personalizado.",
            style = MaterialTheme.typography.bodySmall,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )
        RETOS.forEach { reto ->
            val tipo = TipoFodmap.PREFIJO_RETO + reto.clave
            TarjetaReto(
                reto = reto,
                resultado = resultados[tipo]?.valor?.toInt(),
                onResultado = { valor ->
                    ambito.launch {
                        val actual = resultados[tipo]
                        if (actual != null && actual.valor.toInt() == valor) {
                            db.diario().borrar(actual.fecha, tipo) // re-tocar = quitar
                        } else {
                            db.diario().guardar(ValorDiario(hoy, tipo, valor.toFloat()))
                        }
                    }
                },
            )
        }

        // ── Resumen personalizado ────────────────────────────────────
        if (resultados.isNotEmpty()) {
            TituloApartado("Tu resumen (etapa 3)")
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
                    ResumenLinea("Reincorpora sin miedo", 0, resultados)
                    ResumenLinea("Con moderación (porciones chicas)", 1, resultados)
                    ResumenLinea("Limita y re-prueba en unos meses", 2, resultados)
                }
            }
        }

        Text(
            "Las listas de alimentos, el menú de 7 días con recetas y las dosis " +
                "completas de cada reto están en el sitio web de Bodymetria, sección " +
                "FODMAP. Evidencia: Halmos 2014; Whelan 2018; Black 2022 (ver " +
                "bibliografía del sitio). No sustituye consejo médico.",
            style = MaterialTheme.typography.bodySmall,
            fontStyle = FontStyle.Italic,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            modifier = Modifier.padding(top = 8.dp),
        )
    }
}

@Composable
private fun TarjetaReto(
    reto: Reto,
    resultado: Int?,
    onResultado: (Int) -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(4.dp)) {
            Text(reto.nombre, style = MaterialTheme.typography.titleSmall, fontWeight = FontWeight.SemiBold)
            Text(
                "${reto.alimento}: ${reto.dosis}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                ETIQUETAS_RESULTADO.forEachIndexed { valor, etiqueta ->
                    FilterChip(
                        selected = resultado == valor,
                        onClick = { onResultado(valor) },
                        label = { Text(etiqueta) },
                    )
                }
            }
        }
    }
}

@Composable
private fun ResumenLinea(titulo: String, valor: Int, resultados: Map<String, ValorDiario>) {
    val nombres = RETOS.filter {
        resultados[TipoFodmap.PREFIJO_RETO + it.clave]?.valor?.toInt() == valor
    }.map { it.nombre }
    if (nombres.isNotEmpty()) {
        Text(
            "$titulo: ${nombres.joinToString(", ")}",
            style = MaterialTheme.typography.bodyMedium,
        )
    }
}
