package com.vidasana.datos

import kotlin.math.roundToInt

/**
 * Motor de metas nutricionales. Todo se calcula con los datos del usuario:
 * BMR por Mifflin-St Jeor, gasto diario = BMR × 1.3 (vida cotidiana ligera)
 * + la media real de gasto por ejercicio registrada en la app (7 días).
 */
data class MetasNutricion(
    val objetivoRector: String,
    val kcal: Float,
    val proteinasG: Float,
    val carbohidratosG: Float,
    val grasasG: Float,
    val nota: String,
)

private data class ParametrosMeta(
    val rector: String,
    val factorKcal: Float,
    val proteinaPorKg: Float,
    val grasaPctKcal: Float,
    val nota: String,
)

/**
 * Prioridad si hay varios objetivos: pérdida de grasa > ganancia de músculo >
 * longevidad > mantenimiento.
 */
private fun parametrosDe(objetivos: Set<String>): ParametrosMeta = when {
    "Pérdida de grasa" in objetivos -> ParametrosMeta(
        "Pérdida de grasa", 0.80f, 2.0f, 0.25f,
        "Déficit del 20% con proteína alta (2 g/kg) para conservar músculo.",
    )
    "Ganancia de músculo" in objetivos -> ParametrosMeta(
        "Ganancia de músculo", 1.10f, 1.8f, 0.25f,
        "Superávit del 10% con proteína alta (1.8 g/kg) y entrenamiento de fuerza.",
    )
    "Longevidad" in objetivos -> ParametrosMeta(
        "Longevidad", 0.92f, 1.2f, 0.30f,
        "Déficit ligero (<10%). Mucha verdura y prioriza la proteína de origen " +
            "vegetal (legumbres, frutos secos, granos) sobre la animal.",
    )
    else -> ParametrosMeta(
        "Mantenimiento", 1.0f, 1.4f, 0.30f,
        "Calorías de mantenimiento con proteína suficiente.",
    )
}

/** Null si faltan datos (peso registrado, edad, estatura o sexo del perfil). */
fun calcularMetas(perfil: Perfil, pesoKg: Float?, mediaEjercicioKcalDia: Float): MetasNutricion? {
    if (pesoKg == null || pesoKg <= 0f) return null
    if (perfil.edad <= 0 || perfil.estaturaCm <= 0 || perfil.sexo.isEmpty()) return null

    // Mifflin-St Jeor
    val base = 10f * pesoKg + 6.25f * perfil.estaturaCm - 5f * perfil.edad
    val bmr = when (perfil.sexo) {
        "masculino" -> base + 5f
        "femenino" -> base - 161f
        else -> base - 78f // promedio de ambos
    }
    val gastoDiario = bmr * 1.3f + mediaEjercicioKcalDia

    val p = parametrosDe(perfil.objetivos)
    val kcal = gastoDiario * p.factorKcal
    val proteinas = p.proteinaPorKg * pesoKg
    val grasas = kcal * p.grasaPctKcal / 9f
    val carbohidratos = ((kcal - proteinas * 4f - grasas * 9f) / 4f).coerceAtLeast(0f)

    return MetasNutricion(p.rector, kcal, proteinas, carbohidratos, grasas, p.nota)
}

/** Meta de agua: ~35 ml por kg de peso corporal. */
fun metaAguaMl(pesoKg: Float?): Int? =
    pesoKg?.takeIf { it > 0f }?.let { (it * 35f).roundToInt() }

// ── Micronutrientes: metas de referencia (RDA/AI adulto, NIH) ────────
data class MetaMicro(
    val clave: String,   // se guarda como ValorDiario tipo "micro.<clave>"
    val nombre: String,
    val unidad: String,
    val hombres: Float,
    val mujeres: Float,
    /** true = la meta es un tope (no exceder), como el sodio. */
    val esMaximo: Boolean = false,
) {
    fun valor(sexo: String): Float = if (sexo == "femenino") mujeres else hombres
    fun cumplida(registrado: Float, sexo: String): Boolean =
        if (esMaximo) registrado <= valor(sexo) else registrado >= valor(sexo)
}

val MICROS = listOf(
    MetaMicro("fibra", "Fibra", "g", 38f, 25f),
    MetaMicro("calcio", "Calcio", "mg", 1000f, 1000f),
    MetaMicro("hierro", "Hierro", "mg", 8f, 18f),
    MetaMicro("potasio", "Potasio", "mg", 3400f, 2600f),
    MetaMicro("sodio", "Sodio", "mg", 2300f, 2300f, esMaximo = true),
    MetaMicro("vitC", "Vitamina C", "mg", 90f, 75f),
    MetaMicro("vitD", "Vitamina D", "µg", 15f, 15f),
    MetaMicro("b12", "Vitamina B12", "µg", 2.4f, 2.4f),
)

const val PREFIJO_MICRO = "micro."
const val PREFIJO_MEDICA = "med."
