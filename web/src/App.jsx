import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Inicio from './paginas/Inicio.jsx'
import Alimentos from './paginas/Alimentos.jsx'
import Recetas from './paginas/Recetas.jsx'
import Micros from './paginas/Micros.jsx'
import Ejercicio from './paginas/Ejercicio.jsx'
import Suplementos from './paginas/Suplementos.jsx'
import Sueno from './paginas/Sueno.jsx'
import Papers from './paginas/Papers.jsx'

export default function App() {
  return (
    <HashRouter>
      <header>
        <img src="favicon.svg" alt="Bodymetria" />
        <h1>Bodymetria</h1>
        <nav>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'activo' : '')}>Inicio</NavLink>
          <NavLink to="/alimentos" className={({ isActive }) => (isActive ? 'activo' : '')}>Alimentos</NavLink>
          <NavLink to="/recetas" className={({ isActive }) => (isActive ? 'activo' : '')}>Recetas</NavLink>
          <NavLink to="/micros" className={({ isActive }) => (isActive ? 'activo' : '')}>Micros</NavLink>
          <NavLink to="/ejercicio" className={({ isActive }) => (isActive ? 'activo' : '')}>Ejercicio</NavLink>
          <NavLink to="/suplementos" className={({ isActive }) => (isActive ? 'activo' : '')}>Suplementos</NavLink>
          <NavLink to="/sueno" className={({ isActive }) => (isActive ? 'activo' : '')}>Sueño</NavLink>
          <NavLink to="/papers" className={({ isActive }) => (isActive ? 'activo' : '')}>Papers</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/alimentos" element={<Alimentos />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/micros" element={<Micros />} />
          <Route path="/ejercicio" element={<Ejercicio />} />
          <Route path="/suplementos" element={<Suplementos />} />
          <Route path="/sueno" element={<Sueno />} />
          <Route path="/papers" element={<Papers />} />
        </Routes>
      </main>
      <footer>
        Bodymetria · tus datos nunca salen de tu dispositivo · porciones basadas en la
        Guía de Alimentos para la Población Mexicana (IMSS); micronutrientes aproximados (USDA)
      </footer>
    </HashRouter>
  )
}
