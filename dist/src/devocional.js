// Devocional — interactive weekly devotional card

function Devocional() {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const getYoutubeId = url => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const activeDevo = DEVOCIONALES.length > 0 ? DEVOCIONALES[activeIdx] : null;
  return /*#__PURE__*/React.createElement("section", {
    id: "devocional",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "03 \xB7 Devocional"), /*#__PURE__*/React.createElement("h2", null, "Se\xF1al ", /*#__PURE__*/React.createElement("em", null, "semanal"))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", null, "ACTUALIZADO SEMANAL"), /*#__PURE__*/React.createElement("div", null, DEVOCIONALES.length, " PUBLICACIONES"), /*#__PURE__*/React.createElement("div", null, "CORPUS: RVR 1960"))), /*#__PURE__*/React.createElement("div", {
    className: "dev"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dev-selector"
  }, DEVOCIONALES.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--ink-3)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "SIN DATOS") : DEVOCIONALES.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    onClick: () => setActiveIdx(i),
    style: {
      padding: 16,
      border: '1px solid var(--line)',
      borderRadius: 8,
      cursor: 'pointer',
      background: activeIdx === i ? 'rgba(255,255,255,0.05)' : 'transparent',
      borderColor: activeIdx === i ? 'var(--cyan)' : 'var(--line)',
      transition: 'all 0.2s'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: activeIdx === i ? 'var(--cyan)' : 'var(--ink-3)',
      marginBottom: 4,
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, d.date), /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 500,
      fontSize: 16,
      color: activeIdx === i ? '#fff' : 'var(--ink-2)'
    }
  }, d.title)))), activeDevo ? /*#__PURE__*/React.createElement("div", {
    className: "devotional-card",
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "devotional-date"
  }, activeDevo.date), /*#__PURE__*/React.createElement("h3", null, activeDevo.title), activeDevo.youtubeUrl && getYoutubeId(activeDevo.youtubeUrl) ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      paddingBottom: '56.25%',
      height: 0,
      marginTop: 16,
      marginBottom: 16,
      borderRadius: 8,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: `https://www.youtube.com/embed/${getYoutubeId(activeDevo.youtubeUrl)}`,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    },
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true
  })) : activeDevo.quote ? /*#__PURE__*/React.createElement("div", {
    className: "devotional-quote"
  }, "\"", activeDevo.quote, "\"", activeDevo.ref && /*#__PURE__*/React.createElement("div", {
    style: {
      fontStyle: "normal",
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11,
      color: "var(--cyan)",
      marginTop: 8,
      letterSpacing: "0.14em"
    }
  }, "\u2014 ", activeDevo.ref)) : null, activeDevo.body && /*#__PURE__*/React.createElement("div", {
    className: "devotional-body",
    style: {
      whiteSpace: 'pre-wrap',
      color: 'var(--ink-2)',
      lineHeight: 1.6
    }
  }, activeDevo.body), /*#__PURE__*/React.createElement("div", {
    className: "devotional-foot",
    style: {
      marginTop: 'auto',
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("span", null, activeDevo.by), /*#__PURE__*/React.createElement("span", null, activeDevo.youtubeUrl ? "VIDEO" : "ARCHIVO"))) : /*#__PURE__*/React.createElement("div", {
    className: "devotional-card",
    style: {
      display: 'grid',
      placeItems: 'center',
      color: 'var(--ink-3)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "SIN PUBLICACIONES")));
}
window.Devocional = Devocional;