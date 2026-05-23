# FlipIt - Complete Deployment Guide

## Project Structure

```
FLIPIT_APP/
├── web/                    # Mobile app (Capacitor web root)
│   └── index.html
├── api/                    # Node.js Express backend
│   ├── server.js
│   ├── package.json
│   ├── migrations/         # Database schemas
│   └── .env.example
├── ios/                    # iOS native code (generated)
├── android/                # Android native code (generated)
└── capacitor.config.json
```

---

## Step 1: Set Up Supabase (Database)

### Option A: Managed Supabase Cloud (Easiest)
1. Go to https://supabase.com
2. Create new project
3. Get credentials:
   - Project URL
   - Anon Key
   - Service Role Key
4. Copy to `api/.env`

### Option B: Self-Hosted Supabase (Open Source)
```bash
# Using Docker
git clone https://github.com/supabase/supabase.git
cd supabase/docker
docker compose up

# Access at http://localhost:3000
```

### Create Database Schema

1. Open Supabase dashboard (or pgAdmin for self-hosted)
2. Copy-paste `api/migrations/001_init_schema.sql` into SQL editor
3. Execute

---

## Step 2: Deploy Backend API

### Option A: Railway (Recommended - $5/month)
```bash
# 1. Install Railway CLI
npm install -g railway

# 2. Login
railway login

# 3. Initialize project
cd api
railway init

# 4. Add environment variables
railway variables set SUPABASE_URL=your_url
railway variables set SUPABASE_KEY=your_key
# ... (add all .env variables)

# 5. Deploy
railway up
```

Your API will be at: `https://your-project.railway.app`

### Option B: Heroku (Free tier deprecated - $7/month minimum)
```bash
# 1. Install Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Create app
heroku create flipit-api

# 4. Set environment variables
heroku config:set SUPABASE_URL=your_url -a flipit-api
heroku config:set SUPABASE_KEY=your_key -a flipit-api
# ... (add all .env variables)

# 5. Deploy
git push heroku main
```

### Option C: DigitalOcean App Platform ($12/month)
```bash
# 1. Go to https://cloud.digitalocean.com
# 2. Create new App
# 3. Connect GitHub repo
# 4. Set build command: npm install
# 5. Set start command: npm start
# 6. Add environment variables via dashboard
# 7. Deploy
```

### Option D: AWS Lambda (Serverless)
```bash
# Using Serverless Framework
npm install -g serverless

serverless create --template aws-nodejs
serverless deploy

# Update config in serverless.yml
```

---

## Step 3: Build Mobile App

### iOS (Mac required)

```bash
# 1. Install Xcode
# 2. In project root:
npm install
npm run cap:add:ios

# 3. Open Xcode
npm run cap:open:ios

# 4. In Xcode:
# - Select iOS device or simulator
# - Update API_URL in web/index.html
# - Product → Build
# - Product → Run
```

### Android

```bash
# 1. Install Android Studio
# 2. Set ANDROID_HOME environment variable
# 3. In project root:
npm install
npm run cap:add:android

# 4. Open Android Studio
npm run cap:open:android

# 5. In Android Studio:
# - Create emulator or connect device
# - Update API_URL in web/index.html
# - Build → Make Project
# - Run app
```

---

## Step 4: Update App to Connect to Backend

**Edit `web/index.html`** - Add API configuration:

```javascript
// At top of <script> section
const API_BASE_URL = 'https://your-api-domain.com/api';

// Example API call (modify as needed)
async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
}
```

---

## Step 5: App Store Submission

### iOS App Store

Prerequisites:
- Apple Developer Account ($99/year)
- Mac with Xcode
- App signing certificate

Steps:
1. In Xcode: Signing & Capabilities
2. Select your Team
3. Create signing certificate if needed
4. Product → Archive
5. Distribute App → App Store Connect
6. Upload to App Store Connect
7. Fill metadata:
   - Screenshots (5 per screen size)
   - Description
   - Keywords
   - Support URL
   - Privacy Policy
8. Submit for Review (24-48 hours)

### Google Play Store

Prerequisites:
- Google Play Developer Account ($25 one-time)
- Keystore file for signing

Steps:
```bash
# 1. Generate keystore
keytool -genkey -v -keystore flipit-release.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias flipit

# 2. In Android Studio: Build → Generate Signed Bundle/APK
# 3. Select your keystore
# 4. Go to Google Play Console
# 5. Create new app
# 6. Upload bundle
# 7. Fill metadata:
   - Screenshots (2-8 per screen size)
   - Description
   - Content rating
   - Privacy policy
   - Contact info
# 8. Set pricing (free)
# 9. Submit for Review (24-48 hours)
```

---

## Step 6: Post-Launch

### Monitoring
- Set up error tracking: Sentry, LogRocket
- Monitor API performance: DataDog, New Relic
- Set up analytics: Mixpanel, Amplitude

### Updates
- Small updates: Simple app store update (1-2 days review)
- Large changes: Plan carefully, test thoroughly

### Scaling
- Auto-scaling on Railway/DigitalOcean
- Database backups (Supabase handles automatically)
- CDN for images: Cloudflare (free)

---

## Estimated Costs (Monthly)

| Component | Cost |
|-----------|------|
| Supabase (Cloud) | $25-100 |
| API Hosting (Railway) | $5-10 |
| Domain (.com) | $1 |
| Email service | $0-20 |
| Image storage (S3) | $0-5 |
| **Total** | **$31-136** |

---

## Troubleshooting

### API not connecting
- Check `.env` variables
- Verify CORS is enabled
- Check network tab in DevTools
- Confirm Supabase is accessible

### App store rejection
- Common reasons: Privacy policy missing, unclear functionality, buggy
- Read rejection message carefully
- Fix and resubmit within 30 days

### Performance issues
- Profile with DevTools
- Check database queries
- Implement caching
- Scale backend if needed

---

## Next: Phase 2 Features

After launch, add:
- Image upload to S3
- Platform API integrations (eBay, Facebook, Shopify)
- Payment processing (Stripe)
- Real-time notifications
- Push notifications
- Analytics dashboard
- AI pricing recommendations
