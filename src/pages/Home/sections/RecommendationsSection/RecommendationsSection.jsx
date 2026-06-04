import { Star, ShieldCheck, CheckCircle, Quote } from 'lucide-react'
import './RecommendationsSection.css'

const testimonials = [
  {
    name: 'Alejandra Benítez',
    date: 'Hace 2 días',
    stars: 5,
    title: 'Excelente calidad y rapidez',
    comment: 'Me sorprendió la velocidad de envío. Los productos llegaron perfectamente empacados y la calidad superó mis expectativas. Volveré a comprar sin duda.',
    avatarBg: 'linear-gradient(135deg, #ffb703, #ff9f00)',
    initials: 'AB'
  },
  {
    name: 'Mauricio Delgado',
    date: 'Hace 1 semana',
    stars: 5,
    title: 'Proceso de compra súper sencillo',
    comment: 'La atención personalizada por WhatsApp es un acierto total. Resolvieron todas mis dudas al instante y el pedido llegó en perfectas condiciones.',
    avatarBg: 'linear-gradient(135deg, #05a9e8, #0087ba)',
    initials: 'MD'
  },
  {
    name: 'Valeria Rojas',
    date: 'Hace 2 semanas',
    stars: 5,
    title: 'Totalmente confiable',
    comment: 'Tenía mis dudas al principio, pero todo el seguimiento del envío fue súper transparente. El producto es exactamente igual al de las fotos. Recomendadísimo.',
    avatarBg: 'linear-gradient(135deg, #9b51e0, #7030b0)',
    initials: 'VR'
  }
]

export function RecommendationsSection() {
  return (
    <section className="recommendations-section" id="recomendaciones">
      <div className="recommendations-section__header">
        <div className="recommendations-section__title-group">
          <p className="page-section__eyebrow">Opiniones reales</p>
          <h1>Lo que dicen nuestros clientes</h1>
        </div>
        <p className="recommendations-section__subtitle">
          La confianza de quienes nos eligen es nuestra mayor garantía. Conoce las opiniones auténticas de compradores que ya disfrutan de su compra.
        </p>
      </div>

      <div className="recommendations-grid">
        {testimonials.map(({ name, date, stars, title, comment, avatarBg, initials }) => (
          <article className="recommendation-card" key={name}>
            <div className="recommendation-card__quote-bg">
              <Quote size={72} strokeWidth={1} />
            </div>
            
            <div className="recommendation-card__user">
              <div 
                className="recommendation-card__avatar" 
                style={{ background: avatarBg }}
              >
                {initials}
              </div>
              <div className="recommendation-card__user-info">
                <h3>{name}</h3>
                <div className="recommendation-card__verified">
                  <CheckCircle size={12} className="verified-icon" />
                  <span>Comprador verificado</span>
                </div>
              </div>
            </div>

            <div className="recommendation-card__rating">
              {Array.from({ length: stars }).map((_, i) => (
                <Star key={i} size={16} fill="var(--color-brand-warm)" color="var(--color-brand-warm)" />
              ))}
              <span className="recommendation-card__date">{date}</span>
            </div>

            <h2 className="recommendation-card__title">{title}</h2>
            <p className="recommendation-card__comment">"{comment}"</p>
          </article>
        ))}
      </div>

      <aside className="recommendations-banner">
        <div className="recommendations-banner__icon-wrapper">
          <ShieldCheck size={32} strokeWidth={2} />
        </div>
        <div className="recommendations-banner__text">
          <strong>Garantía de Satisfacción & Compra Protegida</strong>
          <span>
            Tu tranquilidad es nuestra prioridad. Ofrecemos pasarelas de pago seguras, envíos con seguimiento en tiempo real y política de devoluciones sin complicaciones.
          </span>
        </div>
      </aside>
    </section>
  )
}

