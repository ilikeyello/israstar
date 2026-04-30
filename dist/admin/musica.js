// Música — upload and manage tracks

function Musica() {
  const [tracks, setTracks] = React.useState(adminStorage.getAll('musica'));
  const albums = adminStorage.getAll('albumes');
  const [showModal, setShowModal] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: '',
    albumId: '',
    trackNumber: '',
    lyrics: '',
    releaseDate: '',
    spotifyUrl: '',
    appleMusicUrl: '',
    youtubeUrl: '',
    tags: '',
    audioFileName: '',
    audioDataUrl: null,
    audioFile: null
  });
  const handleSubmit = async e => {
    e.preventDefault();
    setUploading(true);
    let finalAudioUrl = form.audioDataUrl;
    if (form.audioFile) {
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + window.adminStorage.authToken,
            'x-filename': form.audioFile.name
          },
          body: form.audioFile
        });
        const data = await res.json();
        if (data.success) {
          finalAudioUrl = data.url;
        } else {
          alert('Error subiendo audio: ' + data.error);
          setUploading(false);
          return;
        }
      } catch (err) {
        alert('Error de conexión.');
        setUploading(false);
        return;
      }
    }
    adminStorage.add('musica', {
      title: form.title,
      albumId: form.albumId,
      trackNumber: form.trackNumber,
      lyrics: form.lyrics,
      releaseDate: form.releaseDate,
      spotifyUrl: form.spotifyUrl,
      appleMusicUrl: form.appleMusicUrl,
      youtubeUrl: form.youtubeUrl,
      tags: form.tags,
      audioFileName: form.audioFile ? form.audioFile.name : form.audioFileName,
      audioDataUrl: finalAudioUrl
    });
    setTracks(adminStorage.getAll('musica'));
    setShowModal(false);
    setUploading(false);
    setForm({
      title: '',
      albumId: '',
      trackNumber: '',
      lyrics: '',
      releaseDate: '',
      spotifyUrl: '',
      appleMusicUrl: '',
      youtubeUrl: '',
      tags: '',
      audioFileName: '',
      audioDataUrl: null,
      audioFile: null
    });
  };
  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setForm({
        ...form,
        audioFile: file
      });
    }
  };
  const handleDelete = id => {
    if (confirm('¿Eliminar esta canción?')) {
      adminStorage.remove('musica', id);
      setTracks(adminStorage.getAll('musica'));
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "M\xFAsica"), /*#__PURE__*/React.createElement("p", null, "Gestiona tu biblioteca musical")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Subir canci\xF3n"))), tracks.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-state-icon"
  }, "\u266A"), /*#__PURE__*/React.createElement("h3", null, "Sin canciones"), /*#__PURE__*/React.createElement("p", null, "Sube tu primera canci\xF3n para comenzar a construir tu biblioteca"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => setShowModal(true)
  }, "+ Subir canci\xF3n")) : /*#__PURE__*/React.createElement("table", {
    className: "table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "T\xEDtulo"), /*#__PURE__*/React.createElement("th", null, "\xC1lbum"), /*#__PURE__*/React.createElement("th", null, "#"), /*#__PURE__*/React.createElement("th", null, "Fecha"), /*#__PURE__*/React.createElement("th", null, "Tags"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, tracks.map(t => {
    const al = albums.find(a => a.id === t.albumId);
    return /*#__PURE__*/React.createElement("tr", {
      key: t.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 500
      }
    }, t.title), t.audioFileName && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--cyan)',
        marginTop: 4,
        fontFamily: 'JetBrains Mono, monospace'
      }
    }, "\u266A ", t.audioFileName)), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--ink-2)'
      }
    }, al ? al.title : '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--ink-3)'
      }
    }, t.trackNumber || '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        color: 'var(--ink-3)',
        fontSize: 13
      }
    }, t.releaseDate || '—'), /*#__PURE__*/React.createElement("td", {
      style: {
        fontSize: 12,
        color: 'var(--ink-3)'
      }
    }, t.tags || '—'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost",
      style: {
        padding: '6px 12px'
      },
      onClick: () => handleDelete(t.id)
    }, "Eliminar")));
  }))), showModal && /*#__PURE__*/React.createElement("div", {
    className: "modal-overlay",
    onClick: () => setShowModal(false)
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "modal-head"
  }, /*#__PURE__*/React.createElement("h2", null, "Subir canci\xF3n"), /*#__PURE__*/React.createElement("p", null, "Completa la informaci\xF3n de la canci\xF3n")), /*#__PURE__*/React.createElement("form", {
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
  }, "\xC1lbum"), /*#__PURE__*/React.createElement("select", {
    className: "input-text",
    value: form.albumId,
    onChange: e => setForm({
      ...form,
      albumId: e.target.value
    })
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "-- Seleccionar \xC1lbum --"), albums.map(a => /*#__PURE__*/React.createElement("option", {
    key: a.id,
    value: a.id
  }, a.title)))), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "N\xFAmero de pista"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "number",
    value: form.trackNumber,
    onChange: e => setForm({
      ...form,
      trackNumber: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Archivo de audio (MP3/WAV)"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "file",
    accept: "audio/mp3,audio/wav,audio/mpeg",
    onChange: handleFileChange,
    style: {
      padding: '8px 14px'
    }
  }), form.audioFile && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: 13,
      color: 'var(--cyan)'
    }
  }, "\u2713 ", form.audioFile.name)), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Fecha de lanzamiento"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "date",
    value: form.releaseDate,
    onChange: e => setForm({
      ...form,
      releaseDate: e.target.value
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Letra"), /*#__PURE__*/React.createElement("textarea", {
    className: "input-textarea",
    value: form.lyrics,
    onChange: e => setForm({
      ...form,
      lyrics: e.target.value
    }),
    placeholder: "Letra completa de la canci\xF3n..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "URL Spotify"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "url",
    value: form.spotifyUrl,
    onChange: e => setForm({
      ...form,
      spotifyUrl: e.target.value
    }),
    placeholder: "https://open.spotify.com/..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "URL Apple Music"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "url",
    value: form.appleMusicUrl,
    onChange: e => setForm({
      ...form,
      appleMusicUrl: e.target.value
    }),
    placeholder: "https://music.apple.com/..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "URL YouTube"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    type: "url",
    value: form.youtubeUrl,
    onChange: e => setForm({
      ...form,
      youtubeUrl: e.target.value
    }),
    placeholder: "https://youtube.com/..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "input-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "input-label"
  }, "Tags / Mood"), /*#__PURE__*/React.createElement("input", {
    className: "input-text",
    value: form.tags,
    onChange: e => setForm({
      ...form,
      tags: e.target.value
    }),
    placeholder: "adoraci\xF3n, esperanza, salmos..."
  })), /*#__PURE__*/React.createElement("div", {
    className: "modal-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "btn btn-ghost",
    onClick: () => setShowModal(false),
    disabled: uploading
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary",
    disabled: uploading
  }, uploading ? 'Subiendo...' : 'Guardar canción'))))));
}
window.Musica = Musica;