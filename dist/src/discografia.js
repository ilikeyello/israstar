// Discografía — 3D-ish album carousel

function Discografia() {
  const [idx, setIdx] = React.useState(0);
  const [active, setActive] = React.useState(0);
  const audioRef = React.useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const a = ALBUMS.length > 0 ? ALBUMS[idx] : null;
  const prev = () => setIdx((idx - 1 + ALBUMS.length) % ALBUMS.length);
  const next = () => setIdx((idx + 1) % ALBUMS.length);
  const activeTrack = a?.tracks?.[active];
  React.useEffect(() => {
    setActive(0);
  }, [idx]);
  React.useEffect(() => {
    if (audioRef.current && isPlaying && activeTrack?.audioDataUrl) {
      audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
    }
  }, [active, activeTrack]);
  const togglePlay = () => {
    if (!audioRef.current || !activeTrack?.audioDataUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "discografia",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "02 \xB7 Discograf\xEDa"), /*#__PURE__*/React.createElement("h2", null, "Archivo ", /*#__PURE__*/React.createElement("em", null, "sonoro"))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", null, ALBUMS.length, " LANZAMIENTOS"), /*#__PURE__*/React.createElement("div", null, "MASTERIZADO EN 24BIT / 96kHz"))), !a ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '100px 0',
      textAlign: 'center',
      color: 'var(--ink-3)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "SIN DATOS EN OBSERVATORIO") : /*#__PURE__*/React.createElement("div", {
    className: "disco"
  }, /*#__PURE__*/React.createElement("div", {
    className: "disco-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail"
  }, ALBUMS.map((al, i) => {
    const diff = i - idx;
    const x = diff * 58;
    const z = -Math.abs(diff) * 180;
    const rot = diff * -18;
    const scale = 1 - Math.abs(diff) * 0.08;
    const opacity = Math.abs(diff) > 2 ? 0 : 1 - Math.abs(diff) * 0.25;
    return /*#__PURE__*/React.createElement("div", {
      key: al.id,
      className: "album " + (al.variant || "v1"),
      style: {
        transform: `translateX(${x}%) translateZ(${z}px) rotateY(${rot}deg) scale(${scale})`,
        opacity,
        zIndex: 10 - Math.abs(diff),
        cursor: "pointer"
      },
      onClick: () => setIdx(i)
    }, /*#__PURE__*/React.createElement("div", {
      className: "album-cover",
      style: al.coverDataUrl ? {
        background: `url(${al.coverDataUrl}) center/cover`
      } : {}
    }, !al.coverDataUrl && /*#__PURE__*/React.createElement("span", null, al.title)), /*#__PURE__*/React.createElement("div", {
      className: "trace"
    }, /*#__PURE__*/React.createElement("span", null, "ISRA / ", al.id.toUpperCase()), /*#__PURE__*/React.createElement("span", null, al.year)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 16,
      bottom: 14,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 10,
      color: "var(--ink-3)",
      letterSpacing: "0.18em"
    }
  }, String(idx + 1).padStart(2, "0"), " / ", String(ALBUMS.length).padStart(2, "0")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 16,
      bottom: 14,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "disco-ctrl",
    onClick: prev,
    "aria-label": "prev"
  }, "\u2190"), /*#__PURE__*/React.createElement("button", {
    className: "disco-ctrl",
    onClick: next,
    "aria-label": "next"
  }, "\u2192"))), /*#__PURE__*/React.createElement("div", {
    className: "disco-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "track-num"
  }, a.type), /*#__PURE__*/React.createElement("h3", null, a.title), /*#__PURE__*/React.createElement("div", {
    className: "year"
  }, a.year, " ", a.subtitle ? `· ${a.subtitle}` : ''), /*#__PURE__*/React.createElement("p", null, a.description), a.tracks && a.tracks.length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: "tracklist"
  }, a.tracks.map((tr, i) => /*#__PURE__*/React.createElement("div", {
    key: tr.n,
    className: "tr" + (i === active ? " active" : ""),
    onClick: () => setActive(i)
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, tr.n), /*#__PURE__*/React.createElement("span", null, tr.t), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, i === active && isPlaying ? /*#__PURE__*/React.createElement(EqBars, null) : null), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, tr.audioDataUrl ? "▶" : "—")))) : /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '20px 0',
      fontSize: 13,
      color: 'var(--ink-3)'
    }
  }, "No hay pistas en este \xE1lbum."), activeTrack?.audioDataUrl && /*#__PURE__*/React.createElement("audio", {
    ref: audioRef,
    src: activeTrack.audioDataUrl,
    onEnded: () => setIsPlaying(false),
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "disco-controls"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: togglePlay,
    disabled: !activeTrack?.audioDataUrl,
    style: {
      opacity: !activeTrack?.audioDataUrl ? 0.5 : 1
    }
  }, isPlaying ? "Pausar" : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TriMark, {
    size: 7,
    color: "currentColor"
  }), " Reproducir")), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost"
  }, "Letras")))));
}
window.Discografia = Discografia;