import { Boxes, Coins, PackageCheck, Tags } from 'lucide-react'

export function InicioTab({ stats, storeCurrency }) {
  const formatVal = (val) => {
    const locale = storeCurrency === 'USD' ? 'en-US' : storeCurrency === 'EUR' ? 'fr-FR' : 'es-PE'
    return new Intl.NumberFormat(locale, { style: 'currency', currency: storeCurrency }).format(val)
  }
  const averagePrice = formatVal(Number(stats?.average_price || 0))
  const totalProducts = stats?.total_products || 0

  return (
    <div className="dashboard-stats-overview">
      {/* Stats Cards */}
      <div className="dashboard-stats-grid-row">
        <article className="dashboard-stat-card-new">
          <div className="stat-card-info">
            <span>Productos</span>
            <strong>{stats?.total_products ?? 0}</strong>
            <small>{stats?.active_products ?? 0} activos</small>
          </div>
          <div className="stat-card-icon-wrapper">
            <Boxes size={28} />
          </div>
        </article>

        <article className="dashboard-stat-card-new">
          <div className="stat-card-info">
            <span>Categorías</span>
            <strong>{stats?.total_categories ?? 0}</strong>
            <small>{stats?.active_categories ?? 0} activas</small>
          </div>
          <div className="stat-card-icon-wrapper">
            <Tags size={28} />
          </div>
        </article>

        <article className="dashboard-stat-card-new">
          <div className="stat-card-info">
            <span>Stock Total</span>
            <strong>{stats?.total_stock ?? 0} u.</strong>
            <small>Productos disponibles</small>
          </div>
          <div className="stat-card-icon-wrapper">
            <PackageCheck size={28} />
          </div>
        </article>

        <article className="dashboard-stat-card-new">
          <div className="stat-card-info">
            <span>Precio Promedio</span>
            <strong>{averagePrice}</strong>
            <small>Valor medio de catálogo</small>
          </div>
          <div className="stat-card-icon-wrapper">
            <Coins size={28} />
          </div>
        </article>
      </div>

      {/* Split layout: Recent Items & Category Distribution */}
      <div className="dashboard-charts-grid">
        <div className="dashboard-recent-panel">
          <div className="panel-header-new">
            <h2>Últimos Productos Añadidos</h2>
          </div>
          <div className="panel-body-new">
            {stats?.recent_products?.length > 0 ? (
              <div className="recent-list-table-wrapper">
                <table className="recent-list-table">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recent_products.map((prod) => (
                      <tr key={prod.id}>
                        <td className="font-bold">{prod.name}</td>
                        <td>
                          <span className="badge badge--category">
                            {prod.category?.name ?? 'Sin Categoría'}
                          </span>
                        </td>
                        <td className="font-mono">{formatVal(prod.price || 0)}</td>
                        <td className="font-mono">{prod.stock} u.</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4">No hay productos registrados.</p>
            )}
          </div>
        </div>

        <div className="dashboard-recent-panel">
          <div className="panel-header-new">
            <h2>Distribución por Categorías</h2>
          </div>
          <div className="panel-body-new flex-col-gap">
            {stats?.category_stats?.length > 0 ? (
              stats.category_stats.map((cat) => {
                const count = cat.products_count || 0
                const percentage = totalProducts > 0 
                  ? (count / totalProducts) * 100 
                  : 0;
                return (
                  <div key={cat.id} className="category-distribution-row">
                    <div className="distribution-label">
                      <span>{cat.name}</span>
                      <strong>{count} prod. ({Math.round(percentage)}%)</strong>
                    </div>
                    <div className="distribution-bar-bg">
                      <div 
                        className="distribution-bar-fill"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-muted text-center py-4">No hay categorías registradas.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
