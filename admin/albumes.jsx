// Álbumes — upload and manage albums

function Albumes() {
  const [albums, setAlbums] = React.useState(adminStorage.getAll('albumes'));
  const [showModal, setShowModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    id: '', title: '', subtitle: '', year: '', type: '', variant: 'v1', description: '', coverDataUrl: null, coverFile: null
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    let finalCoverUrl = form.coverDataUrl;
    
    if (form.coverFile) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 
            'Authorization': 'Bearer ' + window.adminStorage.authToken,
            'x-filename': form.coverFile.name
          }
        });
        const data = await res.json();
        if (data.success && data.signedUrl) {
          const uploadRes = await fetch(data.signedUrl, {
            method: 'PUT',
            body: form.coverFile,
            headers: {
              'Content-Type': form.coverFile.type || 'application/octet-stream'
            }
          });
          if (uploadRes.ok) {
            finalCoverUrl = data.url;
          } else {
            alert('Error subiendo imagen a Supabase.');
            setUploading(false);
            return;
          }
        } else {
          alert('Error subiendo imagen: ' + data.error);
          setUploading(false);
          return;
        }
      } catch (err) {
        alert('Error de conexión.');
        setUploading(false);
        return;
      }
    }

    adminStorage.add('albumes', {
      id: form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      title: form.title,
      subtitle: form.subtitle,
      year: form.year,
      type: form.type,
      variant: form.variant,
      description: form.description,
      coverDataUrl: finalCoverUrl
    });
    
    setAlbums(adminStorage.getAll('albumes'));
    setShowModal(false);
    setUploading(false);
    setForm({ id: '', title: '', subtitle: '', year: '', type: '', variant: 'v1', description: '', coverDataUrl: null, coverFile: null });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({...form, coverFile: file});
    }
  };
  
  const handleDelete = (id) => {
    if (confirm('¿Eliminar este álbum? Esto no eliminará las canciones asociadas.')) {
      adminStorage.remove('albumes', id);
      setAlbums(adminStorage.getAll('albumes'));
    }
  };
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Álbumes</h1>
            <p>Gestiona tus lanzamientos y portadas</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Nuevo álbum
          </button>
        </div>
      </div>
      
      {albums.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">◎</div>
          <h3>Sin álbumes</h3>
          <p>Crea tu primer álbum para agrupar tus canciones y mostrar portadas</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Nuevo álbum
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {albums.map(a => (
            <div key={a.id} style={{ 
              background: 'oklch(0.14 0.02 260)', 
              border: '1px solid var(--line)', 
              borderRadius: 12, 
              overflow: 'hidden'
            }}>
              <div style={{
                height: 280,
                background: a.coverDataUrl ? `url(${a.coverDataUrl}) center/cover` : 'var(--ink-4)',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--ink-2)'
              }}>
                {!a.coverDataUrl && <span>Sin portada</span>}
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--cyan)', marginBottom: 4 }}>{a.type} · {a.year}</div>
                    <h3 style={{ fontSize: 18, margin: 0 }}>{a.title}</h3>
                  </div>
                  <button className="btn btn-ghost" style={{ padding: '4px 8px', fontSize: 12 }} onClick={() => handleDelete(a.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
               <h2>Nuevo álbum</h2>
               <p>Completa la información del lanzamiento</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Título *</label>
                <input className="input-text" required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Subtítulo</label>
                <input className="input-text" value={form.subtitle} onChange={(e) => setForm({...form, subtitle: e.target.value})} placeholder="Ej: EP en vivo desde el observatorio" />
              </div>
              
              <div className="input-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="input-label">Año *</label>
                  <input className="input-text" required type="number" value={form.year} onChange={(e) => setForm({...form, year: e.target.value})} />
                </div>
                <div>
                  <label className="input-label">Tipo (LP, EP, Single) *</label>
                  <input className="input-text" required value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} placeholder="LP · 11 pistas" />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Portada (JPG/PNG)</label>
                <input 
                  className="input-text" 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileChange}
                  style={{ padding: '8px 14px' }}
                />
                {form.coverFile && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--cyan)' }}>
                    ✓ {form.coverFile.name}
                  </div>
                )}
              </div>
              
              <div className="input-group">
                <label className="input-label">Descripción</label>
                <textarea className="input-textarea" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Variante de color (Fallback si no hay portada)</label>
                <select className="input-text" value={form.variant} onChange={(e) => setForm({...form, variant: e.target.value})}>
                  <option value="v1">Variante 1 (Naranja)</option>
                  <option value="v2">Variante 2 (Azul)</option>
                  <option value="v3">Variante 3 (Verde oscuro)</option>
                </select>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)} disabled={uploading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={(!form.coverFile && !form.coverDataUrl) || uploading}>
                  {uploading ? 'Subiendo...' : 'Guardar álbum'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

window.Albumes = Albumes;
