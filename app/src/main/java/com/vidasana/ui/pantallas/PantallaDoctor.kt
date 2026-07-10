package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.material3.AlertDialog
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
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
import com.vidasana.datos.MetricaMedica
import com.vidasana.datos.PREFIJO_MEDICA
import com.vidasana.datos.TipoMetrica
import com.vidasana.datos.ValorDiario
import com.vidasana.ui.componentes.BotonBorrar
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.GraficaLineas
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.SelectorNivel
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import kotlinx.coroutines.launch

private val NOMBRES_TIPO = mapOf(
    TipoMetrica.NUMERO to "Número (cantidad)",
    TipoMetrica.BOOL to "Sí / No",
    TipoMetrica.ESCALA to "Escala 1-10",
)

/**
 * Sección Doctor: métricas médicas definidas por el usuario (pastilla tomada,
 * evacuaciones, brotes de acné…). Se activa en Configuración.
 */
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaDoctor(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    val metricas by remember { db.medica().todas() }.collectAsState(initial = emptyList())
    val delDia by remember(fecha) { db.diario().delDia(fecha) }.collectAsState(initial = emptyList())

    val numeros = remember { mutableStateMapOf<Long, String>() }
    val bools = remember { mutableStateMapOf<Long, Boolean>() }
    val escalas = remember { mutableStateMapOf<Long, Int>() }
    val expandidas = remember { mutableStateMapOf<Long, Boolean>() }

    LaunchedEffect(delDia, fecha, metricas) {
        metricas.forEach { m ->
            val v = delDia.firstOrNull { it.tipo == PREFIJO_MEDICA + m.id }?.valor
            when (m.tipo) {
                TipoMetrica.NUMERO -> numeros[m.id] = v?.toInt()?.toString() ?: ""
                TipoMetrica.BOOL -> bools[m.id] = (v ?: 0f) > 0f
                TipoMetrica.ESCALA -> escalas[m.id] = v?.toInt() ?: 5
            }
        }
    }

    var agregando by remember { mutableStateOf(false) }

    MarcoPantalla("Doctor", nav) {
        SelectorFecha(fecha) { fecha = it }

        if (metricas.isEmpty()) {
            Text(
                "Define aquí lo que tu especialista te pidió vigilar: si tomaste la " +
                    "pastilla, evacuaciones, molestias, brotes de acné… Cada métrica " +
                    "tendrá su registro diario, gráfica y estadísticas.",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurfaceVariant,
            )
        }

        metricas.forEach { m ->
            TarjetaMetrica(
                metrica = m,
                numero = numeros[m.id] ?: "",
                onNumero = { numeros[m.id] = it },
                bool = bools[m.id] ?: false,
                onBool = { bools[m.id] = it },
                escala = escalas[m.id] ?: 5,
                onEscala = { escalas[m.id] = it },
                expandida = expandidas[m.id] ?: false,
                onExpandir = { expandidas[m.id] = !(expandidas[m.id] ?: false) },
                db = db,
                onBorrar = {
                    ambito.launch {
                        db.medica().borrarRegistros(PREFIJO_MEDICA + m.id)
                        db.medica().borrar(m.id)
                    }
                },
            )
        }

        if (metricas.isNotEmpty()) {
            Button(
                onClick = {
                    ambito.launch {
                        metricas.forEach { m ->
                            val valor = when (m.tipo) {
                                TipoMetrica.NUMERO -> numeros[m.id]?.toFloatOrNull()
                                TipoMetrica.BOOL -> if (bools[m.id] == true) 1f else 0f
                                TipoMetrica.ESCALA -> escalas[m.id]?.toFloat()
                                else -> null
                            }
                            if (valor != null && !(m.tipo == TipoMetrica.NUMERO && numeros[m.id].isNullOrEmpty())) {
                                db.diario().guardar(ValorDiario(fecha, PREFIJO_MEDICA + m.id, valor))
                            }
                        }
                    }
                },
                modifier = Modifier.fillMaxWidth(),
            ) { Text("Guardar día") }
        }

        OutlinedButton(onClick = { agregando = true }, modifier = Modifier.fillMaxWidth()) {
            Icon(Icons.Default.Add, contentDescription = null)
            Text("Añadir métrica")
        }
    }

    if (agregando) {
        DialogoNuevaMetrica(
            onCancelar = { agregando = false },
            onCrear = { nombre, tipo, unidad ->
                agregando = false
                ambito.launch { db.medica().insertar(MetricaMedica(nombre = nombre, tipo = tipo, unidad = unidad)) }
            },
        )
    }
}

@Composable
private fun TarjetaMetrica(
    metrica: MetricaMedica,
    numero: String,
    onNumero: (String) -> Unit,
    bool: Boolean,
    onBool: (Boolean) -> Unit,
    escala: Int,
    onEscala: (Int) -> Unit,
    expandida: Boolean,
    onExpandir: () -> Unit,
    db: BaseDatos,
    onBorrar: () -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Text(
                    metrica.nombre,
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.weight(1f),
                )
                TextButton(onClick = onExpandir) { Text(if (expandida) "Ocultar" else "Gráfica") }
                BotonBorrar("Métrica \"${metrica.nombre}\" y todos sus registros", onBorrar)
            }
            when (metrica.tipo) {
                TipoMetrica.NUMERO -> CampoNumero(
                    numero, onNumero, "Cantidad", metrica.unidad,
                    entero = true, modifier = Modifier.fillMaxWidth(),
                )
                TipoMetrica.BOOL -> Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically,
                ) {
                    Text("¿Hoy sí?", style = MaterialTheme.typography.bodyLarge)
                    Switch(checked = bool, onCheckedChange = onBool)
                }
                TipoMetrica.ESCALA -> SelectorNivel("Intensidad", escala, onEscala)
            }
            if (expandida) {
                val historial by remember(metrica.id) {
                    db.diario().porTipo(PREFIJO_MEDICA + metrica.id)
                }.collectAsState(initial = emptyList())
                val puntos = puntosDesde(historial.map { it.fecha to it.valor })
                PanelEstadisticas(puntos, metrica.unidad, decimales = 1)
                GraficaLineas(puntos, metrica.unidad, decimales = 0)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun DialogoNuevaMetrica(
    onCancelar: () -> Unit,
    onCrear: (nombre: String, tipo: String, unidad: String) -> Unit,
) {
    var nombre by remember { mutableStateOf("") }
    var tipo by remember { mutableStateOf(TipoMetrica.NUMERO) }
    var unidad by remember { mutableStateOf("") }
    var tipoAbierto by remember { mutableStateOf(false) }

    AlertDialog(
        onDismissRequest = onCancelar,
        title = { Text("Nueva métrica") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                OutlinedTextField(
                    value = nombre,
                    onValueChange = { nombre = it },
                    label = { Text("Nombre (p. ej. Pastilla tomada)") },
                    singleLine = true,
                )
                ExposedDropdownMenuBox(expanded = tipoAbierto, onExpandedChange = { tipoAbierto = it }) {
                    OutlinedTextField(
                        value = NOMBRES_TIPO[tipo] ?: tipo,
                        onValueChange = {},
                        readOnly = true,
                        label = { Text("Tipo") },
                        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = tipoAbierto) },
                        modifier = Modifier.menuAnchor(),
                    )
                    ExposedDropdownMenu(expanded = tipoAbierto, onDismissRequest = { tipoAbierto = false }) {
                        NOMBRES_TIPO.forEach { (clave, etiqueta) ->
                            DropdownMenuItem(
                                text = { Text(etiqueta) },
                                onClick = { tipo = clave; tipoAbierto = false },
                            )
                        }
                    }
                }
                if (tipo == TipoMetrica.NUMERO) {
                    OutlinedTextField(
                        value = unidad,
                        onValueChange = { unidad = it },
                        label = { Text("Unidad (opcional, p. ej. veces)") },
                        singleLine = true,
                    )
                }
            }
        },
        confirmButton = {
            TextButton(
                onClick = { onCrear(nombre.trim(), tipo, unidad.trim()) },
                enabled = nombre.isNotBlank(),
            ) { Text("Crear") }
        },
        dismissButton = { TextButton(onClick = onCancelar) { Text("Cancelar") } },
    )
}
