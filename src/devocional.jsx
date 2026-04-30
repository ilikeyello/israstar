// Devocional — interactive scripture terminal + weekly devotional card

function Devocional() {
  const [history, setHistory] = React.useState([
    { k: "sys", t: "ISRASTAR · TERMINAL DE ESCRITURA v2.6.1" },
    { k: "sys", t: "Escribe una referencia (ej: Salmos 46:10) o una palabra." },
    { k: "sys", t: "—" }
  ]);
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
            {DEVOTIONAL.quote && (
              <div className="devotional-quote">
                "{DEVOTIONAL.quote}"
                {DEVOTIONAL.ref && (
                  <div style={{ fontStyle: "normal", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cyan)", marginTop: 8, letterSpacing: "0.14em" }}>
                    — {DEVOTIONAL.ref}
                  </div>
                )}
              </div>
            )}
            <div className="devotional-body">{DEVOTIONAL.body}</div>
            <div className="devotional-foot">
              <span>{DEVOTIONAL.by}</span>
              <span>LEER ARCHIVO →</span>
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
