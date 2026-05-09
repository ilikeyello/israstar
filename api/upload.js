import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'isra';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to read stream into buffer
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, x-filename');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
    return res.status(401).json({ error: 'No autorizado.' });
  }

  const originalFilename = req.headers['x-filename'];
  if (!originalFilename) {
    return res.status(400).json({ error: 'Falta x-filename en los headers.' });
  }

  try {
    const fileBuffer = await buffer(req);
    
    // Generate unique filename to avoid collisions
    const timestamp = Date.now();
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filename = `${timestamp}-${cleanFilename}`;

    const { data, error } = await supabase.storage
      .from('media')
      .upload(filename, fileBuffer, {
        contentType: req.headers['content-type'] || 'application/octet-stream',
        upsert: false
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: 'Upload a Supabase falló.' });
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(data.path);

    return res.status(200).json({ success: true, url: publicUrl, filename: data.path });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error procesando la subida.' });
  }
}
