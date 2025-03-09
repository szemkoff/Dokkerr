# Authentication

This document details the authentication system implementation in the Dokkerr application.

## Authentication Architecture



## Authentication Methods

Dokkerr supports multiple authentication methods to accommodate different user preferences and security requirements:

### Email and Password

- Standard email/password authentication
- Password requirements: minimum 8 characters, mix of letters, numbers, and special characters
- Password hashing using bcrypt with 12 rounds of salt
- Rate limiting to prevent brute force attacks

### OAuth Integration

Social login options include:

- Google
- Facebook
- Apple (for iOS users)

### SMS Verification

Two-factor authentication is available via:

- SMS verification codes
- Time-based one-time passwords (TOTP)

## Token Management

Dokkerr uses JSON Web Tokens (JWT) for authentication:

| Token Type | Purpose | Expiration | Refresh Allowed |
|------------|---------|------------|-----------------|
| Access Token | API Authorization | 1 hour | No |
| Refresh Token | Getting new access tokens | 7 days | Yes |
| Password Reset | One-time password reset | 15 minutes | No |
| Email Verification | Verify user email | 24 hours | No |

## Registration Process

1. User submits registration form with email and password
2. System validates input and checks for existing accounts
3. Account is created with pending verification status
4. Verification email is sent to user
5. User verifies email by clicking link
6. Account is activated and available for use

## Login Flow



## Security Considerations

### Protection Against Common Attacks

- **CSRF Protection**: Using double-submit cookie pattern
- **XSS Protection**: Content Security Policy and context-specific output encoding
- **Brute Force Protection**: Progressive delays and account lockouts
- **Man-in-the-Middle**: HTTPS only, HTTP Strict Transport Security (HSTS)

### Session Management

- Secure, HTTP-Only, SameSite cookies for tokens
- Absolute and sliding expiration policies
- Session invalidation on password change
- Concurrent session limits (optional feature)

## Admin Authentication

Admin accounts have additional security requirements:

- Mandatory 2FA
- Stronger password requirements
- IP address restrictions (optional)
- Session timeouts after 30 minutes of inactivity

## Related Documentation

- [Security Architecture](../architecture/security.md)
- [API Authentication](../technical/api-reference.md#authentication)
- [User Management](user-management.md)