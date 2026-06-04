import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import logo from '../../assets/logo-letras.png'
import { loginUser } from '../../services/api'
import './LoginPage.css'

const accessHighlights = [
  {
    title: 'Control central',
    description: 'Gestion de productos, usuarios y pedidos desde un portal claro.',
    icon: BarChart3,
  },
  {
    title: 'Acceso seguro',
    description: 'Interfaz preparada para integrar autenticacion y permisos.',
    icon: ShieldCheck,
  },
]

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await loginUser(email, password)
      const userData = response.data
      
      // Store user details in localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      
      // Redirect based on role
      if (userData.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error al iniciar sesión. Inténtalo de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <header className="login-navbar">
        <Link className="login-navbar__brand" to="/">
          <img src={logo} alt="Vende Facil" />
        </Link>

        <nav className="login-navbar__links" aria-label="Navegacion de acceso">
          <Link to="/">Inicio</Link>
        </nav>

        <Link className="login-navbar__action" to="/catalogo" aria-label="Ir al catalogo">
          <Truck size={29} strokeWidth={2.4} />
        </Link>
      </header>

      <main className="login-page__content">
        <section className="login-page__brand-panel" aria-label="Bienvenida">
          <div className="login-page__brand-content">
            <p className="login-page__eyebrow">
              Vende Facil
            </p>
            <h1>Administra tu tienda desde un espacio profesional.</h1>
            <span>
              Accede al panel para organizar productos, revisar actividad y
              preparar las herramientas de gestion del e-commerce.
            </span>

            <div className="login-page__highlights">
              {accessHighlights.map(({ description, icon: Icon, title }) => (
                <article key={title}>
                  <Icon size={24} strokeWidth={2.2} />
                  <div>
                    <strong>{title}</strong>
                    <small>{description}</small>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="login-page__form-panel" aria-labelledby="login-title">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__header">
              <p className="login-form__eyebrow">Portal del administrador</p>
              <h2 id="login-title">Iniciar Sesion</h2>
              <span>Ingresa con tu cuenta para continuar.</span>
            </div>

            {error && (
              <div 
                style={{ 
                  background: '#fde8e8', 
                  color: '#c81e1e', 
                  border: '1px solid #f8b4b4', 
                  padding: '12px', 
                  borderRadius: '6px', 
                  fontSize: '14px', 
                  marginBottom: '16px',
                  fontWeight: '500'
                }}
              >
                {error}
              </div>
            )}

            <label>
              <span>Correo electronico</span>
              <div className="login-form__field">
                <Mail size={19} strokeWidth={2.2} />
                <input 
                  type="email" 
                  name="email" 
                  placeholder="tu@correo.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label>
              <span>Contrasena</span>
              <div className="login-form__field">
                <LockKeyhole size={19} strokeWidth={2.2} />
                <input 
                  type="password" 
                  name="password" 
                  placeholder="...................." 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            <div className="login-form__options">
              <label className="login-form__remember">
                <input type="checkbox" name="remember" />
                <span>Recordar sesion</span>
              </label>
              <a href="/login">Olvidaste tu contrasena?</a>
            </div>

            <button className="login-form__submit" type="submit" disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Ingresar'}
            </button>

          </form>
        </section>
      </main>
    </div>
  )
}
