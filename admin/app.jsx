// Main admin app

function AdminApp() {
  const [section, setSection] = React.useState('dashboard');
  const [ready, setReady] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [auth, setAuth] = React.useState(window.adminStorage.authToken !== '');
  
  React.useEffect(() => {
    if (auth) {
      window.adminStorage.init().then(() => setReady(true));
    }
  }, [auth]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password.trim()) {
      window.adminStorage.setAuthToken(password.trim());
      setAuth(true);
    }
  };
  
  if (!auth) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--ink)' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--ink-4)', padding: 40, borderRadius: 12, border: '1px solid var(--line)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 20 }}>Ingreso al Observatorio</h2>
          <input 
            type="password" 
            placeholder="Contraseña" 
            className="input-text" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            style={{ marginBottom: 20 }}
          />
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Entrar</button>
        </form>
      </div>
    );
  }

  const renderSection = () => {
    switch(section) {
      case 'dashboard': return <Dashboard />;
      case 'albumes': return <Albumes />;
      case 'musica': return <Musica />;
      case 'devocionales': return <Devocionales />;
      case 'suscriptores': return <Suscriptores />;
      case 'tienda': return <Tienda />;
      case 'agenda': return <Agenda />;
      case 'ajustes': return <Ajustes />;
      default: return <Dashboard />;
    }
  };
  
  if (!ready) {
    return <div style={{display: 'grid', placeItems: 'center', height: '100vh'}}>Iniciando Base de Datos...</div>;
  }
  
  return (
    <div className="admin-shell">
      <Sidebar section={section} setSection={setSection} />
      {renderSection()}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('admin-root'));
root.render(<AdminApp />);
