git a# Spam Protection Setup Guide

This guide explains how to set up comprehensive spam protection for the feedback form.

## 1. Cloudflare Turnstile (Recommended)

### Setup Steps:
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Security** → **Turnstile**
3. Create a new site key
4. Choose **Invisible** or **Managed** challenge type
5. Add your domain

### Environment Variables:
Add these to your `.env.local` or `env.development` file:
```bash
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key_here
```

## 2. Server-Side Protection Features

The API now includes:

### Rate Limiting
- **3 submissions per 15 minutes** per IP address
- Automatically resets after the time window
- Uses in-memory storage (consider Redis for production)

### Validation
- Email format validation
- IC number format validation (000000-00-0000)
- Phone number format validation
- Required field validation
- Message length limits (10-2000 characters)

### Spam Detection
- Detects suspicious keywords (viagra, casino, loan, etc.)
- Blocks URLs in messages
- Detects ALL CAPS spam
- Identifies very long words

### IP Tracking
- Logs IP addresses for submissions
- Uses X-Forwarded-For header for proxy support

## 3. Production Recommendations

### For High Traffic:
1. **Use Redis** for rate limiting instead of in-memory storage
2. **Enable Cloudflare Bot Management** for additional protection
3. **Set up monitoring** for failed submissions
4. **Use a CDN** like Cloudflare for DDoS protection

### Environment Variables for Production:
```bash
# Required for Turnstile
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_production_site_key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_production_secret_key

# Optional: Redis for rate limiting
REDIS_URL=your_redis_url_here
```

## 4. Testing

### Test the Protection:
1. Try submitting multiple forms quickly (should be rate limited)
2. Submit forms with spam keywords (should be blocked)
3. Submit forms with invalid formats (should show validation errors)
4. Test without completing Turnstile (should require verification)

### Monitoring:
- Check server logs for blocked submissions
- Monitor rate limiting effectiveness
- Track Turnstile success rates

## 5. Customization

### Adjust Rate Limits:
Edit these values in `src/app/api/feedback/route.ts`:
```typescript
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // 3 submissions per window
```

### Modify Spam Patterns:
Update the `suspiciousPatterns` array in the `detectSpam` function.

### Change Validation Rules:
Modify the validation functions for email, phone, or IC number formats. 