// Top navigation

function Nav({
  section,
  go,
  onOpenPalette
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
  }, /*#__PURE__*/React.createElement(Wordmark, null)), /*#__PURE__*/React.createElement("span", {
    className: "chip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), " EN VIVO \xB7 ", utc)), /*#__PURE__*/React.createElement("div", {
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
  }, "BUSCAR ", /*#__PURE__*/React.createElement(Kbd, null, "\u2318"), /*#__PURE__*/React.createElement(Kbd, null, "K")), /*#__PURE__*/React.createElement("a", {
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