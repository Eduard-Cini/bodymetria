import { useEffect, useRef } from 'react'
import { ANIM, RIG, avanzar, caja, esqueleto, poseEn } from '../datos/animaciones.js'

// Dibuja la ejecución de un ejercicio como un monigote SVG animado.
//
// El pintado NO pasa por React: sería un re-render por cuadro. El componente
// solo crea el <svg>, y un único requestAnimationFrame compartido mueve todas
// las animaciones a la vista (las de fuera de pantalla no se tocan). Así da
// igual que la página tenga sesenta.

const NS = 'http://www.w3.org/2000/svg'
const CICLO = 2400

const quieto =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function el(tag, at) {
  const n = document.createElementNS(NS, tag)
  Object.keys(at).forEach((k) => n.setAttribute(k, at[k]))
  return n
}
function poly(c) { return el('polyline', { class: c, points: '' }) }
function pon(p, pts) {
  p.setAttribute('points', pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' '))
}
function ver(n, si) { n.style.display = si ? '' : 'none' }
function seg(l, a, b) {
  l.setAttribute('x1', a[0].toFixed(1)); l.setAttribute('y1', a[1].toFixed(1))
  l.setAttribute('x2', b[0].toFixed(1)); l.setAttribute('y2', b[1].toFixed(1))
}

// Arma dentro de un <svg> ya existente todas las piezas del dibujo y devuelve
// la función que las coloca para una pose concreta.
function crear(def, svg) {
  svg.setAttribute('viewBox', caja(def))
  let banda = null, discoEn = null, union = null
  const sueloL = el('line', { class: 'suelo', x1: -400, y1: 0, x2: 600, y2: 0 })
  svg.appendChild(sueloL)
  ver(sueloL, false)

  ;(def.props || []).forEach((pr) => {
    if (pr.t === 'suelo' || pr.t === 'barra') svg.appendChild(el('line', { class: 'suelo', x1: -400, y1: pr.y, x2: 600, y2: pr.y }))
    if (pr.t === 'pared') svg.appendChild(el('line', { class: 'prop', x1: pr.x, y1: -400, x2: pr.x, y2: 600 }))
    if (pr.t === 'caja') svg.appendChild(el('rect', { class: 'caja', x: pr.x, y: pr.y, width: pr.w, height: pr.h, rx: 2 }))
    if (pr.t === 'banda') { banda = el('line', { class: 'banda', x1: 0, y1: 0, x2: pr.a[0], y2: pr.a[1] }); banda._d = pr.desde; svg.appendChild(banda) }
    if (pr.t === 'union') { union = el('line', { class: 'guia', x1: 0, y1: 0, x2: 0, y2: 0 }); union._de = pr.de; union._a = pr.a; svg.appendChild(union) }
    if (pr.t === 'discoEn') { discoEn = el('circle', { class: 'disco', cx: 0, cy: 0, r: 6 }); discoEn._d = pr.de; svg.appendChild(discoEn) }
  })

  const tenue = poly('tenue'), tenue2 = poly('tenue')
  const bandaL = el('line', { class: 'banda', x1: 0, y1: 0, x2: 0, y2: 0 })
  const manoL = el('line', { class: 'tenue', x1: 0, y1: 0, x2: 0, y2: 0 })
  const barra = el('line', { class: 'hueso', x1: 0, y1: 0, x2: 0, y2: 0 })
  const cuerpo = poly('hueso'), brazoP = poly('hueso'), piernaP = poly('hueso')
  const dedos = [0, 1, 2, 3].map(() => el('line', { class: 'hueso', x1: 0, y1: 0, x2: 0, y2: 0 }))
  const aro = el('circle', { class: 'hueso', cx: 0, cy: 0, r: 1, fill: 'none' })
  const cabeza = el('circle', { class: 'cabeza', cx: 0, cy: 0, r: RIG.r })
  const disco = el('circle', { class: 'disco', cx: 0, cy: 0, r: 6 })
  ;[tenue, tenue2, bandaL, manoL, barra, cuerpo, brazoP, piernaP].forEach((n) => svg.appendChild(n))
  dedos.forEach((n) => svg.appendChild(n))
  ;[aro, cabeza, disco].forEach((n) => svg.appendChild(n))

  function pintar(p) {
    if (def.tipo === 'linea') {
      ver(cabeza, false); ver(brazoP, false); ver(piernaP, false); ver(tenue2, false)
      ver(cuerpo, true); pon(cuerpo, p.pts)
      ver(tenue, !!p.pts2); if (p.pts2) pon(tenue, p.pts2)
      ver(barra, !!p.barra); if (p.barra) seg(barra, p.barra[0], p.barra[1])
      ver(bandaL, !!p.banda); if (p.banda) seg(bandaL, p.banda[0], p.banda[1])
      ver(manoL, !!p.mano); if (p.mano) seg(manoL, p.mano[0], p.mano[1])
      ver(disco, !!p.disco)
      if (p.disco) { disco.setAttribute('cx', p.disco[0].toFixed(1)); disco.setAttribute('cy', p.disco[1].toFixed(1)) }
      ver(aro, !!p.aro)
      if (p.aro) { aro.setAttribute('cx', p.aro[0].toFixed(1)); aro.setAttribute('cy', p.aro[1].toFixed(1)); aro.setAttribute('r', p.aro[2].toFixed(1)) }
      dedos.forEach((l, i) => {
        ver(l, !!p.dedos)
        if (p.dedos) seg(l, p.dedos.o, avanzar(p.dedos.o, p.dedos.ang[i], p.dedos.largo))
      })
      ver(sueloL, !!p.suelo)
      if (p.suelo) { sueloL.setAttribute('y1', p.suelo); sueloL.setAttribute('y2', p.suelo) }
      return
    }

    ver(sueloL, false); ver(barra, false); ver(bandaL, false); ver(manoL, false)
    ver(aro, false); ver(disco, false)
    dedos.forEach((l) => ver(l, false))

    const e = esqueleto(p)
    ver(cabeza, true); ver(cuerpo, true); ver(brazoP, true); ver(piernaP, true)
    pon(cuerpo, [e.cadera, e.cuello])
    pon(brazoP, [e.cuello, e.codo, e.muneca])
    pon(piernaP, [e.cadera, e.rodilla, e.tobillo, e.punta])
    cabeza.setAttribute('cx', e.cabeza[0].toFixed(1))
    cabeza.setAttribute('cy', e.cabeza[1].toFixed(1))
    ver(tenue, !!e.rodilla2)
    if (e.rodilla2) pon(tenue, [e.cadera, e.rodilla2, e.tobillo2, e.punta2])
    ver(tenue2, !!e.codo2)
    if (e.codo2) pon(tenue2, [e.cuello, e.codo2, e.muneca2])

    if (banda) { const b = e[banda._d] || e.rodilla; banda.setAttribute('x1', b[0].toFixed(1)); banda.setAttribute('y1', b[1].toFixed(1)) }
    if (discoEn) { const d = e[discoEn._d] || e.muneca; discoEn.setAttribute('cx', d[0].toFixed(1)); discoEn.setAttribute('cy', d[1].toFixed(1)) }
    if (union) seg(union, e[union._de], e[union._a])
  }

  return { svg, pintar, def }
}

// ── Un solo reloj para todas las animaciones montadas ──
const vivos = new Set()
let corriendo = false
let visor = null

function observador() {
  if (!visor) {
    visor = new IntersectionObserver(
      (es) => es.forEach((en) => { en.target._ver = en.isIntersecting }),
      { rootMargin: '120px' }
    )
  }
  return visor
}

function latido(ahora) {
  const f = (ahora % (CICLO * 2)) / CICLO
  vivos.forEach((a) => {
    if (!a.svg._ver || !a.svg.isConnected || a.def.poses.length < 2) return
    try { a.pintar(poseEn(a.def, f)) }
    catch { a.def = { ...a.def, poses: [a.def.poses[0]] } }  // una rota no tumba al resto
  })
  if (vivos.size) requestAnimationFrame(latido)
  else corriendo = false
}

function arrancar() {
  if (corriendo) return
  corriendo = true
  requestAnimationFrame(latido)
}

export default function AnimacionEjercicio({ clave, nombre, grande }) {
  const ref = useRef(null)

  useEffect(() => {
    const def = ANIM[clave]
    const svg = ref.current
    if (!def || !svg) return

    const a = crear(def, svg)
    a.pintar(poseEn(def, quieto ? 1 : 0))
    svg._ver = true
    observador().observe(svg)
    if (!quieto) { vivos.add(a); arrancar() }

    return () => {
      observador().unobserve(svg)
      vivos.delete(a)
      while (svg.firstChild) svg.removeChild(svg.firstChild)
    }
  }, [clave])

  if (!ANIM[clave]) return null
  return (
    <svg
      ref={ref}
      className={'anim' + (grande ? ' grande' : '')}
      role="img"
      aria-label={'Animación de la ejecución' + (nombre ? ': ' + nombre : '')}
    />
  )
}
