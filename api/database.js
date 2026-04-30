import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'isra';

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request (Public)
  if (req.method === 'GET') {
    try {
      const data = await redis.get('israstar_db');
      if (!data) {
        return res.status(200).json({ albumes: [], musica: [], devocionales: [] });
      }
      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }

  // Handle POST request (Admin Only)
  if (req.method === 'POST') {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
      return res.status(401).json({ error: 'No autorizado. Contraseña incorrecta.' });
    }

    try {
      await redis.set('israstar_db', req.body);
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to save to database' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
