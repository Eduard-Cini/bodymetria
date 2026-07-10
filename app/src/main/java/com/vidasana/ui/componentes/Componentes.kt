package com.vidasana.ui.componentes

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowLeft
import androidx.compose.material.icons.automirrored.filled.KeyboardArrowRight
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Slider
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.Locale
import kotlin.math.roundToInt

fun hoyIso(): String = LocalDate.now().toString()

private val formatoCorto = DateTimeFormatter.ofPattern("d MMM", Locale("es"))
private val formatoLargo = DateTimeFormatter.ofPattern("EEEE d 'de' MMMM", Locale("es"))

fun etiquetaFecha(fechaIso: String): String {
    val fecha = LocalDate.parse(fechaIso)
    val hoy = LocalDate.now()
    return when (fecha) {
        hoy -> "Hoy"
        hoy.minusDays(1) -> "Ayer"
        else -> fecha.format(formatoLargo).replaceFirstChar { it.uppercase() }
    }
}

fun fechaCorta(fechaIso: String): String = LocalDate.parse(fechaIso).format(formatoCorto)

/** Pantalla estándar de sección: barra superior con flecha atrás + columna con scroll. */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MarcoPantalla(
    titulo: String,
    nav: NavHostController,
    contenido: @Composable ColumnScope.() -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(titulo) },
                navigationIcon = {
                    IconButton(onClick = { nav.popBackStack() }) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, contentDescription = "Atrás")
                    }
                },
            )
        },
    ) { relleno ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(relleno)
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 16.dp)
                .padding(bottom = 24.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
            content = contenido,
        )
    }
}

/** Navegación por días: ← Hoy → (no permite ir al futuro). */
@Composable
fun SelectorFecha(fecha: String, onCambio: (String) -> Unit) {
    val actual = LocalDate.parse(fecha)
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically,
    ) {
        IconButton(onClick = { onCambio(actual.minusDays(1).toString()) }) {
            Icon(Icons.AutoMirrored.Filled.KeyboardArrowLeft, contentDescription = "Día anterior")
        }
        Text(
            etiquetaFecha(fecha),
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.SemiBold,
        )
        IconButton(
            onClick = { onCambio(actual.plusDays(1).toString()) },
            enabled = actual < LocalDate.now(),
        ) {
            Icon(Icons.AutoMirrored.Filled.KeyboardArrowRight, contentDescription = "Día siguiente")
        }
    }
}

/** Campo numérico con filtrado de entrada (dígitos y un punto decimal). */
@Composable
fun CampoNumero(
    valor: String,
    onCambio: (String) -> Unit,
    etiqueta: String,
    sufijo: String = "",
    entero: Boolean = false,
    modifier: Modifier = Modifier,
) {
    OutlinedTextField(
        value = valor,
        onValueChange = { nuevo ->
            val filtrado = if (entero) {
                nuevo.filter { it.isDigit() }
            } else {
                val limpio = nuevo.replace(',', '.').filter { it.isDigit() || it == '.' }
                if (limpio.count { it == '.' } <= 1) limpio else valor
            }
            onCambio(filtrado)
        },
        label = { Text(etiqueta) },
        suffix = if (sufijo.isNotEmpty()) ({ Text(sufijo) }) else null,
        singleLine = true,
        keyboardOptions = KeyboardOptions(
            keyboardType = if (entero) KeyboardType.Number else KeyboardType.Decimal,
        ),
        modifier = modifier,
    )
}

/** Escala subjetiva con slider (1..máximo) y valor visible. */
@Composable
fun SelectorNivel(
    etiqueta: String,
    valor: Int,
    onCambio: (Int) -> Unit,
    maximo: Int = 10,
) {
    Column {
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
        ) {
            Text(etiqueta, style = MaterialTheme.typography.bodyLarge)
            Text(
                "$valor / $maximo",
                style = MaterialTheme.typography.bodyLarge,
                fontWeight = FontWeight.Bold,
            )
        }
        Slider(
            value = valor.toFloat(),
            onValueChange = { onCambio(it.roundToInt()) },
            valueRange = 1f..maximo.toFloat(),
            steps = maximo - 2,
        )
    }
}

/** Fila de historial con botón de borrar. */
@Composable
fun FilaHistorial(
    titulo: String,
    subtitulo: String,
    onBorrar: () -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier.padding(start = 16.dp, top = 4.dp, bottom = 4.dp, end = 4.dp),
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column(modifier = Modifier.weight(1f)) {
                Text(titulo, style = MaterialTheme.typography.bodyLarge, fontWeight = FontWeight.Medium)
                if (subtitulo.isNotEmpty()) {
                    Text(
                        subtitulo,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            IconButton(onClick = onBorrar) {
                Icon(
                    Icons.Default.Delete,
                    contentDescription = "Borrar",
                    tint = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }
    }
}

@Composable
fun TituloApartado(texto: String) {
    Text(
        texto,
        style = MaterialTheme.typography.titleMedium,
        fontWeight = FontWeight.SemiBold,
        modifier = Modifier.padding(top = 8.dp),
    )
}
