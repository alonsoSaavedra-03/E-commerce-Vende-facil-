import { NavLink } from 'react-router-dom'
import { Search, ShoppingCart, Truck, UserRound } from 'lucide-react'
import './Navbar.css'

const navigationItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Catalogo', to: '/catalogo' },
  { label: 'Quienes Somos', to: '/quienes-somos' },
  { label: 'Recomendaciones', to: '/recomendaciones' },
  { label: 'Contacto', to: '/contacto' },
]

export function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__brand" aria-label="Vende Facil">
        <ShoppingCart className="site-header__brand-icon" strokeWidth={2.5} />
        <span className="site-header__brand-name">Vende Facil</span>
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
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? 'site-header__link is-active' : 'site-header__link'
              }
              end={item.to === '/'}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="site-header__actions" aria-label="Acciones de usuario">
        <button type="button" aria-label="Envios">
          <Truck size={28} strokeWidth={2.4} />
        </button>
        <button type="button" aria-label="Mi cuenta">
          <UserRound size={28} strokeWidth={2.4} />
        </button>
      </div>
    </header>
  )
}
