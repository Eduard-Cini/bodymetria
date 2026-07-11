// Perfil local (localStorage) y metas de energía.
// Índice usado: Mifflin-St Jeor (el mismo que la app Android), multiplicado
// por el factor de actividad clásico y ajustado por objetivo.
const CLAVE = 'bm.perfil'

export const ACTIVIDADES = [
  { clave: 'sedentario', nombre: 'Sedentario (sin ejercicio)', factor: 1.2 },
  { clave: 'ligero', nombre: 'Ligero (1-3 días/semana)', factor: 1.375 },
  { clave: 'moderado', nombre: 'Moderado (3-5 días/semana)', factor: 1.55 },
  { clave: 'intenso', nombre: 'Intenso (6-7 días/semana)', factor: 1.725 },
]

export const OBJETIVOS = [
  { clave: 'longevidad', nombre: 'Longevidad (énfasis vegetal)', ajuste: 0.92, proteinaPorKg: 1.2, grasaPct: 0.3 },
  { clave: 'perdida', nombre: 'Pérdida de grasa', ajuste: 0.8, proteinaPorKg: 2.0, grasaPct: 0.25 },
  { clave: 'ganancia', nombre: 'Ganancia de músculo', ajuste: 1.1, proteinaPorKg: 1.8, grasaPct: 0.25 },
  { clave: 'general', nombre: 'General (mantenimiento)', ajuste: 1.0, proteinaPorKg: 1.4, grasaPct: 0.3 },
]

export function cargarPerfil() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) ?? null
  } catch {
    return null
  }
}

export function guardarPerfil(p) {
  localStorage.setItem(CLAVE, JSON.stringify(p))
}

/** null si faltan datos. */
export function calcularMetas(p) {
  if (!p) return null
  const { sexo, edad, pesoKg, estaturaCm, actividad, objetivo } = p
  if (!sexo || !edad || !pesoKg || !estaturaCm) return null
  const base = 10 * pesoKg + 6.25 * estaturaCm - 5 * edad
  const bmr = sexo === 'masculino' ? base + 5 : base - 161
  const factor = ACTIVIDADES.find((a) => a.clave === actividad)?.factor ?? 1.375
  const obj = OBJETIVOS.find((o) => o.clave === objetivo) ?? OBJETIVOS[3]
  const kcal = bmr * factor * obj.ajuste
  const prot = obj.proteinaPorKg * pesoKg
  const gras = (kcal * obj.grasaPct) / 9
  const carb = Math.max(0, (kcal - prot * 4 - gras * 9) / 4)
  return { kcal: Math.round(kcal), prot: Math.round(prot), carb: Math.round(carb), gras: Math.round(gras), objetivo: obj }
}
