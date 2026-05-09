import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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
      const { data, error } = await supabase
        .from('site_data')
        .select('data')
        .eq('id', 'main')
        .single();

      if (error || !data || !data.data) {
        return res.status(200).json({ albumes: [], musica: [], devocionales: [] });
      }
      return res.status(200).json(data.data);
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
      const { error } = await supabase
        .from('site_data')
        .update({ data: req.body })
        .eq('id', 'main');

      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to save to database' });
      }
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to save to database' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
