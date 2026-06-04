import { Pencil, Trash2 } from 'lucide-react'

export function UsersTab({
  filteredUsers,
  handleToggleUserActive,
  openEditUser,
  handleDeleteUser,
}) {
  return (
    <div className="crud-container">
      <div className="crud-table-wrapper">
        <table className="crud-table crud-table--users">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo Electrónico</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="font-mono">#{user.id}</td>
                  <td className="font-bold">{user.name}</td>
                  <td className="font-mono text-muted">{user.email}</td>
                  <td>
                    <span className="badge badge--category">
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="table-status-toggle">
                      <label className="switch-toggle" aria-label={`Cambiar estado de ${user.name}`}>
                        <input
                          type="checkbox"
                          checked={Boolean(user.is_active)}
                          onChange={() => handleToggleUserActive(user)}
                        />
                        <span className="slider-round"></span>
                      </label>
                      <span className={`badge ${user.is_active ? 'badge--active' : 'badge--inactive'}`}>
                        {user.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="crud-actions">
                      <button
                        type="button"
                        className="btn-action btn-action--edit"
                        onClick={() => openEditUser(user)}
                        aria-label="Editar"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action--delete"
                        onClick={() => handleDeleteUser(user.id, user.name)}
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
                  No se encontraron usuarios.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
