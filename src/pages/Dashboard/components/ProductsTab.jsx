import { Boxes, Pencil, Trash2 } from 'lucide-react'

export function ProductsTab({
  filteredProducts,
  categories,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  handleToggleProductActive,
  openEditProduct,
  handleDeleteProduct,
  storeCurrency,
}) {
  return (
    <div className="crud-container">
      <div className="crud-filters">
        <select
          className="select-category-filter"
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="crud-table-wrapper">
        <table className="crud-table crud-table--products">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="font-mono">#{product.id}</td>
                  <td>
                    <div className="product-img-thumbnail">
                      {product.image ? (
                        <img src={product.image} alt={product.name} onError={(e) => { e.target.style.display = 'none' }} />
                      ) : null}
                      <Boxes size={18} className="fallback-icon" />
                    </div>
                  </td>
                  <td>
                    <div className="font-bold">{product.name}</div>
                    <span className="font-mono text-muted text-xs">{product.slug}</span>
                  </td>
                  <td>
                    <span className="badge badge--category">
                      {product.category?.name ?? 'Sin Categoría'}
                    </span>
                  </td>
                  <td className="font-bold font-mono">
                    {new Intl.NumberFormat(
                      storeCurrency === 'USD' ? 'en-US' : storeCurrency === 'EUR' ? 'fr-FR' : 'es-PE',
                      { style: 'currency', currency: storeCurrency }
                    ).format(Number(product.price))}
                  </td>
                  <td className="font-mono">{product.stock} u.</td>
                  <td>
                    <div className="table-status-toggle">
                      <label className="switch-toggle" aria-label={`Cambiar estado de ${product.name}`}>
                        <input
                          type="checkbox"
                          checked={Boolean(product.is_active)}
                          onChange={() => handleToggleProductActive(product)}
                        />
                        <span className="slider-round"></span>
                      </label>
                      <span className={`badge ${product.is_active ? 'badge--active' : 'badge--inactive'}`}>
                        {product.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="crud-actions">
                      <button
                        type="button"
                        className="btn-action btn-action--edit"
                        onClick={() => openEditProduct(product)}
                        aria-label="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action--delete"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        aria-label="Eliminar"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-muted">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
