// Command palette (⌘K)

function Palette({ open, onClose, go }) {
  const [q, setQ] = React.useState("");
  const [sel, setSel] = React.useState(0);
  const items = React.useMemo(() => {
    const base = [
      { id: "hero", kind: "SECCIÓN", label: "Inicio — transmisión en vivo", go: "hero" },
      { id: "discografia", kind: "SECCIÓN", label: "Discografía — álbumes & EPs", go: "discografia" },
      { id: "devocional", kind: "SECCIÓN", label: "Devocional — terminal de escritura", go: "devocional" },
      { id: "tienda", kind: "SECCIÓN", label: "Tienda — vinilos & merch", go: "tienda" },
      { id: "agenda", kind: "SECCIÓN", label: "Agenda — gira Órbita 2026", go: "agenda" },
      ...ALBUMS.map(a => ({ id: a.id, kind: "ÁLBUM", label: `${a.title} (${a.year})`, go: "discografia" })),
      ...TOUR.map(t => ({ id: t.city, kind: "CONCIERTO", label: `${t.city} — ${t.date}`, go: "agenda" })),
      ...SCRIPTURE.slice(0, 4).map(s => ({ id: s.ref, kind: "ESCRITURA", label: s.ref, go: "devocional" }))
    ];
    if (!q.trim()) return base;
    const qq = q.toLowerCase();
    return base.filter(i => i.label.toLowerCase().includes(qq) || i.kind.toLowerCase().includes(qq));
  }, [q]);

  React.useEffect(() => { setSel(0); }, [q, open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel(s => Math.min(items.length - 1, s + 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
      else if (e.key === "Enter") { const it = items[sel]; if (it) { go(it.go); onClose(); } }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items, sel]);

  if (!open) return null;
  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <div className="cmdk-input">
          <span style={{ fontFamily: "JetBrains Mono, monospace", color: "var(--cyan)" }}>›</span>
          <input autoFocus placeholder="Buscar en la transmisión..." value={q} onChange={e => setQ(e.target.value)} />
          <Kbd>ESC</Kbd>
        </div>
        <div className="cmdk-list">
          {items.length === 0 && <div className="cmdk-item"><span style={{ color: "var(--ink-3)" }}>Sin resultados</span></div>}
          {items.map((it, i) => (
            <div
              key={it.id + i}
              className={"cmdk-item" + (i === sel ? " sel" : "")}
              onMouseEnter={() => setSel(i)}
              onClick={() => { go(it.go); onClose(); }}
            >
              <span className="l">
                <TriMark size={6} color="var(--cyan)" />
                <span>{it.label}</span>
              </span>
              <span className="kind">{it.kind}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Palette = Palette;
