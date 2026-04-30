// Ajustes — site settings

function Ajustes() {
  const [settings, setSettings] = React.useState(adminStorage.get('settings') || {
    siteName: 'ISRASTAR',
    tagline: 'Transmisión desde la órbita',
    contactEmail: 'hola@israstar.com'
  });
  const handleSave = e => {
    e.preventDefault();
    adminStorage.set('settings', settings);
    alert('Ajustes guardados');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("h1", null, "Ajustes"), /*#__PURE__*/React.createElement("p", null, "Configuraci\xF3n general del sitio")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    style: {
      maxWidth: 600
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Nombre del sitio"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.siteName,
    onChange: e => setSettings({
      ...settings,
      siteName: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Tagline"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.tagline,
    onChange: e => setSettings({
      ...settings,
      tagline: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Email de contacto"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "email",
    value: settings.contactEmail,
    onChange: e => setSettings({
      ...settings,
      contactEmail: e.target.value
    })
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Guardar cambios")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 60,
      paddingTop: 32,
      borderTop: '1px solid var(--line)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 18,
      marginBottom: 12,
      color: 'var(--ink-2)'
    }
  }, "Zona de peligro"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      color: 'var(--red)',
      borderColor: 'var(--red)'
    },
    onClick: () => {
      if (confirm('¿Borrar TODOS los datos? Esta acción no se puede deshacer.')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  }, "Borrar todos los datos")));
}
window.Ajustes = Ajustes;