// Tienda — coming soon

function Tienda() {
  return (
    <section id="tienda" className="section">
      <div className="section-head">
        <div>
          <div className="label">04 · Tienda</div>
          <h2>Artefactos <em>físicos</em></h2>
        </div>
        <div className="meta">
          <div>EN PREPARACIÓN</div>
          <div>VINILOS · MERCH · LIBROS</div>
          <div>APERTURA PRONTO</div>
        </div>
      </div>

      <div className="coming-soon">
        <div className="coming-soon-inner">
          <div className="cs-eyebrow">
            <span className="cs-dot"></span> EN ÓRBITA · CARGANDO
          </div>
          <h3>Próximamente</h3>
          <p>
            Estamos preparando la tienda — vinilos firmados, ediciones limitadas, libros
            devocionales y merch oficial. Suscríbete para recibir aviso cuando se abran
            las puertas.
          </p>
          <form className="cs-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tu@correo.com" required />
            <button className="btn primary" type="submit">Avísame</button>
          </form>
          <div className="cs-meta">TRANSMISIÓN PROGRAMADA · Q3 · 2026</div>
        </div>
      </div>
    </section>
  );
}

window.Tienda = Tienda;
