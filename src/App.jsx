import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { CatalogPage } from './pages/Catalog'
import { ContactPage } from './pages/Contact'
import { DashboardPage } from './pages/Dashboard'
import { HomePage } from './pages/Home'
import { LoginPage } from './pages/Login'
import { getBackendHealth } from './services/api'
import './App.css'
import './pages/Page.css'

function App() {
  const { pathname } = useLocation()
  const isAdminPage = pathname === '/login' || pathname === '/dashboard'

  useEffect(() => {
    if (!import.meta.env.DEV) {
      return
    }

    getBackendHealth()
      .then((data) => console.info('Backend conectado:', data))
      .catch((error) => console.warn('Backend no disponible:', error.message))
  }, [])

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
