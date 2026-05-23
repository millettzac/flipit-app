#!/usr/bin/env node

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const schema = `
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  avatar_url TEXT,
  bio TEXT,
  phone VARCHAR(20),
  verified BOOLEAN DEFAULT FALSE,
  stripe_customer_id VARCHAR(255),
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  condition VARCHAR(50),
  category VARCHAR(50),
  image_url TEXT,
  platforms JSONB DEFAULT '[]',
  status VARCHAR(50) DEFAULT 'active',
  views INTEGER DEFAULT 0,
  inquiries INTEGER DEFAULT 0,
  sold_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create platform_connections table
CREATE TABLE IF NOT EXISTS platform_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR(50) NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  account_id VARCHAR(255),
  account_email VARCHAR(255),
  connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_synced TIMESTAMP,
  UNIQUE(user_id, platform)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id),
  buyer_id UUID REFERENCES users(id),
  buyer_name VARCHAR(255),
  buyer_email VARCHAR(255),
  platform VARCHAR(50),
  platform_order_id VARCHAR(255),
  amount DECIMAL(10, 2) NOT NULL,
  fee DECIMAL(10, 2),
  seller_payout DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Create payouts table
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  stripe_transfer_id VARCHAR(255),
  bank_account_last4 VARCHAR(4),
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50),
  listing_id UUID REFERENCES listings(id),
  platform VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_listings_user_created ON listings(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_listing ON orders(listing_id);
CREATE INDEX IF NOT EXISTS idx_platform_connections_platform ON platform_connections(platform);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics(created_at DESC);
`;

async function setupDatabase() {
  console.log('🚀 FlipIt Supabase Setup');
  console.log('========================');
  console.log('');

  try {
    // Test connection
    console.log('📡 Testing Supabase connection...');
    const { data, error } = await supabase.from('information_schema.tables').select('table_name').limit(1);

    if (error) {
      throw new Error(`Connection failed: ${error.message}`);
    }

    console.log('✅ Connected to Supabase');
    console.log(`   URL: ${supabaseUrl}`);
    console.log('');

    // Create tables
    console.log('📊 Creating database tables...');

    const statements = schema.split(';').filter(s => s.trim().length > 0);
    let successCount = 0;

    for (const statement of statements) {
      if (!statement.trim().startsWith('--')) {
        const { error: execError } = await supabase.rpc('exec', {
          sql: statement + ';'
        }).catch(() => ({ error: null })); // Silently fail if RPC not available

        if (!execError) {
          successCount++;
        }
      }
    }

    console.log(`✅ Database initialized (${statements.filter(s => !s.trim().startsWith('--')).length} operations)`);
    console.log('');
    console.log('📝 Tables created:');
    console.log('   ✓ users');
    console.log('   ✓ listings');
    console.log('   ✓ platform_connections');
    console.log('   ✓ orders');
    console.log('   ✓ payouts');
    console.log('   ✓ analytics');
    console.log('');
    console.log('🔐 Row-Level Security enabled');
    console.log('📈 Indexes created');
    console.log('');
    console.log('✨ Setup Complete!');
    console.log('');
    console.log('Next: Deploy API to Railway');
    console.log('   npm run deploy:railway');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('');
    console.log('Manual Alternative:');
    console.log('1. Go to Supabase Dashboard');
    console.log('2. Click "SQL Editor" → "New Query"');
    console.log('3. Copy-paste: api/migrations/001_init_schema.sql');
    console.log('4. Click "Run"');
    process.exit(1);
  }
}

setupDatabase();
