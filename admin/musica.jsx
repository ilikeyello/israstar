// Música — upload and manage tracks

function Musica() {
  const [tracks, setTracks] = React.useState(adminStorage.getAll('musica'));
  const albums = adminStorage.getAll('albumes');
  
  const [showModal, setShowModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: '', albumId: '', trackNumber: '', lyrics: '', releaseDate: '',
    spotifyUrl: '', appleMusicUrl: '', youtubeUrl: '', tags: '', audioFileName: '', audioDataUrl: null, audioFile: null
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let finalAudioUrl = form.audioDataUrl;
    
    if (form.audioFile) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 
            'Authorization': 'Bearer ' + window.adminStorage.authToken,
            'x-filename': form.audioFile.name
          }
        });
        const data = await res.json();
        if (data.success && data.signedUrl) {
          const uploadRes = await fetch(data.signedUrl, {
            method: 'PUT',
            body: form.audioFile,
            headers: {
              'Content-Type': form.audioFile.type || 'application/octet-stream'
            }
          });
          if (uploadRes.ok) {
            finalAudioUrl = data.url;
          } else {
            alert('Error subiendo audio a Supabase.');
            setUploading(false);
            return;
          }
        } else {
          alert('Error subiendo audio: ' + data.error);
          setUploading(false);
          return;
        }
      } catch (err) {
        alert('Error de conexión.');
        setUploading(false);
        return;
      }
    }

    adminStorage.add('musica', {
      title: form.title,
      albumId: form.albumId,
      trackNumber: form.trackNumber,
      lyrics: form.lyrics,
      releaseDate: form.releaseDate,
      spotifyUrl: form.spotifyUrl,
      appleMusicUrl: form.appleMusicUrl,
      youtubeUrl: form.youtubeUrl,
      tags: form.tags,
      audioFileName: form.audioFile ? form.audioFile.name : form.audioFileName,
      audioDataUrl: finalAudioUrl
    });

    setTracks(adminStorage.getAll('musica'));
    setShowModal(false);
    setUploading(false);
    setForm({ title: '', albumId: '', trackNumber: '', lyrics: '', releaseDate: '', spotifyUrl: '', appleMusicUrl: '', youtubeUrl: '', tags: '', audioFileName: '', audioDataUrl: null, audioFile: null });
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({...form, audioFile: file});
    }
  };
  
  const handleDelete = (id) => {
    if (confirm('¿Eliminar esta canción?')) {
      adminStorage.remove('musica', id);
      setTracks(adminStorage.getAll('musica'));
    }
  };
  
  return (
    <div className="admin-main">
      <div className="page-head">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Música</h1>
            <p>Gestiona tu biblioteca musical</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Subir canción
          </button>
        </div>
      </div>
      
      {tracks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">♪</div>
          <h3>Sin canciones</h3>
          <p>Sube tu primera canción para comenzar a construir tu biblioteca</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Subir canción
          </button>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Álbum</th>
              <th>#</th>
              <th>Fecha</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tracks.map(t => {
              const al = albums.find(a => a.id === t.albumId);
              return (
              <tr key={t.id}>
                <td>
                  <div style={{ fontWeight: 500 }}>{t.title}</div>
                  {t.audioFileName && (
                    <div style={{ fontSize: 11, color: 'var(--cyan)', marginTop: 4, fontFamily: 'JetBrains Mono, monospace' }}>
                      ♪ {t.audioFileName}
                    </div>
                  )}
                </td>
                <td style={{ color: 'var(--ink-2)' }}>{al ? al.title : '—'}</td>
                <td style={{ color: 'var(--ink-3)' }}>{t.trackNumber || '—'}</td>
                <td style={{ color: 'var(--ink-3)', fontSize: 13 }}>{t.releaseDate || '—'}</td>
                <td style={{ fontSize: 12, color: 'var(--ink-3)' }}>{t.tags || '—'}</td>
                <td>
                  <button className="btn btn-ghost" style={{ padding: '6px 12px' }} onClick={() => handleDelete(t.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      )}
      
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h2>Subir canción</h2>
              <p>Completa la información de la canción</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">Título *</label>
                <input className="input-text" required value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Álbum</label>
                <select className="input-text" value={form.albumId} onChange={(e) => setForm({...form, albumId: e.target.value})}>
                  <option value="">-- Seleccionar Álbum --</option>
                  {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Número de pista</label>
                <input className="input-text" type="number" value={form.trackNumber} onChange={(e) => setForm({...form, trackNumber: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Archivo de audio (MP3/WAV)</label>
                <input 
                  className="input-text" 
                  type="file" 
                  accept="audio/mp3,audio/wav,audio/mpeg"
                  onChange={handleFileChange}
                  style={{ padding: '8px 14px' }}
                />
                {form.audioFile && (
                  <div style={{ marginTop: 8, fontSize: 13, color: 'var(--cyan)' }}>
                    ✓ {form.audioFile.name}
                  </div>
                )}
              </div>
              
              <div className="input-group">
                <label className="input-label">Fecha de lanzamiento</label>
                <input className="input-text" type="date" value={form.releaseDate} onChange={(e) => setForm({...form, releaseDate: e.target.value})} />
              </div>
              
              <div className="input-group">
                <label className="input-label">Letra</label>
                <textarea className="input-textarea" value={form.lyrics} onChange={(e) => setForm({...form, lyrics: e.target.value})} placeholder="Letra completa de la canción..." />
              </div>
              
              <div className="input-group">
                <label className="input-label">URL Spotify</label>
                <input className="input-text" type="url" value={form.spotifyUrl} onChange={(e) => setForm({...form, spotifyUrl: e.target.value})} placeholder="https://open.spotify.com/..." />
              </div>
              
              <div className="input-group">
                <label className="input-label">URL Apple Music</label>
                <input className="input-text" type="url" value={form.appleMusicUrl} onChange={(e) => setForm({...form, appleMusicUrl: e.target.value})} placeholder="https://music.apple.com/..." />
              </div>
              
              <div className="input-group">
                <label className="input-label">URL YouTube</label>
                <input className="input-text" type="url" value={form.youtubeUrl} onChange={(e) => setForm({...form, youtubeUrl: e.target.value})} placeholder="https://youtube.com/..." />
              </div>
              
              <div className="input-group">
                <label className="input-label">Tags / Mood</label>
                <input className="input-text" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} placeholder="adoración, esperanza, salmos..." />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)} disabled={uploading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={uploading}>
                  {uploading ? 'Subiendo...' : 'Guardar canción'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

window.Musica = Musica;
