package com.vidasana

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.vidasana.ui.TemaVidaSana
import com.vidasana.ui.pantallas.PantallaComposicion
import com.vidasana.ui.pantallas.PantallaConfig
import com.vidasana.ui.pantallas.PantallaConsejos
import com.vidasana.ui.pantallas.PantallaDiario
import com.vidasana.ui.pantallas.PantallaDoctor
import com.vidasana.ui.pantallas.PantallaEjercicio
import com.vidasana.ui.pantallas.PantallaInicio
import com.vidasana.ui.pantallas.PantallaMacros
import com.vidasana.ui.pantallas.PantallaSueno
import com.vidasana.ui.pantallas.PantallaUsoCelular

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            TemaVidaSana {
                Navegacion()
            }
        }
    }
}

@Composable
fun Navegacion() {
    val nav: NavHostController = rememberNavController()
    NavHost(navController = nav, startDestination = "inicio") {
        composable("inicio") { PantallaInicio(nav) }
        composable("config") { PantallaConfig(nav) }
        composable("macros") { PantallaMacros(nav) }
        composable("ejercicio") { PantallaEjercicio(nav) }
        composable("composicion") { PantallaComposicion(nav) }
        composable("sueno") { PantallaSueno(nav) }
        composable("usoCelular") { PantallaUsoCelular(nav) }
        composable("doctor") { PantallaDoctor(nav) }
        composable("consejos") { PantallaConsejos(nav) }
        composable("diario/{tipo}") { entrada ->
            PantallaDiario(nav, entrada.arguments?.getString("tipo") ?: "")
        }
    }
}
