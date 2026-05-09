import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'isra';

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
    const timestamp = Date.now();
    const cleanFilename = originalFilename.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filename = `${timestamp}-${cleanFilename}`;

    const { data, error } = await supabase.storage
      .from('media')
      .createSignedUploadUrl(filename);

    if (error) {
      console.error('Signed URL error:', error);
      return res.status(500).json({ error: 'Error generando URL de subida.' });
    }

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filename);

    return res.status(200).json({ success: true, signedUrl: data.signedUrl, url: publicUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error procesando la solicitud.' });
  }
}
