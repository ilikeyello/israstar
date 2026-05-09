// Top navigation

function Nav({
  section,
  go,
  onOpenPalette,
  nowPlaying,
  isPlaying,
  togglePlay
}) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [{
    id: "hero",
    label: "Inicio"
  }, {
    id: "discografia",
    label: "Discografía"
  }, {
    id: "devocional",
    label: "Devocional"
  }, {
    id: "tienda",
    label: "Tienda"
  }, {
    id: "agenda",
    label: "Agenda"
  }];
  const handleGo = id => {
    setMenuOpen(false);
    go(id);
  };
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav" + (menuOpen ? " open" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "nav-logo",
    onClick: e => {
      e.preventDefault();
      handleGo("hero");
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null))), /*#__PURE__*/React.createElement("button", {
    className: "hamburger",
    onClick: () => setMenuOpen(!menuOpen),
    "aria-label": "Menu"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, menuOpen ? /*#__PURE__*/React.createElement("path", {
    d: "M18 6L6 18M6 6l12 12"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M4 6h16M4 12h16M4 18h16"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "nav-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: "#" + l.id,
    className: "nav-link" + (section === l.id ? " active" : ""),
    onClick: e => {
      e.preventDefault();
      handleGo(l.id);
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "chip",
    onClick: () => {
      setMenuOpen(false);
      onOpenPalette();
    },
    style: {
      cursor: "pointer"
    }
  }, "BUSCAR ", /*#__PURE__*/React.createElement(Kbd, null, "\u2318"), /*#__PURE__*/React.createElement(Kbd, null, "K")), nowPlaying ? /*#__PURE__*/React.createElement("button", {
    className: "btn cyan",
    onClick: () => togglePlay(nowPlaying),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer'
    }
  }, isPlaying ? /*#__PURE__*/React.createElement(EqBars, null) : /*#__PURE__*/React.createElement(TriMark, {
    size: 7,
    color: "currentColor"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: 120,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, nowPlaying.t)) : /*#__PURE__*/React.createElement("a", {
    className: "btn cyan",
    href: "#discografia",
    onClick: e => {
      e.preventDefault();
      handleGo("discografia");
    }
  }, /*#__PURE__*/React.createElement(TriMark, {
    size: 7
  }), " Escuchar"))));
}
window.Nav = Nav;