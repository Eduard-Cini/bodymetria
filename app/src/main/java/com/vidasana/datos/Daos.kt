package com.vidasana.datos

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Embedded
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Relation
import androidx.room.Transaction
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow
import kotlinx.serialization.Serializable

@Dao
interface MacrosDao {
    @Upsert suspend fun guardar(r: RegistroMacros)
    @Query("DELETE FROM macros WHERE fecha = :fecha") suspend fun borrar(fecha: String)
    @Query("SELECT * FROM macros WHERE fecha = :fecha") fun porFecha(fecha: String): Flow<RegistroMacros?>
    @Query("SELECT * FROM macros ORDER BY fecha DESC") fun todos(): Flow<List<RegistroMacros>>
    @Query("SELECT * FROM macros ORDER BY fecha") suspend fun exportar(): List<RegistroMacros>
}

@Serializable
data class EjercicioConSeries(
    @Embedded val ejercicio: Ejercicio,
    @Relation(parentColumn = "id", entityColumn = "ejercicioId")
    val series: List<Serie>,
)

@Serializable
data class SesionCompleta(
    @Embedded val sesion: Sesion,
    @Relation(entity = Ejercicio::class, parentColumn = "id", entityColumn = "sesionId")
    val ejercicios: List<EjercicioConSeries>,
)

@Dao
interface EjercicioDao {
    @Insert suspend fun insertarSesion(s: Sesion): Long
    @Insert suspend fun insertarEjercicio(e: Ejercicio): Long
    @Insert suspend fun insertarSerie(s: Serie): Long

    /** Guarda la sesión completa; los ids se resuelven al insertar. */
    @Transaction
    suspend fun guardarSesion(
        sesion: Sesion,
        ejercicios: List<Pair<String, List<Pair<Int, Float?>>>>, // nombre → [(reps, peso)]
    ) {
        val sesionId = insertarSesion(sesion)
        ejercicios.forEachIndexed { i, (nombre, series) ->
            val ejercicioId = insertarEjercicio(Ejercicio(sesionId = sesionId, nombre = nombre, orden = i))
            series.forEachIndexed { j, (reps, peso) ->
                insertarSerie(Serie(ejercicioId = ejercicioId, repeticiones = reps, pesoKg = peso, orden = j))
            }
        }
    }

    @Query("DELETE FROM sesiones WHERE id = :id") suspend fun borrarSesion(id: Long)

    @Transaction
    @Query("SELECT * FROM sesiones ORDER BY fecha DESC, id DESC")
    fun sesionesCompletas(): Flow<List<SesionCompleta>>

    @Query("SELECT * FROM sesiones ORDER BY fecha") suspend fun exportarSesiones(): List<Sesion>
    @Query("SELECT * FROM ejercicios") suspend fun exportarEjercicios(): List<Ejercicio>
    @Query("SELECT * FROM series") suspend fun exportarSeries(): List<Serie>
    @Query("SELECT DISTINCT disciplina FROM sesiones ORDER BY disciplina") suspend fun disciplinasUsadas(): List<String>
    @Query("SELECT DISTINCT nombre FROM ejercicios ORDER BY nombre") suspend fun ejerciciosUsados(): List<String>
}

@Dao
interface ComposicionDao {
    @Upsert suspend fun guardar(r: RegistroComposicion)
    @Query("DELETE FROM composicion WHERE fecha = :fecha") suspend fun borrar(fecha: String)
    @Query("SELECT * FROM composicion WHERE fecha = :fecha") fun porFecha(fecha: String): Flow<RegistroComposicion?>
    @Query("SELECT * FROM composicion ORDER BY fecha DESC") fun todos(): Flow<List<RegistroComposicion>>
    @Query("SELECT * FROM composicion ORDER BY fecha") suspend fun exportar(): List<RegistroComposicion>
}

@Dao
interface SuenoDao {
    @Upsert suspend fun guardar(r: RegistroSueno)
    @Query("DELETE FROM sueno WHERE fecha = :fecha") suspend fun borrar(fecha: String)
    @Query("SELECT * FROM sueno WHERE fecha = :fecha") fun porFecha(fecha: String): Flow<RegistroSueno?>
    @Query("SELECT * FROM sueno ORDER BY fecha DESC") fun todos(): Flow<List<RegistroSueno>>
    @Query("SELECT * FROM sueno ORDER BY fecha") suspend fun exportar(): List<RegistroSueno>
}

@Dao
interface DiarioDao {
    @Upsert suspend fun guardar(v: ValorDiario)
    @Query("DELETE FROM diario WHERE fecha = :fecha AND tipo = :tipo") suspend fun borrar(fecha: String, tipo: String)
    @Query("SELECT * FROM diario WHERE fecha = :fecha AND tipo = :tipo")
    fun porFecha(fecha: String, tipo: String): Flow<ValorDiario?>
    @Query("SELECT * FROM diario WHERE tipo = :tipo ORDER BY fecha DESC")
    fun porTipo(tipo: String): Flow<List<ValorDiario>>
    @Query("SELECT * FROM diario WHERE fecha = :fecha") fun delDia(fecha: String): Flow<List<ValorDiario>>
    @Query("SELECT * FROM diario WHERE tipo LIKE :prefijo || '%' ORDER BY fecha DESC")
    fun porPrefijo(prefijo: String): Flow<List<ValorDiario>>
    @Query("SELECT DISTINCT texto FROM diario WHERE tipo = :tipo AND texto != '' ORDER BY texto")
    suspend fun textosUsados(tipo: String): List<String>
    @Query("SELECT * FROM diario ORDER BY fecha") suspend fun exportar(): List<ValorDiario>
}

@Dao
interface UsoAppDao {
    @Upsert suspend fun guardar(u: UsoApp)
    @Delete suspend fun borrar(u: UsoApp)
    @Query("SELECT * FROM uso_apps WHERE fecha = :fecha ORDER BY minutos DESC") fun delDia(fecha: String): Flow<List<UsoApp>>
    @Query("SELECT fecha, SUM(minutos) AS minutos FROM uso_apps GROUP BY fecha ORDER BY fecha DESC")
    fun totalesPorDia(): Flow<List<TotalDia>>
    @Query("SELECT DISTINCT app FROM uso_apps ORDER BY app") suspend fun appsUsadas(): List<String>
    @Query(
        "SELECT app, SUM(minutos) AS minutos FROM uso_apps WHERE fecha >= :desde " +
            "GROUP BY app ORDER BY minutos DESC LIMIT 5",
    )
    suspend fun top5(desde: String): List<TotalApp>
    @Query("SELECT * FROM uso_apps ORDER BY fecha") suspend fun exportar(): List<UsoApp>
}

data class TotalDia(val fecha: String, val minutos: Int)
data class TotalApp(val app: String, val minutos: Int)

@Dao
interface RutinaDao {
    @Insert suspend fun insertar(r: Rutina): Long
    @Query("DELETE FROM rutinas WHERE id = :id") suspend fun borrar(id: Long)
    @Query("SELECT * FROM rutinas ORDER BY nombre") fun todas(): Flow<List<Rutina>>
    @Query("SELECT * FROM rutinas ORDER BY id") suspend fun exportar(): List<Rutina>
}

@Dao
interface MedicaDao {
    @Insert suspend fun insertar(m: MetricaMedica): Long
    @Query("DELETE FROM metricas_medicas WHERE id = :id") suspend fun borrar(id: Long)
    @Query("SELECT * FROM metricas_medicas ORDER BY id") fun todas(): Flow<List<MetricaMedica>>
    @Query("SELECT * FROM metricas_medicas ORDER BY id") suspend fun exportar(): List<MetricaMedica>
    /** Al borrar una métrica se borran también sus registros diarios. */
    @Query("DELETE FROM diario WHERE tipo = :tipo") suspend fun borrarRegistros(tipo: String)
}
