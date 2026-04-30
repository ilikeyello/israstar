// Top navigation

function Nav({ section, go, onOpenPalette }) {
  const links = [
    { id: "hero", label: "Inicio" },
    { id: "discografia", label: "Discografía" },
    { id: "devocional", label: "Devocional" },
    { id: "tienda", label: "Tienda" },
    { id: "agenda", label: "Agenda" }
  ];
  const [utc, setUtc] = React.useState("");
  React.useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setUtc(`${hh}:${mm}:${ss} UTC`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <nav className="nav">
      <div className="nav-left">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); go("hero"); }}>
          <Wordmark />
        </a>
        <span className="chip"><span className="dot"></span> EN VIVO · {utc}</span>
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
        <a className="btn cyan" href="#discografia" onClick={(e) => { e.preventDefault(); go("discografia"); }}>
          <TriMark size={7} /> Escuchar ahora
        </a>
      </div>
    </nav>
  );
}

window.Nav = Nav;
