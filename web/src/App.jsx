import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import Inicio from './paginas/Inicio.jsx'
import Alimentos from './paginas/Alimentos.jsx'
import Recetas from './paginas/Recetas.jsx'
import Sueno from './paginas/Sueno.jsx'

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
          <NavLink to="/sueno" className={({ isActive }) => (isActive ? 'activo' : '')}>Sueño</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/alimentos" element={<Alimentos />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/sueno" element={<Sueno />} />
        </Routes>
      </main>
      <footer>
        Bodymetria · tus datos nunca salen de tu dispositivo · porciones basadas en la
        Guía de Alimentos para la Población Mexicana (IMSS); micronutrientes aproximados (USDA)
      </footer>
    </HashRouter>
  )
}
