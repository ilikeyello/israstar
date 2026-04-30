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
}/*EDITMODE-END*/;

function App() {
  const [section, setSection] = React.useState("hero");
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    window.adminStorage.init().then(() => {
      window.loadDynamicData();
      setReady(true);
    });
  }, []);

  const go = React.useCallback((id) => {
    setSection(id);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
  }, []);

  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen(o => !o);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!ready) {
    return <div style={{display: 'grid', placeItems: 'center', height: '100vh', background: 'var(--bg)', color: 'var(--cyan)', fontFamily: 'JetBrains Mono, monospace'}}>INICIANDO TRANSMISIÓN...</div>;
  }

  return (
    <>
      <div className="grid-bg"></div>
      <div className="noise"></div>
      <div className="scan"></div>
      <div className="stage">
        <Nav section={section} go={go} onOpenPalette={() => setPaletteOpen(true)} />
        <Hero go={go} tweaks={tweaks} />
        <ScriptureStrip />
        <Discografia />
        <Devocional />
        <Tienda />
        <Agenda />
        <Footer />
      </div>
      <Palette open={paletteOpen} onClose={() => setPaletteOpen(false)} go={go} />

      <TweaksPanel title="Tweaks · Hero logo">
        <TweakSection label="Rotación" />
        <TweakSlider label="Velocidad" value={tweaks.rotateSpeed} min={2} max={40} step={1} unit="s"
          onChange={(v) => setTweak("rotateSpeed", v)} />
        <TweakRadio label="Eje" value={tweaks.rotateAxis}
          options={[{value:"y",label:"Horizontal"},{value:"x",label:"Vertical"},{value:"xy",label:"Esfera"}]}
          onChange={(v) => setTweak("rotateAxis", v)} />
        <TweakSlider label="Inclinación" value={tweaks.tilt} min={-25} max={25} step={1} unit="°"
          onChange={(v) => setTweak("tilt", v)} />

        <TweakSection label="Apariencia" />
        <TweakSlider label="Tamaño" value={tweaks.logoScale} min={30} max={100} step={1} unit="%"
          onChange={(v) => setTweak("logoScale", v)} />
        <TweakSlider label="Resplandor" value={tweaks.logoGlow} min={0} max={120} step={2} unit="px"
          onChange={(v) => setTweak("logoGlow", v)} />
        <TweakColor label="Acento" value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Escena" />
        <TweakToggle label="Anillos orbitales" value={tweaks.showRings}
          onChange={(v) => setTweak("showRings", v)} />
        <TweakToggle label="Estrellas" value={tweaks.showStars}
          onChange={(v) => setTweak("showStars", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
