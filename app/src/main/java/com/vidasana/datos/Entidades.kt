package com.vidasana.datos

import androidx.room.Entity
import androidx.room.ForeignKey
import androidx.room.Index
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

/** Las fechas se guardan como texto ISO `yyyy-MM-dd` (ordenable lexicográficamente). */

// ── Sección 1: macros ────────────────────────────────────────────────
@Serializable
@Entity(tableName = "macros")
data class RegistroMacros(
    @PrimaryKey val fecha: String,
    val proteinasG: Float,
    val carbohidratosG: Float,
    val grasasG: Float,
) {
    val calorias: Float get() = proteinasG * 4 + carbohidratosG * 4 + grasasG * 9
}

// ── Sección 2: ejercicio (sesión → ejercicios → series) ─────────────
@Serializable
@Entity(tableName = "sesiones")
data class Sesion(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val fecha: String,
    val disciplina: String,
    val duracionMin: Int,
    val gastoKcal: Int,
    /** RPE subjetivo 1-10: qué tan pesado se sintió. */
    val esfuerzo: Int,
    val notas: String = "",
)

@Serializable
@Entity(
    tableName = "ejercicios",
    foreignKeys = [ForeignKey(
        entity = Sesion::class,
        parentColumns = ["id"],
        childColumns = ["sesionId"],
        onDelete = ForeignKey.CASCADE,
    )],
    indices = [Index("sesionId")],
)
data class Ejercicio(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val sesionId: Long,
    val nombre: String,
    val orden: Int,
)

@Serializable
@Entity(
    tableName = "series",
    foreignKeys = [ForeignKey(
        entity = Ejercicio::class,
        parentColumns = ["id"],
        childColumns = ["ejercicioId"],
        onDelete = ForeignKey.CASCADE,
    )],
    indices = [Index("ejercicioId")],
)
data class Serie(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val ejercicioId: Long,
    val repeticiones: Int,
    val pesoKg: Float?,
    val orden: Int,
)

// ── Sección 3: composición corporal ──────────────────────────────────
@Serializable
@Entity(tableName = "composicion")
data class RegistroComposicion(
    @PrimaryKey val fecha: String,
    val pesoKg: Float,
    val musculoKg: Float?,
    val grasaPct: Float?,
)

// ── Sección 4: sueño ─────────────────────────────────────────────────
@Serializable
@Entity(tableName = "sueno")
data class RegistroSueno(
    @PrimaryKey val fecha: String,
    /** Hora `HH:mm`. Si horaDormir > horaDespertar se asume que cruza medianoche. */
    val horaDormir: String,
    val horaDespertar: String,
    val calificacion: Int, // 1-5
) {
    val duracionHoras: Float
        get() {
            val d = horaDormir.split(":").let { it[0].toInt() * 60 + it[1].toInt() }
            val v = horaDespertar.split(":").let { it[0].toInt() * 60 + it[1].toInt() }
            val min = if (v >= d) v - d else 24 * 60 - d + v
            return min / 60f
        }
}

// ── Secciones 5-8 y 10 (+ ciclo): un valor por día y tipo ────────────
@Serializable
@Entity(tableName = "diario", primaryKeys = ["fecha", "tipo"])
data class ValorDiario(
    val fecha: String,
    val tipo: String, // uno de TipoDiario
    val valor: Float,
    /** Texto opcional asociado (p. ej. el libro en lectura). */
    val texto: String = "",
)

object TipoDiario {
    const val ESTRES = "estres"        // escala 1-10
    const val AGUA = "agua"            // mililitros
    const val LECTURA = "lectura"      // minutos; texto = libro
    const val MEDITACION = "meditacion" // 0 = no, 1 = sí
    const val ANIMO = "animo"          // escala 1-10
    const val REGLA = "regla"          // 0 = no, 1 = sí (solo perfil femenino)
    const val VERDURAS = "verduras"    // porciones de verdura al día (proxy de micros)
}

// ── Sección 9: uso del celular por app ───────────────────────────────
@Serializable
@Entity(tableName = "uso_apps", primaryKeys = ["fecha", "app"])
data class UsoApp(
    val fecha: String,
    val app: String,
    val minutos: Int,
)

// ── Sección médica (Doctor): métricas definidas por el usuario ───────
/** Sus valores diarios viven en `diario` con tipo = "med.<id>". */
@Serializable
@Entity(tableName = "metricas_medicas")
data class MetricaMedica(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val nombre: String,
    val tipo: String, // uno de TipoMetrica
    val unidad: String = "",
)

object TipoMetrica {
    const val NUMERO = "numero"   // cantidad libre (p. ej. evacuaciones)
    const val BOOL = "bool"       // sí/no (p. ej. pastilla tomada)
    const val ESCALA = "escala"   // 1-10 (p. ej. molestia estomacal)
}
