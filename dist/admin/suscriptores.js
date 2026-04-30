// Suscriptores — email list management

function Suscriptores() {
  const [subs, setSubs] = React.useState(adminStorage.getAll('suscriptores'));
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const handleAdd = e => {
    e.preventDefault();
    adminStorage.add('suscriptores', {
      email
    });
    setSubs(adminStorage.getAll('suscriptores'));
    setShowModal(false);
    setEmail('');
  };
  const handleDelete = id => {
    if (confirm('¿Eliminar este suscriptor?')) {
      adminStorage.remove('suscriptores', id);
      setSubs(adminStorage.getAll('suscriptores'));
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Suscriptores"), /*#__PURE__*/React.createElement("p", null, "Gestiona tu lista de correos")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ A\xF1adir suscriptor"))), subs.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-state-icon"
  }, "\u25C8"), /*#__PURE__*/React.createElement("h3", null, "Sin suscriptores"), /*#__PURE__*/React.createElement("p", null, "Los suscriptores del sitio p\xFAblico aparecer\xE1n aqu\xED")) : /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "Fecha de suscripci\xF3n"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, subs.map(s => /*#__PURE__*/React.createElement("tr", {
    key: s.id
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      fontWeight: 500
    }
  }, s.email), /*#__PURE__*/React.createElement("td", {
    style: {
      color: 'var(--ink-3)',
      fontSize: 13
    }
  }, new Date(s.createdAt).toLocaleDateString('es-ES')), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '6px 12px'
    },
    onClick: () => handleDelete(s.id)
  }, "Eliminar")))))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("h2", null, "A\xF1adir suscriptor"), /*#__PURE__*/React.createElement("p", null, "A\xF1ade un email manualmente a la lista")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdd
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Email *"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "email",
    required: true,
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "correo@ejemplo.com"
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: () => setShowModal(false)
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "A\xF1adir"))))));
}
window.Suscriptores = Suscriptores;