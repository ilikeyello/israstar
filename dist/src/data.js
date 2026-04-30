// Content data for ISRASTAR — dynamic from IndexedDB

let ALBUMS = [];
let DEVOTIONAL = null;
const PRODUCTS = [{
  id: "p1",
  title: "Órbita",
  kind: "Vinilo 180g",
  price: "€28",
  tag: "EDICIÓN LIMITADA",
  art: "a",
  stock: "137 / 500"
}, {
  id: "p2",
  title: "Cielo raso",
  kind: "CD firmado",
  price: "€18",
  tag: "FIRMADO",
  art: "b",
  stock: "Disponible"
}, {
  id: "p3",
  title: "Hoodie Señal",
  kind: "Merch — Algodón orgánico",
  price: "€52",
  tag: "NUEVO",
  art: "c",
  stock: "S · M · L · XL"
}, {
  id: "p4",
  title: "Aurora",
  kind: "Casete edición azul",
  price: "€14",
  tag: "REEDICIÓN",
  art: "d",
  stock: "Pocas unidades"
}, {
  id: "p5",
  title: "Devocional tomo I",
  kind: "Libro tapa dura",
  price: "€22",
  tag: "LIBRO",
  art: "e",
  stock: "Envío abril"
}, {
  id: "p6",
  title: "Gorra Órbita",
  kind: "Merch — Bordado",
  price: "€32",
  tag: "MERCH",
  art: "f",
  stock: "Talla única"
}];
const TOUR = [{
  date: "2026 · 05 · 09",
  day: "09",
  mo: "MAY",
  city: "Madrid",
  co: "España",
  venue: "La Riviera",
  status: "live",
  statusLabel: "ENTRADAS"
}, {
  date: "2026 · 05 · 16",
  day: "16",
  mo: "MAY",
  city: "Barcelona",
  co: "España",
  venue: "Sala Razzmatazz",
  status: "sold",
  statusLabel: "AGOTADO"
}, {
  date: "2026 · 05 · 30",
  day: "30",
  mo: "MAY",
  city: "Ciudad de México",
  co: "México",
  venue: "Auditorio BB",
  status: "live",
  statusLabel: "ENTRADAS"
}, {
  date: "2026 · 06 · 07",
  day: "07",
  mo: "JUN",
  city: "Buenos Aires",
  co: "Argentina",
  venue: "Teatro Vorterix",
  status: "live",
  statusLabel: "ENTRADAS"
}, {
  date: "2026 · 06 · 14",
  day: "14",
  mo: "JUN",
  city: "Bogotá",
  co: "Colombia",
  venue: "Teatro Mayor",
  status: "soon",
  statusLabel: "PRONTO"
}, {
  date: "2026 · 06 · 21",
  day: "21",
  mo: "JUN",
  city: "Lima",
  co: "Perú",
  venue: "Arena Perú",
  status: "soon",
  statusLabel: "PRONTO"
}];

// Scripture corpus for the terminal search
const SCRIPTURE = [{
  ref: "Salmos 46:10",
  t: "Estad quietos, y conoced que yo soy Dios."
}, {
  ref: "Isaías 40:31",
  t: "Los que esperan en Jehová tendrán nuevas fuerzas; levantarán alas como las águilas."
}, {
  ref: "Juan 1:5",
  t: "La luz resplandece en las tinieblas, y las tinieblas no la comprendieron."
}, {
  ref: "Filipenses 4:13",
  t: "Todo lo puedo en Cristo que me fortalece."
}, {
  ref: "Romanos 8:28",
  t: "A los que aman a Dios, todas las cosas les ayudan a bien."
}, {
  ref: "Mateo 11:28",
  t: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar."
}, {
  ref: "Salmos 23:1",
  t: "Jehová es mi pastor; nada me faltará."
}, {
  ref: "Jeremías 29:11",
  t: "Porque yo sé los pensamientos que tengo acerca de vosotros — pensamientos de paz, y no de mal."
}];
const SCRIPT_MARQUEE = ["Cantad a Jehová cántico nuevo", "Su misericordia es para siempre", "La luz resplandece en las tinieblas", "Nada nos apartará de Su amor", "Estad quietos y conoced", "En Él vivimos y nos movemos"];
const loadDynamicData = () => {
  const adminAlbums = window.adminStorage.getAll('albumes');
  const adminTracks = window.adminStorage.getAll('musica');
  const adminDevos = window.adminStorage.getAll('devocionales');

  // Group tracks by album
  ALBUMS = adminAlbums.map(al => {
    return {
      ...al,
      tracks: adminTracks.filter(t => t.albumId === al.id).sort((a, b) => parseInt(a.trackNumber || 0) - parseInt(b.trackNumber || 0)).map(t => ({
        n: String(t.trackNumber).padStart(2, '0'),
        t: t.title,
        d: '—',
        // Length placeholder since we don't have metadata yet
        audioDataUrl: t.audioDataUrl
      }))
    };
  });
  if (adminDevos.length > 0) {
    // Take the most recent devocional
    const latest = adminDevos[adminDevos.length - 1];
    DEVOTIONAL = {
      date: new Date(latest.createdAt).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).toUpperCase(),
      title: latest.title,
      quote: latest.scripture || "",
      ref: "",
      body: latest.body,
      by: "Isra" + (latest.linkedSong ? ` · ♫ ${latest.linkedSong}` : "")
    };
  } else {
    DEVOTIONAL = null;
  }
  Object.assign(window, {
    ALBUMS,
    PRODUCTS,
    TOUR,
    DEVOTIONAL,
    SCRIPTURE,
    SCRIPT_MARQUEE
  });
};
window.loadDynamicData = loadDynamicData;