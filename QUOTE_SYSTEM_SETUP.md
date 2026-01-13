# Helou Sound - Quote Request System

## Overview

The quote request system allows clients to submit quote requests through the Bundle Builder page. The form collects client details, selected packages, and add-ons, then sends an email with the complete quote information to the site owner.

## Architecture

### Frontend (React/Vite)
- **QuoteModal.jsx**: Modal form component with client details input
- **BundleBuilder.jsx**: Integrated with modal to open form when "Request Quote" is clicked
- **Features**:
  - Form validation for required fields
  - Real-time total calculation
  - Loading states during submission
  - Success/error messaging
  - Accessible (ESC to close, click outside to close)

### Backend (Express.js)
- **Server**: `server/index.js` - Express app with CORS and JSON middleware
- **Route Handler**: `server/routes/requestQuote.js` - POST `/api/request-quote`
- **Email Provider**: Resend (free-tier available)
- **Features**:
  - Validates payload structure
  - Validates required fields
  - Formats professional email
  - Returns JSON response

## Setup Instructions

### 1. Get Resend API Key

1. Visit https://resend.com
2. Sign up for free (includes free tier for development)
3. Get your API key from the dashboard
4. Copy the key to `server/.env`

### 2. Configure Environment Variables

Edit `/workspaces/Helousound/server/.env`:

```env
PORT=5000
RESEND_API_KEY=your_key_here
QUOTE_TO_EMAIL=helousound@gmail.com
FRONTEND_URL=http://localhost:3000
```

### 3. Running Both Frontend and Backend

**Option A: Two Terminal Tabs (Recommended for Development)**

Terminal 1 - Frontend:
```bash
cd /workspaces/Helousound
npm run dev
```

Terminal 2 - Backend:
```bash
cd /workspaces/Helousound/server
npm run dev
```

**Option B: From Root Directory**

```bash
cd /workspaces/Helousound
npm run server  # Run backend in watch mode
```

Then in another terminal:
```bash
npm run dev  # Run frontend
```

## Testing the Flow

1. Start both dev servers (frontend on http://localhost:3000, backend on http://localhost:5000)
2. Navigate to a package and click "Build a Package"
3. Add some add-ons (optional)
4. Click "Request Quote" button
5. Fill in the form (marked fields are required)
6. Submit
7. Email should arrive at the configured `QUOTE_TO_EMAIL`

## Form Fields

### Required
- **Full Name**: Client's name
- **Email**: Client's contact email (validated)
- **Location**: Shoot location or venue
- **Shoot Date**: Date in YYYY-MM-DD format
- **Production Duration (Days)**: Minimum 1 day

### Optional
- **Phone**: Client's phone number
- **Production Name**: Name of the production/project
- **Address**: Mailing address
- **Start Time**: Production start time (HH:MM format)
- **Additional Notes**: Any special requirements or questions

## Email Content

The email includes:

1. **Client Details**
   - Name, email, phone
   - Production name and location
   - Shoot date and duration
   - Additional notes

2. **Quote Details**
   - Selected sound package (with price/day)
   - All add-ons (with quantities and daily rate)
   - Labor cost ($800/10-hour day)

3. **Totals**
   - Cost per day
   - Estimated total (cost/day × duration)

4. **Reply-To**
   - Set to client's email for easy responses

## File Structure

```
/workspaces/Helousound/
├── src/
│   ├── components/
│   │   ├── BundleModal.jsx
│   │   └── QuoteModal.jsx              ← NEW
│   ├── pages/
│   │   └── BundleBuilder.jsx           ← UPDATED
│   └── ...
├── server/                              ← NEW
│   ├── package.json
│   ├── index.js                         ← Express app
│   ├── routes/
│   │   └── requestQuote.js              ← Quote handler
│   ├── .env                             ← Configuration (not in git)
│   └── .env.example                     ← Template
├── package.json                         ← UPDATED (added 'server' script)
└── ...
```

## Troubleshooting

### "Connection refused" or 500 error
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in `.env` matches where frontend is running
- Verify `RESEND_API_KEY` is set correctly

### Email not sending
- Verify Resend API key is valid and has no spaces
- Check `QUOTE_TO_EMAIL` is a valid email address
- Ensure all required form fields are filled
- Check backend logs for error messages

### CORS errors
- Confirm backend is running
- Verify `FRONTEND_URL` in `server/.env` matches frontend address
- Frontend on http://localhost:3000 requires `FRONTEND_URL=http://localhost:3000` in `.env`

### Modal won't open or form issues
- Check browser console for JavaScript errors
- Verify all form inputs have proper `name` attributes
- Ensure QuoteModal.jsx is properly imported in BundleBuilder.jsx

## Deployment Notes

When deploying to production:

1. **Environment Variables**
   - Set `RESEND_API_KEY` in production secrets/environment
   - Update `FRONTEND_URL` to production domain
   - Update `QUOTE_TO_EMAIL` if needed

2. **API Endpoint**
   - Change QuoteModal.jsx fetch URL from `http://localhost:5000` to production API URL
   - Example: `https://api.helousound.com/api/request-quote`

3. **Email Sender**
   - Resend requires domain verification for custom sender emails
   - Currently uses `quotes@helousound.com`
   - Set up SPF/DKIM records on your domain

4. **CORS Configuration**
   - Update `FRONTEND_URL` in backend environment variables
   - Add any additional allowed origins if needed

## Future Enhancements

Potential improvements:
- Database storage of quote requests for admin dashboard
- Automated quote PDF generation
- Email confirmation to client
- Admin approval workflow before sending quotes
- Stripe integration for online payments
- Quote expiration/validity dates
