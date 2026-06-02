export function SettingsTab({
  settingsForm,
  handleSettingsChange,
  handleSettingsSubmit,
  handleClearCache,
  handleSeedDatabase,
  isLoading,
}) {
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
                <option value="MXN">Peso Mexicano (MXN)</option>
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
