package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.UsoApp
import com.vidasana.ui.componentes.CampoConSugerencias
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.FilaHistorial
import com.vidasana.ui.componentes.GraficaBarras
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import kotlinx.coroutines.launch

private val APPS_COMUNES = listOf(
    "YouTube", "WhatsApp", "Facebook", "Instagram", "TikTok", "X (Twitter)",
    "Telegram", "Messenger", "Chrome", "Gmail", "Spotify", "Netflix",
    "Reddit", "Discord", "Juegos",
)

/** Sección 9: tiempo de uso del celular desglosado por aplicación. */
@Composable
fun PantallaUsoCelular(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var app by remember { mutableStateOf("") }
    var minutos by remember { mutableStateOf("") }

    val delDia by remember(fecha) { db.usoApps().delDia(fecha) }.collectAsState(initial = emptyList())
    val totales by remember { db.usoApps().totalesPorDia() }.collectAsState(initial = emptyList())
    val puntos = puntosDesde(totales.map { it.fecha to it.minutos.toFloat() })

    // Sugerencias: apps ya registradas antes + las comunes.
    var usadas by remember { mutableStateOf(listOf<String>()) }
    LaunchedEffect(totales) { usadas = db.usoApps().appsUsadas() }
    val sugerencias = (usadas + APPS_COMUNES).distinct()

    MarcoPantalla("Uso del celular", nav) {
        SelectorFecha(fecha) { fecha = it }

        Row(
            horizontalArrangement = Arrangement.spacedBy(8.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            CampoConSugerencias(
                valor = app,
                onCambio = { app = it },
                etiqueta = "Aplicación",
                sugerencias = sugerencias,
                modifier = Modifier.weight(1.4f),
            )
            CampoNumero(minutos, { minutos = it }, "Minutos", entero = true, modifier = Modifier.weight(1f))
        }
        Button(
            onClick = {
                val m = minutos.toIntOrNull() ?: return@Button
                ambito.launch {
                    db.usoApps().guardar(UsoApp(fecha, app.trim(), m))
                    app = ""
                    minutos = ""
                }
            },
            enabled = app.isNotBlank() && minutos.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Añadir app") }

        if (delDia.isNotEmpty()) {
            Text(
                "Total del día: ${delDia.sumOf { it.minutos }} min",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
            )
            delDia.forEach { u ->
                FilaHistorial(
                    titulo = u.app,
                    subtitulo = "${u.minutos} min",
                    onBorrar = { ambito.launch { db.usoApps().borrar(u) } },
                )
            }
        }

        TituloApartado("Total por día")
        PanelEstadisticas(puntos, "min", decimales = 0)
        GraficaBarras(puntos, "min")
    }
}
