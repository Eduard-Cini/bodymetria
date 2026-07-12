import { useState } from 'react'
import { ACTIVIDADES, OBJETIVOS, calcularMetas, cargarPerfil, guardarPerfil } from '../datos/perfil.js'

/**
 * Perfil local + meta de energía. Índice: Mifflin-St Jeor (10·peso +
 * 6.25·estatura − 5·edad ± sexo) × factor de actividad × ajuste por objetivo.
 */
export default function MetaPanel({ onCambio }) {
  const [perfil, setPerfil] = useState(() => cargarPerfil() ?? {
    sexo: '', edad: '', pesoKg: '', estaturaCm: '', actividad: 'moderado', objetivo: 'longevidad',
  })
  const [editando, setEditando] = useState(() => !calcularMetas(cargarPerfil()))

  const metas = calcularMetas(perfil)

  const aplicar = () => {
    guardarPerfil(perfil)
    setEditando(false)
    onCambio?.(perfil)
  }

  const campo = (clave, valor) => {
    const p = { ...perfil, [clave]: valor }
    setPerfil(p)
  }

  return (
    <div className="tarjeta" style={{ borderColor: 'var(--verde)' }}>
      {!editando && metas ? (
        <div className="fila" style={{ justifyContent: 'space-between' }}>
          <div>
            <strong>Tu meta ({metas.objetivo.nombre}):</strong>{' '}
            {metas.kcal.toLocaleString('es-MX')} kcal · P {metas.prot} g · C {metas.carb} g · G {metas.gras} g
            <div className="mini">Mifflin-St Jeor × actividad × ajuste del objetivo</div>
          </div>
          <button className="boton secundario" onClick={() => setEditando(true)}>Editar perfil</button>
        </div>
      ) : (
        <>
          <strong>Tu perfil</strong>
          <div className="mini">
            Para calcular tu meta usamos <strong>Mifflin-St Jeor</strong> (el índice
            estándar en nutrición) ajustado a nivel de actividad y por objetivo
            (p. ej. +10% ganancia, −20% pérdida, −8% longevidad).
          </div>
          <div className="fila" style={{ marginTop: '0.6rem' }}>
            <select value={perfil.sexo} onChange={(e) => campo('sexo', e.target.value)}>
              <option value="">Sexo…</option>
              <option value="masculino">Hombre</option>
              <option value="femenino">Mujer</option>
            </select>
            <input type="number" placeholder="Edad" value={perfil.edad} onChange={(e) => campo('edad', +e.target.value)} style={{ width: 80 }} />
            <input type="number" placeholder="Peso kg" value={perfil.pesoKg} onChange={(e) => campo('pesoKg', +e.target.value)} style={{ width: 90 }} />
            <input type="number" placeholder="Estatura cm" value={perfil.estaturaCm} onChange={(e) => campo('estaturaCm', +e.target.value)} style={{ width: 110 }} />
            <select value={perfil.actividad} onChange={(e) => campo('actividad', e.target.value)}>
              {ACTIVIDADES.map((a) => <option key={a.clave} value={a.clave}>{a.nombre}</option>)}
            </select>
            <select value={perfil.objetivo} onChange={(e) => campo('objetivo', e.target.value)}>
              {OBJETIVOS.map((o) => <option key={o.clave} value={o.clave}>{o.nombre}</option>)}
            </select>
            <button className="boton" onClick={aplicar} disabled={!calcularMetas(perfil)}>Guardar</button>
          </div>
        </>
      )}
    </div>
  )
}
