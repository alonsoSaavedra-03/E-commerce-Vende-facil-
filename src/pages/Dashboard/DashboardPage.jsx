import {
  Bell,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Database,
  KeyRound,
  Link2,
  LogOut,
  PackageCheck,
  Search,
  Settings,
  Table2,
  Tags,
  UserCog,
  Users,
} from 'lucide-react'
import logo from '../../assets/logo-letras.png'
import './DashboardPage.css'

const menuItems = [
  { label: 'Base de datos', icon: Database, active: true },
  { label: 'Usuarios', icon: Users },
  { label: 'Categorias', icon: Tags },
  { label: 'Productos', icon: Boxes },
  { label: 'Clientes', icon: UserCog },
  { label: 'Ajustes', icon: Settings },
]

const schemaCards = [
  {
    table: 'users',
    title: 'Usuarios',
    description: 'Cuentas del sistema y roles de acceso.',
    icon: Users,
    manualFields: ['name', 'email', 'password', 'role', 'is_active'],
    autoFields: ['id', 'email_verified_at', 'remember_token', 'created_at', 'updated_at'],
    example: 'Administrador / admin@vendefacil.com / admin / activo',
  },
  {
    table: 'categories',
    title: 'Categorias',
    description: 'Agrupaciones usadas para clasificar productos.',
    icon: Tags,
    manualFields: ['name', 'slug', 'description', 'is_active'],
    autoFields: ['id', 'created_at', 'updated_at'],
    example: 'Electronicos / electronicos / Productos tecnologicos / activo',
  },
  {
    table: 'products',
    title: 'Productos',
    description: 'Catalogo visible para venta y administracion.',
    icon: Boxes,
    manualFields: ['category_id', 'name', 'slug', 'description', 'price', 'stock', 'image', 'is_active'],
    autoFields: ['id', 'created_at', 'updated_at'],
    example: 'Laptop Lenovo / $12,500.00 / stock 8 / laptop-lenovo.jpg',
  },
  {
    table: 'customers',
    title: 'Clientes',
    description: 'Datos complementarios del usuario comprador.',
    icon: UserCog,
    manualFields: ['user_id', 'phone', 'address'],
    autoFields: ['id', 'created_at', 'updated_at'],
    example: 'user_id 2 / 6641234567 / Calle Principal 123, Tijuana',
  },
]

const relations = [
  {
    title: 'products.category_id',
    description: 'Debe existir primero una categoria en categories.id.',
  },
  {
    title: 'customers.user_id',
    description: 'Debe existir primero un usuario en users.id.',
  },
]

const seedExamples = [
  { table: 'users', data: 'Administrador - admin@vendefacil.com - role admin - is_active 1' },
  { table: 'categories', data: 'Electronicos - electronicos - Productos tecnologicos y dispositivos.' },
  { table: 'products', data: 'Laptop Lenovo - category_id 1 - price 12500.00 - stock 8' },
  { table: 'customers', data: 'user_id 2 - 6641234567 - Calle Principal 123, Tijuana' },
]

export function DashboardPage() {
  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__brand">
          <img src={logo} alt="Vende Facil" />
        </div>

        <nav className="dashboard-sidebar__nav" aria-label="Navegacion administrativa">
          {menuItems.map(({ active, icon: Icon, label }) => (
            <button className={active ? 'is-active' : ''} key={label} type="button">
              <Icon size={20} strokeWidth={2.2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <button className="dashboard-sidebar__logout" type="button">
          <LogOut size={20} strokeWidth={2.2} />
          <span>Cerrar sesion</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p>Panel administrativo</p>
            <h1>Modelo de datos Vende Facil</h1>
          </div>

          <div className="dashboard-topbar__actions">
            <label className="dashboard-search">
              <Search size={18} strokeWidth={2.2} />
              <input type="search" placeholder="Buscar tabla o campo..." />
            </label>
            <button type="button" aria-label="Notificaciones">
              <Bell size={21} strokeWidth={2.2} />
            </button>
          </div>
        </header>

        <section className="dashboard-schema-summary" aria-label="Resumen de tablas">
          <article>
            <Database size={26} strokeWidth={2.2} />
            <div>
              <strong>4 tablas principales</strong>
              <span>users, categories, products y customers</span>
            </div>
          </article>
          <article>
            <KeyRound size={26} strokeWidth={2.2} />
            <div>
              <strong>Campos automaticos</strong>
              <span>id, timestamps y tokens no se rellenan manualmente</span>
            </div>
          </article>
          <article>
            <Link2 size={26} strokeWidth={2.2} />
            <div>
              <strong>Relaciones obligatorias</strong>
              <span>products.category_id y customers.user_id dependen de registros previos</span>
            </div>
          </article>
        </section>

        <section className="dashboard-schema-grid" aria-label="Tablas del sistema">
          {schemaCards.map(({ autoFields, description, example, icon: Icon, manualFields, table, title }) => (
            <article className="dashboard-table-card" key={table}>
              <div className="dashboard-table-card__header">
                <div>
                  <p>{table}</p>
                  <h2>{title}</h2>
                </div>
                <Icon size={26} strokeWidth={2.2} />
              </div>

              <p className="dashboard-table-card__description">{description}</p>

              <div className="dashboard-field-group">
                <h3>Campos que llenas</h3>
                <div className="dashboard-field-list">
                  {manualFields.map((field) => (
                    <span key={field}>{field}</span>
                  ))}
                </div>
              </div>

              <div className="dashboard-field-group dashboard-field-group--muted">
                <h3>No rellenar manualmente</h3>
                <div className="dashboard-field-list">
                  {autoFields.map((field) => (
                    <span key={field}>{field}</span>
                  ))}
                </div>
              </div>

              <div className="dashboard-example">
                <Table2 size={17} strokeWidth={2.2} />
                <span>{example}</span>
              </div>
            </article>
          ))}
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel dashboard-panel--wide">
            <div className="dashboard-panel__header">
              <div>
                <p>Orden recomendado</p>
                <h2>Alta de registros</h2>
              </div>
              <PackageCheck size={24} strokeWidth={2.2} />
            </div>

            <ol className="dashboard-flow">
              <li>
                <strong>1. Crear users</strong>
                <span>Primero registra administrador y usuarios base.</span>
              </li>
              <li>
                <strong>2. Crear categories</strong>
                <span>Necesarias antes de guardar productos.</span>
              </li>
              <li>
                <strong>3. Crear products</strong>
                <span>Usa un category_id existente.</span>
              </li>
              <li>
                <strong>4. Crear customers</strong>
                <span>Usa un user_id existente.</span>
              </li>
            </ol>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <p>Validaciones</p>
                <h2>Relaciones</h2>
              </div>
              <Link2 size={24} strokeWidth={2.2} />
            </div>

            <div className="dashboard-relations">
              {relations.map((relation) => (
                <article key={relation.title}>
                  <strong>{relation.title}</strong>
                  <span>{relation.description}</span>
                </article>
              ))}
            </div>
          </article>

          <article className="dashboard-panel dashboard-panel--wide">
            <div className="dashboard-panel__header">
              <div>
                <p>Datos ejemplo</p>
                <h2>Registros iniciales</h2>
              </div>
            </div>

            <div className="dashboard-seed-table">
              {seedExamples.map((item) => (
                <div className="dashboard-seed-row" key={item.table}>
                  <strong>{item.table}</strong>
                  <span>{item.data}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="dashboard-panel__header">
              <div>
                <p>Estado</p>
                <h2>Checklist</h2>
              </div>
            </div>

            <ul className="dashboard-checklist">
              <li>
                <CheckCircle2 size={18} strokeWidth={2.2} />
                <span>is_active se llena con 1 para registros activos.</span>
              </li>
              <li>
                <CheckCircle2 size={18} strokeWidth={2.2} />
                <span>slug debe ser unico y legible para categorias/productos.</span>
              </li>
              <li>
                <CheckCircle2 size={18} strokeWidth={2.2} />
                <span>price y stock pertenecen solo a products.</span>
              </li>
            </ul>
          </article>
        </section>
      </main>
    </div>
  )
}
