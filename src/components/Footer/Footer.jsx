import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import logo from '../../assets/logo-letras.png'
import './Footer.css'

const footerLinks = [
  { label: 'Inicio', to: '/#inicio' },
  { label: 'Catalogo', to: '/catalogo' },
  { label: 'Quienes Somos', to: '/#somos' },
  { label: 'Recomendaciones', to: '/#recomendaciones' },
  { label: 'Contacto', to: '/contacto' },
]

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <section className="site-footer__brand" aria-label="Vende Facil">
          <img className="site-footer__logo" src={logo} alt="Vende Facil" />
          <p>Tu tienda virtual de confianza. Compras sencillas, envíos rápidos y soporte directo.</p>
        </section>

        <section className="site-footer__section" aria-labelledby="footer-links-title">
          <h2 id="footer-links-title">Enlaces</h2>
          <nav className="site-footer__links" aria-label="Enlaces del footer">
            {footerLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </section>

        <section className="site-footer__section" aria-labelledby="footer-contact-title">
          <h2 id="footer-contact-title">Contacto</h2>
          <ul className="site-footer__contact">
            <li>
              <Phone size={18} strokeWidth={2.2} />
              <a href="https://wa.me/51923388220" target="_blank" rel="noreferrer">+51 923 388 220</a>
            </li>
            <li>
              <Mail size={18} strokeWidth={2.2} />
              <a href="mailto:donayrealonso987@gmail.com">donayrealonso987@gmail.com</a>
            </li>
            <li>
              <MapPin size={18} strokeWidth={2.2} />
              <span>Tienda Virtual (Envíos a todo el Perú)</span>
            </li>
          </ul>
        </section>

        <section className="site-footer__section" aria-labelledby="footer-social-title">
          <h2 id="footer-social-title">Redes</h2>
          <div className="site-footer__social">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Comunidad">
              <MessageCircle size={20} strokeWidth={2.2} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Novedades">
              <Send size={20} strokeWidth={2.2} />
            </a>
          </div>
        </section>
      </div>

      <div className="site-footer__bottom">
        <span>&copy; 2026 VendeFacil.</span>
        <span>Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}

