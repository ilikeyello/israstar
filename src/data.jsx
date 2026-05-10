// Content data for ISRASTAR — dynamic from IndexedDB

let ALBUMS = [];
let DEVOCIONALES = [];
let LATEST_TRACK = null;

const PRODUCTS = [];
const TOUR = [];

// Scripture corpus for the terminal search
const SCRIPTURE = [
  { ref: "Salmos 46:10", t: "Estad quietos, y conoced que yo soy Dios." },
  { ref: "Isaías 40:31", t: "Los que esperan en Jehová tendrán nuevas fuerzas; levantarán alas como las águilas." },
  { ref: "Juan 1:5", t: "La luz resplandece en las tinieblas, y las tinieblas no la comprendieron." },
  { ref: "Filipenses 4:13", t: "Todo lo puedo en Cristo que me fortalece." },
  { ref: "Romanos 8:28", t: "A los que aman a Dios, todas las cosas les ayudan a bien." },
  { ref: "Mateo 11:28", t: "Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar." },
  { ref: "Salmos 23:1", t: "Jehová es mi pastor; nada me faltará." },
  { ref: "Jeremías 29:11", t: "Porque yo sé los pensamientos que tengo acerca de vosotros — pensamientos de paz, y no de mal." }
];

const SCRIPT_MARQUEE = [
  "Cantad a Jehová cántico nuevo",
  "Su misericordia es para siempre",
  "La luz resplandece en las tinieblas",
  "Nada nos apartará de Su amor",
  "Estad quietos y conoced",
  "En Él vivimos y nos movemos"
];

const loadDynamicData = () => {
  const adminAlbums = window.adminStorage.getAll('albumes');
  const adminTracks = window.adminStorage.getAll('musica');
  const adminDevos = window.adminStorage.getAll('devocionales');
  
  // Group tracks by album
  ALBUMS = adminAlbums.map(al => {
    return {
      ...al,
      tracks: adminTracks
        .filter(t => t.albumId === al.id)
        .sort((a, b) => parseInt(a.trackNumber || 0) - parseInt(b.trackNumber || 0))
        .map(t => ({
          n: String(t.trackNumber).padStart(2, '0'),
          t: t.title,
          d: '—', // Length placeholder since we don't have metadata yet
          audioDataUrl: t.audioDataUrl,
          lyrics: t.lyrics,
          coverDataUrl: al.coverDataUrl
        }))
    };
  });

  if (adminTracks.length > 0) {
    const latest = adminTracks[adminTracks.length - 1];
    LATEST_TRACK = {
      n: String(latest.trackNumber || '0').padStart(2, '0'),
      t: latest.title,
      audioDataUrl: latest.audioDataUrl,
      albumId: latest.albumId,
      lyrics: latest.lyrics,
      coverDataUrl: adminAlbums.find(a => a.id === latest.albumId)?.coverDataUrl
    };
  } else {
    LATEST_TRACK = null;
  }
  
  DEVOCIONALES = adminDevos.map(d => ({
    id: d.id || Math.random().toString(),
    date: new Date(d.createdAt || Date.now()).toLocaleDateString('es-ES', {day: 'numeric', month: 'short', year: 'numeric'}).toUpperCase(),
    title: d.title,
    quote: d.scripture || "",
    ref: "",
    body: d.body || "",
    youtubeUrl: d.youtubeUrl || "",
    by: "Isra" + (d.linkedSong ? ` · ♫ ${d.linkedSong}` : "")
  })).reverse();
  
  const adminSettings = window.adminStorage.get('settings') || {};
  const SITE_SETTINGS = {
    contactEmail: adminSettings.contactEmail || 'Hola@israstar.com',
    links: adminSettings.links || {}
  };
  
  Object.assign(window, { ALBUMS, PRODUCTS, TOUR, DEVOCIONALES, SCRIPTURE, SCRIPT_MARQUEE, LATEST_TRACK, SITE_SETTINGS });
};

window.loadDynamicData = loadDynamicData;
