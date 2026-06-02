import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { CatalogPage } from './pages/Catalog'
import { ContactPage } from './pages/Contact'
import { DashboardPage } from './pages/Dashboard'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { ProductDetailPage } from './pages/ProductDetail'
import { getBackendHealth, getSettings } from './services/api'
import './App.css'
import './pages/Page.css'

function App() {
  const { pathname } = useLocation()
  const isAdminPage = pathname === '/login' || pathname === '/dashboard'
  
  // Route Guards
  const userString = localStorage.getItem('user')
  const user = userString ? JSON.parse(userString) : null
  const isAdmin = user && user.role === 'admin'

  if (pathname === '/dashboard' && !isAdmin) {
    return <Navigate to="/login" replace />
  }

  if (pathname === '/login' && isAdmin) {
    return <Navigate to="/dashboard" replace />
  }
  
  const [settings, setSettings] = useState({
    store_name: '',
    store_email: '',
    store_phone: '',
    system_maintenance: '0',
  })
  const [isLoadingSettings, setIsLoadingSettings] = useState(true)

  useEffect(() => {
    if (import.meta.env.DEV) {
      getBackendHealth()
        .then((data) => console.info('Backend conectado:', data))
        .catch((error) => console.warn('Backend no disponible:', error.message))
    }

    getSettings()
      .then(({ data }) => {
        setSettings(data)
      })
      .catch((err) => {
        console.error('Error al cargar la configuración:', err)
      })
      .finally(() => {
        setIsLoadingSettings(false)
      })
  }, [])

  if (isLoadingSettings) {
    return (
      <div className="catalog-state" style={{ height: '100vh', justifyContent: 'center' }}>
        <p>Iniciando tienda...</p>
      </div>
    )
  }

  // Block site if system is in maintenance mode and it's not an admin page
  if (settings.system_maintenance === '1' && !isAdminPage) {
    return (
      <div className="maintenance-screen">
        <div className="maintenance-card">
          <h1>Sitio en Mantenimiento</h1>
          <p>
            Estamos trabajando en mejoras para {settings.store_name || 'VendeFácil'}. 
            Por favor, regresa más tarde. Disculpa las molestias.
          </p>
          <div className="maintenance-info">
            {settings.store_email && (
              <span><strong>Email de contacto:</strong> {settings.store_email}</span>
            )}
            {settings.store_phone && (
              <span><strong>Teléfono:</strong> {settings.store_phone}</span>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (isAdminPage) {
    return (
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    )
  }

  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="producto/:id" element={<ProductDetailPage />} />
          <Route path="contacto" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
