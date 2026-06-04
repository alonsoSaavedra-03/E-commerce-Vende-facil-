import { Pencil, Trash2 } from 'lucide-react'

export function CategoriesTab({
  filteredCategories,
  handleToggleCategoryActive,
  openEditCategory,
  handleDeleteCategory,
}) {
  return (
    <div className="crud-container">
      <div className="crud-table-wrapper">
        <table className="crud-table crud-table--categories">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="font-mono">#{category.id}</td>
                  <td className="font-bold">{category.name}</td>
                  <td className="font-mono text-muted">{category.slug}</td>
                  <td className="text-truncate" title={category.description}>
                    {category.description || <em className="text-muted">Sin descripción</em>}
                  </td>
                  <td>
                    <div className="table-status-toggle">
                      <label className="switch-toggle" aria-label={`Cambiar estado de ${category.name}`}>
                        <input
                          type="checkbox"
                          checked={Boolean(category.is_active)}
                          onChange={() => handleToggleCategoryActive(category)}
                        />
                        <span className="slider-round"></span>
                      </label>
                      <span className={`badge ${category.is_active ? 'badge--active' : 'badge--inactive'}`}>
                        {category.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge--count">
                      {category.products_count ?? 0}
                    </span>
                  </td>
                  <td>
                    <div className="crud-actions">
                      <button
                        type="button"
                        className="btn-action btn-action--edit"
                        onClick={() => openEditCategory(category)}
                        aria-label="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action--delete"
                        onClick={() => handleDeleteCategory(category.id, category.name)}
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
                <td colSpan="7" className="text-center py-8 text-muted">
                  No se encontraron categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
