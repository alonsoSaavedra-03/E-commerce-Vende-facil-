import { Link, NavLink } from 'react-router-dom'
import { Search, Truck, UserRound } from 'lucide-react'
import logo from '../../assets/logo-letras.png'
import './Navbar.css'

const navigationItems = [
  { label: 'Inicio', to: '/', type: 'section' },
  { label: 'Catalogo', to: '/catalogo', type: 'page' },
  { label: 'Quienes Somos', to: '/#somos', type: 'section' },
  { label: 'Recomendaciones', to: '/#recomendaciones', type: 'section' },
  { label: 'Contacto', to: '/contacto', type: 'page' },
]

export function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__brand" aria-label="Vende Facil">
        <img className="site-header__logo" src={logo} alt="Vende Facil" />
      </div>

      <div className="site-header__center">
        <form className="site-header__search" role="search">
          <label className="visually-hidden" htmlFor="product-search">
            Buscar productos
          </label>
          <input id="product-search" type="search" placeholder="Buscar...." />
          <button type="submit" aria-label="Buscar">
            <Search size={24} strokeWidth={2.2} />
          </button>
        </form>

        <nav className="site-header__nav" aria-label="Navegacion principal">
          {navigationItems.map((item) =>
            item.type === 'section' ? (
              <Link className="site-header__link" key={item.to} to={item.to}>
                {item.label}
              </Link>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  isActive ? 'site-header__link is-active' : 'site-header__link'
                }
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </div>

      <div className="site-header__actions" aria-label="Acciones de usuario">
        <button type="button" aria-label="Envios">
          <Truck size={28} strokeWidth={2.4} />
        </button>
        <Link to="/login" aria-label="Mi cuenta">
          <UserRound size={28} strokeWidth={2.4} />
        </Link>
      </div>
    </header>
  )
}
