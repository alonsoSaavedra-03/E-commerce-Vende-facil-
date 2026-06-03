import { Plus, Trash } from 'lucide-react'

export function SettingsTab({
  settingsForm,
  setSettingsForm,
  categories = [],
  handleSettingsChange,
  handleSettingsSubmit,
  handleClearCache,
  handleSeedDatabase,
  isLoading,
}) {

  // Parse banners from the JSON string stored in settingForm
  const banners = (() => {
    try {
      return settingsForm.home_banners ? JSON.parse(settingsForm.home_banners) : []
    } catch (e) {
      console.error('Error parsing home_banners in SettingsTab:', e)
      return []
    }
  })()

  // Save the modified banners list back to the parent state as JSON string
  const handleUpdateBanners = (newBanners) => {
    setSettingsForm((prev) => ({
      ...prev,
      home_banners: JSON.stringify(newBanners)
    }))
  }

  // Add a new default banner slide
  const handleAddBanner = () => {
    const newBanner = {
      id: Date.now(),
      title: 'Nuevo Anuncio Especial',
      subtitle: 'Descripción breve de la oferta o categoría.',
      cta: 'Ver más',
      categorySlug: '',
      icon: 'Sparkles',
      gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
      tag: 'Novedad'
    }
    handleUpdateBanners([...banners, newBanner])
  }

  // Delete a banner slide
  const handleDeleteBanner = (indexToDelete) => {
    const updated = banners.filter((_, idx) => idx !== indexToDelete)
    handleUpdateBanners(updated)
  }

  // Update specific field of a banner slide
  const handleUpdateBannerField = (index, field, value) => {
    const updated = banners.map((banner, idx) => {
      if (idx === index) {
        return { ...banner, [field]: value }
      }
      return banner
    })
    handleUpdateBanners(updated)
  }

  return (
    <div className="settings-container">
      <form onSubmit={handleSettingsSubmit} className="settings-grid-layout">
        {/* Left Column: Form Fields */}
        <div className="settings-form-column">
          <section className="settings-section-card">
            <h2 className="settings-section-title">Información de la Tienda</h2>
            
            <div className="form-group">
              <label htmlFor="set-store-name">Nombre Comercial *</label>
              <input
                id="set-store-name"
                type="text"
                name="store_name"
                required
                value={settingsForm.store_name}
                onChange={handleSettingsChange}
                placeholder="Ej. Mi Tienda Online"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="set-store-email">Email de Contacto *</label>
                <input
                  id="set-store-email"
                  type="email"
                  name="store_email"
                  required
                  value={settingsForm.store_email}
                  onChange={handleSettingsChange}
                  placeholder="contacto@mitienda.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="set-store-phone">Teléfono de Contacto</label>
                <input
                  id="set-store-phone"
                  type="text"
                  name="store_phone"
                  value={settingsForm.store_phone}
                  onChange={handleSettingsChange}
                  placeholder="Ej. +52 (664) 123-4567"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="set-store-address">Dirección Física de la Tienda</label>
              <textarea
                id="set-store-address"
                name="store_address"
                rows="3"
                value={settingsForm.store_address}
                onChange={handleSettingsChange}
                placeholder="Calle Principal 123, Ciudad, Estado, País"
              />
            </div>
          </section>

          <section className="settings-section-card">
            <h2 className="settings-section-title">Políticas y Envíos</h2>
            
            <div className="form-group">
              <label htmlFor="set-store-currency">Moneda del Catálogo</label>
              <select
                id="set-store-currency"
                name="store_currency"
                value={settingsForm.store_currency}
                onChange={handleSettingsChange}
              >
                <option value="PEN">Sol Peruano (PEN)</option>
                <option value="USD">Dólar Americano (USD)</option>
                <option value="EUR">Euro (EUR)</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="set-shipping-fee">Costo de Envío Fijo *</label>
                <input
                  id="set-shipping-fee"
                  type="number"
                  name="store_shipping_fee"
                  required
                  min="0"
                  step="0.01"
                  value={settingsForm.store_shipping_fee}
                  onChange={handleSettingsChange}
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="set-free-shipping">Envío Gratis Desde (monto) *</label>
                <input
                  id="set-free-shipping"
                  type="number"
                  name="store_free_shipping_threshold"
                  required
                  min="0"
                  step="0.01"
                  value={settingsForm.store_free_shipping_threshold}
                  onChange={handleSettingsChange}
                  placeholder="0.00"
                />
              </div>
            </div>
          </section>

          {/* EDITABLE ANNOUNCEMENTS CAROUSEL SECTION */}
          <section className="settings-section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 className="settings-section-title" style={{ margin: 0 }}>Carrusel de Anuncios (Inicio)</h2>
              <button
                type="button"
                className="btn-add-banner-setting"
                onClick={handleAddBanner}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: '#ffffff',
                  background: 'var(--color-brand)',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                <Plus size={15} /> Agregar Anuncio
              </button>
            </div>
            
            <p style={{ fontSize: '0.85rem', color: 'var(--color-muted)', marginBottom: '20px' }}>
              Personaliza las diapositivas del anuncio principal de tu tienda. Puedes agregar múltiples anuncios, cambiar sus textos, enlazar a una categoría específica, y elegir colores y etiquetas.
            </p>

            <div className="banners-settings-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {banners.length === 0 ? (
                <div style={{
                  padding: '30px',
                  textAlign: 'center',
                  background: '#f8fafc',
                  border: '1px dashed var(--color-border)',
                  borderRadius: '10px',
                  color: 'var(--color-muted)',
                  fontSize: '0.9rem'
                }}>
                  No hay anuncios configurados. Haz clic en "Agregar Anuncio" para crear uno.
                </div>
              ) : (
                banners.map((banner, index) => (
                  <div 
                    key={banner.id || index} 
                    style={{
                      background: '#f8fafc',
                      border: '1px solid var(--color-border)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Item Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.02)',
                      padding: '10px 16px',
                      borderBottom: '1px solid var(--color-border)'
                    }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-text)' }}>
                        Diapositiva #{index + 1}: {banner.title || 'Anuncio sin título'}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteBanner(index)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px'
                        }}
                        title="Eliminar Anuncio"
                      >
                        <Trash size={15} />
                      </button>
                    </div>

                    {/* Item Fields */}
                    <div style={{ padding: '16px' }}>
                      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Título *</label>
                          <input
                            type="text"
                            required
                            value={banner.title || ''}
                            onChange={(e) => handleUpdateBannerField(index, 'title', e.target.value)}
                            placeholder="Ej. Tecnología de Vanguardia"
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Etiqueta (Tag)</label>
                          <input
                            type="text"
                            value={banner.tag || ''}
                            onChange={(e) => handleUpdateBannerField(index, 'tag', e.target.value)}
                            placeholder="Ej. Nueva Colección o Envío Gratis"
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                          />
                        </div>
                      </div>

                      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Subtítulo / Mensaje descriptivo *</label>
                        <input
                          type="text"
                          required
                          value={banner.subtitle || ''}
                          onChange={(e) => handleUpdateBannerField(index, 'subtitle', e.target.value)}
                          placeholder="Breve descripción del anuncio..."
                          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                        />
                      </div>

                      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '14px' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Texto del Botón (CTA) *</label>
                          <input
                            type="text"
                            required
                            value={banner.cta || ''}
                            onChange={(e) => handleUpdateBannerField(index, 'cta', e.target.value)}
                            placeholder="Ej. Comprar Ahora"
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)' }}
                          />
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Categoría a Enlazar</label>
                          <select
                            value={banner.categorySlug || ''}
                            onChange={(e) => handleUpdateBannerField(index, 'categorySlug', e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#ffffff' }}
                          >
                            <option value="">Ninguna (Enlace al Catálogo Completo)</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.slug}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Icono de Etiqueta</label>
                          <select
                            value={banner.icon || 'Sparkles'}
                            onChange={(e) => handleUpdateBannerField(index, 'icon', e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#ffffff' }}
                          >
                            <option value="Sparkles">Estrellas (Sparkles)</option>
                            <option value="Percent">Porcentaje (Percent)</option>
                            <option value="Truck">Camión (Truck)</option>
                          </select>
                        </div>
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Color / Degradado de Fondo</label>
                          <select
                            value={banner.gradient || 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)'}
                            onChange={(e) => handleUpdateBannerField(index, 'gradient', e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid var(--color-border)', background: '#ffffff' }}
                          >
                            <option value="linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)">Gris Oscuro / Índigo</option>
                            <option value="linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)">Azul Marino / Verde Agua</option>
                            <option value="linear-gradient(135deg, #064e3b 0%, #047857 100%)">Esmeralda / Verde Pino</option>
                            <option value="linear-gradient(135deg, #4c1d95 0%, #be185d 100%)">Morado / Fucsia</option>
                            <option value="linear-gradient(135deg, #7f1d1d 0%, #c2410c 100%)">Rojo / Naranja</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Status / Utilities */}
        <div className="settings-sidebar-column">
          <section className="settings-section-card settings-section-card--highlight">
            <h2 className="settings-section-title">Estado del Sitio</h2>
            
            <div className="settings-status-box">
              <div className="status-toggle-container">
                <label className="switch-toggle" aria-label="Cambiar modo mantenimiento">
                  <input
                    type="checkbox"
                    name="system_maintenance"
                    checked={settingsForm.system_maintenance === '1'}
                    onChange={handleSettingsChange}
                  />
                  <span className="slider-round"></span>
                </label>
                <div>
                  <h3>Modo Mantenimiento</h3>
                  <p>Deshabilita temporalmente el catálogo público para los clientes.</p>
                </div>
              </div>
            </div>

            <div className="form-actions-settings">
              <button type="submit" className="btn-save-settings" disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar Configuración'}
              </button>
            </div>
          </section>

          <section className="settings-section-card">
            <h2 className="settings-section-title">Utilidades del Sistema</h2>
            <p className="settings-info-text">Operaciones administrativas avanzadas para la base de datos y optimización de caché.</p>
            
            <div className="system-utility-buttons">
              <button
                type="button"
                className="btn-utility btn-utility--cache"
                onClick={handleClearCache}
                disabled={isLoading}
              >
                {isLoading ? 'Ejecutando...' : 'Limpiar Caché'}
              </button>
              
              <button
                type="button"
                className="btn-utility btn-utility--seed"
                onClick={handleSeedDatabase}
                disabled={isLoading}
              >
                {isLoading ? 'Restableciendo...' : 'Restablecer Base de Datos'}
              </button>
            </div>
          </section>
        </div>
      </form>
    </div>
  )
}
