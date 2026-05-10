// Ajustes — site settings

function Ajustes() {
  const defaultSettings = {
    siteName: 'ISRASTAR',
    tagline: 'Transmisión desde la órbita',
    contactEmail: 'hola@israstar.com',
    links: {
      spotify: '',
      appleMusic: '',
      youtube: '',
      bandcamp: '',
      instagram: '',
      tiktok: '',
      twitter: '',
      management: '',
      prensa: '',
      iglesias: ''
    }
  };
  const loadedSettings = adminStorage.get('settings') || {};
  const [settings, setSettings] = React.useState({
    ...defaultSettings,
    ...loadedSettings,
    links: {
      ...defaultSettings.links,
      ...(loadedSettings.links || {})
    }
  });
  const handleSave = e => {
    e.preventDefault();
    adminStorage.set('settings', settings);
    alert('Ajustes guardados');
  };
  const handleLinkChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [key]: value
      }
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page-head"
  }, /*#__PURE__*/React.createElement("h1", null, "Ajustes"), /*#__PURE__*/React.createElement("p", null, "Configuraci\xF3n general del sitio y enlaces")), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSave,
    style: {
      maxWidth: 800
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Email de contacto (Footer)"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "email",
    value: settings.contactEmail,
    onChange: e => setSettings({
      ...settings,
      contactEmail: e.target.value
    })
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 40,
      marginBottom: 20
    }
  }, "Enlaces de M\xFAsica"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Spotify"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.spotify,
    onChange: e => handleLinkChange('spotify', e.target.value),
    placeholder: "https://..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Apple Music"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.appleMusic,
    onChange: e => handleLinkChange('appleMusic', e.target.value),
    placeholder: "https://..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "YouTube"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.youtube,
    onChange: e => handleLinkChange('youtube', e.target.value),
    placeholder: "https://..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Bandcamp"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.bandcamp,
    onChange: e => handleLinkChange('bandcamp', e.target.value),
    placeholder: "https://..."
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 40,
      marginBottom: 20
    }
  }, "Redes Sociales"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Instagram"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.instagram,
    onChange: e => handleLinkChange('instagram', e.target.value),
    placeholder: "https://..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "TikTok"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.tiktok,
    onChange: e => handleLinkChange('tiktok', e.target.value),
    placeholder: "https://..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "X / Twitter"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.twitter,
    onChange: e => handleLinkChange('twitter', e.target.value),
    placeholder: "https://..."
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 40,
      marginBottom: 20
    }
  }, "Contacto (Emails o Links)"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Management"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.management,
    onChange: e => handleLinkChange('management', e.target.value),
    placeholder: "mailto:..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Prensa"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.prensa,
    onChange: e => handleLinkChange('prensa', e.target.value),
    placeholder: "mailto:..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Iglesias"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: settings.links.iglesias,
    onChange: e => handleLinkChange('iglesias', e.target.value),
    placeholder: "mailto:..."
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    style: {
      marginTop: 30
    }
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