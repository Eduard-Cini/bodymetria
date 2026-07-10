package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
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
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.RegistroComposicion
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.FilaHistorial
import com.vidasana.ui.componentes.GraficaLineas
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.etiquetaFecha
import com.vidasana.ui.componentes.formatear
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import kotlinx.coroutines.launch

/** Sección 3: peso, músculo y % de grasa. */
@Composable
fun PantallaComposicion(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var peso by remember { mutableStateOf("") }
    var musculo by remember { mutableStateOf("") }
    var grasa by remember { mutableStateOf("") }

    val existente by remember(fecha) { db.composicion().porFecha(fecha) }.collectAsState(initial = null)
    LaunchedEffect(existente, fecha) {
        peso = existente?.pesoKg?.let { formatear(it, 1) } ?: ""
        musculo = existente?.musculoKg?.let { formatear(it, 1) } ?: ""
        grasa = existente?.grasaPct?.let { formatear(it, 1) } ?: ""
    }

    val historial by remember { db.composicion().todos() }.collectAsState(initial = emptyList())
    val puntosPeso = puntosDesde(historial.map { it.fecha to it.pesoKg })

    MarcoPantalla("Composición corporal", nav) {
        SelectorFecha(fecha) { fecha = it }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            CampoNumero(peso, { peso = it }, "Peso", "kg", modifier = Modifier.weight(1f))
            CampoNumero(musculo, { musculo = it }, "Músculo", "kg", modifier = Modifier.weight(1f))
            CampoNumero(grasa, { grasa = it }, "Grasa", "%", modifier = Modifier.weight(1f))
        }

        Button(
            onClick = {
                val p = peso.toFloatOrNull() ?: return@Button
                ambito.launch {
                    db.composicion().guardar(
                        RegistroComposicion(fecha, p, musculo.toFloatOrNull(), grasa.toFloatOrNull()),
                    )
                }
            },
            enabled = peso.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }

        PanelEstadisticas(puntosPeso, "kg", decimales = 1)
        GraficaLineas(puntosPeso, "kg", decimales = 1)

        if (historial.isNotEmpty()) {
            TituloApartado("Historial")
            historial.take(14).forEach { r ->
                val partes = mutableListOf<String>()
                r.musculoKg?.let { partes += "músculo ${formatear(it, 1)} kg" }
                r.grasaPct?.let { partes += "grasa ${formatear(it, 1)} %" }
                FilaHistorial(
                    titulo = "${etiquetaFecha(r.fecha)} — ${formatear(r.pesoKg, 1)} kg",
                    subtitulo = partes.joinToString(" · "),
                    onBorrar = { ambito.launch { db.composicion().borrar(r.fecha) } },
                )
            }
        }
    }
}
