// Tienda — coming soon

function Tienda() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'tienda' })
      });
      
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="tienda" className="section">
      <div className="section-head">
        <div>
          <div className="label">04 · Tienda</div>
          <h2>Artefactos <em>físicos</em></h2>
        </div>
        <div className="meta">
          <div>EN PREPARACIÓN</div>
          <div>VINILOS · MERCH · LIBROS</div>
          <div>APERTURA PRONTO</div>
        </div>
      </div>

      <div className="coming-soon">
        <div className="coming-soon-inner">
          <div className="cs-eyebrow">
            <span className="cs-dot"></span> EN ÓRBITA · CARGANDO
          </div>
          <h3>Próximamente</h3>
          <p>
            Estamos preparando la tienda — vinilos firmados, ediciones limitadas, libros
            devocionales y merch oficial. Suscríbete para recibir aviso cuando se abran
            las puertas.
          </p>
          
          {status === 'success' ? (
            <div style={{ background: 'oklch(1 0 0 / 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid var(--cyan)', color: 'var(--cyan)', marginTop: '20px' }}>
              ¡Gracias! Te avisaremos cuando la tienda esté lista.
            </div>
          ) : (
            <form className="cs-form" onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="tu@correo.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
              />
              <button className="btn primary" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Cargando...' : 'Avísame'}
              </button>
            </form>
          )}
          {status === 'error' && (
            <div style={{ color: 'var(--amber)', fontSize: '13px', marginTop: '10px' }}>
              Hubo un error al suscribirte. Intenta de nuevo.
            </div>
          )}
          
          <div className="cs-meta">TRANSMISIÓN PROGRAMADA · Q3 · 2026</div>
        </div>
      </div>
    </section>
  );
}

window.Tienda = Tienda;
