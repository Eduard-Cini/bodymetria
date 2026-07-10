package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Bedtime
import androidx.compose.material.icons.filled.Bloodtype
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.FitnessCenter
import androidx.compose.material.icons.filled.Mood
import androidx.compose.material.icons.filled.MonitorWeight
import androidx.compose.material.icons.filled.PhoneAndroid
import androidx.compose.material.icons.filled.Psychology
import androidx.compose.material.icons.filled.Restaurant
import androidx.compose.material.icons.filled.SelfImprovement
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material.icons.filled.WaterDrop
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.TipoDiario
import com.vidasana.datos.flujoPerfil
import com.vidasana.ui.componentes.formatear
import com.vidasana.ui.componentes.hoyIso
import kotlinx.coroutines.flow.map

private data class Seccion(
    val ruta: String,
    val nombre: String,
    val icono: ImageVector,
)

private val SECCIONES = listOf(
    Seccion("macros", "Macros", Icons.Default.Restaurant),
    Seccion("ejercicio", "Ejercicio", Icons.Default.FitnessCenter),
    Seccion("composicion", "Composición", Icons.Default.MonitorWeight),
    Seccion("sueno", "Sueño", Icons.Default.Bedtime),
    Seccion("diario/${TipoDiario.ESTRES}", "Estrés", Icons.Default.Psychology),
    Seccion("diario/${TipoDiario.AGUA}", "Agua", Icons.Default.WaterDrop),
    Seccion("diario/${TipoDiario.LECTURA}", "Lectura", Icons.Default.Book),
    Seccion("diario/${TipoDiario.MEDITACION}", "Meditación", Icons.Default.SelfImprovement),
    Seccion("usoCelular", "Celular", Icons.Default.PhoneAndroid),
    Seccion("diario/${TipoDiario.ANIMO}", "Ánimo", Icons.Default.Mood),
)

private val SECCION_REGLA = Seccion("diario/${TipoDiario.REGLA}", "Ciclo", Icons.Default.Bloodtype)

/** Cada objetivo empuja sus secciones hacia arriba en la portada. */
private val PESOS_OBJETIVO = mapOf(
    "Longevidad" to mapOf(
        "sueno" to 3, "ejercicio" to 2, "macros" to 2, "composicion" to 1,
        "diario/${TipoDiario.ESTRES}" to 2, "diario/${TipoDiario.AGUA}" to 1,
        "diario/${TipoDiario.MEDITACION}" to 1,
    ),
    "Ganancia de músculo" to mapOf("ejercicio" to 3, "macros" to 2, "composicion" to 2),
    "Pérdida de grasa" to mapOf("macros" to 3, "composicion" to 2, "ejercicio" to 2, "diario/${TipoDiario.AGUA}" to 1),
    "Escuela" to mapOf("diario/${TipoDiario.ESTRES}" to 2, "sueno" to 2, "usoCelular" to 1),
    "Trabajo" to mapOf("diario/${TipoDiario.ESTRES}" to 2, "sueno" to 2, "usoCelular" to 1),
    "Relaciones personales" to mapOf("diario/${TipoDiario.ANIMO}" to 3),
    "Introspección" to mapOf("diario/${TipoDiario.MEDITACION}" to 3, "diario/${TipoDiario.ANIMO}" to 2, "diario/${TipoDiario.ESTRES}" to 1),
    "Lectura/aprendizaje" to mapOf("diario/${TipoDiario.LECTURA}" to 3, "usoCelular" to 1),
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PantallaInicio(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val hoy = hoyIso()

    // Si no se ha configurado el perfil, mandar a la sección 0.
    val perfil by remember { flujoPerfil(contexto) }.collectAsState(initial = null)
    LaunchedEffect(perfil) {
        if (perfil?.configurado == false) nav.navigate("config")
    }

    // Secciones visibles (ciclo solo con perfil femenino), ordenadas según objetivos.
    val secciones = remember(perfil) {
        val base = if (perfil?.sexo == "femenino") SECCIONES + SECCION_REGLA else SECCIONES
        val puntos = mutableMapOf<String, Int>()
        (perfil?.objetivos ?: emptySet()).forEach { objetivo ->
            PESOS_OBJETIVO[objetivo]?.forEach { (ruta, p) -> puntos[ruta] = (puntos[ruta] ?: 0) + p }
        }
        base.withIndex()
            .sortedWith(compareByDescending<IndexedValue<Seccion>> { puntos[it.value.ruta] ?: 0 }.thenBy { it.index })
            .map { it.value }
    }

    // Resumen de hoy por sección (texto corto o "—")
    val macrosHoy by remember { db.macros().porFecha(hoy) }.collectAsState(initial = null)
    val composicionHoy by remember { db.composicion().porFecha(hoy) }.collectAsState(initial = null)
    val suenoHoy by remember { db.sueno().porFecha(hoy) }.collectAsState(initial = null)
    val diarioHoy by remember { db.diario().delDia(hoy) }.collectAsState(initial = emptyList())
    val sesionesHoy by remember {
        db.ejercicio().sesionesCompletas().map { lista -> lista.count { it.sesion.fecha == hoy } }
    }.collectAsState(initial = 0)
    val celularHoy by remember {
        db.usoApps().delDia(hoy).map { lista -> lista.sumOf { it.minutos } }
    }.collectAsState(initial = 0)

    fun valorDiario(tipo: String): Float? = diarioHoy.firstOrNull { it.tipo == tipo }?.valor

    fun resumen(ruta: String): String = when (ruta) {
        "macros" -> macrosHoy?.let { "${formatear(it.calorias, 0)} kcal" } ?: "—"
        "ejercicio" -> if (sesionesHoy > 0) "$sesionesHoy sesión${if (sesionesHoy > 1) "es" else ""}" else "—"
        "composicion" -> composicionHoy?.let { "${formatear(it.pesoKg, 1)} kg" } ?: "—"
        "sueno" -> suenoHoy?.let { "${formatear(it.duracionHoras, 1)} h" } ?: "—"
        "diario/${TipoDiario.ESTRES}" -> valorDiario(TipoDiario.ESTRES)?.let { "${it.toInt()}/10" } ?: "—"
        "diario/${TipoDiario.AGUA}" -> valorDiario(TipoDiario.AGUA)?.let { "${it.toInt()} ml" } ?: "—"
        "diario/${TipoDiario.LECTURA}" -> valorDiario(TipoDiario.LECTURA)?.let { "${it.toInt()} min" } ?: "—"
        "diario/${TipoDiario.MEDITACION}" -> valorDiario(TipoDiario.MEDITACION)?.let { if (it > 0) "Sí" else "No" } ?: "—"
        "usoCelular" -> if (celularHoy > 0) "$celularHoy min" else "—"
        "diario/${TipoDiario.ANIMO}" -> valorDiario(TipoDiario.ANIMO)?.let { "${it.toInt()}/10" } ?: "—"
        "diario/${TipoDiario.REGLA}" -> valorDiario(TipoDiario.REGLA)?.let { if (it > 0) "Sí" else "No" } ?: "—"
        else -> "—"
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Bodymetria — hoy") },
                actions = {
                    IconButton(onClick = { nav.navigate("config") }) {
                        Icon(Icons.Default.Settings, contentDescription = "Configuración")
                    }
                },
            )
        },
    ) { relleno ->
        LazyVerticalGrid(
            columns = GridCells.Fixed(2),
            modifier = Modifier.fillMaxSize().padding(relleno).padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            items(secciones, key = { it.ruta }) { seccion ->
                val registrado = resumen(seccion.ruta) != "—"
                // Solo el icono cambia de color cuando hay dato de hoy (más sobrio).
                Card(
                    onClick = { nav.navigate(seccion.ruta) },
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Column(modifier = Modifier.padding(16.dp)) {
                        Icon(
                            seccion.icono,
                            contentDescription = null,
                            tint = if (registrado) MaterialTheme.colorScheme.primary
                            else MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                        Text(
                            seccion.nombre,
                            style = MaterialTheme.typography.titleSmall,
                            fontWeight = FontWeight.SemiBold,
                            modifier = Modifier.padding(top = 8.dp),
                        )
                        Text(
                            resumen(seccion.ruta),
                            style = MaterialTheme.typography.bodyMedium,
                            color = MaterialTheme.colorScheme.onSurfaceVariant,
                        )
                    }
                }
            }
        }
    }
}
