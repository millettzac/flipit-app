# FlipIt - Multi-Platform Resale App

Fast-track app store deployment using Capacitor.

## Project Structure
```
FLIPIT_APP/
├── web/                      # Web app files (served in both iOS & Android)
│   └── index.html           # Main app entry point
├── package.json             # Node dependencies & build scripts
├── capacitor.config.json    # Capacitor configuration
├── ios/                     # Generated iOS project (created during setup)
├── android/                 # Generated Android project (created during setup)
└── README.md               # This file
```

## Quick Start

### 1. Install Dependencies
```bash
cd C:\Users\mille\OneDrive\Desktop\Obsidian\codes\FLIPIT_APP
npm install
```

### 2. Build for iOS
```bash
npm run cap:add:ios
npm run cap:sync
npm run cap:open:ios
# Xcode opens - build and test in simulator
```

### 3. Build for Android
```bash
npm run cap:add:android
npm run cap:sync
npm run cap:open:android
# Android Studio opens - build and test in emulator
```

## Deployment Pipeline

### Pre-Deployment Checklist
- [ ] Capacitor iOS/Android projects set up
- [ ] App signing certificates configured
- [ ] Privacy policy & terms of service ready
- [ ] App store developer accounts created
- [ ] Backend API deployed (user auth, listings, payments)
- [ ] App screenshots & metadata prepared

### iOS Deployment (App Store)
1. Generate signing certificate in Apple Developer
2. Configure provisioning profile in Xcode
3. Build for release: Product → Archive
4. Upload to App Store Connect via Xcode
5. Submit for review (~24-48 hours)

### Android Deployment (Google Play)
1. Generate keystore for app signing
2. Configure build.gradle with keystore path
3. Build signed APK: `./gradlew assembleRelease`
4. Upload to Google Play Console
5. Roll out to production

## Backend Requirements

**Currently missing - needed before app store submission:**
- User authentication (email/password, OAuth)
- Listing database (store, retrieve, update listings)
- Platform API integrations (eBay, Facebook, Shopify connectors)
- Payment processing (Stripe, PayPal)
- Image storage (AWS S3, Cloudinary)

## Next Blockers to Address

1. **Backend infrastructure** - Which would you prefer?
2. **App store accounts** - Need Apple ID + Google Play Developer account
3. **Signing certificates** - iOS requires paid Apple Developer ($99/year)

## Timeline Estimate
- Week 1: Backend setup + API development
- Week 2: iOS/Android testing & refinement
- Week 3: App store submission & approval
- **Target launch: 3 weeks**

## Files Location
- App: `C:\Users\mille\OneDrive\Desktop\Obsidian\codes\FLIPIT_APP\`
- Repository-ready for GitHub or GitLab
