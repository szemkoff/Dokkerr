# API Overview

Dokkerr provides a RESTful API that enables you to integrate our platform into your applications.

## Authentication

All API requests require authentication using API keys. You can generate API keys in your dashboard.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.dockrent.com/v1/slips
```

## Rate Limiting

- Free tier: 1000 requests/hour
- Pro tier: 10000 requests/hour
- Enterprise: Custom limits

## Endpoints

- `/v1/slips` - Manage slip inventory
- `/v1/bookings` - Handle reservations
- `/v1/payments` - Process payments
- `/v1/users` - User management

See [Endpoints](endpoints.md) for detailed documentation.
