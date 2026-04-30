// API storage for Global Vercel backend + memory cache for synchronous React API

window.adminStorageCache = {
  albumes: [],
  musica: [],
  devocionales: []
};
const adminStorage = {
  authToken: localStorage.getItem('isra_auth') || '',
  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem('isra_auth', token);
  },
  logout() {
    this.authToken = '';
    localStorage.removeItem('isra_auth');
  },
  init() {
    return fetch('/api/database').then(res => res.json()).then(data => {
      window.adminStorageCache = {
        ...window.adminStorageCache,
        ...data
      };
    }).catch(e => {
      console.error('API init failed:', e);
    });
  },
  _persist() {
    return fetch('/api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authToken
      },
      body: JSON.stringify(window.adminStorageCache)
    }).then(res => {
      if (res.status === 401) {
        this.logout();
        window.location.reload();
        throw new Error('Unauthorized');
      }
      return res.json();
    });
  },
  get(key) {
    return window.adminStorageCache[key] || null;
  },
  getAll(key) {
    return this.get(key) || [];
  },
  set(key, value) {
    window.adminStorageCache[key] = value;
    this._persist().catch(e => console.error('Save failed:', e));
  },
  add(key, item) {
    const items = this.getAll(key);
    const newItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    this.set(key, items);
    return newItem;
  },
  update(key, id, updates) {
    const items = this.getAll(key);
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.set(key, items);
    }
  },
  remove(key, id) {
    const items = this.getAll(key);
    this.set(key, items.filter(i => i.id !== id));
  }
};
window.adminStorage = adminStorage;