// Suscriptores — email list management

function Suscriptores() {
  const [subs, setSubs] = React.useState(adminStorage.getAll('suscriptores'));
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  
  const handleAdd = (e) => {
    e.preventDefault();
    adminStorage.add('suscriptores', { email });
    setSubs(adminStorage.getAll('suscriptores'));
    setShowModal(false);
    setEmail('');
  };
  
  const handleDelete = (id) => {
    if (confirm('¿Eliminar este suscriptor?')) {
      adminStorage.remove('suscriptores', id);
      setSubs(adminStorage.getAll('suscriptores'));
    }
  };
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Suscriptores</h1>
            <p>Gestiona tu lista de correos</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Añadir suscriptor
          </button>
        </div>
      </div>
      
      {subs.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">◈</div>
          <h3>Sin suscriptores</h3>
          <p>Los suscriptores del sitio público aparecerán aquí</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Fecha de suscripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {subs.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 500 }}>{s.email}</td>
                <td style={{ color: 'var(--ink-3)', fontSize: 13 }}>
                  {new Date(s.createdAt).toLocaleDateString('es-ES')}
                </td>
                <td>
                  <button className="btn btn-ghost" style={{ padding: '6px 12px' }} onClick={() => handleDelete(s.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Añadir suscriptor</h2>
              <p>Añade un email manualmente a la lista</p>
            </div>
            
            <form onSubmit={handleAdd}>
              <div className="input-group">
                <label className="input-label">Email *</label>
                <input 
                  className="input-text" 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

window.Suscriptores = Suscriptores;
