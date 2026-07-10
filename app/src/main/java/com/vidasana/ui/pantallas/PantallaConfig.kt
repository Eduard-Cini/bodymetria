package com.vidasana.ui.pantallas

import android.widget.Toast
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.ExperimentalLayoutApi
import androidx.compose.foundation.layout.FlowRow
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.FilterChip
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
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
import com.vidasana.datos.Objetivos
import com.vidasana.datos.Perfil
import com.vidasana.datos.crearRespaldo
import com.vidasana.datos.flujoPerfil
import com.vidasana.datos.guardarPerfil
import com.vidasana.datos.importarRespaldo
import com.vidasana.ui.componentes.CampoNumero
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.TituloApartado
import com.vidasana.ui.componentes.hoyIso
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class, ExperimentalLayoutApi::class)
@Composable
fun PantallaConfig(nav: NavHostController) {
    val contexto = LocalContext.current
    val db = remember { BaseDatos.obtener(contexto) }
    val ambito = rememberCoroutineScope()

    val perfil by remember { flujoPerfil(contexto) }.collectAsState(initial = null)

    var edad by remember { mutableStateOf("") }
    var sexo by remember { mutableStateOf("") }
    var estatura by remember { mutableStateOf("") }
    var objetivos by remember { mutableStateOf(setOf<String>()) }
    var cargado by remember { mutableStateOf(false) }

    LaunchedEffect(perfil) {
        val p = perfil
        if (p != null && !cargado) {
            if (p.edad > 0) edad = p.edad.toString()
            sexo = p.sexo
            if (p.estaturaCm > 0) estatura = p.estaturaCm.toString()
            objetivos = p.objetivos
            cargado = true
        }
    }

    val exportar = rememberLauncherForActivityResult(
        ActivityResultContracts.CreateDocument("application/json"),
    ) { uri ->
        if (uri != null) ambito.launch {
            val texto = crearRespaldo(db, perfil ?: Perfil())
            contexto.contentResolver.openOutputStream(uri)?.use { it.write(texto.toByteArray()) }
            Toast.makeText(contexto, "Respaldo exportado", Toast.LENGTH_SHORT).show()
        }
    }
    val importar = rememberLauncherForActivityResult(
        ActivityResultContracts.OpenDocument(),
    ) { uri ->
        if (uri != null) ambito.launch {
            try {
                val texto = contexto.contentResolver.openInputStream(uri)?.use {
                    it.readBytes().decodeToString()
                } ?: return@launch
                val r = importarRespaldo(db, texto)
                guardarPerfil(contexto, r.perfil)
                cargado = false
                Toast.makeText(contexto, "Respaldo importado", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                Toast.makeText(contexto, "Archivo no válido: ${e.message}", Toast.LENGTH_LONG).show()
            }
        }
    }

    MarcoPantalla("Configuración", nav) {
        TituloApartado("Sobre ti")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            CampoNumero(edad, { edad = it }, "Edad", "años", entero = true, modifier = Modifier.weight(1f))
            CampoNumero(estatura, { estatura = it }, "Estatura", "cm", entero = true, modifier = Modifier.weight(1f))
        }

        var sexoAbierto by remember { mutableStateOf(false) }
        ExposedDropdownMenuBox(expanded = sexoAbierto, onExpandedChange = { sexoAbierto = it }) {
            OutlinedTextField(
                value = sexo.replaceFirstChar { it.uppercase() },
                onValueChange = {},
                readOnly = true,
                label = { Text("Sexo") },
                trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded = sexoAbierto) },
                modifier = Modifier.fillMaxWidth().menuAnchor(),
            )
            ExposedDropdownMenu(expanded = sexoAbierto, onDismissRequest = { sexoAbierto = false }) {
                listOf("masculino", "femenino", "otro").forEach { opcion ->
                    DropdownMenuItem(
                        text = { Text(opcion.replaceFirstChar { it.uppercase() }) },
                        onClick = { sexo = opcion; sexoAbierto = false },
                    )
                }
            }
        }

        TituloApartado("Objetivos")
        FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Objetivos.TODOS.forEach { objetivo ->
                FilterChip(
                    selected = objetivo in objetivos,
                    onClick = {
                        objetivos = if (objetivo in objetivos) objetivos - objetivo else objetivos + objetivo
                    },
                    label = { Text(objetivo) },
                )
            }
        }

        Button(
            onClick = {
                ambito.launch {
                    guardarPerfil(
                        contexto,
                        Perfil(
                            edad = edad.toIntOrNull() ?: 0,
                            sexo = sexo,
                            estaturaCm = estatura.toIntOrNull() ?: 0,
                            objetivos = objetivos,
                        ),
                    )
                    nav.popBackStack()
                }
            },
            enabled = edad.isNotEmpty() && sexo.isNotEmpty(),
            modifier = Modifier.fillMaxWidth(),
        ) { Text("Guardar") }

        TituloApartado("Respaldo de datos")
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedButton(
                onClick = { exportar.launch("vidasana-respaldo-${hoyIso()}.json") },
                modifier = Modifier.weight(1f),
            ) { Text("Exportar JSON") }
            OutlinedButton(
                onClick = { importar.launch(arrayOf("application/json", "text/plain", "*/*")) },
                modifier = Modifier.weight(1f),
            ) { Text("Importar JSON") }
        }
    }
}
