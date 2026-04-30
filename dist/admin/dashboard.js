// Dashboard — stats overview

function Dashboard() {
  const musica = adminStorage.getAll('musica');
  const devocionales = adminStorage.getAll('devocionales');
  const suscriptores = adminStorage.getAll('suscriptores');
  const stats = [{
    label: 'Canciones',
    value: musica.length,
    sub: 'en biblioteca'
  }, {
    label: 'Devocionales',
    value: devocionales.length,
    sub: 'publicados'
  }, {
    label: 'Suscriptores',
    value: suscriptores.length,
    sub: 'en lista'
  }, {
    label: 'Productos',
    value: 0,
    sub: 'próximamente'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("h1", null, "Dashboard"), /*#__PURE__*/React.createElement("p", null, "Observatorio de control \u2014 transmisi\xF3n en vivo")), /*#__PURE__*/React.createElement("div", {
    className: "stat-grid"
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat-label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    className: "stat-sub"
  }, s.sub)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      marginBottom: 16,
      color: 'var(--ink-2)'
    }
  }, "Actividad reciente"), musica.length === 0 && devocionales.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-state-icon"
  }, "\u25EF"), /*#__PURE__*/React.createElement("h3", null, "Sin actividad"), /*#__PURE__*/React.createElement("p", null, "Sube m\xFAsica o publica un devocional para comenzar")) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--ink-3)'
    }
  }, "Sistema operativo \u2014 ", musica.length + devocionales.length, " elementos en \xF3rbita")));
}
window.Dashboard = Dashboard;