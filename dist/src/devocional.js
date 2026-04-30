// Devocional — interactive scripture terminal + weekly devotional card

function Devocional() {
  const [history, setHistory] = React.useState([{
    k: "sys",
    t: "ISRASTAR · TERMINAL DE ESCRITURA v2.6.1"
  }, {
    k: "sys",
    t: "Escribe una referencia (ej: Salmos 46:10) o una palabra."
  }, {
    k: "sys",
    t: "—"
  }]);
  const [input, setInput] = React.useState("");
  const bodyRef = React.useRef(null);
  React.useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);
  const submit = () => {
    if (!input.trim()) return;
    const q = input.trim().toLowerCase();
    const hit = SCRIPTURE.find(s => s.ref.toLowerCase().includes(q) || s.t.toLowerCase().includes(q));
    const newItems = [{
      k: "cmd",
      t: input
    }];
    if (hit) {
      newItems.push({
        k: "verse",
        t: hit.t
      });
      newItems.push({
        k: "ref",
        t: "— " + hit.ref
      });
    } else {
      newItems.push({
        k: "miss",
        t: "Sin coincidencia. Intenta 'luz', 'paz', 'Salmos'."
      });
    }
    newItems.push({
      k: "sep",
      t: "—"
    });
    setHistory(h => [...h, ...newItems]);
    setInput("");
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "devocional",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "03 \xB7 Devocional"), /*#__PURE__*/React.createElement("h2", null, "Se\xF1al ", /*#__PURE__*/React.createElement("em", null, "semanal"))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", null, "ACTUALIZADO SEMANAL"), /*#__PURE__*/React.createElement("div", null, DEVOTIONAL ? DEVOTIONAL.date : 'SIN DATOS'), /*#__PURE__*/React.createElement("div", null, "CORPUS: RVR 1960"))), /*#__PURE__*/React.createElement("div", {
    className: "dev"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "terminal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "terminal-dots"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("span", null, "scripture@isra ~ %"), /*#__PURE__*/React.createElement("span", null, "READY")), /*#__PURE__*/React.createElement("div", {
    className: "terminal-body",
    ref: bodyRef
  }, history.map((h, i) => {
    if (h.k === "sys") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "line"
    }, /*#__PURE__*/React.createElement("b", null, "\u203A"), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-3)"
      }
    }, h.t));
    if (h.k === "cmd") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "line"
    }, /*#__PURE__*/React.createElement("b", null, "$"), /*#__PURE__*/React.createElement("span", null, h.t));
    if (h.k === "verse") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "verse"
    }, "\"", h.t, "\"");
    if (h.k === "ref") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "ref"
    }, h.t);
    if (h.k === "miss") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "line"
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: "var(--red)"
      }
    }, "!"), /*#__PURE__*/React.createElement("span", null, h.t));
    if (h.k === "sep") return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "sep"
    }, "\u2014 \u2014 \u2014 \u2014 \u2014 \u2014 \u2014 \u2014 \u2014 \u2014");
    return null;
  })), /*#__PURE__*/React.createElement("form", {
    className: "terminal-prompt",
    onSubmit: e => {
      e.preventDefault();
      submit();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "caret"
  }, "$"), /*#__PURE__*/React.createElement("input", {
    value: input,
    onChange: e => setInput(e.target.value),
    placeholder: "buscar escritura...",
    autoComplete: "off",
    spellCheck: false
  }), /*#__PURE__*/React.createElement("span", {
    className: "blink"
  }))), DEVOTIONAL ? /*#__PURE__*/React.createElement("div", {
    className: "devotional-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "devotional-date"
  }, DEVOTIONAL.date), /*#__PURE__*/React.createElement("h3", null, DEVOTIONAL.title), DEVOTIONAL.quote && /*#__PURE__*/React.createElement("div", {
    className: "devotional-quote"
  }, "\"", DEVOTIONAL.quote, "\"", DEVOTIONAL.ref && /*#__PURE__*/React.createElement("div", {
    style: {
      fontStyle: "normal",
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11,
      color: "var(--cyan)",
      marginTop: 8,
      letterSpacing: "0.14em"
    }
  }, "\u2014 ", DEVOTIONAL.ref)), /*#__PURE__*/React.createElement("div", {
    className: "devotional-body"
  }, DEVOTIONAL.body), /*#__PURE__*/React.createElement("div", {
    className: "devotional-foot"
  }, /*#__PURE__*/React.createElement("span", null, DEVOTIONAL.by), /*#__PURE__*/React.createElement("span", null, "LEER ARCHIVO \u2192"))) : /*#__PURE__*/React.createElement("div", {
    className: "devotional-card",
    style: {
      display: 'grid',
      placeItems: 'center',
      color: 'var(--ink-3)',
      fontFamily: 'JetBrains Mono, monospace'
    }
  }, "SIN PUBLICACIONES")));
}
window.Devocional = Devocional;