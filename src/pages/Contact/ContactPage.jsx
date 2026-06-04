import { useState } from 'react'
import { Clock, Mail, Globe, MessageCircle, Phone, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import './ContactPage.css'

// OBTENCIÓN DEL ACCESS KEY:
// Para recibir correos reales en donayrealonso987@gmail.com:
// 1. Ingresa a https://web3forms.com
// 2. Introduce tu correo para recibir una clave de acceso gratuita instantáneamente.
// 3. Reemplaza el valor de ACCESS_KEY aquí debajo con tu clave recibida.
const ACCESS_KEY = "5ffc571d-a02a-4804-90e6-5e88d4ddc03e"

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'compra',
    message: ''
  })

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Por favor, completa todos los campos obligatorios.'
      })
      return
    }

    setStatus({ submitting: true, success: false, error: null })

    // Si aún no se ha configurado la clave, mostramos una advertencia guiada
    if (ACCESS_KEY === "TU_ACCESS_KEY_DE_WEB3FORMS") {
      setTimeout(() => {
        setStatus({
          submitting: false,
          success: false,
          error: 'Falta configurar el ACCESS_KEY en ContactPage.jsx. Por favor solicita tu clave gratuita en web3forms.com y reemplázala en el código.'
        })
      }, 1000)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `Contacto VendeFacil - [${formData.category.toUpperCase()}]`,
          message: formData.message,
          from_name: "Contacto VendeFacil"
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null
        })
        setFormData({
          name: '',
          email: '',
          category: 'compra',
          message: ''
        })
      } else {
        throw new Error(result.message || 'Error al enviar el mensaje.')
      }
    } catch (err) {
      console.error('Error al enviar formulario:', err)
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'No se pudo enviar el correo. Por favor intenta de nuevo.'
      })
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-card contact-card--info">
        <div>
          <p className="page-section__eyebrow">Contacto</p>
          <h1>VendeFacil</h1>
          <p className="contact-card__intro">
            Somos una tienda 100% virtual. Estamos a tu disposición para ayudarte con cualquier consulta o pedido de forma inmediata y personalizada.
          </p>
        </div>

        <div className="contact-info">
          <article className="contact-info__item">
            <Globe size={20} strokeWidth={2.2} />
            <div>
              <h2>Modelo de Operación</h2>
              <p>Tienda Virtual (Envíos a todo el Perú)</p>
            </div>
          </article>

          <article className="contact-info__item">
            <Phone size={20} strokeWidth={2.2} />
            <div>
              <h2>WhatsApp / Teléfono</h2>
              <p>
                <a href="https://wa.me/51923388220" target="_blank" rel="noreferrer" className="contact-link">
                  +51 923 388 220
                </a>
              </p>
            </div>
          </article>

          <article className="contact-info__item">
            <Mail size={20} strokeWidth={2.2} />
            <div>
              <h2>Correo Electrónico</h2>
              <p>
                <a href="mailto:donayrealonso987@gmail.com" className="contact-link">
                  donayrealonso987@gmail.com
                </a>
              </p>
            </div>
          </article>

          <article className="contact-info__item">
            <Clock size={20} strokeWidth={2.2} />
            <div>
              <h2>Horario de atención</h2>
              <p>Lunes a sábado, 9:00 AM - 7:00 PM</p>
            </div>
          </article>
        </div>

        <div className="contact-map" aria-label="Cobertura de envíos nacionales">
          <div className="contact-map__button">
            <Globe size={14} strokeWidth={2.2} />
            <span>Envíos Nacionales</span>
          </div>
          <span className="contact-map__pin">Cobertura en todo el Perú</span>
        </div>
      </section>

      <section className="contact-card contact-card--form">
        <div>
          <p className="page-section__eyebrow">Formulario</p>
          <h1>Escríbenos</h1>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {status.success && (
            <div className="contact-form__alert contact-form__alert--success">
              <CheckCircle size={20} />
              <div>
                <strong>¡Mensaje enviado con éxito!</strong>
                <span>Tu consulta ha sido enviada. Te responderemos al correo proporcionado a la brevedad.</span>
              </div>
            </div>
          )}

          {status.error && (
            <div className="contact-form__alert contact-form__alert--error">
              <AlertCircle size={20} />
              <div>
                <strong>Atención</strong>
                <span>{status.error}</span>
              </div>
            </div>
          )}

          <div className="contact-form__row">
            <label>
              <span>Nombre completo *</span>
              <input 
                type="text" 
                name="name" 
                placeholder="Tu nombre" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                disabled={status.submitting}
              />
            </label>

            <label>
              <span>Correo electrónico *</span>
              <input 
                type="email" 
                name="email" 
                placeholder="ejemplo@correo.com" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                disabled={status.submitting}
              />
            </label>
          </div>

          <label>
            <span>Categoría de consulta</span>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              disabled={status.submitting}
            >
              <option value="compra">Compra / Pedido</option>
              <option value="venta">Ventas corporativas</option>
              <option value="soporte">Soporte técnico / Reclamaciones</option>
              <option value="otro">Otro tipo de consulta</option>
            </select>
          </label>

          <label>
            <span>Mensaje *</span>
            <textarea
              name="message"
              placeholder="¿En qué podemos ayudarte hoy?"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status.submitting}
            />
          </label>

          <div className="contact-form__actions">
            <button 
              className="contact-form__submit" 
              type="submit" 
              disabled={status.submitting}
            >
              {status.submitting ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Mail size={18} strokeWidth={2.2} />
                  <span>Enviar web</span>
                </>
              )}
            </button>
            <a className="contact-form__whatsapp" href="https://wa.me/51923388220" target="_blank" rel="noreferrer">
              <MessageCircle size={18} strokeWidth={2.2} />
              <span>WhatsApp</span>
            </a>
          </div>
        </form>
      </section>
    </div>
  )
}


