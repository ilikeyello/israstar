// Top navigation

function Nav({
  section,
  go,
  onOpenPalette,
  nowPlaying,
  isPlaying,
  togglePlay
}) {
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
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-left"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "nav-logo",
    onClick: e => {
      e.preventDefault();
      go("hero");
    }
  }, /*#__PURE__*/React.createElement(Wordmark, null))), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    href: "#" + l.id,
    className: "nav-link" + (section === l.id ? " active" : ""),
    onClick: e => {
      e.preventDefault();
      go(l.id);
    }
  }, l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nav-right"
  }, /*#__PURE__*/React.createElement("button", {
    className: "chip",
    onClick: onOpenPalette,
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
      go("discografia");
    }
  }, /*#__PURE__*/React.createElement(TriMark, {
    size: 7
  }), " Escuchar ahora")));
}
window.Nav = Nav;