import { put } from '@vercel/blob';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'isra';

export const config = {
  api: {
    bodyParser: false,
  },
};

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

  const filename = req.headers['x-filename'];
  if (!filename) {
    return res.status(400).json({ error: 'Falta x-filename en los headers.' });
  }

  try {
    const blob = await put(filename, req, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });

    return res.status(200).json({ success: true, url: blob.url, filename: blob.pathname });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Upload a Vercel Blob falló.' });
  }
}
