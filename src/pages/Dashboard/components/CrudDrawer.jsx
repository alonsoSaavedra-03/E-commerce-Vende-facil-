import { Boxes, X } from 'lucide-react'

export function CrudDrawer({
  isFormOpen,
  setIsFormOpen,
  formType,
  formMode,
  isLoading,
  validationErrors,
  categoryForm,
  handleCategoryChange,
  handleCategorySubmit,
  productForm,
  handleProductChange,
  handleProductSubmit,
  categories,
  userForm,
  handleUserChange,
  handleUserSubmit,
  customerForm,
  handleCustomerChange,
  handleCustomerSubmit,
  users,
  handleAddSpecRow,
  handleRemoveSpecRow,
  handleSpecRowChange,
  handleProductFileChange,
}) {
  if (!isFormOpen) return null

  return (
    <div className="dashboard-drawer-overlay" onClick={() => setIsFormOpen(false)}>
      <div className="dashboard-drawer" onClick={(e) => e.stopPropagation()}>
        <header className="dashboard-drawer__header">
          <h2>
            {formMode === 'create' ? 'Crear' : 'Editar'}{' '}
            {formType === 'category' ? 'Categoría' : formType === 'product' ? 'Producto' : formType === 'user' ? 'Usuario' : 'Cliente'}
          </h2>
          <button type="button" onClick={() => setIsFormOpen(false)} aria-label="Cerrar formulario">
            <X size={22} />
          </button>
        </header>

        <div className="dashboard-drawer__content">
          {formType === 'category' && (
            <form onSubmit={handleCategorySubmit} className="dashboard-form">
              <div className="form-group">
                <label htmlFor="cat-name">Nombre de Categoría *</label>
                <input
                  id="cat-name"
                  type="text"
                  name="name"
                  required
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  placeholder="Ej. Electrodomésticos"
                />
                {validationErrors.name && (
                  <span className="error-message">{validationErrors.name[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cat-slug">Slug (URL amigable) *</label>
                <input
                  id="cat-slug"
                  type="text"
                  name="slug"
                  required
                  value={categoryForm.slug}
                  onChange={handleCategoryChange}
                  placeholder="ej-electrodomesticos"
                />
                {validationErrors.slug && (
                  <span className="error-message">{validationErrors.slug[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cat-desc">Descripción</label>
                <textarea
                  id="cat-desc"
                  name="description"
                  rows="4"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  placeholder="Detalles sobre esta categoría..."
                />
                {validationErrors.description && (
                  <span className="error-message">{validationErrors.description[0]}</span>
                )}
              </div>

              <div className="form-group form-group--checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={Boolean(categoryForm.is_active)}
                    onChange={handleCategoryChange}
                  />
                  <span>Categoría activa (visible en el catálogo)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Categoría'}
                </button>
              </div>
            </form>
          )}

          {formType === 'product' && (
            <form onSubmit={handleProductSubmit} className="dashboard-form">
              <div className="form-group">
                <label htmlFor="prod-name">Nombre de Producto *</label>
                <input
                  id="prod-name"
                  type="text"
                  name="name"
                  required
                  value={productForm.name}
                  onChange={handleProductChange}
                  placeholder="Ej. Cafetera Italiana 6 Tazas"
                />
                {validationErrors.name && (
                  <span className="error-message">{validationErrors.name[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="prod-slug">Slug (URL amigable) *</label>
                <input
                  id="prod-slug"
                  type="text"
                  name="slug"
                  required
                  value={productForm.slug}
                  onChange={handleProductChange}
                  placeholder="ej-cafetera-italiana"
                />
                {validationErrors.slug && (
                  <span className="error-message">{validationErrors.slug[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="prod-cat">Categoría *</label>
                <select
                  id="prod-cat"
                  name="category_id"
                  required
                  value={productForm.category_id}
                  onChange={handleProductChange}
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {validationErrors.category_id && (
                  <span className="error-message">{validationErrors.category_id[0]}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="prod-price">Precio (MXN) *</label>
                  <input
                    id="prod-price"
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    required
                    value={productForm.price}
                    onChange={handleProductChange}
                    placeholder="0.00"
                  />
                  {validationErrors.price && (
                    <span className="error-message">{validationErrors.price[0]}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="prod-stock">Stock disponible *</label>
                  <input
                    id="prod-stock"
                    type="number"
                    name="stock"
                    min="0"
                    required
                    value={productForm.stock}
                    onChange={handleProductChange}
                    placeholder="0"
                  />
                  {validationErrors.stock && (
                    <span className="error-message">{validationErrors.stock[0]}</span>
                  )}
                </div>
              </div>

              <div className="form-group" style={{ display: 'grid', gap: '10px' }}>
                <div>
                  <label htmlFor="prod-img-file" style={{ fontWeight: 700 }}>Subir Imagen (Convertir a WebP)</label>
                  <input
                    id="prod-img-file"
                    type="file"
                    accept="image/*"
                    style={{ border: 'none', padding: '6px 0', background: 'transparent' }}
                    onChange={handleProductFileChange}
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '4px 0' }}>
                  <span style={{ height: '1px', background: '#cbd5e1', flex: 1 }}></span>
                  <span style={{ fontSize: '11px', color: 'var(--color-muted)', fontWeight: 600 }}>O BIEN</span>
                  <span style={{ height: '1px', background: '#cbd5e1', flex: 1 }}></span>
                </div>

                <div>
                  <label htmlFor="prod-img">Pegar URL de Imagen</label>
                  <input
                    id="prod-img"
                    type="text"
                    name="image"
                    value={productForm.image}
                    onChange={handleProductChange}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                {validationErrors.image && (
                  <span className="error-message">{validationErrors.image[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="prod-desc">Descripción</label>
                <textarea
                  id="prod-desc"
                  name="description"
                  rows="4"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Especificaciones, detalles del producto..."
                />
                {validationErrors.description && (
                  <span className="error-message">{validationErrors.description[0]}</span>
                )}
              </div>

              <div className="form-group" style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ margin: 0, fontWeight: 700 }}>Especificaciones del Producto</label>
                  <button 
                    type="button" 
                    className="btn-action" 
                    style={{ height: '32px', width: 'auto', padding: '0 10px', fontSize: '12px', fontWeight: 600, display: 'inline-flex', gap: '4px' }}
                    onClick={handleAddSpecRow}
                  >
                    + Añadir Fila
                  </button>
                </div>

                {productForm.specifications && productForm.specifications.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {productForm.specifications.map((spec, index) => (
                      <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="text"
                          placeholder="Ej. RAM, Material"
                          value={spec.key}
                          style={{ flex: 1, padding: '8px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                          onChange={(e) => handleSpecRowChange(index, 'key', e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Ej. 16GB, Algodón"
                          value={spec.value}
                          style={{ flex: 1, padding: '8px 10px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
                          onChange={(e) => handleSpecRowChange(index, 'value', e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          style={{ 
                            background: '#fee2e2', 
                            color: '#ef4444', 
                            border: '1px solid #f8b4b4', 
                            padding: '8px 10px', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '34px',
                            width: '34px'
                          }}
                          onClick={() => handleRemoveSpecRow(index)}
                          title="Eliminar fila"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-muted)', fontStyle: 'italic' }}>
                    No hay especificaciones definidas. Haz clic en "+ Añadir Fila" para agregar características.
                  </p>
                )}
              </div>

              <div className="form-group form-group--checkbox" style={{ marginTop: '10px' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={Boolean(productForm.is_active)}
                    onChange={handleProductChange}
                  />
                  <span>Producto activo (visible en la tienda)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          )}

          {formType === 'user' && (
            <form onSubmit={handleUserSubmit} className="dashboard-form">
              <div className="form-group">
                <label htmlFor="usr-name">Nombre Completo *</label>
                <input
                  id="usr-name"
                  type="text"
                  name="name"
                  required
                  value={userForm.name}
                  onChange={handleUserChange}
                  placeholder="Ej. Juan Pérez"
                />
                {validationErrors.name && (
                  <span className="error-message">{validationErrors.name[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="usr-email">Correo Electrónico *</label>
                <input
                  id="usr-email"
                  type="email"
                  name="email"
                  required
                  value={userForm.email}
                  onChange={handleUserChange}
                  placeholder="juan@correo.com"
                />
                {validationErrors.email && (
                  <span className="error-message">{validationErrors.email[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="usr-pass">Contraseña {formMode === 'create' ? '*' : '(dejar en blanco para mantener la actual)'}</label>
                <input
                  id="usr-pass"
                  type="password"
                  name="password"
                  required={formMode === 'create'}
                  value={userForm.password}
                  onChange={handleUserChange}
                  placeholder="••••••••"
                />
                {validationErrors.password && (
                  <span className="error-message">{validationErrors.password[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="usr-role">Rol de Usuario *</label>
                <select
                  id="usr-role"
                  name="role"
                  required
                  value={userForm.role}
                  onChange={handleUserChange}
                >
                  <option value="admin">Administrador</option>
                  <option value="customer">Cliente (Comprador)</option>
                  <option value="user">Usuario Estándar</option>
                </select>
                {validationErrors.role && (
                  <span className="error-message">{validationErrors.role[0]}</span>
                )}
              </div>

              <div className="form-group form-group--checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={Boolean(userForm.is_active)}
                    onChange={handleUserChange}
                  />
                  <span>Usuario activo (permite iniciar sesión)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Usuario'}
                </button>
              </div>
            </form>
          )}

          {formType === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="dashboard-form">
              <div className="form-group">
                <label htmlFor="cust-user">Usuario Asociado *</label>
                <select
                  id="cust-user"
                  name="user_id"
                  required
                  value={customerForm.user_id}
                  onChange={handleCustomerChange}
                  disabled={formMode === 'edit'}
                >
                  {formMode === 'edit' ? (
                    <option value={customerForm.user_id}>
                      {users.find(u => u.id.toString() === customerForm.user_id.toString())?.name || `Usuario #${customerForm.user_id}`}
                    </option>
                  ) : (
                    users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name} ({u.email}) - {u.role}
                      </option>
                    ))
                  )}
                </select>
                {validationErrors.user_id && (
                  <span className="error-message">{validationErrors.user_id[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cust-phone">Teléfono</label>
                <input
                  id="cust-phone"
                  type="text"
                  name="phone"
                  value={customerForm.phone}
                  onChange={handleCustomerChange}
                  placeholder="Ej. +52 664 123 4567"
                />
                {validationErrors.phone && (
                  <span className="error-message">{validationErrors.phone[0]}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="cust-addr">Dirección de Envío</label>
                <textarea
                  id="cust-addr"
                  name="address"
                  rows="4"
                  value={customerForm.address}
                  onChange={handleCustomerChange}
                  placeholder="Calle Principal #123, Colonia..."
                />
                {validationErrors.address && (
                  <span className="error-message">{validationErrors.address[0]}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Cliente'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
