// Tienda — coming soon placeholder

function Tienda() {
  return (
    <div className="admin-main">
      <div className="page-head">
        <h1>Tienda</h1>
        <p>Gestión de productos digitales y físicos</p>
      </div>
      
      <div className="empty-state">
        <div className="empty-state-icon">□</div>
        <h3>Próximamente</h3>
        <p>La gestión de tienda estará disponible pronto. Aquí podrás añadir vinilos, merch, libros y productos digitales.</p>
        <div style={{ marginTop: 20 }}>
          <span className="badge badge-amber">En desarrollo</span>
        </div>
      </div>
    </div>
  );
}

window.Tienda = Tienda;
