import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const QUOTE_TO_EMAIL = process.env.QUOTE_TO_EMAIL || 'helousound@gmail.com';

export const requestQuoteHandler = async (req, res) => {
  try {
    const { selectedPackage, addons, totals, client } = req.body;

    // Validate required fields
    if (!client?.fullName || !client?.email || !client?.shootDate) {
      return res.status(400).json({
        ok: false,
        error: 'Missing required client fields: fullName, email, shootDate'
      });
    }

    if (!selectedPackage?.name) {
      return res.status(400).json({
        ok: false,
        error: 'Missing selected package'
      });
    }

    if (!client?.productionDurationDays || client.productionDurationDays < 1) {
      return res.status(400).json({
        ok: false,
        error: 'Production duration must be at least 1 day'
      });
    }

    // Build add-ons list for email
    const addonsText = addons && addons.length > 0
      ? addons.map(addon => `  • ${addon.item} × ${addon.quantity} @ $${addon.pricePerDay}/day = $${addon.lineTotalPerDay}/day`).join('\n')
      : 'None';

    // Calculate total estimate
    const estimatedTotal = totals.totalPerDay * client.productionDurationDays;

    // Build email body
    const emailBody = `
New Quote Request

CLIENT DETAILS
──────────────────────────────────────
Name:           ${client.fullName}
Email:          ${client.email}
Phone:          ${client.phone || 'Not provided'}
Production:     ${client.productionName || 'Not provided'}
Shoot Date:     ${client.shootDate}
Duration:       ${client.productionDurationDays} day(s)

QUOTE DETAILS
──────────────────────────────────────
Selected Package: ${selectedPackage.name}
Package Rate:     ${selectedPackage.displayPrice}/day

Add-ons:
${addonsText}

Labor (10-hour day): $800/day

TOTALS
──────────────────────────────────────
Total Per Day:    $${totals.totalPerDay}
Estimated Total:  $${estimatedTotal.toFixed(2)} (${client.productionDurationDays} day(s) × $${totals.totalPerDay}/day)

NOTES
──────────────────────────────────────
${client.notes || 'No additional notes provided'}

──────────────────────────────────────
Reply to: ${client.email}
`;

    // Send email via Resend
    const emailResponse = await resend.emails.send({
      from: 'quotes@helousound.com',
      to: QUOTE_TO_EMAIL,
      replyTo: client.email,
      subject: `New Quote Request – ${client.fullName} – ${client.shootDate} – ${selectedPackage.name}`,
      text: emailBody
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return res.status(500).json({
        ok: false,
        error: 'Failed to send quote request. Please try again.'
      });
    }

    res.json({
      ok: true,
      message: 'Quote request sent successfully',
      emailId: emailResponse.data?.id
    });

  } catch (error) {
    console.error('Error handling quote request:', error);
    res.status(500).json({
      ok: false,
      error: error.message || 'Internal server error'
    });
  }
};
