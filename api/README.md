# FlipIt Backend API

**Open-Source Custom Node.js Express Server + Supabase PostgreSQL**

Fast, scalable, and fully customizable backend for the FlipIt mobile app.

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
cd api
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env and add your Supabase credentials
```

### 3. Initialize Database
- Go to Supabase dashboard (or self-hosted)
- Create new PostgreSQL project
- Copy Project URL and Anon Key to `.env`
- Run SQL migration: `migrations/001_init_schema.sql`

### 4. Start Development Server
```bash
npm run dev
```

API running at `http://localhost:5000`

---

## Architecture

### Tech Stack
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Database:** PostgreSQL (via Supabase)
- **Authentication:** Supabase Auth + JWT
- **Storage:** PostgreSQL (images stored as URLs)

### Database Schema

**Users**
- id, email, name, avatar_url, bio, phone
- verified, stripe_customer_id, total_earnings
- created_at, updated_at

**Listings**
- id, user_id, title, description, price, condition
- platforms (JSON), status, image_url
- views, inquiries, sold_at
- created_at, updated_at

**Platform Connections**
- id, user_id, platform (ebay/facebook/shopify)
- access_token, account_id, account_email
- connected_at, last_synced

**Orders, Payouts, Analytics**
- Sales tracking, payout management, user events

---

## API Endpoints

See `API_DOCS.md` for complete endpoint documentation.

### Core Routes
```
POST   /api/auth/register          Register user
POST   /api/auth/login             Login user
GET    /api/listings               Get all listings
POST   /api/listings               Create listing
PUT    /api/listings/:id           Update listing
DELETE /api/listings/:id           Delete listing
GET    /api/users/:id              Get user profile
PUT    /api/users/:id              Update profile
GET    /api/users/:id/platforms    Get connected platforms
POST   /api/users/:id/platforms    Connect platform
```

---

## Environment Variables

Required:
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
NODE_ENV=development
PORT=5000
```

Optional (for future features):
```
JWT_SECRET=your-secret
STRIPE_SECRET_KEY=sk_test_...
EBAY_CLIENT_ID=...
FACEBOOK_APP_ID=...
AWS_ACCESS_KEY_ID=...
```

---

## Deployment

### Railway (Recommended)
```bash
npm install -g railway
cd api
railway init
railway variables set SUPABASE_URL=... SUPABASE_KEY=...
railway up
```

### Heroku
```bash
heroku create flipit-api
heroku config:set SUPABASE_URL=... SUPABASE_KEY=...
git push heroku main
```

### DigitalOcean / Self-Hosted
See `../DEPLOYMENT_GUIDE.md` for step-by-step instructions.

---

## Development Workflow

### File Structure
```
api/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── migrations/            # Database schemas
│   └── 001_init_schema.sql
├── routes/               # API routes (future)
├── controllers/          # Business logic (future)
├── models/               # Database queries (future)
└── tests/                # Test suite (future)
```

### Adding New Endpoints

1. Add route in `server.js`:
```javascript
app.post('/api/your-route', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('table_name')
      .select('*');
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

2. Test with curl or Postman
3. Update `API_DOCS.md` with endpoint docs

---

## Security

### Current Implementation
- Supabase Auth (email/password, OAuth-ready)
- Row-Level Security (RLS) in PostgreSQL
- CORS enabled (configure for production)
- JWT token-based authentication

### Production Checklist
- [ ] Set JWT_SECRET in environment
- [ ] Configure CORS_ORIGIN to your domain only
- [ ] Enable HTTPS
- [ ] Set up rate limiting
- [ ] Add request validation
- [ ] Implement API key authentication
- [ ] Set up monitoring/logging
- [ ] Regular security audits

---

## Roadmap

### Phase 1 (Current)
- ✓ User authentication
- ✓ Listings CRUD
- ✓ Platform connections management
- [ ] Image upload handling

### Phase 2
- [ ] Payment processing (Stripe)
- [ ] eBay/Facebook/Shopify API integrations
- [ ] Order management
- [ ] Payout processing

### Phase 3
- [ ] AI pricing engine
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Multi-currency support

---

## Contributing

This is open-source! Feel free to:
- Submit issues
- Create feature branches
- Send pull requests

---

## Support

For issues or questions:
1. Check `API_DOCS.md`
2. Review `DEPLOYMENT_GUIDE.md`
3. Check Supabase docs: https://supabase.com/docs
4. Open an issue in the repo

---

## License

MIT - Use freely for personal or commercial projects
