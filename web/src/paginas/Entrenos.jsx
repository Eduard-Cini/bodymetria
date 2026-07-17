import { useState } from 'react'
import { CATEGORIAS, PROGRAMAS, CARDIO, PRINCIPIOS } from '../datos/rutinas.js'

export default function Entrenos() {
  const [clave, setClave] = useState(PROGRAMAS[0].clave)
  const programa = PROGRAMAS.find((p) => p.clave === clave)

  return (
    <>
      <h2>Rutinas de entrenamiento</h2>
      <p className="mini">
        Programas listos para usar, como el menú semanal pero de ejercicio: elige
        uno, guarda cada día como <strong>rutina en la app</strong> (Ejercicio →
        Guardar como rutina) y regístralo con un toque. Los esquemas son punto de
        partida — ajusta a tu nivel y no sustituyen a un entrenador.
      </p>

      <h2>Elige tu programa</h2>
      {CATEGORIAS.map((cat) => (
        <div key={cat} style={{ marginBottom: '0.6rem' }}>
          <p className="mini" style={{ margin: '0.4rem 0 0.3rem', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 700 }}>
            {cat}
          </p>
          <div className="fila">
            {PROGRAMAS.filter((p) => p.categoria === cat).map((p) => (
              <button
                key={p.clave}
                className={'boton' + (p.clave === clave ? '' : ' secundario')}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.88rem' }}
                onClick={() => setClave(p.clave)}
              >
                {p.nombre}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="tarjeta" style={{ borderColor: 'var(--verde)', borderWidth: 2 }}>
        <h3 style={{ marginTop: 0 }}>{programa.nombre}</h3>
        <p style={{ margin: '0 0 0.4rem' }}><strong>¿Para quién?</strong> {programa.paraQuien}</p>
        <p style={{ margin: '0 0 0.4rem' }}><strong>Frecuencia:</strong> {programa.frecuencia}</p>
        <p style={{ margin: 0 }}><strong>Método:</strong> {programa.metodo}</p>
      </div>

      {programa.dias.map((d) => (
        <div className="tarjeta" key={d.nombre}>
          <h3 style={{ marginTop: 0 }}>{d.nombre}</h3>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr><th>Ejercicio</th><th>Esquema</th><th>Descanso</th></tr>
              </thead>
              <tbody>
                {d.ejercicios.map((e) => (
                  <tr key={e.n}>
                    <td>{e.n}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{e.esquema}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>{e.descanso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div className="tarjeta">
        <p style={{ marginTop: 0 }}><strong>Cómo progresar:</strong> {programa.progresion}</p>
        <p className="mini" style={{ fontStyle: 'italic', marginBottom: 0 }}>Evidencia: {programa.evidencia}</p>
      </div>

      <h2>Cardio y acondicionamiento</h2>
      <p className="mini">
        Combínalo con tu programa de fuerza: la mayoría del volumen suave (caminata,
        zona 2) y 1-2 sesiones intensas por semana como máximo. Registra cada sesión
        en la app con su esfuerzo RPE.
      </p>
      <div className="rejilla">
        {CARDIO.map((c) => (
          <div className="tarjeta" key={c.nombre}>
            <h3 style={{ marginTop: 0 }}>{c.nombre}</h3>
            <p style={{ margin: '0 0 0.4rem' }}>{c.para}</p>
            <ul style={{ margin: '0 0 0.4rem', paddingLeft: '1.1rem' }}>
              {c.protocolo.map((paso) => <li key={paso}>{paso}</li>)}
            </ul>
            <p className="mini" style={{ margin: '0 0 0.3rem' }}><strong>Intensidad:</strong> {c.intensidad}</p>
            <p className="mini" style={{ fontStyle: 'italic', margin: 0 }}>{c.evidencia}</p>
          </div>
        ))}
      </div>

      <h2>Principios para todos los programas</h2>
      <div className="rejilla">
        {PRINCIPIOS.map(([titulo, texto]) => (
          <div className="tarjeta" key={titulo}>
            <strong>{titulo}</strong>
            <p style={{ margin: '0.3rem 0 0' }}>{texto}</p>
          </div>
        ))}
      </div>

      <p className="mini centro" style={{ marginTop: '1.5rem' }}>
        Los esquemas son orientativos y asumen técnica correcta y salud articular;
        con lesiones o condiciones médicas, consulta a un profesional antes de empezar.
      </p>
    </>
  )
}
