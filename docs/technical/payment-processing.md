
# Payment Processing

## Overview

Dokkerr uses Stripe for secure payment processing, supporting both one-time payments for bookings and recurring payments for subscription features. The system is designed to handle multiple currencies and payment methods while ensuring PCI compliance.

## Stripe Integration

### Setup

The payment service is initialized in `src/services/payment.ts`:

```typescript
import Stripe from 'stripe';

export class PaymentService {
  private static stripe: Stripe;

  static initialize() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true
    });
  }
}
```

### Configuration

Required environment variables:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## Payment Flow

### 1. Payment Intent Creation

When a user initiates a booking:

```typescript
async function createPaymentIntent(booking) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateAmount(booking),
    currency: 'usd',
    metadata: {
      bookingId: booking.id,
      listingId: booking.listingId
    }
  });

  return paymentIntent.client_secret;
}
```

### 2. Client-Side Integration

```javascript
const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
const elements = stripe.elements();

// Create payment element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

// Handle payment submission
const result = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: `${window.location.origin}/booking/confirm`
  }
});
```

### 3. Payment Confirmation

```typescript
async function confirmPayment(paymentIntentId) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  
  if (paymentIntent.status === 'succeeded') {
    await updateBookingStatus(paymentIntent.metadata.bookingId, 'confirmed');
    await notifyUsers(paymentIntent.metadata.bookingId);
  }
}
```

## Security Measures

### 1. PCI Compliance

- Stripe Elements for secure card collection
- No card data touches our servers
- Regular security audits

### 2. Fraud Prevention

```typescript
const fraudPreventionRules = {
  maxAmountPerDay: 10000,
  maxTransactionsPerHour: 5,
  requiredVerification: ['email', 'phone']
};

async function validateTransaction(userId, amount) {
  const dailyTotal = await getDailyTransactionTotal(userId);
  const hourlyCount = await getHourlyTransactionCount(userId);
  
  if (dailyTotal + amount > fraudPreventionRules.maxAmountPerDay) {
    throw new Error('Daily transaction limit exceeded');
  }
  
  if (hourlyCount >= fraudPreventionRules.maxTransactionsPerHour) {
    throw new Error('Hourly transaction limit exceeded');
  }
}
```

### 3. Webhook Security

```typescript
app.post('/stripe/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    
    handleStripeEvent(event);
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

## Payment Methods

### Supported Payment Methods

1. Credit/Debit Cards
   - Visa
   - Mastercard
   - American Express
   - Discover

2. Digital Wallets
   - Apple Pay
   - Google Pay
   - PayPal

### Configuration

```typescript
const paymentMethodConfig = {
  card: {
    enabled: true,
    requiresCVC: true,
    requires3DS: true
  },
  applepay: {
    enabled: true,
    merchantId: process.env.APPLE_MERCHANT_ID
  },
  googlepay: {
    enabled: true,
    merchantId: process.env.GOOGLE_MERCHANT_ID
  }
};
```

## Error Handling

### Common Error Scenarios

```typescript
class PaymentError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

async function handlePaymentError(error) {
  switch (error.type) {
    case 'card_error':
      // Handle card-specific errors
      await notifyUser(error.message);
      break;
    case 'validation_error':
      // Handle validation errors
      await logValidationError(error);
      break;
    case 'api_error':
      // Handle Stripe API errors
      await notifyAdmin(error);
      break;
  }
}
```

## Refund Processing

### Refund Flow

```typescript
async function processRefund(bookingId) {
  const booking = await getBooking(bookingId);
  const paymentIntent = await stripe.paymentIntents.retrieve(booking.paymentIntentId);
  
  const refund = await stripe.refunds.create({
    payment_intent: paymentIntent.id,
    reason: 'requested_by_customer'
  });
  
  await updateBookingStatus(bookingId, 'refunded');
  await notifyUsers(bookingId, 'refund_processed');
  
  return refund;
}
```

## Monitoring and Reporting

### Transaction Monitoring

```typescript
class PaymentMonitor {
  static async getMetrics() {
    return {
      dailyVolume: await calculateDailyVolume(),
      successRate: await calculateSuccessRate(),
      averageTransactionValue: await calculateAverageValue(),
      failureReasons: await getFailureReasons()
    };
  }
}
```

### Financial Reports

```typescript
async function generateFinancialReport(startDate, endDate) {
  const report = await stripe.reporting.reportRuns.create({
    report_type: 'balance_change_from_activity.itemized.1',
    parameters: {
      interval_start: startDate,
      interval_end: endDate
    }
  });
  
  return report;
}
```

## Testing

### Test Cards

| Card Number | Description |
|-------------|-------------|
| 4242424242424242 | Successful payment |
| 4000000000009995 | Declined payment |
| 4000002500003155 | Requires authentication |

### Test Mode

```typescript
const isTestMode = process.env.NODE_ENV !== 'production';

if (isTestMode) {
  console.log('Payment system running in test mode');
  // Use test API keys and webhooks
}
```

## Troubleshooting

Common issues and solutions:

1. **Payment Declined**
   - Check card details
   - Verify sufficient funds
   - Check 3DS requirements

2. **Webhook Failures**
   - Verify webhook signature
   - Check endpoint availability
   - Monitor webhook logs

3. **Refund Issues**
   - Verify payment status
   - Check refund eligibility
   - Monitor refund timeline 