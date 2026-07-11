export default function Inicio() {
  return (
    <>
      <div className="centro" style={{ padding: '1.5rem 0 0.5rem' }}>
        <img src="favicon.svg" alt="" width="110" height="110" />
        <h2 style={{ marginTop: '0.6rem' }}>Registra tu vida saludable</h2>
        <p style={{ maxWidth: 560, margin: '0 auto' }}>
          Bodymetria es una app Android para registrar tus macros, ejercicio,
          composición corporal, sueño, estrés, agua, lectura, meditación, uso del
          celular y estado de ánimo — con metas personalizadas, gráficas y
          estadísticas. <strong>Todo se guarda solo en tu teléfono.</strong>
        </p>
        <p>
          <a className="boton" href="bodymetria.apk" download>Descargar APK (Android)</a>
        </p>
        <p className="mini">Versión 0.1 · ~17 MB · Android 8.0 o superior</p>
      </div>

      <div className="rejilla">
        <div className="tarjeta">
          <h3>📊 Metas a tu medida</h3>
          Calorías y macros según tu perfil y objetivo (longevidad, ganancia de
          músculo o pérdida de grasa), calculadas con tus propios datos.
        </div>
        <div className="tarjeta">
          <h3>🥗 Este sitio te complementa</h3>
          Calcula aquí los totales de tu comida con porciones mexicanas (guía
          IMSS) y pásalos a la app; genera tu menú semanal y mejora tu sueño.
        </div>
        <div className="tarjeta">
          <h3>🔒 Privacidad primero</h3>
          La app no pide permisos ni usa internet. Tus registros viven en tu
          teléfono y solo tú decides exportarlos como respaldo JSON.
        </div>
      </div>

      <h2>Cómo instalar la app</h2>
      <div className="tarjeta">
        <ol style={{ margin: 0, paddingLeft: '1.2rem' }}>
          <li>Descarga el APK con el botón de arriba desde tu teléfono.</li>
          <li>Ábrelo desde tus <strong>Descargas</strong>.</li>
          <li>
            Si Android pregunta, permite <em>instalar apps de origen desconocido</em>
            {' '}para tu navegador (solo la primera vez).
          </li>
          <li>Toca <strong>Instalar</strong> y abre Bodymetria. Listo: configura tu perfil y empieza a registrar.</li>
        </ol>
        <p className="mini" style={{ marginBottom: 0 }}>
          El aviso de "origen desconocido" es normal cuando una app no viene de
          Play Store; pronto estaremos ahí.
        </p>
      </div>
    </>
  )
}
