// Admin sidebar navigation

function Sidebar({
  section,
  setSection
}) {
  const nav = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: '◉'
  }, {
    id: 'albumes',
    label: 'Álbumes',
    icon: '◎'
  }, {
    id: 'musica',
    label: 'Música',
    icon: '♪'
  }, {
    id: 'devocionales',
    label: 'Devocionales',
    icon: '✦'
  }, {
    id: 'suscriptores',
    label: 'Suscriptores',
    icon: '◈'
  }, {
    id: 'tienda',
    label: 'Tienda',
    icon: '□'
  }, {
    id: 'agenda',
    label: 'Agenda',
    icon: '◇'
  }, {
    id: 'ajustes',
    label: 'Ajustes',
    icon: '⚙'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-logo"
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/isra-on-dark.png",
    alt: "ISRASTAR"
  })), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-nav"
  }, nav.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    className: 'sidebar-item' + (section === n.id ? ' active' : ''),
    onClick: () => setSection(n.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-icon"
  }, n.icon), n.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px',
      borderTop: '1px solid var(--line)',
      fontSize: '12px',
      color: 'var(--ink-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'JetBrains Mono, monospace',
      letterSpacing: '0.1em'
    }
  }, "OBSERVATORIO v1.0")));
}
window.Sidebar = Sidebar;