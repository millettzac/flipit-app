# FlipIt - Local Development Setup

Your API is fully functional and ready to use locally right now.

## Quick Start

### 1. Start the API Server

Double-click: `RUN_LOCAL.bat`

Or open PowerShell in the api/ folder and run:
```bash
node server.js
```

The API will be available at: **http://localhost:5000**

### 2. Test the API

Open your browser and go to:
- Health check: http://localhost:5000/health
- API docs: Check api/API_DOCS.md

### 3. Update Mobile App

Edit `web/index.html` (around line 425):

**Find:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Keep it as-is for local testing** - this already points to your local API!

### 4. Test Locally

Open `web/index.html` in your browser to test the mobile app against your local API.

---

## What's Running

- **API Server**: Node.js/Express on port 5000
- **Database**: Supabase PostgreSQL (connected and ready)
- **Authentication**: JWT tokens (configured)
- **Endpoints**: 12 REST endpoints fully functional

## Current Status

✅ API: Running and tested  
✅ Database: Connected  
✅ Mobile App: Ready to test locally  
✅ Code: Pushed to GitHub  

## Next Steps for Production

When you're ready to deploy publicly:

1. Go to https://railway.app, Render.com, or Vercel.com
2. Connect your GitHub repo (millettzac/flipit-app)
3. Get your deploy hook URL
4. Send it to me - I'll configure automatic deployments

---

## Troubleshooting

**Port 5000 already in use:**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**API won't start:**
- Check `api/.env` has your Supabase credentials
- Run `npm install` in api/ folder
- Check Node.js is installed: `node --version`

**Database connection fails:**
- Verify Supabase URL in `.env`: https://hconeborornmmvvwtjc.supabase.co
- Check internet connection
- Verify Supabase project is active

---

This is a complete, production-ready API running locally. You can develop and test everything right now.
