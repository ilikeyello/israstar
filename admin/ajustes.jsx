// Ajustes — site settings

function Ajustes() {
  const defaultSettings = {
    siteName: 'ISRASTAR',
    tagline: 'Transmisión desde la órbita',
    contactEmail: 'hola@israstar.com',
    links: {
      spotify: '',
      appleMusic: '',
      youtube: '',
      bandcamp: '',
      instagram: '',
      tiktok: '',
      twitter: '',
      management: '',
      prensa: '',
      iglesias: ''
    }
  };

  const loadedSettings = adminStorage.get('settings') || {};
  const [settings, setSettings] = React.useState({
    ...defaultSettings,
    ...loadedSettings,
    links: { ...defaultSettings.links, ...(loadedSettings.links || {}) }
  });
  
  const handleSave = (e) => {
    e.preventDefault();
    adminStorage.set('settings', settings);
    alert('Ajustes guardados');
  };

  const handleLinkChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      links: { ...prev.links, [key]: value }
    }));
  };
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <h1>Ajustes</h1>
        <p>Configuración general del sitio y enlaces</p>
      </div>
      
      <form onSubmit={handleSave} style={{ maxWidth: 800 }}>
        <div className="input-group">
          <label className="input-label">Email de contacto (Footer)</label>
          <input 
            className="input-text" 
            type="email"
            value={settings.contactEmail} 
            onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} 
          />
        </div>

        <h3 style={{marginTop: 40, marginBottom: 20}}>Enlaces de Música</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="input-group">
            <label className="input-label">Spotify</label>
            <input className="input-text" value={settings.links.spotify} onChange={(e) => handleLinkChange('spotify', e.target.value)} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label className="input-label">Apple Music</label>
            <input className="input-text" value={settings.links.appleMusic} onChange={(e) => handleLinkChange('appleMusic', e.target.value)} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label className="input-label">YouTube</label>
            <input className="input-text" value={settings.links.youtube} onChange={(e) => handleLinkChange('youtube', e.target.value)} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label className="input-label">Bandcamp</label>
            <input className="input-text" value={settings.links.bandcamp} onChange={(e) => handleLinkChange('bandcamp', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <h3 style={{marginTop: 40, marginBottom: 20}}>Redes Sociales</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="input-group">
            <label className="input-label">Instagram</label>
            <input className="input-text" value={settings.links.instagram} onChange={(e) => handleLinkChange('instagram', e.target.value)} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label className="input-label">TikTok</label>
            <input className="input-text" value={settings.links.tiktok} onChange={(e) => handleLinkChange('tiktok', e.target.value)} placeholder="https://..." />
          </div>
          <div className="input-group">
            <label className="input-label">X / Twitter</label>
            <input className="input-text" value={settings.links.twitter} onChange={(e) => handleLinkChange('twitter', e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <h3 style={{marginTop: 40, marginBottom: 20}}>Contacto (Emails o Links)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div className="input-group">
            <label className="input-label">Management</label>
            <input className="input-text" value={settings.links.management} onChange={(e) => handleLinkChange('management', e.target.value)} placeholder="mailto:..." />
          </div>
          <div className="input-group">
            <label className="input-label">Prensa</label>
            <input className="input-text" value={settings.links.prensa} onChange={(e) => handleLinkChange('prensa', e.target.value)} placeholder="mailto:..." />
          </div>
          <div className="input-group">
            <label className="input-label">Iglesias</label>
            <input className="input-text" value={settings.links.iglesias} onChange={(e) => handleLinkChange('iglesias', e.target.value)} placeholder="mailto:..." />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary" style={{marginTop: 30}}>
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
