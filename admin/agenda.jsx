// Agenda — coming soon placeholder

function Agenda() {
  return (
    <div className="admin-main">
      <div className="page-head">
        <h1>Agenda</h1>
        <p>Gestión de fechas de gira y eventos</p>
      </div>
      
      <div className="empty-state">
        <div className="empty-state-icon">◇</div>
        <h3>Próximamente</h3>
        <p>La gestión de agenda estará disponible pronto. Aquí podrás añadir conciertos, eventos y controlar la venta de entradas.</p>
        <div style={{ marginTop: 20 }}>
          <span className="badge badge-amber">En desarrollo</span>
        </div>
      </div>
    </div>
  );
}

window.Agenda = Agenda;
