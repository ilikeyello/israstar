// Admin sidebar navigation

function Sidebar({ section, setSection }) {
  const nav = [
    { id: 'dashboard', label: 'Dashboard', icon: '◉' },
    { id: 'albumes', label: 'Álbumes', icon: '◎' },
    { id: 'musica', label: 'Música', icon: '♪' },
    { id: 'devocionales', label: 'Devocionales', icon: '✦' },
    { id: 'suscriptores', label: 'Suscriptores', icon: '◈' },
    { id: 'tienda', label: 'Tienda', icon: '□' },
    { id: 'agenda', label: 'Agenda', icon: '◇' },
    { id: 'ajustes', label: 'Ajustes', icon: '⚙' }
  ];
  
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <img src="assets/isra-on-dark.png" alt="ISRASTAR" />
      </div>
      <div className="sidebar-nav">
        {nav.map(n => (
          <button
            key={n.id}
            className={'sidebar-item' + (section === n.id ? ' active' : '')}
            onClick={() => setSection(n.id)}
          >
            <span className="sidebar-icon">{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid var(--line)', fontSize: '12px', color: 'var(--ink-3)' }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.1em' }}>
          OBSERVATORIO v1.0
        </div>
      </div>
    </div>
  );
}

window.Sidebar = Sidebar;
