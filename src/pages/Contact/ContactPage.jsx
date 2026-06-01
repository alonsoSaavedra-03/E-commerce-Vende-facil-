import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import './ContactPage.css'

export function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-card contact-card--info">
        <div>
          <p className="page-section__eyebrow">Contacto</p>
          <h1>VendeFacil.</h1>
          <p className="contact-card__intro">
            Una experiencia de compra fluida y optimizada para todos tus
            dispositivos portatiles y moviles.
          </p>
        </div>

        <div className="contact-info">
          <article className="contact-info__item">
            <MapPin size={20} strokeWidth={2.2} />
            <div>
              <h2>Ubicacion central</h2>
              <p>Av. Principal 123, Centro, Mexico</p>
            </div>
          </article>

          <article className="contact-info__item">
            <Clock size={20} strokeWidth={2.2} />
            <div>
              <h2>Horario de atencion</h2>
              <p>Lunes a sabado, 9:00 AM - 7:00 PM</p>
            </div>
          </article>

          <article className="contact-info__item">
            <Phone size={20} strokeWidth={2.2} />
            <div>
              <h2>Canal de respuesta</h2>
              <p>Formulario web, correo o WhatsApp</p>
            </div>
          </article>
        </div>

        <div className="contact-map" aria-label="Mapa de ubicacion">
          <div className="contact-map__button">
            <Navigation size={14} strokeWidth={2.2} />
            <span>Maps</span>
          </div>
          <span className="contact-map__pin">VendeFacil</span>
        </div>
      </section>

      <section className="contact-card contact-card--form">
        <div>
          <p className="page-section__eyebrow">Formulario</p>
          <h1>Escribenos</h1>
        </div>

        <form className="contact-form">
          <div className="contact-form__row">
            <label>
              <span>Nombre completo</span>
              <input type="text" name="name" placeholder="Tu nombre" />
            </label>

            <label>
              <span>Correo electronico</span>
              <input type="email" name="email" placeholder="ejemplo@correo.com" />
            </label>
          </div>

          <label>
            <span>Categoria de consulta</span>
            <select name="category" defaultValue="">
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="compra">Compra</option>
              <option value="venta">Venta</option>
              <option value="soporte">Soporte</option>
              <option value="otro">Otro</option>
            </select>
          </label>

          <label>
            <span>Mensaje</span>
            <textarea
              name="message"
              placeholder="En que podemos ayudarte hoy?"
              rows="5"
            />
          </label>

          <div className="contact-form__actions">
            <button className="contact-form__submit" type="submit">
              <Mail size={18} strokeWidth={2.2} />
              Enviar web
            </button>
            <a className="contact-form__whatsapp" href="https://wa.me/520000000000" target="_blank" rel="noreferrer">
              <MessageCircle size={18} strokeWidth={2.2} />
              WhatsApp
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}
