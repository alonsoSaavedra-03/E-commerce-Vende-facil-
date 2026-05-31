import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { AboutPage } from './pages/About'
import { CatalogPage } from './pages/Catalog'
import { ContactPage } from './pages/Contact'
import { HomePage } from './pages/Home'
import { RecommendationsPage } from './pages/Recommendations'
import './App.css'
import './pages/Page.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="catalogo" element={<CatalogPage />} />
          <Route path="quienes-somos" element={<AboutPage />} />
          <Route path="recomendaciones" element={<RecommendationsPage />} />
          <Route path="contacto" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
