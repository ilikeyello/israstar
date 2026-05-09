// Hero section with 3D rotating logo

function Hero({
  go,
  tweaks,
  nowPlaying,
  isPlaying,
  togglePlay
}) {
  const trackToDisplay = nowPlaying || LATEST_TRACK;
  const isThisPlaying = trackToDisplay && nowPlaying && nowPlaying.audioDataUrl === trackToDisplay.audioDataUrl && isPlaying;
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    if (!isThisPlaying) return;
    const id = setInterval(() => setProgress(p => (p + 0.4) % 100), 100);
    return () => clearInterval(id);
  }, [isThisPlaying]);
  const mm = Math.floor(progress / 100 * 222);
  const t = `${String(Math.floor(mm / 60)).padStart(2, "0")}:${String(mm % 60).padStart(2, "0")}`;
  const t2 = tweaks || {};
  const speed = t2.rotateSpeed ?? 12; // seconds per revolution
  const axis = t2.rotateAxis ?? "y"; // 'y' horizontal, 'x' vertical, 'xy' both
  const glow = t2.logoGlow ?? 60; // 0-100
  const scale = t2.logoScale ?? 70; // 30-100 (% of panel)
  const rings = t2.showRings ?? true;
  const stars = t2.showStars ?? true;
  const tilt = t2.tilt ?? 8; // static z-tilt degrees
  const accent = t2.accent ?? "#66d9ff";
  const axisAnim = axis === "x" ? "heroSpinX" : axis === "xy" ? "heroSpinXY" : "heroSpinY";
  return /*#__PURE__*/React.createElement("section", {
    id: "hero",
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow",
    style: {
      color: accent
    }
  }, "TRANSMISI\xD3N 042 \xB7 DESDE LA \xD3RBITA"), /*#__PURE__*/React.createElement("h1", null, /*#__PURE__*/React.createElement("span", {
    className: "glow"
  }, "M\xFAsica"), " ", /*#__PURE__*/React.createElement("em", null, "para"), /*#__PURE__*/React.createElement("br", null), "los que todav\xEDa", /*#__PURE__*/React.createElement("br", null), "miran ", /*#__PURE__*/React.createElement("em", null, "al cielo.")), /*#__PURE__*/React.createElement("p", {
    className: "lede"
  }, "Isra es un artista cristiano espa\xF1ol que escribe canciones a medio camino entre el himno y la transmisi\xF3n satelital. Este es su puesto de observaci\xF3n \u2014 donde la m\xFAsica, las escrituras y los conciertos se encuentran en la misma frecuencia."), /*#__PURE__*/React.createElement("div", {
    className: "hero-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => LATEST_TRACK && togglePlay(LATEST_TRACK)
  }, /*#__PURE__*/React.createElement(TriMark, {
    size: 8,
    color: "currentColor"
  }), isPlaying && nowPlaying?.audioDataUrl === LATEST_TRACK?.audioDataUrl ? "Pausar sencillo" : "Escuchar último sencillo"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: () => go("discografia")
  }, "Ver discograf\xEDa \u2192"), /*#__PURE__*/React.createElement("span", {
    className: "pill"
  }, "03 \xB7 CANAL ABIERTO"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-art corner-brackets",
    style: {
      "--accent": accent
    }
  }, /*#__PURE__*/React.createElement("i", null), stars && /*#__PURE__*/React.createElement("div", {
    className: "star-field",
    "aria-hidden": true
  }), rings && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ring"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ring r2"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ring r3"
  }), /*#__PURE__*/React.createElement("div", {
    className: "ring r4"
  })), /*#__PURE__*/React.createElement("div", {
    className: "scan-sweep",
    "aria-hidden": true
  }), /*#__PURE__*/React.createElement("div", {
    className: "logo3d-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo3d-tilt",
    style: {
      transform: `translate(-50%, -50%) rotateZ(${tilt}deg)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo3d-anchor",
    style: {
      width: `${scale}%`
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo3d",
    style: {
      animation: `${axisAnim} ${speed}s linear infinite`,
      filter: `drop-shadow(0 0 ${glow / 2}px ${accent}) drop-shadow(0 0 ${glow}px ${accent}88)`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "assets/isra-mark.png?v=3",
    alt: "ISRA\u2605",
    className: "logo3d-img"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "stat-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: accent
    }
  }, "42.6283\xB0N"), " \xB7 OBS. CALAR ALTO"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: accent
    }
  }, "2.5463\xB0W"), " \xB7 SIGNAL 98.4 MHz"), /*#__PURE__*/React.createElement("div", null, "BPM ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: accent
    }
  }, "96"), " \xB7 KEY ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: accent
    }
  }, "G\u266Fm")), /*#__PURE__*/React.createElement("div", null, "REC ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: accent
    }
  }, "2025 \xB7 11 \xB7 14"))), /*#__PURE__*/React.createElement("div", {
    className: "now-playing"
  }, /*#__PURE__*/React.createElement("div", {
    className: "np-art"
  }), /*#__PURE__*/React.createElement("div", {
    className: "np-meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "np-title"
  }, trackToDisplay ? trackToDisplay.t : "Sin transmisión"), /*#__PURE__*/React.createElement("span", {
    className: "np-sub"
  }, "ISRA \xB7 ", t)), /*#__PURE__*/React.createElement("button", {
    className: "play-btn",
    onClick: () => trackToDisplay && togglePlay(trackToDisplay),
    "aria-label": "play"
  }, isThisPlaying ? /*#__PURE__*/React.createElement(EqBars, null) : /*#__PURE__*/React.createElement(TriMark, {
    size: 9,
    color: "currentColor"
  })))));
}
window.Hero = Hero;