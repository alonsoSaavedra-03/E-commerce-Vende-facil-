import { Pencil, Trash2 } from 'lucide-react'

export function CustomersTab({
  filteredCustomers,
  openEditCustomer,
  handleDeleteCustomer,
}) {
  return (
    <div className="crud-container">
      <div className="crud-table-wrapper">
        <table className="crud-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="font-mono">#{customer.id}</td>
                  <td className="font-bold">{customer.user?.name ?? <em className="text-muted">Sin usuario</em>}</td>
                  <td className="font-mono text-muted">{customer.user?.email ?? '-'}</td>
                  <td className="font-mono">{customer.phone || <em className="text-muted">Sin teléfono</em>}</td>
                  <td className="text-truncate" title={customer.address}>
                    {customer.address || <em className="text-muted">Sin dirección</em>}
                  </td>
                  <td>
                    <div className="crud-actions">
                      <button
                        type="button"
                        className="btn-action btn-action--edit"
                        onClick={() => openEditCustomer(customer)}
                        aria-label="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action--delete"
                        onClick={() => handleDeleteCustomer(customer.id, customer.user?.name ?? 'Cliente')}
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
                <td colSpan="6" className="text-center py-8 text-muted">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
