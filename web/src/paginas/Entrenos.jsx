import { useState } from 'react'
import {
  CATEGORIAS, PROGRAMAS, CARDIO, PRINCIPIOS,
  MESOCICLO, PLANES_ANUALES, PROGRESION_REALISTA,
} from '../datos/rutinas.js'

const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function Entrenos() {
  const [clave, setClave] = useState(PROGRAMAS[0].clave)
  const programa = PROGRAMAS.find((p) => p.clave === clave)
  const [objetivo, setObjetivo] = useState(PLANES_ANUALES[0].clave)
  const [mesInicio, setMesInicio] = useState(new Date().getMonth())
  const plan = PLANES_ANUALES.find((p) => p.clave === objetivo)

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

      <h2>Planea tu mes: el mesociclo de 4 semanas</h2>
      <p className="mini">
        Aplica a cualquier programa de arriba: 3 semanas subiendo la exigencia y
        1 de <strong>descarga</strong>. Progresar sin planear la recuperación es
        la receta del estancamiento y las lesiones.
      </p>
      <div className="tarjeta">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Semana</th><th>Intención</th><th>Esfuerzo</th><th>Volumen</th><th>Cómo se ve</th></tr>
            </thead>
            <tbody>
              {MESOCICLO.map((s) => (
                <tr key={s.semana} style={s.semana === 4 ? { background: 'var(--crema-suave)' } : undefined}>
                  <td className="num">{s.semana}</td>
                  <td><strong>{s.nombre}</strong></td>
                  <td style={{ whiteSpace: 'nowrap' }}>{s.rir}</td>
                  <td>{s.volumen}</td>
                  <td>{s.texto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mini" style={{ marginBottom: 0 }}>
          RIR = repeticiones en reserva (RIR 2 ≈ RPE 8 en la app). Si un mes fue
          malo (enfermedad, viaje, exámenes), <strong>repítelo</strong>: el plan
          está al servicio de tu vida, no al revés.
        </p>
      </div>

      <h2>Planea tu año: bloques con descarga integrada</h2>
      <p className="mini">
        Elige tu objetivo principal y tu mes de inicio; cada mes de la tabla es un
        mesociclo completo (su semana 4 es SIEMPRE de descarga) y hay 2 semanas
        totalmente libres al año — también se planean.
      </p>
      <div className="fila" style={{ marginBottom: '0.4rem' }}>
        {PLANES_ANUALES.map((p) => (
          <button
            key={p.clave}
            className={'boton' + (p.clave === objetivo ? '' : ' secundario')}
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.88rem' }}
            onClick={() => setObjetivo(p.clave)}
          >
            {p.nombre}
          </button>
        ))}
      </div>
      <div className="fila" style={{ marginBottom: '0.5rem' }}>
        <label>Empiezo en{' '}
          <select value={mesInicio} onChange={(e) => setMesInicio(Number(e.target.value))}>
            {MESES.map((m, i) => <option key={m} value={i}>{m}</option>)}
          </select>
        </label>
      </div>
      <div className="tarjeta">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr><th>Mes</th><th>Bloque</th><th>Programa</th><th>Nota</th></tr>
            </thead>
            <tbody>
              {plan.meses.map((m, i) => (
                <tr key={i}>
                  <td style={{ whiteSpace: 'nowrap' }}>{MESES[(mesInicio + i) % 12]}</td>
                  <td><strong>{m.bloque}</strong></td>
                  <td>{m.programa}</td>
                  <td className="mini">{m.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mini" style={{ marginBottom: 0 }}>
          Registra cada sesión en la app: al final de cada bloque, la gráfica de
          gasto por día (rango 90/365 días) y tus series te dicen si el bloque
          cumplió antes de pasar al siguiente.
        </p>
      </div>

      <h2>Progresión realista: qué esperar según tu nivel</h2>
      <div className="rejilla">
        {PROGRESION_REALISTA.map((n) => (
          <div className="tarjeta" key={n.nivel}>
            <h3 style={{ marginTop: 0 }}>{n.nivel}</h3>
            <p style={{ margin: '0 0 0.4rem' }}>{n.esperable}</p>
            <p className="mini" style={{ margin: 0 }}><strong>Error típico:</strong> {n.error}</p>
          </div>
        ))}
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
