# 🚀 Quick Launch Guide

## One-Time Setup (First Time Only)

```bash
# 1. Get API Key
#    Visit https://resend.com → Sign up → Copy API key

# 2. Configure Backend
#    Edit server/.env and add your API key:
#    RESEND_API_KEY=your_api_key_here

# 3. Install Dependencies
cd /workspaces/Helousound
npm install           # Frontend deps
cd server
npm install          # Backend deps
cd ..
```

## Running the Application

### Option 1: Two Terminal Tabs (Recommended)

**Terminal 1 - Frontend:**
```bash
cd /workspaces/Helousound
npm run dev
# Opens http://localhost:3000
```

**Terminal 2 - Backend:**
```bash
cd /workspaces/Helousound/server
npm run dev
# Runs on http://localhost:5000
```

### Option 2: Single Terminal (With Concurrently)

First install concurrently:
```bash
npm install --save-dev concurrently
```

Update root package.json:
```json
"dev:all": "concurrently \"npm run dev\" \"npm run server\""
```

Then run:
```bash
npm run dev:all
```

---

## Testing the Quote Request System

1. **Open Application**
   - Browser: http://localhost:3000
   - Verify both servers running

2. **Navigate to Bundle Builder**
   - Click on any sound package
   - Click "Build a Package" button

3. **Build Your Bundle**
   - Select your desired package
   - Add 1-2 add-ons (optional)
   - Notice "Request Quote" button

4. **Open Quote Modal**
   - Click "Request Quote" button
   - Modal should appear with bundle summary

5. **Fill the Form**
   - Full Name: "John Smith"
   - Email: "john@example.com"
   - Location: "New York, NY"
   - Shoot Date: (pick future date)
   - Duration: 3 days
   - (Optional fields: phone, production name, etc.)

6. **Submit**
   - Click "Request Quote" button in modal
   - Loading spinner appears
   - Success message shows (or error if any)

7. **Check Email**
   - Email sent to: helousound@gmail.com
   - (From your test setup)
   - Contains full quote details

---

## Server Status

### Frontend (Vite Dev Server)
```
Port: 3000
Status: http://localhost:3000
Refresh: Auto-reload on code changes
```

### Backend (Express Server)
```
Port: 5000
Status: http://localhost:5000/health
Returns: {"ok": true, "message": "Server is running"}
```

---

## Troubleshooting Quick Fixes

### "Cannot find module" Error
```bash
cd /workspaces/Helousound
npm install
cd server
npm install
```

### Port Already in Use
```bash
# Find what's using the port
lsof -i :3000        # Frontend
lsof -i :5000        # Backend

# Kill process (if needed)
kill -9 <PID>
```

### API Key Not Working
- Verify no extra spaces in `.env`
- Double-check from Resend dashboard
- Restart backend server after updating `.env`

### Email Not Sending
- Ensure backend is running
- Check server terminal for errors
- Verify Resend API key is valid
- Check form validation passes

### Modal Won't Open
- Open browser console (F12)
- Check for JavaScript errors
- Verify QuoteModal.jsx is imported
- Ensure button has correct onClick handler

---

## File Locations for Quick Reference

```
/workspaces/Helousound/
├── src/pages/BundleBuilder.jsx          ← Click "Request Quote"
├── src/components/QuoteModal.jsx        ← Modal form
├── server/index.js                       ← Backend server
├── server/routes/requestQuote.js        ← Email handler
├── server/.env                           ← YOUR API KEY HERE
├── QUOTE_QUICK_START.md                 ← Detailed guide
└── README.md                             ← Project info
```

---

## Environment Variables Checklist

**server/.env** - Must have:
```
✅ RESEND_API_KEY=xxxx...
✅ QUOTE_TO_EMAIL=helousound@gmail.com
✅ FRONTEND_URL=http://localhost:3000
✅ PORT=5000
```

---

## Code Changes Summary

### What Was Added:
1. **QuoteModal.jsx** - Form component (413 lines)
2. **Express Backend** - Quote handler + server
3. **Resend Integration** - Email sending
4. **Validation** - Client-side + server-side
5. **Documentation** - Complete guides

### What Was Updated:
1. **BundleBuilder.jsx** - Added modal integration
2. **package.json** - Added server script
3. **README.md** - Project overview

---

## Production Deployment

When ready to deploy:

1. **Backend Hosting** (Heroku/Railway/Render)
   - Set environment variables
   - Point to production domain
   - Enable Resend domain verification

2. **Frontend Hosting** (Vercel/Netlify)
   - Update fetch URL to production API
   - Build: `npm run build`
   - Deploy `dist/` folder

3. **Email Verification**
   - Verify domain with Resend
   - Set SPF/DKIM records
   - Test email delivery

---

## Success Indicators

✅ **Frontend Works When:**
- No console errors (F12)
- Pages load quickly
- Modal opens/closes smoothly
- Form validates in real-time

✅ **Backend Works When:**
- `http://localhost:5000/health` returns `{"ok": true}`
- Quote form submits without errors
- Email appears in inbox within seconds
- Server logs show no errors

✅ **Email Works When:**
- Email arrives at configured address
- Contains all bundle details
- Includes client information
- Reply-To set correctly

---

## Common Questions

**Q: Do I need a database?**
A: Not for basic functionality. Emails go to your inbox. Add database later for admin dashboard.

**Q: What's the cost?**
A: Resend free tier is perfect for development. Check their pricing for production.

**Q: Can I change the email recipient?**
A: Yes! Edit `server/.env` → `QUOTE_TO_EMAIL=your@email.com`

**Q: How do I add more form fields?**
A: Edit QuoteModal.jsx formData state + BundleBuilder.jsx payload construction.

**Q: Is it secure?**
A: Yes. API keys in .env (not committed), server-side validation, CORS configured.

---

## Getting Help

1. **Check Logs**
   - Browser console: F12 → Console tab
   - Backend terminal: Error messages with full stack

2. **Check Documentation**
   - `QUOTE_QUICK_START.md` - Common issues
   - `QUOTE_SYSTEM_SETUP.md` - Detailed guide
   - `IMPLEMENTATION_SUMMARY.md` - Technical spec

3. **Manual Testing**
   - Try simplest form first (just required fields)
   - Disable ad blockers (can interfere with requests)
   - Try private/incognito window

4. **Resend Dashboard**
   - Check email logs
   - Verify API key active
   - Check rate limits

---

**Ready to go! Start the servers and test your first quote request.** 🎙️
