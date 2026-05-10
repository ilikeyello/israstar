// Tienda — coming soon

function Tienda() {
  const [email, setEmail] = React.useState('');
  const [status, setStatus] = React.useState('idle'); // idle, loading, success, error

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          source: 'tienda'
        })
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "tienda",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "04 \xB7 Tienda"), /*#__PURE__*/React.createElement("h2", null, "Artefactos ", /*#__PURE__*/React.createElement("em", null, "f\xEDsicos"))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", null, "EN PREPARACI\xD3N"), /*#__PURE__*/React.createElement("div", null, "VINILOS \xB7 MERCH \xB7 LIBROS"), /*#__PURE__*/React.createElement("div", null, "APERTURA PRONTO"))), /*#__PURE__*/React.createElement("div", {
    className: "coming-soon"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coming-soon-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-dot"
  }), " EN \xD3RBITA \xB7 CARGANDO"), /*#__PURE__*/React.createElement("h3", null, "Pr\xF3ximamente"), /*#__PURE__*/React.createElement("p", null, "Estamos preparando la tienda \u2014 vinilos firmados, ediciones limitadas, libros devocionales y merch oficial. Suscr\xEDbete para recibir aviso cuando se abran las puertas."), status === 'success' ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'oklch(1 0 0 / 0.05)',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid var(--cyan)',
      color: 'var(--cyan)',
      marginTop: '20px'
    }
  }, "\xA1Gracias! Te avisaremos cuando la tienda est\xE9 lista.") : /*#__PURE__*/React.createElement("form", {
    className: "cs-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "tu@correo.com",
    required: true,
    value: email,
    onChange: e => setEmail(e.target.value),
    disabled: status === 'loading'
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    type: "submit",
    disabled: status === 'loading'
  }, status === 'loading' ? 'Cargando...' : 'Avísame')), status === 'error' && /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--amber)',
      fontSize: '13px',
      marginTop: '10px'
    }
  }, "Hubo un error al suscribirte. Intenta de nuevo."), /*#__PURE__*/React.createElement("div", {
    className: "cs-meta"
  }, "TRANSMISI\xD3N PROGRAMADA \xB7 Q3 \xB7 2026"))));
}
window.Tienda = Tienda;