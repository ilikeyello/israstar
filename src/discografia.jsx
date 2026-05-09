// Discografía — 3D-ish album carousel

function Discografia({ nowPlaying, isPlaying, togglePlay }) {
  const [idx, setIdx] = React.useState(0);
  const [active, setActive] = React.useState(0);
  
  const a = ALBUMS.length > 0 ? ALBUMS[idx] : null;

  const prev = () => setIdx((idx - 1 + ALBUMS.length) % ALBUMS.length);
  const next = () => setIdx((idx + 1) % ALBUMS.length);

  const activeTrack = a?.tracks?.[active];
  const isThisPlaying = activeTrack && nowPlaying && nowPlaying.audioDataUrl === activeTrack.audioDataUrl && isPlaying;

  React.useEffect(() => {
    setActive(0);
  }, [idx]);

  return (
    <section id="discografia" className="section">
      <div className="section-head">
        <div>
          <div className="label">02 · Discografía</div>
          <h2>Archivo <em>sonoro</em></h2>
        </div>
        <div className="meta">
          <div>{ALBUMS.length} LANZAMIENTOS</div>
          <div>MASTERIZADO EN 24BIT / 96kHz</div>
        </div>
      </div>

      {!a ? (
        <div style={{ padding: '100px 0', textAlign: 'center', color: 'var(--ink-3)', fontFamily: 'JetBrains Mono, monospace' }}>
          SIN DATOS EN OBSERVATORIO
        </div>
      ) : (
        <div className="disco">
          <div className="disco-stage">
            <div className="rail">
              {ALBUMS.map((al, i) => {
                const diff = i - idx;
                const x = diff * 58;
                const z = -Math.abs(diff) * 180;
                const rot = diff * -18;
                const scale = 1 - Math.abs(diff) * 0.08;
                const opacity = Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.25;
                return (
                  <div
                    key={al.id}
                    className={"album " + (al.variant || "v1")}
                    style={{
                      transform: `translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
                      opacity,
                      zIndex: 10 - Math.abs(diff),
                      cursor: "pointer"
                    }}
                    onClick={() => setIdx(i)}
                  >
                    <div className="album-cover" style={al.coverDataUrl ? { background: `url(${al.coverDataUrl}) center/cover` } : {}}>
                      {!al.coverDataUrl && <span>{al.title}</span>}
                    </div>
                    <div className="trace">
                      <span>ISRA / {al.id.toUpperCase()}</span>
                      <span>{al.year}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ position: "absolute", left: 16, bottom: 14, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-3)", letterSpacing: "0.18em" }}>
              {String(idx + 1).padStart(2, "0")} / {String(ALBUMS.length).padStart(2, "0")}
            </div>
            <div style={{ position: "absolute", right: 16, bottom: 14, display: "flex", gap: 8 }}>
              <button className="disco-ctrl" onClick={prev} aria-label="prev">←</button>
              <button className="disco-ctrl" onClick={next} aria-label="next">→</button>
            </div>
          </div>

          <div className="disco-meta">
            <div className="track-num">{a.type || 'ÁLBUM'}</div>
            <h3>{a.title}</h3>
            <div className="year">{a.year} {a.subtitle ? `· ${a.subtitle}` : ''}</div>
            <p>{a.description}</p>
            
            {a.tracks && a.tracks.length > 0 ? (
              <div className="tracklist">
                {a.tracks.map((tr, i) => {
                  const isTrPlaying = nowPlaying?.audioDataUrl === tr.audioDataUrl && isPlaying;
                  return (
                  <div
                    key={tr.n}
                    className={"tr" + (i === active ? " active" : "")}
                    onClick={() => {
                      if (i === active) togglePlay(tr);
                      else { setActive(i); togglePlay(tr); }
                    }}
                  >
                    <span className="n">{tr.n}</span>
                    <span>{tr.t}</span>
                    <span className="d">
                      {isTrPlaying ? <EqBars /> : null}
                    </span>
                    <span className="d">{tr.audioDataUrl ? "▶" : "—"}</span>
                  </div>
                )})}
              </div>
            ) : (
              <div style={{ margin: '20px 0', fontSize: 13, color: 'var(--ink-3)' }}>No hay pistas en este álbum.</div>
            )}

            <div className="disco-controls">
              <button 
                className="btn primary" 
                onClick={() => activeTrack && togglePlay(activeTrack)}
                disabled={!activeTrack?.audioDataUrl}
                style={{ opacity: !activeTrack?.audioDataUrl ? 0.5 : 1 }}
              >
                {isThisPlaying ? "Pausar" : <><TriMark size={7} color="currentColor" /> Reproducir</>}
              </button>
              <button className="btn ghost">Letras</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

window.Discografia = Discografia;
