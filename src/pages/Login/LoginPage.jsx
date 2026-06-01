import { Link } from 'react-router-dom'
import {
  BarChart3,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import logo from '../../assets/logo-letras.png'
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
  return (
    <div className="login-page">
      <header className="login-navbar">
        <Link className="login-navbar__brand" to="/">
          <img src={logo} alt="Vende Facil" />
        </Link>

        <nav className="login-navbar__links" aria-label="Navegacion de acceso">
          <Link to="/">Inicio</Link>
          <Link to="/login">Register</Link>
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
          <form className="login-form">
            <div className="login-form__header">
              <p className="login-form__eyebrow">Portal del administrador</p>
              <h2 id="login-title">Iniciar Sesion</h2>
              <span>Ingresa con tu cuenta para continuar.</span>
            </div>

            <label>
              <span>Correo electronico</span>
              <div className="login-form__field">
                <Mail size={19} strokeWidth={2.2} />
                <input type="email" name="email" placeholder="tu@correo.com" />
              </div>
            </label>

            <label>
              <span>Contrasena</span>
              <div className="login-form__field">
                <LockKeyhole size={19} strokeWidth={2.2} />
                <input type="password" name="password" placeholder="...................." />
              </div>
            </label>

            <div className="login-form__options">
              <label className="login-form__remember">
                <input type="checkbox" name="remember" />
                <span>Recordar sesion</span>
              </label>
              <a href="/login">Olvidaste tu contrasena?</a>
            </div>

            <button className="login-form__submit" type="submit">
              Ingresar
            </button>

            <div className="login-form__divider">
              <span>o continuar con</span>
            </div>

            <button className="login-form__provider" type="button">
              <span className="login-form__provider-icon login-form__provider-icon--google">
                G
              </span>
              Continuar con Google
            </button>

            <button className="login-form__provider" type="button">
              <span className="login-form__provider-icon login-form__provider-icon--github">
                GH
              </span>
              Continuar con GitHub
            </button>

            <p className="login-form__register">
              No tienes cuenta? <Link to="/login">Registrate aqui</Link>
            </p>
          </form>
        </section>
      </main>
    </div>
  )
}
