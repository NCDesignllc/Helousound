# Netlify Forms Integration Guide

This document describes the Netlify Forms integration for Helou Sound, which replaces the previous Express backend for form submissions.

## Overview

The website uses Netlify Forms to handle form submissions, eliminating the need for a separate backend server. This provides:

- **Zero backend hosting costs** - No server to maintain
- **Built-in spam protection** - Honeypot and reCAPTCHA options
- **Easy integrations** - Connect to CRM, email, SMS services via Netlify UI
- **Automatic email notifications** - Configure in Netlify dashboard
- **Form submission history** - View all submissions in Netlify dashboard

## Forms Implemented

### 1. Quote Request Form (`quote-request`)

**Location:** `src/components/QuoteModal.jsx` (Bundle Builder page)

**Fields (14 total):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| fullName | text | ✓ | Client's full name |
| email | email | ✓ | Client's email address |
| phone | tel | | Phone number |
| productionName | text | | Name of the production |
| address | text | | Mailing address |
| shootDate | date | ✓ | Projected start date |
| productionDurationDays | number | ✓ | Number of shoot days |
| notes | textarea | | Additional notes/requirements |
| packageName | text | | Selected package name |
| packagePrice | text | | Package price per day |
| addons | text | | Selected add-ons summary |
| totalPerDay | text | | Total daily rate |
| estimatedTotal | text | | Estimated total cost |

### 2. Contact Form (`contact-form`)

**Location:** `src/App.jsx` (Homepage)

**Fields (13 total):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | text | ✓ | Client's name |
| email | email | ✓ | Client's email address |
| phone | tel | ✓ | Phone number |
| shootDate | date | ✓ | Shoot date(s) |
| location | text | ✓ | Location/Studio |
| productionType | select | ✓ | Type of production |
| packageSelection | select | | Selected package |
| estimatedHours | number | | Estimated shoot hours |
| additionalNotes | textarea | | Additional notes |
| addOns | text | | Selected add-on gear |
| estimatedCost | text | | Estimated total cost |
| numberOfDays | text | | Number of days |

## Implementation Details

### Static HTML Forms (SPA Detection)

For Netlify to detect forms in a Single Page Application (SPA), static HTML forms are added to `index.html`. These hidden forms allow Netlify to parse form fields at build time:

```html
<form name="quote-request" netlify netlify-honeypot="bot-field" hidden>
  <!-- All form fields listed here -->
</form>
```

### Form Submission Handler

Forms use a shared `encodeFormData()` utility function to format data for Netlify:

```javascript
const encodeFormData = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};
```

Submissions are sent via POST to the current page:

```javascript
const response = await fetch('/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: encodeFormData(formData)
});
```

### Spam Protection

Both forms use honeypot spam protection:

```html
<input type="hidden" name="form-name" value="form-name" />
<p className="hidden">
  <label>
    Don't fill this out: <input name="bot-field" />
  </label>
</p>
```

## Netlify Dashboard Setup

### Viewing Submissions

1. Log in to [Netlify](https://app.netlify.com)
2. Select your site
3. Go to **Forms** tab
4. View submissions for `quote-request` or `contact-form`

### Email Notifications

1. Go to **Site settings** > **Forms** > **Form notifications**
2. Click **Add notification** > **Email notification**
3. Configure:
   - **Form name:** `quote-request` or `contact-form`
   - **Email to notify:** your email address
   - **Subject line:** Custom subject (e.g., "New Quote Request from {{fullName}}")

### Integrations

Netlify Forms supports various integrations:

#### Zapier Integration
1. Go to **Site settings** > **Forms** > **Form notifications**
2. Click **Add notification** > **Outgoing webhook**
3. Use Zapier's webhook URL to connect to:
   - CRM systems (HubSpot, Salesforce, etc.)
   - Email marketing (Mailchimp, ConvertKit, etc.)
   - SMS notifications (Twilio, SMS services)
   - Slack notifications
   - Google Sheets

#### Slack Notifications
1. Go to **Site settings** > **Forms** > **Form notifications**
2. Click **Add notification** > **Slack notification**
3. Configure your Slack webhook

## Troubleshooting

### Forms Not Appearing in Dashboard

**Cause:** Forms not detected at build time.

**Solution:**
1. Ensure static forms exist in `index.html`
2. Verify `netlify` attribute is present
3. Trigger a new deploy

### 404 Error on Submission

**Cause:** Form name mismatch.

**Solution:**
1. Verify `form-name` hidden input matches the form name
2. Check static form in `index.html` has matching name

### Submissions Not Received

**Cause:** Honeypot triggered or network error.

**Solution:**
1. Check browser console for errors
2. Verify `bot-field` input is hidden
3. Test in incognito mode

### CORS Errors

**Cause:** Submitting to wrong URL.

**Solution:**
- Submit to `'/'` not an external URL
- Ensure you're testing on Netlify (not localhost)

## Local Development

**Note:** Netlify Forms only work in production on Netlify. For local development:

1. Forms will fail silently or show network errors
2. Use Netlify CLI for local testing: `netlify dev`
3. Or mock the submission in development mode

## Migration Notes

### Previous Backend (Express)

The previous implementation used an Express server at `http://localhost:5000/api/request-quote`. This has been replaced with Netlify Forms.

### Files Changed

- `src/components/QuoteModal.jsx` - Updated form submission
- `src/App.jsx` - Updated contact form submission
- `index.html` - Added static forms for SPA detection
- `netlify.toml` - Netlify configuration
- `NETLIFY_FORMS_INTEGRATION.md` - This documentation

### Backend Cleanup (Optional)

The `/server` directory can be removed if no longer needed, as form handling is now done by Netlify.

## Resources

- [Netlify Forms Documentation](https://docs.netlify.com/forms/setup/)
- [Forms in SPA](https://docs.netlify.com/forms/setup/#javascript-forms)
- [Form Notifications](https://docs.netlify.com/forms/notifications/)
- [Spam Prevention](https://docs.netlify.com/forms/spam-filters/)
