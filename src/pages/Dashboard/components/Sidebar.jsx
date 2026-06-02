import { LogOut } from 'lucide-react'
import logo from '../../../assets/logo-letras.png'

export function Sidebar({ activeTab, setActiveTab, menuItems }) {
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar__brand">
        <img src={logo} alt="Vende Facil" />
      </div>

      <nav className="dashboard-sidebar__nav" aria-label="Navegacion administrativa">
        {menuItems.map(({ disabled, icon: Icon, label, id }) => (
          <button
            className={`${activeTab === id ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}
            key={id}
            type="button"
            disabled={disabled}
            onClick={() => setActiveTab(id)}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button 
        className="dashboard-sidebar__logout" 
        type="button" 
        onClick={() => {
          localStorage.removeItem('user')
          window.location.href = '/'
        }}
      >
        <LogOut size={20} strokeWidth={2.2} />
        <span>Volver al sitio</span>
      </button>
    </aside>
  )
}
