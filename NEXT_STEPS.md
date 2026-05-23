# FlipIt - Next Steps Checklist

**Everything is built. Here's what to do next to go live.**

---

## 🔵 READY NOW (Start Immediately)

### 1. Create Supabase Account (Free)
- [ ] Go to https://supabase.com
- [ ] Sign up with email
- [ ] Create new project
- [ ] Copy **Project URL** and **Anon Key**
- [ ] Add to `api/.env`:
  ```
  SUPABASE_URL=your-project-url
  SUPABASE_KEY=your-anon-key
  ```

### 2. Initialize Database
- [ ] In Supabase dashboard, open SQL Editor
- [ ] Open `api/migrations/001_init_schema.sql`
- [ ] Copy entire SQL
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Execute"
- [ ] See tables created ✓

### 3. Test API Locally
```bash
cd api
npm install
npm run dev
```
- [ ] See "FlipIt API running on port 5000"
- [ ] Visit http://localhost:5000/health
- [ ] Should see: `{"status":"FlipIt API running",...}`

---

## 🟡 DO AFTER LOCAL TESTING (2-3 days)

### 4. Deploy Backend to Internet
Choose ONE (Railway is easiest):

**Railway:**
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Create new project
- [ ] Connect to GitHub repo (or upload `api/` folder)
- [ ] Add environment variables via dashboard
- [ ] Deploy
- [ ] Copy public API URL

**Heroku:**
- [ ] Install Heroku CLI
- [ ] `heroku create flipit-api`
- [ ] Add environment variables
- [ ] `git push heroku main`
- [ ] Copy public API URL

**Other:**
- See `DEPLOYMENT_GUIDE.md` for DigitalOcean, AWS, etc.

### 5. Update App with Live API
- [ ] Edit `web/index.html`
- [ ] Find: `const API_BASE_URL = ...`
- [ ] Change to your deployed API URL
- [ ] Save file

### 6. Build iOS App
- [ ] `npm run cap:add:ios`
- [ ] `npm run cap:sync`
- [ ] `npm run cap:open:ios`
- [ ] In Xcode: Select iPhone simulator
- [ ] Product → Build → Run
- [ ] Test: Can you see the app? Can you navigate?

### 7. Build Android App
- [ ] `npm run cap:add:android`
- [ ] `npm run cap:sync`
- [ ] `npm run cap:open:android`
- [ ] In Android Studio: Create emulator
- [ ] Run app on emulator
- [ ] Test: Can you see the app? Can you navigate?

---

## 🔴 BEFORE APP STORE SUBMISSION (3-5 days)

### 8. Create Developer Accounts
- [ ] **Apple ID** (https://developer.apple.com)
  - Cost: $99/year
  - Needed for: iOS app store
- [ ] **Google Play Developer** (https://play.google.com/console)
  - Cost: $25 one-time
  - Needed for: Android app store

### 9. Create App Store Listings
**iOS:**
- [ ] Log in to App Store Connect
- [ ] Create new app
- [ ] Fill metadata:
  - App name: FlipIt
  - Description: "Multi-platform resale marketplace with AI pricing"
  - Keywords: resale, marketplace, sell, ebay, facebook
  - Support URL: yourwebsite.com
  - Privacy Policy URL: yourwebsite.com/privacy
  - Category: Shopping
  - Content rating: Get rating

**Android:**
- [ ] Log in to Google Play Console
- [ ] Create new app
- [ ] Fill metadata: (same as iOS)
- [ ] Add content rating

### 10. Prepare Screenshots
- [ ] Take 5 screenshots of key screens (iPhone 6.7" and Pixel 7 sizes)
- [ ] Show: Home, Sell, Listings, Pricing, Confirmation
- [ ] Add text overlays if desired
- [ ] Save in 1170×2532 (iOS) and 1440×3120 (Android)

### 11. iOS Build & Submission
```bash
npm run cap:open:ios
```
- [ ] In Xcode: Set signing team
- [ ] Product → Archive
- [ ] Distribute App → App Store
- [ ] Sign in with Apple ID
- [ ] Upload build to App Store Connect
- [ ] Fill metadata on App Store Connect
- [ ] Submit for review
- [ ] **Wait 24-48 hours for approval**

### 12. Android Build & Submission
```bash
npm run cap:open:android
```
- [ ] In Android Studio: Build → Generate Signed Bundle
- [ ] Create keystore (if first time)
- [ ] Upload .aab to Google Play Console
- [ ] Fill metadata
- [ ] Submit for review
- [ ] **Wait 24-48 hours for approval**

---

## ✅ AFTER APPROVAL (Live!)

### 13. Monitor & Maintain
- [ ] Check both app stores for live status
- [ ] Set up error tracking (Sentry)
- [ ] Monitor API performance
- [ ] Respond to user reviews
- [ ] Plan Phase 2 features

---

## Timeline Summary

| Task | Time | By When |
|------|------|---------|
| Supabase setup | 30 min | Today |
| API deployment | 1-2 hours | Tomorrow |
| iOS/Android build | 2-3 hours | Day 3 |
| App store submission | 1 hour | Day 4 |
| Approval wait | 24-48 hours | Day 5-6 |
| **LIVE** | 🎉 | **~6 days** |

---

## Blockers You Might Hit

### "I don't have a Mac"
iOS development requires a Mac. Options:
- Borrow a Mac
- Rent Mac in cloud (MacStadium, AWS)
- Focus on Android first, add iOS later

### "Supabase credentials not working"
- Check URL format: `https://xxxx.supabase.co`
- Check key is Anon Key, not Service Key
- Ensure project is active in Supabase dashboard

### "App won't build in Xcode"
- Clean build: Cmd+Shift+K
- Delete DerivedData: `rm -rf ~/Library/Developer/Xcode/DerivedData`
- Check iOS deployment target matches

### "App store rejection"
Most common reasons:
- Missing privacy policy → Add now
- App crashes → Test more thoroughly
- Unclear functionality → Better description
- Buggy UI → Polish before submitting

---

## Questions I Can Answer

As you go through this, if you hit ANY blocker:
1. Tell me what happened
2. Show me the error message
3. I'll figure out the workaround

**I'm here to help you get this live. 💪**

---

## Start Here

**RIGHT NOW:**
1. Go to Supabase.com
2. Create account
3. Create project
4. Come back and tell me your Supabase URL + Key

I'll verify everything is connected and you're good to go!

---

**Questions? Let me know. Otherwise: GO BUILD! 🚀**
