# FlipIt API Documentation

Custom Node.js Express API with Supabase PostgreSQL backend.

## Base URL
```
http://localhost:5000/api
https://flipit-api.your-domain.com/api  (production)
```

## Authentication

All authenticated endpoints require JWT token in Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Request:
```json
{
  "email": "user@example.com",
  "password": "secure-password",
  "name": "John Doe"
}
```

Response:
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-05-23T10:00:00Z"
  },
  "message": "User registered successfully"
}
```

### Login
**POST** `/auth/login`

Request:
```json
{
  "email": "user@example.com",
  "password": "secure-password"
}
```

Response:
```json
{
  "success": true,
  "user": { ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Listings Endpoints

### Get All Listings
**GET** `/listings`

Response:
```json
{
  "success": true,
  "listings": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "title": "iPhone 13 Pro",
      "description": "Hardly used, mint condition",
      "price": 649,
      "condition": "like-new",
      "platforms": ["ebay", "facebook", "shopify"],
      "image_url": "https://...",
      "status": "active",
      "views": 42,
      "inquiries": 3,
      "created_at": "2024-05-23T10:00:00Z"
    }
  ]
}
```

### Create Listing
**POST** `/listings`

Request:
```json
{
  "user_id": "uuid",
  "title": "iPhone 13 Pro",
  "description": "Hardly used, mint condition",
  "price": 649,
  "condition": "like-new",
  "platforms": ["ebay", "facebook", "shopify"],
  "image_url": "https://..."
}
```

### Get Listing
**GET** `/listings/:id`

### Update Listing
**PUT** `/listings/:id`

Request:
```json
{
  "price": 599,
  "status": "active"
}
```

### Delete Listing
**DELETE** `/listings/:id`

---

## User Endpoints

### Get User Profile
**GET** `/users/:id`

### Update User Profile
**PUT** `/users/:id`

Request:
```json
{
  "name": "John Doe",
  "bio": "Reselling enthusiast",
  "avatar_url": "https://..."
}
```

---

## Platform Connections

### Get Connected Platforms
**GET** `/users/:id/platforms`

Response:
```json
{
  "success": true,
  "platforms": [
    {
      "id": "uuid",
      "platform": "ebay",
      "account_id": "ebay_username",
      "account_email": "user@ebay.com",
      "connected_at": "2024-05-23T10:00:00Z"
    }
  ]
}
```

### Connect Platform
**POST** `/users/:id/platforms`

Request:
```json
{
  "platform": "ebay",
  "access_token": "oauth_token",
  "account_id": "ebay_username"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request parameters"
}
```

### 401 Unauthorized
```json
{
  "error": "Missing or invalid authentication token"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Status Codes

- **200** - Success
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **404** - Not Found
- **500** - Server Error

---

## Rate Limiting

Currently unlimited. Will implement in production:
- 100 requests per minute per IP
- 1000 requests per hour per user

---

## Deployment

### Local Development
```bash
npm install
npm run dev
```

### Production Deployment
```bash
npm install
npm start
```

Deploy to:
- **Heroku** (free tier available)
- **Railway** (recommended - $5/month)
- **DigitalOcean** (App Platform)
- **AWS Lambda** (serverless)
- **Your own server**

---

## Todo

- [ ] Implement order/sales endpoints
- [ ] Add payout processing
- [ ] Integrate eBay, Facebook, Shopify APIs
- [ ] Add file upload to S3
- [ ] Implement analytics events
- [ ] Add rate limiting
- [ ] Setup email notifications
- [ ] Payment processing with Stripe
