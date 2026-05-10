import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, source } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Get current data
    const { data: currentData, error: readError } = await supabase
      .from('site_data')
      .select('data')
      .eq('id', 'main')
      .single();

    if (readError) {
      console.error('Read error:', readError);
      return res.status(500).json({ error: 'Database read failed' });
    }

    const dbData = currentData?.data || {};
    const suscriptores = dbData.suscriptores || [];

    // 2. Check if email already exists to avoid duplicates
    if (suscriptores.find(s => s.email.toLowerCase() === email.toLowerCase())) {
      return res.status(200).json({ success: true, message: 'Already subscribed' });
    }

    // 3. Append new subscriber
    const newSubscriber = {
      id: Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase(),
      source: source || 'unknown',
      createdAt: new Date().toISOString()
    };

    suscriptores.unshift(newSubscriber); // Add to the top
    dbData.suscriptores = suscriptores;

    // 4. Save back to database
    const { error: updateError } = await supabase
      .from('site_data')
      .update({ data: dbData })
      .eq('id', 'main');

    if (updateError) {
      console.error('Update error:', updateError);
      return res.status(500).json({ error: 'Database update failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
