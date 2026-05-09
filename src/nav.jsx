// Top navigation

function Nav({ section, go, onOpenPalette, nowPlaying, isPlaying, togglePlay }) {
  const links = [
    { id: "hero", label: "Inicio" },
    { id: "discografia", label: "Discografía" },
    { id: "devocional", label: "Devocional" },
    { id: "tienda", label: "Tienda" },
    { id: "agenda", label: "Agenda" }
  ];
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); go("hero"); }}>
          <Wordmark />
        </a>
      </div>
      <div className="nav-links">
        {links.map(l => (
          <a key={l.id} href={"#" + l.id}
             className={"nav-link" + (section === l.id ? " active" : "")}
             onClick={(e) => { e.preventDefault(); go(l.id); }}>
            {l.label}
          </a>
        ))}
      </div>
      <div className="nav-right">
        <button className="chip" onClick={onOpenPalette} style={{ cursor: "pointer" }}>
          BUSCAR <Kbd>⌘</Kbd><Kbd>K</Kbd>
        </button>
        {nowPlaying ? (
          <button className="btn cyan" onClick={() => togglePlay(nowPlaying)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
            {isPlaying ? <EqBars /> : <TriMark size={7} color="currentColor" />}
            <span style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nowPlaying.t}</span>
          </button>
        ) : (
          <a className="btn cyan" href="#discografia" onClick={(e) => { e.preventDefault(); go("discografia"); }}>
            <TriMark size={7} /> Escuchar ahora
          </a>
        )}
      </div>
    </nav>
  );
}

window.Nav = Nav;
