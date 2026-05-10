// Agenda — countdown + tour list + footer

function useCountdown(targetStr) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetStr).getTime();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s };
}

function Agenda() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'agenda' })
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
    <section id="agenda" className="section">
      <div className="section-head">
        <div>
          <div className="label">05 · Agenda</div>
          <h2>Gira <em>Órbita</em></h2>
        </div>
        <div className="meta">
          <div>FECHAS POR ANUNCIAR</div>
          <div>ESPAÑA · LATINOAMÉRICA</div>
          <div>2026 / 2027</div>
        </div>
      </div>

      <div className="coming-soon">
        <div className="coming-soon-inner">
          <div className="cs-eyebrow">
            <span className="cs-dot"></span> SEÑAL EN PREPARACIÓN
          </div>
          <h3>Próximamente</h3>
          <p>
            Las fechas de la próxima gira se están confirmando. Únete a la lista para
            recibir aviso antes que nadie cuando se anuncien los conciertos.
          </p>
          
          {status === 'success' ? (
            <div style={{ background: 'oklch(1 0 0 / 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid var(--cyan)', color: 'var(--cyan)', marginTop: '20px' }}>
              ¡Gracias! Te avisaremos cuando se anuncien las fechas.
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

          <div className="cs-meta">PRIMER ANUNCIO · PRONTO</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="big-word">Gracias<br /><em>por escuchar.</em></div>
        <img src="assets/isra-mark.png" alt="ISRA★" style={{ height: 44, width: "auto", marginTop: 28, opacity: 0.85, filter: "drop-shadow(0 0 20px oklch(0.84 0.14 210 / 0.4))" }} />
        <div style={{ marginTop: 14, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.14em" }}>
          OBSERVATORIO · EST. 2022
        </div>
      </div>
      <div>
        <h5>Escucha</h5>
        <a href="#">Spotify</a>
        <a href="#">Apple Music</a>
        <a href="#">YouTube</a>
        <a href="#">Bandcamp</a>
      </div>
      <div>
        <h5>Sígueme</h5>
        <a href="#">Instagram</a>
        <a href="#">TikTok</a>
        <a href="#">X / Twitter</a>
        <a href="#">Newsletter</a>
      </div>
      <div>
        <h5>Contacto</h5>
        <a href="#">Management</a>
        <a href="#">Prensa</a>
        <a href="#">Iglesias</a>
        <a href="#">Hola@israstar.com</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 · ISRASTAR · TODOS LOS DERECHOS</span>
        <span>DISEÑADO EN EL OBSERVATORIO · HECHO CON FE</span>
      </div>
    </footer>
  );
}

function ScriptureStrip() {
  const line = SCRIPT_MARQUEE.join("   ✦   ");
  return (
    <div className="scripture-strip">
      <div className="marquee">
        <span>{line}</span>
        <span className="sep">/ / /</span>
        <span>{line}</span>
        <span className="sep">/ / /</span>
      </div>
    </div>
  );
}

Object.assign(window, { Agenda, Footer, ScriptureStrip });
