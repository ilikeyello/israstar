// Dashboard — stats overview

function Dashboard() {
  const musica = adminStorage.getAll('musica');
  const devocionales = adminStorage.getAll('devocionales');
  const suscriptores = adminStorage.getAll('suscriptores');
  
  const stats = [
    { label: 'Canciones', value: musica.length, sub: 'en biblioteca' },
    { label: 'Devocionales', value: devocionales.length, sub: 'publicados' },
    { label: 'Suscriptores', value: suscriptores.length, sub: 'en lista' },
    { label: 'Productos', value: 0, sub: 'próximamente' }
  ];
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <h1>Dashboard</h1>
        <p>Observatorio de control — transmisión en vivo</p>
      </div>
      
      <div className="stat-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 18, marginBottom: 16, color: 'var(--ink-2)' }}>Actividad reciente</h2>
        {musica.length === 0 && devocionales.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">◯</div>
            <h3>Sin actividad</h3>
            <p>Sube música o publica un devocional para comenzar</p>
          </div>
        ) : (
          <div style={{ fontSize: 14, color: 'var(--ink-3)' }}>
            Sistema operativo — {musica.length + devocionales.length} elementos en órbita
          </div>
        )}
      </div>
    </div>
  );
}

window.Dashboard = Dashboard;
