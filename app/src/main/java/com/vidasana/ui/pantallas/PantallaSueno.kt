package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
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
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.RegistroSueno
import com.vidasana.ui.componentes.FilaHistorial
import com.vidasana.ui.componentes.GraficaLineas
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.SelectorNivel
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.etiquetaFecha
import com.vidasana.ui.componentes.formatear
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import kotlinx.coroutines.launch

private val PATRON_HORA = Regex("^([01]?\\d|2[0-3]):[0-5]\\d$")

private fun horaValida(h: String) = PATRON_HORA.matches(h)

/** Campo de hora HH:mm que inserta los dos puntos automáticamente. */
@Composable
private fun CampoHora(valor: String, onCambio: (String) -> Unit, etiqueta: String, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = valor,
        onValueChange = { nuevo ->
            val digitos = nuevo.filter { it.isDigit() }.take(4)
            onCambio(if (digitos.length > 2) "${digitos.take(2)}:${digitos.drop(2)}" else digitos)
        },
        label = { Text(etiqueta) },
        placeholder = { Text("23:30") },
        singleLine = true,
        isError = valor.isNotEmpty() && !horaValida(valor),
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
        modifier = modifier,
    )
}

/** Sección 4: sueño (horas, calificación). */
@Composable
fun PantallaSueno(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var horaDormir by remember { mutableStateOf("") }
    var horaDespertar by remember { mutableStateOf("") }
    var calificacion by remember { mutableIntStateOf(3) }

    val existente by remember(fecha) { db.sueno().porFecha(fecha) }.collectAsState(initial = null)
    LaunchedEffect(existente, fecha) {
        horaDormir = existente?.horaDormir ?: ""
        horaDespertar = existente?.horaDespertar ?: ""
        calificacion = existente?.calificacion ?: 3
    }

    val historial by remember { db.sueno().todos() }.collectAsState(initial = emptyList())
    val puntosHoras = puntosDesde(historial.map { it.fecha to it.duracionHoras })

    val valido = horaValida(horaDormir) && horaValida(horaDespertar)
    val duracion = if (valido) RegistroSueno(fecha, horaDormir, horaDespertar, calificacion).duracionHoras else null

    MarcoPantalla("Sueño", nav) {
        SelectorFecha(fecha) { fecha = it }

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            CampoHora(horaDormir, { horaDormir = it }, "Hora de dormir", Modifier.weight(1f))
            CampoHora(horaDespertar, { horaDespertar = it }, "Hora de despertar", Modifier.weight(1f))
        }
        if (duracion != null) {
            Text(
                "Dormiste ${formatear(duracion, 1)} horas",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
            )
        }
        SelectorNivel("Calificación del sueño", calificacion, { calificacion = it }, maximo = 5)

        Button(
            onClick = {
                ambito.launch {
                    db.sueno().guardar(RegistroSueno(fecha, horaDormir, horaDespertar, calificacion))
                }
            },
            enabled = valido,
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }

        PanelEstadisticas(puntosHoras, "h", decimales = 1)
        GraficaLineas(puntosHoras, "h", decimales = 1)

        if (historial.isNotEmpty()) {
            TituloApartado("Historial")
            historial.take(14).forEach { r ->
                FilaHistorial(
                    titulo = "${etiquetaFecha(r.fecha)} — ${formatear(r.duracionHoras, 1)} h",
                    subtitulo = "${r.horaDormir} → ${r.horaDespertar} · calificación ${r.calificacion}/5",
                    onBorrar = { ambito.launch { db.sueno().borrar(r.fecha) } },
                )
            }
        }
    }
}
