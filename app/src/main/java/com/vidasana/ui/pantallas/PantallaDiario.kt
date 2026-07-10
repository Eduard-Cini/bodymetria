package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Switch
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
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.compose.ui.unit.dp
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.TipoDiario
import com.vidasana.datos.ValorDiario
import com.vidasana.datos.metaAguaMl
import com.vidasana.ui.componentes.CampoConSugerencias
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.FilaHistorial
import com.vidasana.ui.componentes.GraficaBarras
import com.vidasana.ui.componentes.GraficaLineas
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.SelectorNivel
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.etiquetaFecha
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import java.time.LocalDate
import kotlinx.coroutines.launch

private enum class ModoEntrada { NUMERO, NIVEL, BOOL }

private data class ConfigDiario(
    val titulo: String,
    val unidad: String,
    val modo: ModoEntrada,
    val etiquetaCampo: String,
    val barras: Boolean,
    /** Etiqueta del texto asociado; null = sin campo de texto. */
    val etiquetaTexto: String? = null,
)

private fun configDe(tipo: String): ConfigDiario = when (tipo) {
    TipoDiario.ESTRES -> ConfigDiario("Estrés", "", ModoEntrada.NIVEL, "Nivel de estrés", barras = false)
    TipoDiario.AGUA -> ConfigDiario("Agua", "ml", ModoEntrada.NUMERO, "Agua bebida", barras = true)
    TipoDiario.LECTURA -> ConfigDiario(
        "Lectura", "min", ModoEntrada.NUMERO, "Minutos de lectura",
        barras = true, etiquetaTexto = "Libro",
    )
    TipoDiario.MEDITACION -> ConfigDiario("Meditación", "", ModoEntrada.BOOL, "¿Meditaste?", barras = true)
    TipoDiario.ANIMO -> ConfigDiario("Estado de ánimo", "", ModoEntrada.NIVEL, "Ánimo general", barras = false)
    TipoDiario.REGLA -> ConfigDiario("Ciclo menstrual", "", ModoEntrada.BOOL, "¿Día de regla?", barras = true)
    else -> ConfigDiario(tipo, "", ModoEntrada.NUMERO, tipo, barras = false)
}

/** Pantalla común de las secciones de un solo valor por día (5-8, 10 y ciclo). */
@Composable
fun PantallaDiario(nav: NavHostController, tipo: String) {
    val config = configDe(tipo)
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var numero by remember { mutableStateOf("") }
    var nivel by remember { mutableIntStateOf(5) }
    var hecho by remember { mutableStateOf(false) }
    var texto by remember { mutableStateOf("") }

    val existente by remember(fecha) { db.diario().porFecha(fecha, tipo) }
        .collectAsState(initial = null)
    LaunchedEffect(existente, fecha) {
        when (config.modo) {
            ModoEntrada.NUMERO -> numero = existente?.valor?.toInt()?.toString() ?: ""
            ModoEntrada.NIVEL -> nivel = existente?.valor?.toInt() ?: 5
            ModoEntrada.BOOL -> hecho = (existente?.valor ?: 0f) > 0f
        }
        if (config.etiquetaTexto != null) {
            // Si el día ya tiene registro, cargar su texto (el libro de ese día).
            existente?.texto?.takeIf { it.isNotEmpty() }?.let { texto = it }
        }
    }

    val historial by remember { db.diario().porTipo(tipo) }.collectAsState(initial = emptyList())
    val puntos = puntosDesde(historial.map { it.fecha to it.valor })

    // Sugerencias del texto asociado (libros ya registrados).
    var textosUsados by remember { mutableStateOf(listOf<String>()) }
    LaunchedEffect(historial) {
        if (config.etiquetaTexto != null) textosUsados = db.diario().textosUsados(tipo)
    }

    MarcoPantalla(config.titulo, nav) {
        SelectorFecha(fecha) { fecha = it }

        when (config.modo) {
            ModoEntrada.NUMERO -> CampoNumero(
                numero, { numero = it }, config.etiquetaCampo, config.unidad,
                entero = true, modifier = Modifier.fillMaxWidth(),
            )
            ModoEntrada.NIVEL -> SelectorNivel(config.etiquetaCampo, nivel, { nivel = it })
            ModoEntrada.BOOL -> Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically,
            ) {
                Text(config.etiquetaCampo, style = MaterialTheme.typography.bodyLarge)
                Switch(checked = hecho, onCheckedChange = { hecho = it })
            }
        }

        if (config.etiquetaTexto != null) {
            CampoConSugerencias(
                valor = texto,
                onCambio = { texto = it },
                etiqueta = config.etiquetaTexto,
                sugerencias = textosUsados,
                modifier = Modifier.fillMaxWidth(),
            )
        }

        if (tipo == TipoDiario.AGUA) {
            // Meta de agua: 35 ml/kg del último peso registrado en Composición.
            val composiciones by remember { db.composicion().todos() }
                .collectAsState(initial = emptyList())
            val meta = metaAguaMl(composiciones.firstOrNull()?.pesoKg)
            if (meta != null) {
                val llevas = numero.toFloatOrNull() ?: existente?.valor ?: 0f
                LinearProgressIndicator(
                    progress = { (llevas / meta).coerceIn(0f, 1f) },
                    modifier = Modifier.fillMaxWidth().padding(top = 4.dp),
                )
                Text(
                    "Meta: $meta ml (35 ml por kg de tu peso)",
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )
            }
        }

        Button(
            onClick = {
                val valor = when (config.modo) {
                    ModoEntrada.NUMERO -> numero.toFloatOrNull() ?: return@Button
                    ModoEntrada.NIVEL -> nivel.toFloat()
                    ModoEntrada.BOOL -> if (hecho) 1f else 0f
                }
                ambito.launch {
                    db.diario().guardar(
                        ValorDiario(fecha, tipo, valor, if (config.etiquetaTexto != null) texto.trim() else ""),
                    )
                }
            },
            enabled = config.modo != ModoEntrada.NUMERO || numero.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }

        if (config.modo == ModoEntrada.BOOL) {
            // Para sí/no la media no dice mucho: contar días.
            val hoy = LocalDate.now()
            val dias7 = puntos.count { it.fecha >= hoy.minusDays(6) && it.valor > 0 }
            val dias30 = puntos.count { it.fecha >= hoy.minusDays(29) && it.valor > 0 }
            Text(
                "Sí en $dias7 de los últimos 7 días y en $dias30 de los últimos 30.",
                style = MaterialTheme.typography.bodyMedium,
            )
        } else {
            PanelEstadisticas(puntos, config.unidad, decimales = if (config.modo == ModoEntrada.NIVEL) 1 else 0)
        }

        if (config.barras) {
            GraficaBarras(puntos, config.unidad)
        } else {
            GraficaLineas(puntos, config.unidad, decimales = 0)
        }

        if (historial.isNotEmpty()) {
            TituloApartado("Historial")
            historial.take(14).forEach { registro ->
                val valorTexto = when (config.modo) {
                    ModoEntrada.NUMERO -> "${registro.valor.toInt()} ${config.unidad}"
                    ModoEntrada.NIVEL -> "${registro.valor.toInt()} / 10"
                    ModoEntrada.BOOL -> if (registro.valor > 0) "Sí" else "No"
                }
                val sub = if (registro.texto.isNotEmpty()) "$valorTexto · ${registro.texto}" else valorTexto
                FilaHistorial(
                    titulo = etiquetaFecha(registro.fecha),
                    subtitulo = sub,
                    onBorrar = { ambito.launch { db.diario().borrar(registro.fecha, tipo) } },
                )
            }
        }
    }
}
