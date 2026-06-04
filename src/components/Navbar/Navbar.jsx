import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, UserRound, PackageSearch, Menu, X } from 'lucide-react'
import logo from '../../assets/logo-letras.png'
import { searchProducts } from '../../services/api'
import { useCart } from '../../context/CartContext'
import './Navbar.css'

const navigationItems = [
  { label: 'Inicio', to: '/', type: 'section' },
  { label: 'Catalogo', to: '/catalogo', type: 'page' },
  { label: 'Quienes Somos', to: '/#somos', type: 'section' },
  { label: 'Recomendaciones', to: '/#recomendaciones', type: 'section' },
  { label: 'Contacto', to: '/contacto', type: 'page' },
]

export function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const searchRef = useRef(null)
  
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { getCartCount } = useCart()
  const cartCount = getCartCount()

  // Close mobile drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Fetch suggestions with debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      setShowDropdown(false)
      return
    }

    const delayDebounceFn = setTimeout(() => {
      setIsSearching(true)
      searchProducts(query.trim())
        .then(({ data }) => {
          setSuggestions(data || [])
          setShowDropdown(true)
        })
        .catch((err) => {
          console.error('Error al obtener sugerencias:', err)
        })
        .finally(() => {
          setIsSearching(false)
        })
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  // Click outside to close suggestion dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/catalogo?search=${encodeURIComponent(query.trim())}`)
      setShowDropdown(false)
      setMenuOpen(false)
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/producto/${product.id}`)
    setQuery('')
    setSuggestions([])
    setShowDropdown(false)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(price)
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-header__brand" aria-label="Vende Facil">
        <img className="site-header__logo" src={logo} alt="Vende Facil" />
      </Link>

      {/* Desktop Column containing Search and Nav Menu */}
      <div className="site-header__center">
        <div className="site-header__search-wrapper" ref={searchRef}>
          <form className="site-header__search" role="search" onSubmit={handleSubmit}>
            <label className="visually-hidden" htmlFor="product-search">
              Buscar productos
            </label>
            <input 
              id="product-search" 
              type="search" 
              placeholder="Buscar...." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim().length >= 2 && setShowDropdown(true)}
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">
              <Search size={24} strokeWidth={2.2} />
            </button>
          </form>

          {showDropdown && (
            <ul className="site-header__suggestions">
              {isSearching && (
                <li className="site-header__suggestions-loading">Buscando...</li>
              )}
              {!isSearching && suggestions.length === 0 && (
                <li className="site-header__suggestions-empty">No se encontraron productos</li>
              )}
              {!isSearching && suggestions.map((product) => (
                <li 
                  key={product.id} 
                  className="site-header__suggestion-item"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="site-header__suggestion-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <PackageSearch size={20} />
                    )}
                  </div>
                  <div className="site-header__suggestion-info">
                    <span className="site-header__suggestion-name">{product.name}</span>
                    <span className="site-header__suggestion-category">{product.category?.name}</span>
                  </div>
                  <div className="site-header__suggestion-price">
                    {formatPrice(Number(product.price))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

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

      {/* Header Actions */}
      <div className="site-header__actions" aria-label="Acciones de usuario">
        <Link to="/carrito" aria-label="Carrito" className="site-header__cart-link">
          <ShoppingCart size={28} strokeWidth={2.4} />
          {cartCount > 0 && (
            <span className="site-header__cart-badge">{cartCount}</span>
          )}
        </Link>
        <Link to="/login" aria-label="Mi cuenta">
          <UserRound size={28} strokeWidth={2.4} />
        </Link>
        <button 
          type="button" 
          className="site-header__toggle" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div className={`site-header__mobile-drawer ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer__content">
          {/* Mobile Search */}
          <form className="mobile-drawer__search" role="search" onSubmit={handleSubmit}>
            <input 
              type="search" 
              placeholder="Buscar producto..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" aria-label="Buscar">
              <Search size={20} />
            </button>
          </form>

          {/* Mobile Links */}
          <nav className="mobile-drawer__nav">
            {navigationItems.map((item) => (
              <Link 
                key={item.to} 
                to={item.to}
                className="mobile-drawer__link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/login"
              className="mobile-drawer__link mobile-drawer__link--account"
              onClick={() => setMenuOpen(false)}
            >
              Mi Cuenta
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
