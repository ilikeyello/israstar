// Top navigation

function Nav({ section, go, onOpenPalette, nowPlaying, isPlaying, togglePlay }) {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const links = [
    { id: "hero", label: "Inicio" },
    { id: "discografia", label: "Discografía" },
    { id: "devocional", label: "Devocional" },
    { id: "tienda", label: "Tienda" },
    { id: "agenda", label: "Agenda" }
  ];

  const handleGo = (id) => {
    setMenuOpen(false);
    go(id);
  };

  return (
    <nav className={"nav" + (menuOpen ? " open" : "")}>
      <div className="nav-top">
        <div className="nav-left">
          <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); handleGo("hero"); }}>
            <Wordmark />
          </a>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      
      <div className="nav-menu">
        <div className="nav-links">
          {links.map(l => (
            <a key={l.id} href={"#" + l.id}
               className={"nav-link" + (section === l.id ? " active" : "")}
               onClick={(e) => { e.preventDefault(); handleGo(l.id); }}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <button className="chip" onClick={() => { setMenuOpen(false); onOpenPalette(); }} style={{ cursor: "pointer" }}>
            BUSCAR <Kbd>⌘</Kbd><Kbd>K</Kbd>
          </button>
          {nowPlaying ? (
            <button className="btn cyan" onClick={() => togglePlay(nowPlaying)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
              {isPlaying ? <EqBars /> : <TriMark size={7} color="currentColor" />}
              <span style={{ maxWidth: 120, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nowPlaying.t}</span>
            </button>
          ) : (
            <a className="btn cyan" href="#discografia" onClick={(e) => { e.preventDefault(); handleGo("discografia"); }}>
              <TriMark size={7} /> Escuchar
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
