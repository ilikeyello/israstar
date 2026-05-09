// Álbumes — upload and manage albums

function Albumes() {
  const [albums, setAlbums] = React.useState(adminStorage.getAll('albumes'));
  const [showModal, setShowModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    id: '',
    title: '',
    subtitle: '',
    year: '',
    type: '',
    variant: 'v1',
    description: '',
    coverDataUrl: null,
    coverFile: null
  });
  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    let finalCoverUrl = form.coverDataUrl;
    if (form.coverFile) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + window.adminStorage.authToken,
            'x-filename': form.coverFile.name
          }
        });
        const data = await res.json();
        if (data.success && data.signedUrl) {
          const uploadRes = await fetch(data.signedUrl, {
            method: 'PUT',
            body: form.coverFile,
            headers: {
              'Content-Type': form.coverFile.type || 'application/octet-stream'
            }
          });
          if (uploadRes.ok) {
            finalCoverUrl = data.url;
          } else {
            alert('Error subiendo imagen a Supabase.');
            setUploading(false);
            return;
          }
        } else {
          alert('Error subiendo imagen: ' + data.error);
          setUploading(false);
          return;
        }
      } catch (err) {
        alert('Error de conexión.');
        setUploading(false);
        return;
      }
    }
    adminStorage.add('albumes', {
      id: form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      title: form.title,
      subtitle: form.subtitle,
      year: form.year,
      type: form.type,
      variant: form.variant,
      description: form.description,
      coverDataUrl: finalCoverUrl
    });
    setAlbums(adminStorage.getAll('albumes'));
    setShowModal(false);
    setUploading(false);
    setForm({
      id: '',
      title: '',
      subtitle: '',
      year: '',
      type: '',
      variant: 'v1',
      description: '',
      coverDataUrl: null,
      coverFile: null
    });
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        coverFile: file
      });
    }
  };
  const handleDelete = id => {
    if (confirm('¿Eliminar este álbum? Esto no eliminará las canciones asociadas.')) {
      adminStorage.remove('albumes', id);
      setAlbums(adminStorage.getAll('albumes'));
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "\xC1lbumes"), /*#__PURE__*/React.createElement("p", null, "Gestiona tus lanzamientos y portadas")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Nuevo \xE1lbum"))), albums.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-state-icon"
  }, "\u25CE"), /*#__PURE__*/React.createElement("h3", null, "Sin \xE1lbumes"), /*#__PURE__*/React.createElement("p", null, "Crea tu primer \xE1lbum para agrupar tus canciones y mostrar portadas"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Nuevo \xE1lbum")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: 20
    }
  }, albums.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.id,
    style: {
      background: 'oklch(0.14 0.02 260)',
      border: '1px solid var(--line)',
      borderRadius: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 280,
      background: a.coverDataUrl ? `url(${a.coverDataUrl}) center/cover` : 'var(--ink-4)',
      display: 'grid',
      placeItems: 'center',
      color: 'var(--ink-2)'
    }
  }, !a.coverDataUrl && /*#__PURE__*/React.createElement("span", null, "Sin portada")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--cyan)',
      marginBottom: 4
    }
  }, a.type, " \xB7 ", a.year), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 18,
      margin: 0
    }
  }, a.title)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      padding: '4px 8px',
      fontSize: 12
    },
    onClick: () => handleDelete(a.id)
  }, "Eliminar")))))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Nuevo \xE1lbum"), /*#__PURE__*/React.createElement("p", null, "Completa la informaci\xF3n del lanzamiento")), /*#__PURE__*/React.createElement("form", {
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
  }, "Subt\xEDtulo"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: form.subtitle,
    onChange: e => setForm({
      ...form,
      subtitle: e.target.value
    }),
    placeholder: "Ej: EP en vivo desde el observatorio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "A\xF1o *"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    required: true,
    type: "number",
    value: form.year,
    onChange: e => setForm({
      ...form,
      year: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Tipo (LP, EP, Single) *"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    required: true,
    value: form.type,
    onChange: e => setForm({
      ...form,
      type: e.target.value
    }),
    placeholder: "LP \xB7 11 pistas"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Portada (JPG/PNG)"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "file",
    accept: "image/png, image/jpeg, image/webp",
    onChange: handleFileChange,
    style: {
      padding: '8px 14px'
    }
  }), form.coverFile && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 13,
      color: 'var(--cyan)'
    }
  }, "\u2713 ", form.coverFile.name)), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Descripci\xF3n"), /*#__PURE__*/React.createElement("textarea", {
    className: "input-textarea",
    value: form.description,
    onChange: e => setForm({
      ...form,
      description: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Variante de color (Fallback si no hay portada)"), /*#__PURE__*/React.createElement("select", {
    className: "input-text",
    value: form.variant,
    onChange: e => setForm({
      ...form,
      variant: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: "v1"
  }, "Variante 1 (Naranja)"), /*#__PURE__*/React.createElement("option", {
    value: "v2"
  }, "Variante 2 (Azul)"), /*#__PURE__*/React.createElement("option", {
    value: "v3"
  }, "Variante 3 (Verde oscuro)"))), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: () => setShowModal(false),
    disabled: uploading
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: !form.coverFile && !form.coverDataUrl || uploading
  }, uploading ? 'Subiendo...' : 'Guardar álbum'))))));
}
window.Albumes = Albumes;