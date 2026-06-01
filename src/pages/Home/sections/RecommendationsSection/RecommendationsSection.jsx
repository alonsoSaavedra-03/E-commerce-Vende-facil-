import { Gift, PackageCheck, Shield, Sparkles } from 'lucide-react'
import './RecommendationsSection.css'

const recommendations = [
  {
    title: 'Productos destacados',
    description: 'Prioriza articulos con buena demanda, fotografias claras y descripcion completa.',
    icon: Sparkles,
  },
  {
    title: 'Compra segura',
    description: 'Revisa disponibilidad, datos de contacto y condiciones antes de finalizar.',
    icon: Shield,
  },
  {
    title: 'Ofertas y novedades',
    description: 'Reserva este espacio para promociones, lanzamientos y productos de temporada.',
    icon: Gift,
  },
]

export function RecommendationsSection() {
  return (
    <section className="recommendations-section" id="recomendaciones">
      <div className="recommendations-section__header">
        <div>
          <p className="page-section__eyebrow">Recomendaciones</p>
          <h1>Decisiones de compra mas claras y rapidas.</h1>
        </div>
        <p>
          Esta seccion esta pensada para guiar al usuario hacia productos de
          valor, ofertas importantes y consejos utiles antes de comprar.
        </p>
      </div>

      <div className="recommendations-grid">
        {recommendations.map(({ description, icon: Icon, title }) => (
          <article className="recommendation-card" key={title}>
            <div className="recommendation-card__icon">
              <Icon size={26} strokeWidth={2.2} />
            </div>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <aside className="recommendations-banner">
        <PackageCheck size={30} strokeWidth={2.2} />
        <div>
          <strong>Base lista para conectar productos reales.</strong>
          <span>
            Cuando agregues inventario, estas recomendaciones pueden alimentarse
            desde categorias, ventas o productos destacados.
          </span>
        </div>
      </aside>
    </section>
  )
}
