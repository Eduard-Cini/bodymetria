package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateMapOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.datos.BaseDatos
import com.vidasana.datos.MICROS
import com.vidasana.datos.PREFIJO_MICRO
import com.vidasana.datos.ValorDiario
import com.vidasana.datos.flujoPerfil
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.SelectorFecha
import com.vidasana.ui.componentes.formatear
import com.vidasana.ui.componentes.hoyIso
import kotlinx.coroutines.launch

/**
 * Micronutrientes: metas de referencia (RDA por sexo) + registro del total
 * diario. El desglose por alimento se calcula fuera (sitio web) y aquí se
 * apunta el resultado.
 */
@Composable
fun PantallaMicros(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    var fecha = remember { androidx.compose.runtime.mutableStateOf(hoyIso()) }
    val perfil by remember { flujoPerfil(contexto) }.collectAsState(initial = null)
    val sexo = perfil?.sexo ?: ""

    val valores = remember { mutableStateMapOf<String, String>() }
    val delDia by remember(fecha.value) { db.diario().delDia(fecha.value) }
        .collectAsState(initial = emptyList())

    LaunchedEffect(delDia, fecha.value) {
        MICROS.forEach { micro ->
            val registrado = delDia.firstOrNull { it.tipo == PREFIJO_MICRO + micro.clave }
            valores[micro.clave] = registrado?.valor?.let { formatear(it, 1) } ?: ""
        }
    }

    val registrados = MICROS.mapNotNull { m ->
        delDia.firstOrNull { it.tipo == PREFIJO_MICRO + m.clave }?.let { m to it.valor }
    }
    val cumplidas = registrados.count { (m, v) -> m.cumplida(v, sexo) }

    MarcoPantalla("Micronutrientes", nav) {
        SelectorFecha(fecha.value) { fecha.value = it }

        Text(
            "Apunta el total del día (puedes calcularlo en el sitio web). " +
                "La meta es la referencia diaria para tu sexo; el sodio es tope máximo.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        if (registrados.isNotEmpty()) {
            Card(modifier = Modifier.fillMaxWidth()) {
                Text(
                    "Metas cumplidas: $cumplidas de ${registrados.size} registradas",
                    style = MaterialTheme.typography.titleMedium,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(12.dp),
                )
            }
        }

        MICROS.forEach { micro ->
            val meta = micro.valor(sexo)
            val texto = valores[micro.clave] ?: ""
            val v = texto.toFloatOrNull()
            val estado = when {
                v == null -> ""
                micro.cumplida(v, sexo) -> "  ✓"
                else -> ""
            }
            Row(
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.fillMaxWidth(),
            ) {
                CampoNumero(
                    texto,
                    { valores[micro.clave] = it },
                    micro.nombre,
                    micro.unidad,
                    modifier = Modifier.weight(1.2f),
                )
                Column(modifier = Modifier.weight(0.8f)) {
                    Text(
                        (if (micro.esMaximo) "Máx " else "Meta ") +
                            "${formatear(meta, 1)} ${micro.unidad}$estado",
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
        }

        Button(
            onClick = {
                ambito.launch {
                    MICROS.forEach { micro ->
                        val v = valores[micro.clave]?.toFloatOrNull()
                        if (v != null) {
                            db.diario().guardar(ValorDiario(fecha.value, PREFIJO_MICRO + micro.clave, v))
                        }
                    }
                }
            },
            enabled = MICROS.any { (valores[it.clave] ?: "").toFloatOrNull() != null },
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }
    }
}
