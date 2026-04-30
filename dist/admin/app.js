// Main admin app

function AdminApp() {
  const [section, setSection] = React.useState('dashboard');
  const [ready, setReady] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [auth, setAuth] = React.useState(window.adminStorage.authToken !== '');
  React.useEffect(() => {
    if (auth) {
      window.adminStorage.init().then(() => setReady(true));
    }
  }, [auth]);
  const handleLogin = e => {
    e.preventDefault();
    if (password.trim()) {
      window.adminStorage.setAuthToken(password.trim());
      setAuth(true);
    }
  };
  if (!auth) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        background: 'var(--bg)',
        color: 'var(--ink)'
      }
    }, /*#__PURE__*/React.createElement("form", {
      onSubmit: handleLogin,
      style: {
        background: 'var(--ink-4)',
        padding: 40,
        borderRadius: 12,
        border: '1px solid var(--line)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        marginBottom: 20
      }
    }, "Ingreso al Observatorio"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      placeholder: "Contrase\xF1a",
      className: "input-text",
      value: password,
      onChange: e => setPassword(e.target.value),
      style: {
        marginBottom: 20
      }
    }), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      style: {
        width: '100%'
      }
    }, "Entrar")));
  }
  const renderSection = () => {
    switch (section) {
      case 'dashboard':
        return /*#__PURE__*/React.createElement(Dashboard, null);
      case 'albumes':
        return /*#__PURE__*/React.createElement(Albumes, null);
      case 'musica':
        return /*#__PURE__*/React.createElement(Musica, null);
      case 'devocionales':
        return /*#__PURE__*/React.createElement(Devocionales, null);
      case 'suscriptores':
        return /*#__PURE__*/React.createElement(Suscriptores, null);
      case 'tienda':
        return /*#__PURE__*/React.createElement(Tienda, null);
      case 'agenda':
        return /*#__PURE__*/React.createElement(Agenda, null);
      case 'ajustes':
        return /*#__PURE__*/React.createElement(Ajustes, null);
      default:
        return /*#__PURE__*/React.createElement(Dashboard, null);
    }
  };
  if (!ready) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh'
      }
    }, "Iniciando Base de Datos...");
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-shell"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    section: section,
    setSection: setSection
  }), renderSection());
}
const root = ReactDOM.createRoot(document.getElementById('admin-root'));
root.render(/*#__PURE__*/React.createElement(AdminApp, null));