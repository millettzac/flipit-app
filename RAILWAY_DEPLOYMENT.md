# Deploy FlipIt API to Railway

**Free, fast, and production-ready. Takes ~10 minutes.**

---

## Option A: Deploy from GitHub (Recommended)

### 1. Push Code to GitHub
```bash
cd C:\Users\mille\OneDrive\Desktop\Obsidian\codes\FLIPIT_APP

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial FlipIt setup"

# Create GitHub repo (go to github.com, create new repo)
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/flipit-app.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Railway

1. Go to **https://railway.app**
2. Click **"Login with GitHub"** (or create account)
3. Authorize Railway to access your GitHub
4. Click **"New Project"**
5. Select **"Deploy from GitHub repo"**
6. Find **flipit-app** repo → Click **"Deploy"**
7. Railway auto-detects Node.js app ✓

### 3. Add Environment Variables

1. In Railway dashboard, go to your project
2. Click **"Variables"** tab
3. Add these (from your `.env` file):
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_publishable_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   NODE_ENV=production
   PORT=5000
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=*
   ```
4. Click **"Save"**

### 4. Deploy

1. Railway automatically deploys when you push to GitHub
2. Wait ~2-3 minutes for build
3. See **"Active"** status ✓
4. Copy the **public URL** (looks like `https://flipit-api.up.railway.app`)

---

## Option B: Deploy via Railway CLI

### 1. Install Railway CLI
```bash
# macOS/Linux
curl -fsSL https://railway.app/install.sh | bash

# Windows
# Download from: https://github.com/railwayapp/cli/releases
# Or use: choco install railway (if Chocolatey installed)
```

### 2. Login to Railway
```bash
railway login
```

### 3. Deploy API Folder
```bash
cd C:\Users\mille\OneDrive\Desktop\Obsidian\codes\FLIPIT_APP\api

# Initialize Railway project
railway init

# Set up environment (use values from your .env file)
railway variables set SUPABASE_URL=your_supabase_url
railway variables set SUPABASE_KEY=your_supabase_publishable_key
railway variables set SUPABASE_SERVICE_KEY=your_supabase_service_key
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=your_jwt_secret

# Deploy
railway up
```

---

## Option C: Deploy from Upload (Easiest, No GitHub)

1. Go to **https://railway.app**
2. Login with GitHub / Email
3. Click **"New Project"** → **"Deploy from Repo"** → **"Empty Project"**
4. Click **"Connect Repo"** → **"Create New Repo"**
5. Name: `flipit-api`
6. Initialize empty repo
7. Push code:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/flipit-api.git
   git push -u origin main
   ```
8. Railway deploys automatically ✓

---

## Verify Deployment

Once deployed, test your API:

```bash
# Get public URL from Railway dashboard
# Example: https://flipit-api.up.railway.app

# Test health endpoint
curl https://flipit-api.up.railway.app/health

# Should return:
# {"status":"FlipIt API running","timestamp":"2024-05-23T..."}
```

---

## Update Mobile App

Once you have the live API URL:

**Edit `web/index.html`:**

Find this line (around line 425):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

Replace with:
```javascript
const API_BASE_URL = 'https://flipit-api.up.railway.app/api';
```
(Use YOUR Railway public URL)

---

## Troubleshooting

### Build Failed
- Check `Procfile` exists in api/ folder
- Verify `package.json` has `"start": "node server.js"`
- Check environment variables are set

### Application Error / Port Issues
- Make sure PORT environment variable is set (Railway sets it automatically)
- Check server.js listens on correct port

### Cannot Connect to Supabase
- Verify SUPABASE_URL and SUPABASE_KEY are correct
- Check Supabase project is active
- Test locally first: `npm run dev`

### Deployment Stuck
- Check build logs in Railway dashboard
- Restart deployment: Click "Redeploy"

---

## Next Steps

After deployment:
1. ✅ Get public API URL
2. ✅ Update `web/index.html` with live API URL
3. ✅ Build iOS app with Capacitor
4. ✅ Build Android app with Capacitor
5. ✅ Submit to app stores

---

## Cost

- **Free tier:** 500 hours/month of computing (plenty for development)
- **Paid:** $5/month for production apps
- **No credit card required** for free tier

---

## Support

If deployment fails:
1. Check build logs in Railway
2. Verify environment variables
3. Test API locally: `npm run dev`
4. Check Supabase connection
