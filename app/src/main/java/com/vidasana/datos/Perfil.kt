package com.vidasana.datos

import android.content.Context
import androidx.datastore.preferences.core.booleanPreferencesKey
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.intPreferencesKey
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.core.stringSetPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map
import kotlinx.serialization.Serializable

val Context.datosPerfil by preferencesDataStore(name = "perfil")

/** Sección 0: configuración inicial. */
@Serializable
data class Perfil(
    val edad: Int = 0,
    val sexo: String = "", // "masculino" | "femenino" | "otro"
    val estaturaCm: Int = 0,
    val objetivos: Set<String> = emptySet(),
    val configurado: Boolean = false,
    /** Activa la sección Doctor (métricas médicas personalizadas). */
    val seccionMedica: Boolean = false,
)

object Objetivos {
    val TODOS = listOf(
        "Longevidad",
        "Ganancia de músculo",
        "Pérdida de grasa",
        "Escuela",
        "Trabajo",
        "Relaciones personales",
        "Introspección",
        "Lectura/aprendizaje",
    )
}

private val CLAVE_EDAD = intPreferencesKey("edad")
private val CLAVE_SEXO = stringPreferencesKey("sexo")
private val CLAVE_ESTATURA = intPreferencesKey("estaturaCm")
private val CLAVE_OBJETIVOS = stringSetPreferencesKey("objetivos")
private val CLAVE_CONFIGURADO = booleanPreferencesKey("configurado")
private val CLAVE_MEDICA = booleanPreferencesKey("seccionMedica")

fun flujoPerfil(context: Context): Flow<Perfil> =
    context.datosPerfil.data.map { p ->
        Perfil(
            edad = p[CLAVE_EDAD] ?: 0,
            sexo = p[CLAVE_SEXO] ?: "",
            estaturaCm = p[CLAVE_ESTATURA] ?: 0,
            objetivos = p[CLAVE_OBJETIVOS] ?: emptySet(),
            configurado = p[CLAVE_CONFIGURADO] ?: false,
            seccionMedica = p[CLAVE_MEDICA] ?: false,
        )
    }

suspend fun guardarPerfil(context: Context, perfil: Perfil) {
    context.datosPerfil.edit { p ->
        p[CLAVE_EDAD] = perfil.edad
        p[CLAVE_SEXO] = perfil.sexo
        p[CLAVE_ESTATURA] = perfil.estaturaCm
        p[CLAVE_OBJETIVOS] = perfil.objetivos
        p[CLAVE_CONFIGURADO] = true
        p[CLAVE_MEDICA] = perfil.seccionMedica
    }
}
