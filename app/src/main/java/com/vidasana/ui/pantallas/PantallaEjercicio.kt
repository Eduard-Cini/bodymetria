package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Add
import androidx.compose.material.icons.filled.Close
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateListOf
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
import com.vidasana.datos.Sesion
import com.vidasana.ui.componentes.CampoConSugerencias
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.GraficaBarras
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.PanelEstadisticas
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.SelectorNivel
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.fechaCorta
import com.vidasana.ui.componentes.hoyIso
import com.vidasana.ui.componentes.puntosDesde
import kotlinx.coroutines.launch

private val DISCIPLINAS = listOf(
    "Calistenia", "Gym", "Correr", "Trotar", "Estirar", "Movilidad",
    "Tenis de mesa", "Fútbol", "Natación", "Bici", "Caminata", "Senderismo", "Ultimate",
)

/** Disciplinas de fuerza: muestran el desglose de ejercicios → series. */
private val DISCIPLINAS_FUERZA = setOf("gym", "calistenia")

private val EJERCICIOS = listOf(
    "Sentadilla", "Peso muerto", "Desplantes", "Hip thrust", "Abducciones",
    "Elevación de gemelos", "Curl femoral", "Curl nórdico", "Dominadas", "Fondos",
    "Lagartijas", "Lagartijas en pino asistido", "Front lever raises",
    "Curl de bíceps", "Press cubano", "Elevaciones laterales",
    "Press banca", "Press militar", "Remo con barra", "Face pull", "Plancha",
)

private class SerieEditable {
    var reps by mutableStateOf("")
    var peso by mutableStateOf("")
}

private class EjercicioEditable {
    var nombre by mutableStateOf("")
    val series = mutableStateListOf<SerieEditable>().apply { add(SerieEditable()) }
}

/** Sección 2: sesiones de ejercicio con disciplina, RPE y desglose de series. */
@Composable
fun PantallaEjercicio(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha by remember { mutableStateOf(hoyIso()) }
    var disciplina by remember { mutableStateOf("") }
    var duracion by remember { mutableStateOf("") }
    var gasto by remember { mutableStateOf("") }
    var esfuerzo by remember { mutableIntStateOf(5) }
    var notas by remember { mutableStateOf("") }
    val ejercicios = remember { mutableStateListOf<EjercicioEditable>() }

    val esFuerza = disciplina.trim().lowercase() in DISCIPLINAS_FUERZA
    LaunchedEffect(esFuerza) {
        if (esFuerza && ejercicios.isEmpty()) ejercicios.add(EjercicioEditable())
    }

    val sesiones by remember { db.ejercicio().sesionesCompletas() }.collectAsState(initial = emptyList())
    val kcalPorDia = sesiones
        .groupBy { it.sesion.fecha }
        .map { (f, lista) -> f to lista.sumOf { it.sesion.gastoKcal }.toFloat() }
    val puntosKcal = puntosDesde(kcalPorDia)

    MarcoPantalla("Ejercicio", nav) {
        SelectorFecha(fecha) { fecha = it }

        CampoConSugerencias(
            valor = disciplina,
            onCambio = { disciplina = it },
            etiqueta = "Disciplina",
            sugerencias = DISCIPLINAS,
            modifier = Modifier.fillMaxWidth(),
        )

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            CampoNumero(duracion, { duracion = it }, "Duración", "min", entero = true, modifier = Modifier.weight(1f))
            CampoNumero(gasto, { gasto = it }, "Gasto", "kcal", entero = true, modifier = Modifier.weight(1f))
        }
        SelectorNivel("¿Qué tan pesado se sintió?", esfuerzo, { esfuerzo = it })
        OutlinedTextField(
            value = notas,
            onValueChange = { notas = it },
            label = { Text("Notas (opcional)") },
            modifier = Modifier.fillMaxWidth(),
        )

        if (esFuerza) {
            TituloApartado("Ejercicios y series")
            ejercicios.forEachIndexed { i, ejercicio ->
                Card(modifier = Modifier.fillMaxWidth()) {
                    Column(modifier = Modifier.padding(12.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(verticalAlignment = Alignment.CenterVertically) {
                            CampoConSugerencias(
                                valor = ejercicio.nombre,
                                onCambio = { ejercicio.nombre = it },
                                etiqueta = "Ejercicio ${i + 1}",
                                sugerencias = EJERCICIOS,
                                modifier = Modifier.weight(1f),
                            )
                            IconButton(onClick = { ejercicios.removeAt(i) }) {
                                Icon(Icons.Default.Delete, contentDescription = "Quitar ejercicio")
                            }
                        }
                        ejercicio.series.forEachIndexed { j, serie ->
                            Row(
                                horizontalArrangement = Arrangement.spacedBy(8.dp),
                                verticalAlignment = Alignment.CenterVertically,
                            ) {
                                Text("Serie ${j + 1}", style = MaterialTheme.typography.bodyMedium)
                                CampoNumero(serie.reps, { serie.reps = it }, "Repes", entero = true, modifier = Modifier.weight(1f))
                                CampoNumero(serie.peso, { serie.peso = it }, "Peso", "kg", modifier = Modifier.weight(1f))
                                IconButton(onClick = { ejercicio.series.removeAt(j) }) {
                                    Icon(Icons.Default.Close, contentDescription = "Quitar serie")
                                }
                            }
                        }
                        OutlinedButton(onClick = { ejercicio.series.add(SerieEditable()) }) {
                            Icon(Icons.Default.Add, contentDescription = null)
                            Text("Serie")
                        }
                    }
                }
            }
            OutlinedButton(onClick = { ejercicios.add(EjercicioEditable()) }, modifier = Modifier.fillMaxWidth()) {
                Icon(Icons.Default.Add, contentDescription = null)
                Text("Añadir ejercicio")
            }
        }

        Button(
            onClick = {
                val dur = duracion.toIntOrNull() ?: return@Button
                val kcal = gasto.toIntOrNull() ?: 0
                val listaEjercicios = ejercicios
                    .filter { it.nombre.isNotBlank() }
                    .map { e ->
                        e.nombre.trim() to e.series
                            .filter { it.reps.toIntOrNull() != null }
                            .map { (it.reps.toIntOrNull() ?: 0) to it.peso.toFloatOrNull() }
                    }
                ambito.launch {
                    db.ejercicio().guardarSesion(
                        Sesion(
                            fecha = fecha,
                            disciplina = disciplina.trim(),
                            duracionMin = dur,
                            gastoKcal = kcal,
                            esfuerzo = esfuerzo,
                            notas = notas.trim(),
                        ),
                        listaEjercicios,
                    )
                    disciplina = ""
                    duracion = ""
                    gasto = ""
                    esfuerzo = 5
                    notas = ""
                    ejercicios.clear()
                }
            },
            enabled = disciplina.isNotBlank() && duracion.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar sesión") }

        TituloApartado("Gasto energético por día")
        PanelEstadisticas(puntosKcal, "kcal", decimales = 0)
        GraficaBarras(puntosKcal, "kcal")

        if (sesiones.isNotEmpty()) {
            TituloApartado("Sesiones")
            sesiones.take(10).forEach { s ->
                Card(modifier = Modifier.fillMaxWidth()) {
                    Row(
                        modifier = Modifier.padding(start = 16.dp, top = 8.dp, bottom = 8.dp, end = 4.dp),
                        verticalAlignment = Alignment.CenterVertically,
                    ) {
                        Column(modifier = Modifier.weight(1f)) {
                            Text(
                                "${fechaCorta(s.sesion.fecha)} — ${s.sesion.disciplina}",
                                style = MaterialTheme.typography.bodyLarge,
                                fontWeight = FontWeight.Medium,
                            )
                            Text(
                                "${s.sesion.duracionMin} min · ${s.sesion.gastoKcal} kcal · esfuerzo ${s.sesion.esfuerzo}/10",
                                style = MaterialTheme.typography.bodyMedium,
                                color = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                            s.ejercicios.forEach { e ->
                                val seriesTexto = e.series
                                    .sortedBy { it.orden }
                                    .joinToString(", ") { serie ->
                                        serie.pesoKg?.let { "${serie.repeticiones}×${com.vidasana.ui.componentes.formatear(it, 1)}kg" }
                                            ?: "${serie.repeticiones}"
                                    }
                                Text(
                                    "${e.ejercicio.nombre}: $seriesTexto",
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                            if (s.sesion.notas.isNotEmpty()) {
                                Text(
                                    s.sesion.notas,
                                    style = MaterialTheme.typography.bodySmall,
                                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                                )
                            }
                        }
                        IconButton(onClick = { ambito.launch { db.ejercicio().borrarSesion(s.sesion.id) } }) {
                            Icon(
                                Icons.Default.Delete,
                                contentDescription = "Borrar sesión",
                                tint = MaterialTheme.colorScheme.onSurfaceVariant,
                            )
                        }
                    }
                }
            }
        }
    }
}
