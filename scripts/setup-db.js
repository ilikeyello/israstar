const { Client } = require('pg');
const { createClient } = require('@supabase/supabase-js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const fs = require('fs');
const path = require('path');

// Read .env.local to load variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const POSTGRES_URL = process.env.POSTGRES_URL_NON_POOLING;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function setupDatabase() {
  if (!POSTGRES_URL) {
    console.error("Missing POSTGRES_URL in .env.local");
    process.exit(1);
  }

  // 1. Create table using pg
  console.log("Connecting to Postgres...");
  const client = new Client({ 
    connectionString: POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();

  console.log("Creating table site_data...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS site_data (
      id text primary key,
      data jsonb
    );
  `);
  
  // Insert initial data if not exists
  console.log("Ensuring 'main' row exists...");
  await client.query(`
    INSERT INTO site_data (id, data) 
    VALUES ('main', '{"albumes": [], "musica": [], "devocionales": []}')
    ON CONFLICT (id) DO NOTHING;
  `);

  await client.end();
  console.log("Database table setup complete.");

  // 2. Create Storage Bucket using Supabase JS
  console.log("Connecting to Supabase Storage...");
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
      process.exit(1);
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
  console.log("Creating 'media' bucket...");
  const { data, error } = await supabase.storage.createBucket('media', {
    public: true,
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac']
  });

  if (error) {
    if (error.message.includes('already exists')) {
      console.log("Bucket 'media' already exists. Updating to public...");
      await supabase.storage.updateBucket('media', { public: true });
    } else {
      console.error("Error creating bucket:", error);
    }
  } else {
    console.log("Bucket 'media' created successfully.");
  }

  console.log("Setup complete!");
}

setupDatabase().catch(err => {
  console.error("Setup failed:", err);
  process.exit(1);
});
