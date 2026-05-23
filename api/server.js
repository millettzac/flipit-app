require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'FlipIt API running', timestamp: new Date() });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUpWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Create user profile in database
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert({
        id: data.user.id,
        email,
        name,
        created_at: new Date(),
      })
      .select()
      .single();

    if (profileError) throw profileError;

    res.status(201).json({
      success: true,
      user: profile,
      message: 'User registered successfully',
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user profile
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({
      success: true,
      user: profile,
      token: data.session.access_token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Listings Routes
app.get('/api/listings', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, listings: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/listings', async (req, res) => {
  try {
    const { user_id, title, description, price, condition, platforms, image_url } = req.body;

    const { data, error } = await supabase
      .from('listings')
      .insert({
        user_id,
        title,
        description,
        price,
        condition,
        platforms: JSON.stringify(platforms),
        image_url,
        status: 'active',
        created_at: new Date(),
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, listing: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json({ success: true, listing: data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, listing: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/listings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Listing deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Profile Routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, user: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Platform Connections
app.get('/api/users/:id/platforms', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('platform_connections')
      .select('*')
      .eq('user_id', id);

    if (error) throw error;
    res.json({ success: true, platforms: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/:id/platforms', async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, access_token, account_id } = req.body;

    const { data, error } = await supabase
      .from('platform_connections')
      .insert({
        user_id: id,
        platform,
        access_token,
        account_id,
        connected_at: new Date(),
      })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, connection: data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ FlipIt API running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Supabase connected: ${process.env.SUPABASE_URL}`);
});
