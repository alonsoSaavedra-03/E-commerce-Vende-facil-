import { BadgeCheck, Handshake, ShieldCheck, TrendingUp } from 'lucide-react'
import './AboutSection.css'

const missionVision = [
  {
    title: 'Mision',
    description:
      'Facilitar la compra y venta de productos mediante una plataforma clara, accesible y confiable para cualquier usuario.',
  },
  {
    title: 'Vision',
    description:
      'Convertir a Vende Facil en una tienda digital reconocida por su organizacion, cercania y capacidad de crecimiento.',
  },
]

const values = [
  {
    title: 'Confianza',
    description: 'Procesos claros para que cada compra se sienta segura.',
    icon: ShieldCheck,
  },
  {
    title: 'Cercania',
    description: 'Una experiencia simple para clientes y vendedores.',
    icon: Handshake,
  },
  {
    title: 'Crecimiento',
    description: 'Herramientas listas para escalar el catalogo del negocio.',
    icon: TrendingUp,
  },
]

export function AboutSection() {
  return (
    <section className="about-section" id="somos">
      <div className="about-section__content">
        <div className="about-section__copy">
          <p className="page-section__eyebrow">Quienes Somos</p>
          <h1>Vende Facil, una tienda digital pensada para comprar con confianza.</h1>
          <p>
            Vende Facil conecta productos, vendedores y clientes en una
            experiencia clara, rapida y confiable. Nuestra meta es que cada
            usuario encuentre lo que necesita sin friccion, con informacion
            ordenada y canales de contacto directos.
          </p>
        </div>

        <aside className="about-section__panel" aria-label="Resumen de Vende Facil">
          <BadgeCheck size={34} strokeWidth={2.2} />
          <strong>Compra organizada, atencion cercana y una base lista para crecer.</strong>
          <span>Proyecto e-commerce en desarrollo</span>
        </aside>
      </div>

      <div className="about-section__stats" aria-label="Puntos clave">
        <article>
          <strong>24/7</strong>
          <span>Catalogo disponible</span>
        </article>
        <article>
          <strong>+6</strong>
          <span>Categorias iniciales</span>
        </article>
        <article>
          <strong>100%</strong>
          <span>Diseno responsive</span>
        </article>
      </div>

      <div className="about-section__mission">
        {missionVision.map(({ description, title }) => (
          <article key={title}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="about-section__values-header">
        <p className="page-section__eyebrow">Valores</p>
        <h2>Principios que guian la experiencia.</h2>
      </div>

      <div className="about-section__values">
        {values.map(({ description, icon: Icon, title }) => (
          <article className="about-value" key={title}>
            <Icon size={24} strokeWidth={2.2} />
            <div>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
