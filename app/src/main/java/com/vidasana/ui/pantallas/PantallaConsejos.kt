package com.vidasana.ui.pantallas

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import com.vidasana.ui.componentes.MarcoPantalla
import com.vidasana.ui.componentes.TituloApartado

private data class Consejo(
    val categoria: String,
    val titulo: String,
    val resumen: String,
    val referencia: String,
)

/**
 * Consejos con respaldo en literatura científica. Los resúmenes describen
 * asociaciones observadas en los estudios, no garantías individuales.
 */
private val CONSEJOS = listOf(
    Consejo(
        "Sueño",
        "Duerme entre 7 y 8 horas",
        "En meta-análisis de estudios prospectivos, dormir menos de 6 horas o más de 9 " +
            "se asocia con mayor mortalidad por todas las causas; el mínimo de riesgo " +
            "se observa alrededor de 7-8 horas.",
        "Cappuccio FP, et al. Sleep duration and all-cause mortality. Sleep, 2010.",
    ),
    Consejo(
        "Ejercicio",
        "Haz fuerza 2 veces por semana",
        "30-60 minutos semanales de trabajo de fuerza se asocian con un 10-17% menos " +
            "de mortalidad por todas las causas, enfermedad cardiovascular y cáncer, " +
            "independientemente del ejercicio aeróbico.",
        "Momma H, et al. Muscle-strengthening activities and mortality. Br J Sports Med, 2022.",
    ),
    Consejo(
        "Ejercicio",
        "Muévete a diario, aunque sea caminar",
        "La actividad física regular reduce el riesgo de enfermedad cardiovascular, " +
            "diabetes tipo 2, algunos cánceres y muerte prematura; el mayor salto de " +
            "beneficio es pasar de sedentario a algo de actividad.",
        "Warburton DER, et al. Health benefits of physical activity. CMAJ, 2006.",
    ),
    Consejo(
        "Nutrición",
        "Mucha verdura y fruta (≥5 porciones al día)",
        "En análisis dosis-respuesta, el consumo de frutas y verduras se asocia con " +
            "menor mortalidad; el beneficio crece hasta ~800 g diarios (unas 10 porciones).",
        "Aune D, et al. Fruit and vegetable intake and mortality. Int J Epidemiol, 2017.",
    ),
    Consejo(
        "Nutrición",
        "Prioriza proteína de origen vegetal",
        "Mayor ingesta de proteína vegetal (legumbres, frutos secos, granos) se asocia " +
            "con menor mortalidad por todas las causas; sustituir parte de la proteína " +
            "animal por vegetal muestra asociación favorable.",
        "Naghshi S, et al. Dietary protein intake and mortality. BMJ, 2020.",
    ),
    Consejo(
        "Nutrición",
        "Déficit calórico ligero si buscas longevidad",
        "En el ensayo CALERIE, una restricción calórica de ~12% sostenida 2 años mejoró " +
            "marcadores cardiometabólicos (presión, lípidos, sensibilidad a insulina) en " +
            "adultos sanos no obesos.",
        "Kraus WE, et al. (CALERIE). Lancet Diabetes Endocrinol, 2019.",
    ),
    Consejo(
        "Hidratación",
        "Mantente bien hidratado",
        "En una cohorte de 30 años, los adultos con mejor hidratación (sodio sérico en " +
            "el rango bajo-normal) mostraron envejecimiento biológico más lento y menos " +
            "enfermedades crónicas.",
        "Dmitrieva NI, et al. Middle-age high normal serum sodium… eBioMedicine, 2023.",
    ),
    Consejo(
        "Mente",
        "Medita unos minutos al día",
        "Los programas de mindfulness muestran mejoras moderadas en ansiedad, depresión " +
            "y estrés percibido en ensayos clínicos; el efecto es comparable al de otras " +
            "intervenciones activas.",
        "Goyal M, et al. Meditation programs for psychological stress. JAMA Intern Med, 2014.",
    ),
    Consejo(
        "Mente",
        "Lee libros con regularidad",
        "En una cohorte de adultos mayores, quienes leían libros mostraron una ventaja " +
            "de supervivencia de casi 2 años frente a los no lectores, ajustando por " +
            "educación, salud y riqueza.",
        "Bavishi A, Slade MD, Levy BR. A chapter a day. Soc Sci Med, 2016.",
    ),
    Consejo(
        "Tendones",
        "Los tendones se fortalecen con carga, no con reposo",
        "En tendinopatías (rodilla, Aquiles, codo), programas de carga progresiva " +
            "—isométricos para el dolor y fuerza pesada lenta para reconstruir— superan " +
            "al reposo. El tendón se adapta más lento que el músculo: sube la carga poco " +
            "a poco y tolera molestia leve (≤3-4/10) que no empeora al día siguiente. " +
            "Protocolos por zona en el sitio web (Tendones).",
        "Cook JL, Purdam CR. Br J Sports Med, 2009; Kongsgaard M, et al. 2009.",
    ),
    Consejo(
        "Tiroides",
        "Hipotiroidismo: la levotiroxina funciona si se absorbe bien",
        "Tómala a diario a la misma hora, en ayunas 30-60 min antes del desayuno y " +
            "lejos del café, el calcio y el hierro (sepáralos varias horas). No la " +
            "suspendas al sentirte bien ni te suplementes yodo por tu cuenta (en " +
            "Hashimoto el exceso puede empeorar). La dosis SIEMPRE la ajusta tu médico " +
            "con tu TSH. Más tips en el sitio web (Tiroides).",
        "Jonklaas J, et al. (ATA). Thyroid, 2014; Benvenga S, et al. 2008.",
    ),
    Consejo(
        "Digestión",
        "¿Intestino irritable? La dieta baja en FODMAP es el estándar",
        "En ensayos controlados, reducir los carbohidratos fermentables (FODMAP) " +
            "mejora dolor e inflamación en ~50-75% de personas con SII; en meta-análisis " +
            "en red es la dieta mejor clasificada. Se hace por etapas y de forma temporal " +
            "(protocolo completo en Doctor → Dieta FODMAP y en el sitio web).",
        "Halmos EP, et al. Gastroenterology, 2014; Black CJ, et al. Gut, 2022.",
    ),
    Consejo(
        "Pantallas",
        "Modera el tiempo de pantalla",
        "Más horas de pantalla se asocian con menor bienestar psicológico en jóvenes; " +
            "en adultos la evidencia es mixta, pero desplazar sueño o ejercicio por " +
            "pantalla sí tiene costo medible.",
        "Twenge JM, Campbell WK. Screen time and psychological well-being. Prev Med Rep, 2018.",
    ),
)

@Composable
fun PantallaConsejos(nav: NavHostController) {
    MarcoPantalla("Consejos", nav) {
        Text(
            "Resúmenes de literatura científica (meta-análisis, cohortes y ensayos). " +
                "Describen asociaciones en poblaciones, no garantías individuales; no " +
                "sustituyen el consejo médico.",
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
        )

        var categoriaAnterior = ""
        CONSEJOS.forEach { consejo ->
            if (consejo.categoria != categoriaAnterior) {
                TituloApartado(consejo.categoria)
                categoriaAnterior = consejo.categoria
            }
            Card(modifier = Modifier.fillMaxWidth()) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text(
                        consejo.titulo,
                        style = MaterialTheme.typography.titleMedium,
                        fontWeight = FontWeight.SemiBold,
                    )
                    Text(
                        consejo.resumen,
                        style = MaterialTheme.typography.bodyMedium,
                        modifier = Modifier.padding(top = 4.dp),
                    )
                    Text(
                        consejo.referencia,
                        style = MaterialTheme.typography.bodySmall,
                        fontStyle = FontStyle.Italic,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                        modifier = Modifier.padding(top = 6.dp),
                    )
                }
            }
        }
    }
}
