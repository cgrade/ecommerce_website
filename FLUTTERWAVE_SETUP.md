# Flutterwave Integration Setup

This document provides instructions for setting up Flutterwave payment processing for your ecommerce website.

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```
# Flutterwave API Keys
NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST_XXXXXXXXXXXX
FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST_XXXXXXXXXXXX
```

## Getting Your API Keys

1. Sign up for a Flutterwave account at [https://dashboard.flutterwave.com/signup](https://dashboard.flutterwave.com/signup)
2. Complete the verification process (especially important for Nigerian merchants)
3. Navigate to Settings > API in your Flutterwave dashboard
4. Copy your API keys (test keys for development, live keys for production)

## Test Mode vs. Live Mode

- **Test Mode**: Use the test keys for development and testing. These transactions won't actually charge any real cards.
- **Live Mode**: Use the live keys for production when you're ready to accept real payments.

## Test Cards for Development

You can use these test cards during development:

| Card Type | Card Number | Expiry | CVV | PIN | OTP |
|-----------|-------------|--------|-----|-----|-----|
| Mastercard | 5531 8866 5214 2950 | 09/32 | 564 | 3310 | 12345 |
| Visa | 4187 4274 1556 4246 | 09/32 | 828 | 3310 | 12345 |
| Visa (3DS) | 4242 4242 4242 4242 | Any future date | Any 3 digits | Any 4 digits | 12345 |

## Supported Payment Methods

The integration supports the following payment methods:

- Card payments
- Bank transfers
- USSD
- Mobile money (for applicable countries)

## Currency

The integration is set up to use Nigerian Naira (NGN) as the default currency.

## Webhook Setup (Optional but Recommended for Production)

For production, it's recommended to set up webhooks to receive notifications about payment events:

1. Go to Settings > Webhooks in your Flutterwave dashboard
2. Add a new webhook with your endpoint URL (e.g., `https://yourdomain.com/api/webhooks/flutterwave`)
3. Add a webhook secret to protect your endpoint

## Troubleshooting

If you encounter any issues with the integration:

1. Check that your API keys are correctly entered in the `.env.local` file
2. Ensure you're using the correct API keys for your environment (test/live)
3. Verify that your Flutterwave account is fully verified
4. Check the Flutterwave documentation at [https://developer.flutterwave.com/docs](https://developer.flutterwave.com/docs)

## Need Help?

If you need further assistance, reach out to Flutterwave support:
- Email: support@flutterwave.com
- Help Center: [https://support.flutterwave.com](https://support.flutterwave.com)
