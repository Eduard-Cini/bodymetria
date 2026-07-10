package com.vidasana

import android.app.Application
import com.vidasana.datos.BaseDatos

class App : Application() {
    val db: BaseDatos by lazy { BaseDatos.obtener(this) }
}
