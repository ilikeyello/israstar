// Devocional — interactive scripture terminal + weekly devotional card

function Devocional() {
  const [history, setHistory] = React.useState(() => {
    const base = [
      { k: "sys", t: "ISRASTAR · TERMINAL DE ESCRITURA v2.6.1" },
      { k: "sys", t: "Escribe una referencia (ej: Salmos 46:10) o una palabra." },
      { k: "sys", t: "—" }
    ];
    if (DEVOTIONAL && DEVOTIONAL.body) {
      const lines = DEVOTIONAL.body.split('\n').filter(l => l.trim().length > 0);
      base.push({ k: "sys", t: `INCOMING TRANSMISSION: ${DEVOTIONAL.title.toUpperCase()}` });
      base.push({ k: "sep", t: "— — — — — — — — — —" });
      lines.forEach(l => base.push({ k: "verse", t: l }));
      base.push({ k: "sep", t: "— — — — — — — — — —" });
    }
    return base;
  });
  
  const [input, setInput] = React.useState("");
  const bodyRef = React.useRef(null);

  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const submit = () => {
    if (!input.trim()) return;
    const q = input.trim().toLowerCase();
    const hit = SCRIPTURE.find(s => s.ref.toLowerCase().includes(q) || s.t.toLowerCase().includes(q));
    const newItems = [{ k: "cmd", t: input }];
    if (hit) {
      newItems.push({ k: "verse", t: hit.t });
      newItems.push({ k: "ref", t: "— " + hit.ref });
    } else {
      newItems.push({ k: "miss", t: "Sin coincidencia. Intenta 'luz', 'paz', 'Salmos'." });
    }
    newItems.push({ k: "sep", t: "—" });
    setHistory(h => [...h, ...newItems]);
    setInput("");
  };

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <section id="devocional" className="section">
      <div className="section-head">
        <div>
          <div className="label">03 · Devocional</div>
          <h2>Señal <em>semanal</em></h2>
        </div>
        <div className="meta">
          <div>ACTUALIZADO SEMANAL</div>
          <div>{DEVOTIONAL ? DEVOTIONAL.date : 'SIN DATOS'}</div>
          <div>CORPUS: RVR 1960</div>
        </div>
      </div>

      <div className="dev">
        <div className="terminal">
          <div className="terminal-head">
            <span className="terminal-dots"><span></span><span></span><span></span></span>
            <span>scripture@isra ~ %</span>
            <span>READY</span>
          </div>
          <div className="terminal-body" ref={bodyRef}>
            {history.map((h, i) => {
              if (h.k === "sys") return <div key={i} className="line"><b>›</b><span style={{ color: "var(--ink-3)" }}>{h.t}</span></div>;
              if (h.k === "cmd") return <div key={i} className="line"><b>$</b><span>{h.t}</span></div>;
              if (h.k === "verse") return <div key={i} className="verse">"{h.t}"</div>;
              if (h.k === "ref") return <div key={i} className="ref">{h.t}</div>;
              if (h.k === "miss") return <div key={i} className="line"><b style={{ color: "var(--red)" }}>!</b><span>{h.t}</span></div>;
              if (h.k === "sep") return <div key={i} className="sep">— — — — — — — — — —</div>;
              return null;
            })}
          </div>
          <form className="terminal-prompt" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <span className="caret">$</span>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="buscar escritura..."
              autoComplete="off"
              spellCheck={false}
            />
            <span className="blink"></span>
          </form>
        </div>

        {DEVOTIONAL ? (
          <div className="devotional-card">
            <div className="devotional-date">{DEVOTIONAL.date}</div>
            <h3>{DEVOTIONAL.title}</h3>
            
            {DEVOTIONAL.youtubeUrl && getYoutubeId(DEVOTIONAL.youtubeUrl) ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginTop: 16, marginBottom: 16, borderRadius: 8, overflow: 'hidden' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${getYoutubeId(DEVOTIONAL.youtubeUrl)}`} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : DEVOTIONAL.quote ? (
              <div className="devotional-quote">
                "{DEVOTIONAL.quote}"
                {DEVOTIONAL.ref && (
                  <div style={{ fontStyle: "normal", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cyan)", marginTop: 8, letterSpacing: "0.14em" }}>
                    — {DEVOTIONAL.ref}
                  </div>
                )}
              </div>
            ) : null}
            
            {/* If no youtube video is provided, we show the body in the card. Otherwise it only appears in the terminal. */}
            {(!DEVOTIONAL.youtubeUrl || !getYoutubeId(DEVOTIONAL.youtubeUrl)) && DEVOTIONAL.body && (
              <div className="devotional-body">{DEVOTIONAL.body}</div>
            )}
            
            <div className="devotional-foot">
              <span>{DEVOTIONAL.by}</span>
              <span>{DEVOTIONAL.youtubeUrl ? "VER VIDEO →" : "LEER ARCHIVO →"}</span>
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
