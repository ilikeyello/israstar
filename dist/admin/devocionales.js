// Devocionales — write and publish devotionals

function Devocionales() {
  const [devos, setDevos] = React.useState(adminStorage.getAll('devocionales'));
  const [showModal, setShowModal] = React.useState(false);
  const [form, setForm] = React.useState({
    title: '',
    body: '',
    scripture: '',
    linkedSong: '',
    youtubeUrl: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    adminStorage.add('devocionales', form);
    setDevos(adminStorage.getAll('devocionales'));
    setShowModal(false);
    setForm({
      title: '',
      body: '',
      scripture: '',
      linkedSong: '',
      youtubeUrl: ''
    });
  };
  const handleDelete = id => {
    if (confirm('¿Eliminar este devocional?')) {
      adminStorage.remove('devocionales', id);
      setDevos(adminStorage.getAll('devocionales'));
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Devocionales"), /*#__PURE__*/React.createElement("p", null, "Publica reflexiones y ense\xF1anzas")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Nuevo devocional"))), devos.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-state-icon"
  }, "\u2726"), /*#__PURE__*/React.createElement("h3", null, "Sin devocionales"), /*#__PURE__*/React.createElement("p", null, "Escribe tu primer devocional para compartir con tu comunidad"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Nuevo devocional")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 16
    }
  }, devos.map(d => /*#__PURE__*/React.createElement("div", {
    key: d.id,
    style: {
      background: 'oklch(0.14 0.02 260)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      marginBottom: 6
    }
  }, d.title), d.scripture && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--cyan)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, d.scripture)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '6px 12px'
    },
    onClick: () => handleDelete(d.id)
  }, "Eliminar")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--ink-2)',
      fontSize: 14,
      lineHeight: 1.6
    }
  }, d.body.substring(0, 200), d.body.length > 200 ? '...' : ''), d.youtubeUrl && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 12,
      color: 'var(--ink-3)'
    }
  }, "\u25B6 ", d.youtubeUrl), d.linkedSong && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: 12,
      color: 'var(--ink-3)'
    }
  }, "\u266A ", d.linkedSong)))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Nuevo devocional"), /*#__PURE__*/React.createElement("p", null, "Escribe una reflexi\xF3n para tu comunidad")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "T\xEDtulo *"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    required: true,
    value: form.title,
    onChange: e => setForm({
      ...form,
      title: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Referencia b\xEDblica"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: form.scripture,
    onChange: e => setForm({
      ...form,
      scripture: e.target.value
    }),
    placeholder: "Ej: Salmos 23:1-6"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Contenido *"), /*#__PURE__*/React.createElement("textarea", {
    className: "input-textarea",
    required: true,
    value: form.body,
    onChange: e => setForm({
      ...form,
      body: e.target.value
    }),
    placeholder: "Escribe tu devocional aqu\xED...",
    style: {
      minHeight: 200
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Enlace de YouTube"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: form.youtubeUrl,
    onChange: e => setForm({
      ...form,
      youtubeUrl: e.target.value
    }),
    placeholder: "https://youtube.com/watch?v=..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Canci\xF3n relacionada"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: form.linkedSong,
    onChange: e => setForm({
      ...form,
      linkedSong: e.target.value
    }),
    placeholder: "T\xEDtulo de la canci\xF3n"
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: () => setShowModal(false)
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Publicar"))))));
}
window.Devocionales = Devocionales;