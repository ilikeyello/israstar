// Devocional — interactive weekly devotional card

function Devocional() {
  const [activeIdx, setActiveIdx] = React.useState(0);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const activeDevo = DEVOCIONALES.length > 0 ? DEVOCIONALES[activeIdx] : null;

  return (
    <section id="devocional" className="section">
      <div className="section-head">
        <div>
          <div className="label">03 · Devocional</div>
          <h2>Señal <em>semanal</em></h2>
        </div>
        <div className="meta">
          <div>ACTUALIZADO SEMANAL</div>
          <div>{DEVOCIONALES.length} PUBLICACIONES</div>
          <div>CORPUS: RVR 1960</div>
        </div>
      </div>

      <div className="dev">
        <div className="dev-selector">
          {DEVOCIONALES.length === 0 ? (
            <div style={{ color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>SIN DATOS</div>
          ) : DEVOCIONALES.map((d, i) => (
            <div 
              key={d.id} 
              onClick={() => setActiveIdx(i)}
              style={{ 
                padding: 16, 
                border: '1px solid var(--line)', 
                borderRadius: 8, 
                cursor: 'pointer',
                background: activeIdx === i ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderColor: activeIdx === i ? 'var(--cyan)' : 'var(--line)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 12, color: activeIdx === i ? 'var(--cyan)' : 'var(--ink-3)', marginBottom: 4, fontFamily: 'JetBrains Mono, monospace' }}>{d.date}</div>
              <div style={{ fontWeight: 500, fontSize: 16, color: activeIdx === i ? '#fff' : 'var(--ink-2)' }}>{d.title}</div>
            </div>
          ))}
        </div>

        {activeDevo ? (
          <div className="devotional-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="devotional-date">{activeDevo.date}</div>
            <h3>{activeDevo.title}</h3>
            
            {activeDevo.youtubeUrl && getYoutubeId(activeDevo.youtubeUrl) ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: 16, marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${getYoutubeId(activeDevo.youtubeUrl)}`} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : activeDevo.quote ? (
              <div className="devotional-quote">
                "{activeDevo.quote}"
                {activeDevo.ref && (
                  <div style={{ fontStyle: "normal", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cyan)", marginTop: 8, letterSpacing: "0.14em" }}>
                    — {activeDevo.ref}
                  </div>
                )}
              </div>
            ) : null}
            
            {activeDevo.body && (
              <div className="devotional-body" style={{ whiteSpace: 'pre-wrap', color: 'var(--ink-2)', lineHeight: 1.6 }}>{activeDevo.body}</div>
            )}
            
            <div className="devotional-foot" style={{ marginTop: 'auto', paddingTop: 24 }}>
              <span>{activeDevo.by}</span>
              <span>{activeDevo.youtubeUrl ? "VIDEO" : "ARCHIVO"}</span>
            </div>
          </div>
        ) : (
          <div className="devotional-card" style={{ display: 'grid', placeItems: 'center', color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>
            SIN PUBLICACIONES
          </div>
        )}
      </div>
    </section>
  );
}

window.Devocional = Devocional;
