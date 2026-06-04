import { BadgeCheck, ShieldCheck, Award, MessageSquare } from 'lucide-react'
import './AboutSection.css'

const missionVision = [
  {
    title: 'Nuestra Misión',
    description:
      'Simplificar y enriquecer la experiencia de compra en línea, conectando a nuestros clientes con productos excepcionales de forma segura, rápida y con un acompañamiento cercano en cada etapa de su compra.',
  },
  {
    title: 'Nuestra Visión',
    description:
      'Ser el destino de comercio electrónico preferido en la región, reconocidos por nuestra integridad, innovación continua en la atención al cliente y por crear un ecosistema digital transparente y sin fricciones.',
  },
]

const values = [
  {
    title: 'Integridad',
    description: 'Garantizamos total transparencia en la calidad de nuestros productos, precios y tiempos de entrega.',
    icon: ShieldCheck,
  },
  {
    title: 'Excelencia',
    description: 'Buscamos superar expectativas mediante una rigurosa curaduría de inventario y procesos de despacho ágiles.',
    icon: Award,
  },
  {
    title: 'Cercanía',
    description: 'Creemos en la comunicación directa. Respondemos tus consultas en tiempo real y te asesoramos vía WhatsApp.',
    icon: MessageSquare,
  },
]

export function AboutSection() {
  return (
    <section className="about-section" id="somos">
      <div className="about-section__content">
        <div className="about-section__copy">
          <p className="page-section__eyebrow">Quiénes Somos</p>
          <h1>Tu tienda de confianza con atención personalizada en cada compra.</h1>
          <p>
            En nuestra plataforma nos dedicamos a tender puentes entre la calidad y la comodidad. Cada artículo de nuestro catálogo ha sido rigurosamente verificado para garantizar que recibes exactamente lo que esperas, con envíos rápidos y el respaldo constante de nuestro equipo.
          </p>
        </div>

        <aside className="about-section__panel" aria-label="Compromiso Ingenia">
          <BadgeCheck size={36} strokeWidth={2} className="about-section__panel-icon" />
          <strong>Calidad garantizada, soporte humano y compras 100% seguras.</strong>
          <span>El Compromiso Ingenia</span>
        </aside>
      </div>

      <div className="about-section__stats" aria-label="Estadísticas de la empresa">
        <article className="about-stat-card">
          <strong>+5,000</strong>
          <span>Entregas Exitosas</span>
        </article>
        <article className="about-stat-card">
          <strong>24 / 7</strong>
          <span>Soporte & Asesoría</span>
        </article>
        <article className="about-stat-card">
          <strong>100%</strong>
          <span>Clientes Satisfechos</span>
        </article>
      </div>

      <div className="about-section__mission">
        {missionVision.map(({ description, title }) => (
          <article key={title} className="about-mission-card">
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="about-section__values-header">
        <p className="page-section__eyebrow">Valores</p>
        <h2>Los principios que guían nuestra experiencia</h2>
      </div>

      <div className="about-section__values">
        {values.map(({ description, icon: Icon, title }) => (
          <article className="about-value" key={title}>
            <div className="about-value__icon-wrapper">
              <Icon size={22} strokeWidth={2.2} />
            </div>
            <div className="about-value__text">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
