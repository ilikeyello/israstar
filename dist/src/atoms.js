// Reusable visual atoms

const {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback
} = React;
const Chip = ({
  children,
  amber
}) => /*#__PURE__*/React.createElement("span", {
  className: "chip" + (amber ? " amber" : "")
}, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), children);
const Kbd = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: "kbd"
}, children);

// Triangle play mark — echoes the logo's triangle glyph
const TriMark = ({
  size = 10,
  color = "currentColor"
}) => /*#__PURE__*/React.createElement("span", {
  className: "tri-mark",
  "aria-hidden": true,
  style: {
    display: "inline-block",
    width: 0,
    height: 0,
    borderLeft: `${size}px solid ${color}`,
    borderTop: `${size * 0.6}px solid transparent`,
    borderBottom: `${size * 0.6}px solid transparent`
  }
});
const Wordmark = ({
  height = 28
}) => /*#__PURE__*/React.createElement("img", {
  src: "assets/isra-mark.png",
  alt: "ISRA\u2605",
  className: "wordmark-img",
  style: {
    height,
    width: "auto",
    display: "block"
  }
});
const EqBars = () => /*#__PURE__*/React.createElement("span", {
  className: "eq-bars"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    height: "40%"
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    height: "100%"
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    height: "60%"
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    height: "80%"
  }
}));

// Canvas starfield + orbiting nodes for the hero
function OrbitalCanvas({
  playing
}) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = r.width * devicePixelRatio;
      cv.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    const onR = () => resize();
    window.addEventListener("resize", onR);
    const stars = Array.from({
      length: 140
    }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 1.6 + 0.3,
      tw: Math.random() * Math.PI * 2
    }));
    const orbs = [{
      r: 0.30,
      speed: 0.0005,
      phase: 0,
      sz: 3.0,
      c: "oklch(0.84 0.14 210)"
    }, {
      r: 0.30,
      speed: 0.0005,
      phase: Math.PI * 0.9,
      sz: 2.2,
      c: "oklch(0.84 0.14 210 / 0.6)"
    }, {
      r: 0.42,
      speed: -0.0003,
      phase: 1.4,
      sz: 3.6,
      c: "oklch(0.82 0.14 75)"
    }, {
      r: 0.42,
      speed: -0.0003,
      phase: 3.8,
      sz: 2.0,
      c: "oklch(0.82 0.14 75 / 0.6)"
    }, {
      r: 0.50,
      speed: 0.0002,
      phase: 2.2,
      sz: 2.8,
      c: "oklch(0.7 0.18 290)"
    }];
    let t0 = performance.now();
    const draw = () => {
      const t = performance.now() - t0;
      const w = cv.width / devicePixelRatio;
      const h = cv.height / devicePixelRatio;
      ctx.clearRect(0, 0, w, h);
      // stars
      for (const s of stars) {
        const a = 0.35 + 0.35 * Math.sin(t * 0.002 + s.tw);
        ctx.fillStyle = `oklch(0.98 0.01 240 / ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.s, 0, Math.PI * 2);
        ctx.fill();
      }
      // center glow
      const cx = w / 2,
        cy = h / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.25);
      g.addColorStop(0, "oklch(0.84 0.14 210 / 0.35)");
      g.addColorStop(1, "oklch(0.84 0.14 210 / 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // center core
      ctx.fillStyle = "oklch(0.97 0.02 240)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "oklch(0.84 0.14 210 / 0.5)";
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();

      // orbs
      for (const o of orbs) {
        const ang = o.phase + t * o.speed * (playing ? 1.6 : 1);
        const rr = Math.min(w, h) * o.r;
        const x = cx + Math.cos(ang) * rr;
        const y = cy + Math.sin(ang) * rr * 0.85;
        // trail
        for (let i = 1; i < 12; i++) {
          const a2 = ang - o.speed * 80 * i * (playing ? 1.6 : 1);
          const xx = cx + Math.cos(a2) * rr;
          const yy = cy + Math.sin(a2) * rr * 0.85;
          ctx.fillStyle = o.c.replace(")", ` / ${(0.3 * (1 - i / 12)).toFixed(3)})`).replace("oklch(", "oklch(");
          ctx.beginPath();
          ctx.arc(xx, yy, o.sz * (1 - i / 14), 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = o.c;
        ctx.beginPath();
        ctx.arc(x, y, o.sz, 0, Math.PI * 2);
        ctx.fill();
      }

      // concentric vector rings
      ctx.strokeStyle = "oklch(0.55 0.04 258 / 0.3)";
      ctx.lineWidth = 1;
      for (const rr of [0.30, 0.42, 0.50]) {
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.min(w, h) * rr, Math.min(w, h) * rr * 0.85, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      // sweeping scan line
      ctx.strokeStyle = "oklch(0.84 0.14 210 / 0.35)";
      const sa = t * 0.0008 % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sa) * w * 0.6, cy + Math.sin(sa) * h * 0.6);
      ctx.stroke();
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onR);
    };
  }, [playing]);
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref
  });
}
Object.assign(window, {
  Chip,
  Kbd,
  TriMark,
  Wordmark,
  EqBars,
  OrbitalCanvas
});