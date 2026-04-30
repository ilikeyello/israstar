// Hero section with 3D rotating logo

function Hero({ go, tweaks }) {
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(32);

  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setProgress(p => (p + 0.4) % 100), 100);
    return () => clearInterval(id);
  }, [playing]);

  const mm = Math.floor((progress / 100) * 222);
  const t = `${String(Math.floor(mm / 60)).padStart(2, "0")}:${String(mm % 60).padStart(2, "0")}`;

  const t2 = tweaks || {};
  const speed = t2.rotateSpeed ?? 12;   // seconds per revolution
  const axis = t2.rotateAxis ?? "y";    // 'y' horizontal, 'x' vertical, 'xy' both
  const glow = t2.logoGlow ?? 60;       // 0-100
  const scale = t2.logoScale ?? 70;     // 30-100 (% of panel)
  const rings = t2.showRings ?? true;
  const stars = t2.showStars ?? true;
  const tilt = t2.tilt ?? 8;            // static z-tilt degrees
  const accent = t2.accent ?? "#66d9ff";

  const axisAnim = axis === "x" ? "heroSpinX" : axis === "xy" ? "heroSpinXY" : "heroSpinY";

  return (
    <section id="hero" className="hero">
      <div className="hero-copy">
        <div className="eyebrow" style={{ color: accent }}>TRANSMISIÓN 042 · DESDE LA ÓRBITA</div>
        <h1>
          <span className="glow">Música</span> <em>para</em><br />
          los que todavía<br />
          miran <em>al cielo.</em>
        </h1>
        <p className="lede">
          Isra es un artista cristiano español que escribe canciones a medio camino entre
          el himno y la transmisión satelital. Este es su puesto de observación — donde la
          música, las escrituras y los conciertos se encuentran en la misma frecuencia.
        </p>
        <div className="hero-actions">
          <button className="btn primary" onClick={() => setPlaying(!playing)}>
            <TriMark size={8} color="currentColor" />
            {playing ? "Pausar sencillo" : "Escuchar último sencillo"}
          </button>
          <button className="btn ghost" onClick={() => go("discografia")}>
            Ver discografía →
          </button>
          <span className="pill">03 · CANAL ABIERTO</span>
        </div>
      </div>

      <div className="hero-art corner-brackets" style={{ "--accent": accent }}>
        <i></i>

        {/* starfield backdrop */}
        {stars && <div className="star-field" aria-hidden></div>}

        {/* rings */}
        {rings && <>
          <div className="ring"></div>
          <div className="ring r2"></div>
          <div className="ring r3"></div>
          <div className="ring r4"></div>
        </>}

        {/* sweeping scan */}
        <div className="scan-sweep" aria-hidden></div>

        {/* 3D rotating logo */}
        <div className="logo3d-wrap">
          <div className="logo3d-tilt" style={{ transform: `translate(-50%, -50%) rotateZ(${tilt}deg)` }}>
            <div className="logo3d-anchor" style={{ width: `${scale}%` }}>
              <div
                className="logo3d"
                style={{
                  animation: `${axisAnim} ${speed}s linear infinite`,
                  filter: `drop-shadow(0 0 ${glow / 2}px ${accent}) drop-shadow(0 0 ${glow}px ${accent}88)`
                }}
              >
                <img src="assets/isra-mark.png?v=3" alt="ISRA★" className="logo3d-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="stat-grid">
          <div><b style={{ color: accent }}>42.6283°N</b> · OBS. CALAR ALTO</div>
          <div><b style={{ color: accent }}>2.5463°W</b> · SIGNAL 98.4 MHz</div>
          <div>BPM <b style={{ color: accent }}>96</b> · KEY <b style={{ color: accent }}>G♯m</b></div>
          <div>REC <b style={{ color: accent }}>2025 · 11 · 14</b></div>
        </div>

        <div className="now-playing">
          <div className="np-art"></div>
          <div className="np-meta">
            <span className="np-title">Gravedad</span>
            <span className="np-sub">ISRA · ÓRBITA · {t} / 03:42</span>
          </div>
          <button className="play-btn" onClick={() => setPlaying(!playing)} aria-label="play">
            {playing ? <EqBars /> : <TriMark size={9} color="currentColor" />}
          </button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
