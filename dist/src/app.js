// App shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "rotateSpeed": 12,
  "rotateAxis": "y",
  "logoGlow": 60,
  "logoScale": 70,
  "tilt": 8,
  "showRings": true,
  "showStars": true,
  "accent": "#66d9ff"
} /*EDITMODE-END*/;
function App() {
  const [section, setSection] = React.useState("hero");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [ready, setReady] = React.useState(false);

  // Global audio state
  const [nowPlaying, setNowPlaying] = React.useState(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const audioRef = React.useRef(null);
  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && nowPlaying?.audioDataUrl) {
        audioRef.current.play().catch(e => {
          console.log("Auto-play prevented", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, nowPlaying]);
  const togglePlay = React.useCallback(track => {
    if (!track || !track.audioDataUrl) return;
    if (nowPlaying?.audioDataUrl === track.audioDataUrl) {
      setIsPlaying(!isPlaying);
    } else {
      setNowPlaying(track);
      setIsPlaying(true);
    }
  }, [nowPlaying, isPlaying]);
  React.useEffect(() => {
    window.adminStorage.init().then(() => {
      window.loadDynamicData();
      setReady(true);
    });
  }, []);
  const go = React.useCallback(id => {
    setSection(id);
    const el = document.getElementById(id);
    if (el) window.scrollTo({
      top: el.offsetTop - 70,
      behavior: "smooth"
    });
  }, []);
  React.useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(o => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  React.useEffect(() => {
    const ids = ["hero", "discografia", "devocional", "tienda", "agenda"];
    const onScroll = () => {
      const y = window.scrollY + 120;
      let cur = "hero";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setSection(cur);
    };
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!ready) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        placeItems: 'center',
        height: '100vh',
        background: 'var(--bg)',
        color: 'var(--cyan)',
        fontFamily: 'JetBrains Mono, monospace'
      }
    }, "INICIANDO TRANSMISI\xD3N...");
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "grid-bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "noise"
  }), /*#__PURE__*/React.createElement("div", {
    className: "scan"
  }), /*#__PURE__*/React.createElement("div", {
    className: "stage"
  }, nowPlaying && /*#__PURE__*/React.createElement("audio", {
    ref: audioRef,
    src: nowPlaying.audioDataUrl,
    onEnded: () => setIsPlaying(false),
    onPlay: () => setIsPlaying(true),
    onPause: () => setIsPlaying(false),
    onTimeUpdate: e => setCurrentTime(e.target.currentTime),
    onLoadedMetadata: e => setDuration(e.target.duration)
  }), /*#__PURE__*/React.createElement(Nav, {
    section: section,
    go: go,
    onOpenPalette: () => setPaletteOpen(true),
    nowPlaying: nowPlaying,
    isPlaying: isPlaying,
    togglePlay: togglePlay
  }), /*#__PURE__*/React.createElement(Hero, {
    go: go,
    tweaks: tweaks,
    nowPlaying: nowPlaying,
    isPlaying: isPlaying,
    togglePlay: togglePlay,
    currentTime: currentTime,
    duration: duration
  }), /*#__PURE__*/React.createElement(ScriptureStrip, null), /*#__PURE__*/React.createElement(Discografia, {
    nowPlaying: nowPlaying,
    isPlaying: isPlaying,
    togglePlay: togglePlay
  }), /*#__PURE__*/React.createElement(Devocional, null), /*#__PURE__*/React.createElement(Tienda, null), /*#__PURE__*/React.createElement(Agenda, null), /*#__PURE__*/React.createElement(Footer, null)), /*#__PURE__*/React.createElement(Palette, {
    open: paletteOpen,
    onClose: () => setPaletteOpen(false),
    go: go
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks \xB7 Hero logo"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Rotaci\xF3n"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Velocidad",
    value: tweaks.rotateSpeed,
    min: 2,
    max: 40,
    step: 1,
    unit: "s",
    onChange: v => setTweak("rotateSpeed", v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Eje",
    value: tweaks.rotateAxis,
    options: [{
      value: "y",
      label: "Horizontal"
    }, {
      value: "x",
      label: "Vertical"
    }, {
      value: "xy",
      label: "Esfera"
    }],
    onChange: v => setTweak("rotateAxis", v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Inclinaci\xF3n",
    value: tweaks.tilt,
    min: -25,
    max: 25,
    step: 1,
    unit: "\xB0",
    onChange: v => setTweak("tilt", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Apariencia"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Tama\xF1o",
    value: tweaks.logoScale,
    min: 30,
    max: 100,
    step: 1,
    unit: "%",
    onChange: v => setTweak("logoScale", v)
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Resplandor",
    value: tweaks.logoGlow,
    min: 0,
    max: 120,
    step: 2,
    unit: "px",
    onChange: v => setTweak("logoGlow", v)
  }), /*#__PURE__*/React.createElement(TweakColor, {
    label: "Acento",
    value: tweaks.accent,
    onChange: v => setTweak("accent", v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Escena"
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Anillos orbitales",
    value: tweaks.showRings,
    onChange: v => setTweak("showRings", v)
  }), /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Estrellas",
    value: tweaks.showStars,
    onChange: v => setTweak("showStars", v)
  })));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));