// Content data for ISRASTAR — dynamic from IndexedDB

let ALBUMS = [];
let DEVOTIONAL = null;
let LATEST_TRACK = null;
const PRODUCTS = [];
const TOUR = [];

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
  if (adminTracks.length > 0) {
    const latest = adminTracks[adminTracks.length - 1];
    LATEST_TRACK = {
      n: String(latest.trackNumber || '0').padStart(2, '0'),
      t: latest.title,
      audioDataUrl: latest.audioDataUrl,
      albumId: latest.albumId
    };
  } else {
    LATEST_TRACK = null;
  }
  if (adminDevos.length > 0) {
    // Take the most recent devocional
    const latest = adminDevos[adminDevos.length - 1];
    DEVOTIONAL = {
      date: new Date(latest.createdAt || Date.now()).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).toUpperCase(),
      title: latest.title,
      quote: latest.scripture || "",
      ref: "",
      body: latest.body || "",
      youtubeUrl: latest.youtubeUrl || "",
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
    SCRIPT_MARQUEE,
    LATEST_TRACK
  });
};
window.loadDynamicData = loadDynamicData;