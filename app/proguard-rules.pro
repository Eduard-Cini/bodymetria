# Reglas por defecto; kotlinx.serialization
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keep,includedescriptorclasses class com.vidasana.**$$serializer { *; }
-keepclassmembers class com.vidasana.** {
    *** Companion;
}
-keepclasseswithmembers class com.vidasana.** {
    kotlinx.serialization.KSerializer serializer(...);
}
