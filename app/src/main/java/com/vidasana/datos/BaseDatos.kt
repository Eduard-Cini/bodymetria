package com.vidasana.datos

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase

/** v2: columna `texto` en diario (libro de lectura). */
private val MIGRACION_1_2 = object : Migration(1, 2) {
    override fun migrate(db: SupportSQLiteDatabase) {
        db.execSQL("ALTER TABLE diario ADD COLUMN texto TEXT NOT NULL DEFAULT ''")
    }
}

@Database(
    entities = [
        RegistroMacros::class,
        Sesion::class,
        Ejercicio::class,
        Serie::class,
        RegistroComposicion::class,
        RegistroSueno::class,
        ValorDiario::class,
        UsoApp::class,
    ],
    version = 2,
    exportSchema = false,
)
abstract class BaseDatos : RoomDatabase() {
    abstract fun macros(): MacrosDao
    abstract fun ejercicio(): EjercicioDao
    abstract fun composicion(): ComposicionDao
    abstract fun sueno(): SuenoDao
    abstract fun diario(): DiarioDao
    abstract fun usoApps(): UsoAppDao

    companion object {
        @Volatile private var instancia: BaseDatos? = null

        fun obtener(context: Context): BaseDatos =
            instancia ?: synchronized(this) {
                instancia ?: Room.databaseBuilder(
                    context.applicationContext,
                    BaseDatos::class.java,
                    "vidasana.db",
                ).addMigrations(MIGRACION_1_2).build().also { instancia = it }
            }
    }
}
