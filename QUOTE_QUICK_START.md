# 🎙️ Quote Request System - Quick Start

## What Was Built

A complete quote request system for the Helou Sound website that allows clients to:
1. Build custom audio packages with add-ons
2. Click "Request Quote" on the Bundle Builder page
3. Fill out a modal form with their production details
4. Submit the quote request
5. Receive an email confirmation with their quote

## Files Created/Modified

### New Files
- `src/components/QuoteModal.jsx` - The quote request form modal
- `server/index.js` - Express backend server
- `server/routes/requestQuote.js` - Quote submission handler
- `server/package.json` - Backend dependencies
- `server/.env` - Environment configuration
- `QUOTE_SYSTEM_SETUP.md` - Detailed setup guide

### Modified Files
- `src/pages/BundleBuilder.jsx` - Added modal state and button handler
- `package.json` - Added server script

## Quick Start (5 minutes)

### Step 1: Get Resend API Key
- Go to https://resend.com
- Sign up (free tier available)
- Copy your API key

### Step 2: Configure Environment
Edit `server/.env`:
```env
RESEND_API_KEY=your_api_key_here
QUOTE_TO_EMAIL=helousound@gmail.com
```

### Step 3: Start Both Servers

Terminal 1:
```bash
cd /workspaces/Helousound
npm run dev
```

Terminal 2:
```bash
cd /workspaces/Helousound/server
npm run dev
```

### Step 4: Test It
1. Open http://localhost:3000
2. Click on a package → "Build a Package"
3. Add some add-ons
4. Click "Request Quote"
5. Fill the form and submit
6. Check email at QUOTE_TO_EMAIL

## Feature Breakdown

### Frontend Features
✅ Modal form with validation
✅ Real-time total calculation
✅ Loading states and error handling
✅ Accessible (ESC to close, click outside)
✅ Mobile-responsive design
✅ Dark theme matching site

### Form Fields
**Required:**
- Full Name
- Email (validated format)
- Shoot Location
- Shoot Date
- Production Duration (days)

**Optional:**
- Phone
- Production Name
- Address
- Start Time
- Notes

### Backend Features
✅ Express server with CORS
✅ Request validation
✅ Email generation via Resend
✅ Error handling
✅ Production-ready structure

### Email Content
The submitted quote email includes:
- Client details (name, contact, location)
- Selected sound package & price
- All add-ons with quantities
- Labor cost breakdown
- Total per day & estimated total

## Key Technical Details

### Data Flow
```
User clicks "Request Quote"
    ↓
Modal opens with bundle data
    ↓
User fills form → Client validation
    ↓
Submit → Build JSON payload
    ↓
POST to http://localhost:5000/api/request-quote
    ↓
Backend validates payload
    ↓
Resend API sends email
    ↓
Response: success ← → error
```

### Payload Structure
```javascript
{
  selectedPackage: { name, pricePerDay, displayPrice },
  addons: [{ item, pricePerDay, quantity, lineTotalPerDay }, ...],
  totals: { totalPerDay },
  client: {
    fullName, email, phone, productionName,
    address, location, shootDate, startTime,
    productionDurationDays, notes
  }
}
```

## Customization

### Change Quote Recipient Email
Edit `server/.env`:
```env
QUOTE_TO_EMAIL=your-email@example.com
```

### Change Labor Cost
Edit `src/pages/BundleBuilder.jsx`:
```javascript
const laborCost = selectedPackage ? 800 : 0;  // Change 800 to your rate
```

### Change Email Sender Domain
Edit `server/routes/requestQuote.js`:
```javascript
from: 'quotes@helousound.com',  // Change to your domain
```

### Customize Form Fields
Edit `src/components/QuoteModal.jsx` formData state to add/remove fields, then update the payload construction in handleSubmit.

## Troubleshooting

### Backend won't start
```bash
# Check port is available
lsof -i :5000

# Reinstall dependencies
cd server && npm install
```

### API key not working
- Verify key from https://resend.com dashboard
- Check for extra spaces in `.env`
- Resend may require domain verification for custom sender

### CORS errors
- Ensure backend is running
- Check `FRONTEND_URL` in `server/.env` matches frontend URL
- Frontend: http://localhost:3000, Backend: http://localhost:5000

## Deployment Checklist

- [ ] Set `RESEND_API_KEY` in production environment
- [ ] Update `FRONTEND_URL` to production domain in backend env
- [ ] Update fetch URL in `QuoteModal.jsx` to production API endpoint
- [ ] Test form submission in production
- [ ] Set up email domain verification with Resend
- [ ] Monitor quote submissions via Resend dashboard

## Next Steps

Want to add more features?
1. **Database**: Store submissions in MongoDB/PostgreSQL
2. **PDF**: Auto-generate quote PDF
3. **Admin Panel**: Dashboard to view/manage quotes
4. **Payments**: Add Stripe integration for deposits
5. **Auto-reply**: Send confirmation email to client

## Support

For issues or questions, check:
1. `QUOTE_SYSTEM_SETUP.md` - Detailed setup guide
2. `server/routes/requestQuote.js` - API handler logic
3. `src/components/QuoteModal.jsx` - Frontend form logic
4. Browser console - Frontend errors
5. Backend terminal - Server errors
