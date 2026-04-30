// Agenda — countdown + tour list + footer

function useCountdown(targetStr) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetStr).getTime();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return {
    d,
    h,
    m,
    s
  };
}
function Agenda() {
  return /*#__PURE__*/React.createElement("section", {
    id: "agenda",
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "label"
  }, "05 \xB7 Agenda"), /*#__PURE__*/React.createElement("h2", null, "Gira ", /*#__PURE__*/React.createElement("em", null, "\xD3rbita"))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", null, "FECHAS POR ANUNCIAR"), /*#__PURE__*/React.createElement("div", null, "ESPA\xD1A \xB7 LATINOAM\xC9RICA"), /*#__PURE__*/React.createElement("div", null, "2026 / 2027"))), /*#__PURE__*/React.createElement("div", {
    className: "coming-soon"
  }, /*#__PURE__*/React.createElement("div", {
    className: "coming-soon-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cs-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "cs-dot"
  }), " SE\xD1AL EN PREPARACI\xD3N"), /*#__PURE__*/React.createElement("h3", null, "Pr\xF3ximamente"), /*#__PURE__*/React.createElement("p", null, "Las fechas de la pr\xF3xima gira se est\xE1n confirmando. \xDAnete a la lista para recibir aviso antes que nadie cuando se anuncien los conciertos."), /*#__PURE__*/React.createElement("form", {
    className: "cs-form",
    onSubmit: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: "tu@correo.com",
    required: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    type: "submit"
  }, "Av\xEDsame")), /*#__PURE__*/React.createElement("div", {
    className: "cs-meta"
  }, "PRIMER ANUNCIO \xB7 PRONTO"))));
}
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "big-word"
  }, "Gracias", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "por escuchar.")), /*#__PURE__*/React.createElement("img", {
    src: "assets/isra-mark.png",
    alt: "ISRA\u2605",
    style: {
      height: 44,
      width: "auto",
      marginTop: 28,
      opacity: 0.85,
      filter: "drop-shadow(0 0 20px oklch(0.84 0.14 210 / 0.4))"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11,
      color: "var(--ink-3)",
      letterSpacing: "0.14em"
    }
  }, "OBSERVATORIO \xB7 EST. 2022")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Escucha"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Spotify"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Apple Music"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "YouTube"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Bandcamp")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "S\xEDgueme"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "TikTok"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "X / Twitter"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Newsletter")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, "Contacto"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Management"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Prensa"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Iglesias"), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, "Hola@israstar.com")), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 \xB7 ISRASTAR \xB7 TODOS LOS DERECHOS"), /*#__PURE__*/React.createElement("span", null, "DISE\xD1ADO EN EL OBSERVATORIO \xB7 HECHO CON FE")));
}
function ScriptureStrip() {
  const line = SCRIPT_MARQUEE.join("   ✦   ");
  return /*#__PURE__*/React.createElement("div", {
    className: "scripture-strip"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marquee"
  }, /*#__PURE__*/React.createElement("span", null, line), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/ / /"), /*#__PURE__*/React.createElement("span", null, line), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "/ / /")));
}
Object.assign(window, {
  Agenda,
  Footer,
  ScriptureStrip
});