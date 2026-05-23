-- FlipIt Database Schema
-- Initialize with Supabase PostgreSQL

-- Users table
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

-- Listings table
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_listings (user_id),
  INDEX idx_status (status)
);

-- Platform connections
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

-- Orders/Sales
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
  completed_at TIMESTAMP,
  INDEX idx_seller_orders (listing_id),
  INDEX idx_status (status)
);

-- Payouts
CREATE TABLE IF NOT EXISTS payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  stripe_transfer_id VARCHAR(255),
  bank_account_last4 VARCHAR(4),
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP,
  INDEX idx_user_payouts (user_id),
  INDEX idx_status (status)
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_type VARCHAR(50),
  listing_id UUID REFERENCES listings(id),
  platform VARCHAR(50),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_events (user_id),
  INDEX idx_event_type (event_type)
);

-- RLS Policies (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can only read listings (public)
CREATE POLICY "Listings are publicly readable" ON listings
  FOR SELECT USING (true);

-- Users can only create/update their own listings
CREATE POLICY "Users can create listings" ON listings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own listings" ON listings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own listings" ON listings
  FOR DELETE USING (auth.uid() = user_id);

-- Platform connections - private
CREATE POLICY "Users can view own platforms" ON platform_connections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own platforms" ON platform_connections
  FOR ALL USING (auth.uid() = user_id);

-- Orders - users can view their own
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (
    auth.uid() = (SELECT user_id FROM listings WHERE id = listing_id)
    OR auth.uid() = buyer_id
  );

-- Payouts - users can view their own
CREATE POLICY "Users can view own payouts" ON payouts
  FOR SELECT USING (auth.uid() = user_id);

-- Analytics - users can write their own events
CREATE POLICY "Users can log events" ON analytics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_listings_user_created ON listings(user_id, created_at DESC);
CREATE INDEX idx_orders_listing ON orders(listing_id);
CREATE INDEX idx_platform_connections_platform ON platform_connections(platform);
CREATE INDEX idx_analytics_created ON analytics(created_at DESC);
