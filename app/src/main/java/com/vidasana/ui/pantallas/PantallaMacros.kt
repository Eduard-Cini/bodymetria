package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.RegistroMacros
import com.vidasana.datos.calcularMetas
import com.vidasana.datos.flujoPerfil
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.FilaHistorial
import com.vidasana.ui.componentes.GraficaBarras
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.etiquetaFecha
import com.vidasana.ui.componentes.formatear
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import java.time.LocalDate
import kotlinx.coroutines.launch

/** Sección 1: macros por día. */
@Composable
fun PantallaMacros(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var proteinas by remember { mutableStateOf("") }
    var carbohidratos by remember { mutableStateOf("") }
    var grasas by remember { mutableStateOf("") }

    val existente by remember(fecha) { db.macros().porFecha(fecha) }.collectAsState(initial = null)
    LaunchedEffect(existente, fecha) {
        proteinas = existente?.proteinasG?.let { formatear(it, 1) } ?: ""
        carbohidratos = existente?.carbohidratosG?.let { formatear(it, 1) } ?: ""
        grasas = existente?.grasasG?.let { formatear(it, 1) } ?: ""
    }

    val historial by remember { db.macros().todos() }.collectAsState(initial = emptyList())
    val puntosKcal = puntosDesde(historial.map { it.fecha to it.calorias })

    val kcal = (proteinas.toFloatOrNull() ?: 0f) * 4 +
        (carbohidratos.toFloatOrNull() ?: 0f) * 4 +
        (grasas.toFloatOrNull() ?: 0f) * 9

    // Meta de calorías y macros según el perfil, el último peso registrado y
    // la media diaria REAL de gasto por ejercicio (últimos 7 días).
    val perfil by remember { flujoPerfil(contexto) }.collectAsState(initial = null)
    val composiciones by remember { db.composicion().todos() }.collectAsState(initial = emptyList())
    val sesiones by remember { db.ejercicio().sesionesCompletas() }.collectAsState(initial = emptyList())
    val hace7 = LocalDate.now().minusDays(6).toString()
    val mediaEjercicio = sesiones
        .filter { it.sesion.fecha >= hace7 }
        .sumOf { it.sesion.gastoKcal } / 7f
    val metas = perfil?.let { calcularMetas(it, composiciones.firstOrNull()?.pesoKg, mediaEjercicio) }

    MarcoPantalla("Macros", nav) {
        SelectorFecha(fecha) { fecha = it }

        if (metas != null) {
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        "Tu meta — ${metas.objetivoRector}",
                        style = MaterialTheme.typography.labelMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                    Text(
                        "${formatear(metas.kcal, 0)} kcal · P ${formatear(metas.proteinasG, 0)} g · " +
                            "C ${formatear(metas.carbohidratosG, 0)} g · G ${formatear(metas.grasasG, 0)} g",
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.Bold,
                    )
                    LinearProgressIndicator(
                        progress = { (kcal / metas.kcal).coerceIn(0f, 1f) },
                        modifier = Modifier.fillMaxWidth().padding(vertical = 8.dp),
                    )
                    Text(
                        "Llevas ${formatear(kcal, 0)} de ${formatear(metas.kcal, 0)} kcal este día",
                        style = MaterialTheme.typography.bodyMedium,
                    )
                    Text(
                        metas.nota,
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                }
            }
        } else {
            Text(
                "Registra tu peso en Composición y completa tu perfil para ver tu meta " +
                    "de calorías y macros.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            CampoNumero(proteinas, { proteinas = it }, "Proteína", "g", modifier = Modifier.weight(1f))
            CampoNumero(carbohidratos, { carbohidratos = it }, "Carbos", "g", modifier = Modifier.weight(1f))
            CampoNumero(grasas, { grasas = it }, "Grasa", "g", modifier = Modifier.weight(1f))
        }
        Text(
            "Total: ${formatear(kcal, 0)} kcal",
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
        )

        Button(
            onClick = {
                val p = proteinas.toFloatOrNull() ?: return@Button
                val c = carbohidratos.toFloatOrNull() ?: return@Button
                val g = grasas.toFloatOrNull() ?: return@Button
                ambito.launch { db.macros().guardar(RegistroMacros(fecha, p, c, g)) }
            },
            enabled = proteinas.isNotEmpty() && carbohidratos.isNotEmpty() && grasas.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }

        PanelEstadisticas(puntosKcal, "kcal", decimales = 0)
        GraficaBarras(puntosKcal, "kcal")

        if (historial.isNotEmpty()) {
            TituloApartado("Historial")
            historial.take(14).forEach { r ->
                FilaHistorial(
                    titulo = "${etiquetaFecha(r.fecha)} — ${formatear(r.calorias, 0)} kcal",
                    subtitulo = "P ${formatear(r.proteinasG, 1)} g · C ${formatear(r.carbohidratosG, 1)} g · G ${formatear(r.grasasG, 1)} g",
                    onBorrar = { ambito.launch { db.macros().borrar(r.fecha) } },
                )
            }
        }
    }
}
