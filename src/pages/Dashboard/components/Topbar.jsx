import { Bell, Plus, Search } from 'lucide-react'

export function Topbar({
  activeTab,
  searchQuery,
  setSearchQuery,
  openCreateCategory,
  openCreateProduct,
  openCreateUser,
  openCreateCustomer,
}) {
  return (
    <header className="dashboard-topbar">
      <div>
        <p>Panel administrativo</p>
        <h1>
          {activeTab === 'inicio' && 'Inicio'}
          {activeTab === 'users' && 'Gestión de Usuarios'}
          {activeTab === 'categories' && 'Gestión de Categorías'}
          {activeTab === 'products' && 'Gestión de Productos'}
          {activeTab === 'customers' && 'Gestión de Clientes'}
          {activeTab === 'settings' && 'Ajustes del Sistema'}
        </h1>
      </div>

      <div className="dashboard-topbar__actions">
        {(activeTab === 'categories' || activeTab === 'products' || activeTab === 'users' || activeTab === 'customers') && (
          <label className="dashboard-search">
            <Search size={18} strokeWidth={2.2} />
            <input
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>
        )}
        
        {activeTab === 'categories' && (
          <button className="btn-add-primary" type="button" onClick={openCreateCategory}>
            <Plus size={18} strokeWidth={2.2} />
            <span>Nueva Categoría</span>
          </button>
        )}
        {activeTab === 'products' && (
          <button className="btn-add-primary" type="button" onClick={openCreateProduct}>
            <Plus size={18} strokeWidth={2.2} />
            <span>Nuevo Producto</span>
          </button>
        )}
        {activeTab === 'users' && (
          <button className="btn-add-primary" type="button" onClick={openCreateUser}>
            <Plus size={18} strokeWidth={2.2} />
            <span>Nuevo Usuario</span>
          </button>
        )}
        {activeTab === 'customers' && (
          <button className="btn-add-primary" type="button" onClick={openCreateCustomer}>
            <Plus size={18} strokeWidth={2.2} />
            <span>Nuevo Cliente</span>
          </button>
        )}
        <button type="button" aria-label="Notificaciones" className="btn-topbar-icon">
          <Bell size={21} strokeWidth={2.2} />
        </button>
      </div>
    </header>
  )
}
