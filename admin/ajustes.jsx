// Ajustes — site settings

function Ajustes() {
  const [settings, setSettings] = React.useState(
    adminStorage.get('settings') || {
      siteName: 'ISRASTAR',
      tagline: 'Transmisión desde la órbita',
      contactEmail: 'hola@israstar.com'
    }
  );
  
  const handleSave = (e) => {
    e.preventDefault();
    adminStorage.set('settings', settings);
    alert('Ajustes guardados');
  };
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <h1>Ajustes</h1>
        <p>Configuración general del sitio</p>
      </div>
      
      <form onSubmit={handleSave} style={{ maxWidth: 600 }}>
        <div className="input-group">
          <label className="input-label">Nombre del sitio</label>
          <input 
            className="input-text" 
            value={settings.siteName} 
            onChange={(e) => setSettings({...settings, siteName: e.target.value})} 
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Tagline</label>
          <input 
            className="input-text" 
            value={settings.tagline} 
            onChange={(e) => setSettings({...settings, tagline: e.target.value})} 
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">Email de contacto</label>
          <input 
            className="input-text" 
            type="email"
            value={settings.contactEmail} 
            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} 
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Guardar cambios
        </button>
      </form>
      
      <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--line)' }}>
        <h2 style={{ fontSize: 18, marginBottom: 12, color: 'var(--ink-2)' }}>Zona de peligro</h2>
        <button 
          className="btn btn-ghost" 
          style={{ color: 'var(--red)', borderColor: 'var(--red)' }}
          onClick={() => {
            if (confirm('¿Borrar TODOS los datos? Esta acción no se puede deshacer.')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
        >
          Borrar todos los datos
        </button>
      </div>
    </div>
  );
}

window.Ajustes = Ajustes;
