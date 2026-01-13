
# 🎙️ Helousound - Production Sound Mixer

Professional audio services website for Richard Helou, a production sound mixer and location sound recordist.

## Quick Start

### Frontend (React/Vite)
```bash
npm install
npm run dev
```
Opens at http://localhost:3000

### Backend (Express - Required for Quote System)
```bash
cd server
npm install
npm run dev
```
Runs on http://localhost:5000

## Features

- **Hero Section** - Bold introduction with call-to-action
- **About** - Professional background and experience
- **Services** - Highlighted production sound services (Production Sound, Wireless & RF Management, Timecode & Camera Sync, Director/Client Monitoring)
- **Pricing** - Three sound packages (Interview Quick Kit, Narrative Film, Commercial/TV)
- **Bundle Builder** - Interactive package customizer with add-ons
- **Quote Request System** - Modal form to request custom quotes with email integration
- **Contact** - Email and social media links
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Modern dark interface with cyan accents

## Quote Request System

The Bundle Builder page includes a complete quote request workflow:

1. User selects a sound package
2. Adds optional equipment/services
3. Clicks "Request Quote"
4. Fills in production details (name, date, location, duration, etc.)
5. Submits → Email sent to site owner with quote details

### Setup Quote System

**Required:**
1. Get free API key from https://resend.com
2. Add to `server/.env`: `RESEND_API_KEY=your_key`
3. Run both frontend and backend servers

See `QUOTE_QUICK_START.md` for detailed instructions.

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Express.js, Resend (email)
- **Icons**: Lucide React
- **Build**: Vite
- **Styling**: Tailwind CSS with custom dark theme

## Project Structure

```
src/
├── components/
│   ├── BundleModal.jsx          - Package selection modal
│   └── QuoteModal.jsx           - Quote request form
├── pages/
│   ├── BundleBuilder.jsx        - Package builder & customizer
│   └── WhySoundMatters.jsx      - Info page
├── context/
│   └── SelectedPackageContext.jsx - Package state management
├── App.jsx                       - Main app component
├── main.jsx                      - Entry point
└── index.css                     - Global styles

server/
├── index.js                      - Express app setup
├── routes/
│   └── requestQuote.js          - Quote submission handler
├── .env                         - Configuration (not in git)
├── .env.example                 - Configuration template
└── package.json

Documentation/
├── README.md                     - This file
├── QUOTE_QUICK_START.md         - Quick setup guide
├── QUOTE_SYSTEM_SETUP.md        - Detailed setup guide
└── ISSUES_AND_IMPROVEMENTS.md   - Roadmap
```

## Pricing

**Sound Packages** (Equipment - per 10-hour day):
- Interview Quick Kit: $500/day
- Narrative Film: $750/day
- Commercial/TV: $900/day

**Labor**: $800/10-hour day (reflected in final quote)
- After 8 hours: 1.5x overtime
- After 12 hours: 2x overtime

**Add-ons**: $50-$250/day (selectable quantities)
- Wireless Lavaliers, Wireless Boom, IFB Headsets, Timecode Sync, etc.

## Development

### Environment Variables

**Frontend** (.env not needed for frontend)

**Backend** (server/.env):
```env
PORT=5000
RESEND_API_KEY=your_resend_api_key
QUOTE_TO_EMAIL=helousound@gmail.com
FRONTEND_URL=http://localhost:3000
```

### Available Scripts

**Root Directory:**
```bash
npm run dev          # Start frontend dev server
npm run server       # Start backend server (watch mode)
npm run build        # Build frontend for production
npm run lint         # Run ESLint
```

**Server Directory:**
```bash
npm run dev          # Start backend with watch mode
npm start            # Start backend (production)
```

## Customization

### Change Email Recipient
Edit `server/.env`:
```env
QUOTE_TO_EMAIL=your-email@example.com
```

### Update Pricing
Edit `src/pages/BundleBuilder.jsx`:
- `packages` array - Base package prices
- `addons` array - Add-on prices
- `laborCost` calculation - Labor rate

### Modify Services Section
Edit `src/App.jsx`:
- `services` array - Change service titles, descriptions, icons
- `highlighted` property - Which service gets featured

### Update Contact Information
Edit `src/App.jsx`:
- Email address (mailto link)
- Social media URLs (Instagram, Twitter/X, LinkedIn)
- Professional title/bio

## Deployment

### Frontend (Vite)
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or static hosting
```

### Backend (Express)
1. Deploy to Heroku, Railway, Render, or own server
2. Set environment variables in production
3. Update `FRONTEND_URL` for CORS
4. Update fetch URL in `QuoteModal.jsx` to production API

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Optimized with Vite for fast builds
- Tailwind CSS for minimal CSS
- IntersectionObserver for viewport animations
- No unnecessary dependencies

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliant
- Form validation and error messages
- Mobile-responsive design

## License

© 2024 Richard Helou - All rights reserved

## Contact

Email: helousound@gmail.com
Instagram: @helousound
Twitter/X: @helousound
