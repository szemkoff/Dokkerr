# API Endpoints

This document details the REST API endpoints and WebSocket events in the Dokkerr application.

## API Architecture

```mermaid
graph TB
    subgraph Client Layer
        A[Mobile App]
        B[Web App]
        C[Admin Dashboard]
    end
    
    subgraph API Gateway
        D[Load Balancer]
        E[Rate Limiter]
        F[Request Router]
    end
    
    subgraph API Services
        G[Auth Service]
        H[Booking Service]
        I[Payment Service]
        J[Dock Service]
        K[User Service]
        L[Messages Service]
        M[Reviews Service]
    end
    
    subgraph Data Layer
        N[(PostgreSQL)]
        O[(Redis)]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    E --> F
    
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
    F --> L
    F --> M
    
    G --> N
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    
    G --> O
    H --> O
    I --> O
    J --> O
```

## Authentication Endpoints

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB
    
    Client->>API: POST /auth/register
    API->>Auth: Validate Input
    Auth->>DB: Create User
    DB-->>Auth: User Created
    Auth-->>API: Registration Success
    API-->>Client: User Created
    
    Client->>API: POST /auth/login
    API->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: Valid User
    Auth->>Auth: Generate Token
    Auth-->>API: Login Success
    API-->>Client: JWT Token
```

## REST API Endpoints

### 1. Authentication
- **User Registration**
  ```
  POST /api/v1/auth/register
  Content-Type: application/json
  
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "phone": "string"
  }
  ```

- **User Login**
  ```
  POST /api/v1/auth/login
  Content-Type: application/json
  
  {
    "email": "string",
    "password": "string"
  }
  ```

- **Token Refresh**
  ```
  POST /api/v1/auth/refresh
  Authorization: Bearer {token}
  ```

### 2. Dock Management
- **List Docks**
  ```
  GET /api/v1/docks
  Query Parameters:
    - location: string
    - startDate: date
    - endDate: date
    - amenities: string[]
    - priceRange: number[]
  ```

- **Get Dock Details**
  ```
  GET /api/v1/docks/{dockId}
  ```

- **Create Dock**
  ```
  POST /api/v1/docks
  Authorization: Bearer {token}
  Content-Type: application/json
  
  {
    "name": "string",
    "location": "string",
    "description": "string",
    "amenities": "string[]",
    "pricing": "object"
  }
  ```

### 3. Booking Management
- **Create Booking**
  ```
  POST /api/v1/bookings
  Authorization: Bearer {token}
  Content-Type: application/json
  
  {
    "dockId": "string",
    "startDate": "date",
    "endDate": "date",
    "guests": "number"
  }
  ```

- **Get Booking Details**
  ```
  GET /api/v1/bookings/{bookingId}
  Authorization: Bearer {token}
  ```

- **Cancel Booking**
  ```
  POST /api/v1/bookings/{bookingId}/cancel
  Authorization: Bearer {token}
  ```

### 4. Payment Processing
- **Initiate Payment**
  ```
  POST /api/v1/payments
  Authorization: Bearer {token}
  Content-Type: application/json
  
  {
    "bookingId": "string",
    "amount": "number",
    "currency": "string"
  }
  ```

- **Confirm Payment**
  ```
  POST /api/v1/payments/{paymentId}/confirm
  Authorization: Bearer {token}
  ```

- **Process Refund**
  ```
  POST /api/v1/payments/{paymentId}/refund
  Authorization: Bearer {token}
  Content-Type: application/json
  
  {
    "amount": "number",
    "reason": "string"
  }
  ```

## WebSocket Events

### 1. Real-time Updates
- **Booking Events**
  ```javascript
  // Subscribe to booking updates
  socket.on('booking:update', (data) => {
    // Handle booking update
  });
  
  // Subscribe to booking status changes
  socket.on('booking:status', (data) => {
    // Handle status change
  });
  ```

- **Payment Events**
  ```javascript
  // Subscribe to payment updates
  socket.on('payment:update', (data) => {
    // Handle payment update
  });
  
  // Subscribe to payment status changes
  socket.on('payment:status', (data) => {
    // Handle status change
  });
  ```

### 2. Chat System
- **Message Events**
  ```javascript
  // Send message
  socket.emit('chat:message', {
    roomId: 'string',
    message: 'string',
    timestamp: 'date'
  });
  
  // Receive message
  socket.on('chat:message', (data) => {
    // Handle incoming message
  });
  ```

## API Security

### 1. Authentication
- **JWT Implementation**
  - Token-based authentication
  - Refresh token mechanism
  - Token revocation
  - Token rotation

- **Rate Limiting**
  - Request limits
  - IP-based limiting
  - User-based limiting
  - Endpoint-specific limits

### 2. Authorization
- **Role-Based Access**
  - User roles
  - Resource permissions
  - API access control
  - Method restrictions

- **Resource Protection**
  - Data isolation
  - Access control lists
  - Resource ownership
  - Permission inheritance

## API Documentation

### 1. OpenAPI Specification
- **API Versioning**
  - Version headers
  - URL versioning
  - Deprecation notices
  - Migration guides

- **Schema Definitions**
  - Request schemas
  - Response schemas
  - Error schemas
  - Validation rules

### 2. Developer Resources
- **API Reference**
  - Endpoint documentation
  - Authentication guide
  - Rate limiting info
  - Error handling

- **Integration Guide**
  - Getting started
  - Best practices
  - Code examples
  - SDK documentation

## Monitoring and Analytics

### 1. API Metrics
- **Performance Metrics**
  - Response times
  - Error rates
  - Throughput
  - Cache hit rates

- **Usage Analytics**
  - Endpoint usage
  - User patterns
  - Geographic distribution
  - Peak times

### 2. Health Monitoring
- **System Health**
  - Service status
  - Resource usage
  - Error tracking
  - Performance alerts

- **Security Monitoring**
  - Authentication attempts
  - Authorization failures
  - Rate limit breaches
  - Security incidents 

# API Documentation

This document provides detailed information about the REST API endpoints available in the Dokkerr application.

## API Architecture

```mermaid
graph TB
    subgraph Client Layer
        A[Mobile App]
        B[Web App]
        C[Admin Dashboard]
    end
    
    subgraph API Gateway
        D[Load Balancer]
        E[Rate Limiter]
        F[Request Router]
    end
    
    subgraph API Services
        G[Auth Service]
        H[Booking Service]
        I[Payment Service]
        J[Dock Service]
        K[User Service]
        L[Messages Service]
        M[Reviews Service]
    end
    
    subgraph Data Layer
        N[(PostgreSQL)]
        O[(Redis)]
    end
    
    A --> D
    B --> D
    C --> D
    
    D --> E
    E --> F
    
    F --> G
    F --> H
    F --> I
    F --> J
    F --> K
    F --> L
    F --> M
    
    G --> N
    H --> N
    I --> N
    J --> N
    K --> N
    L --> N
    M --> N
    
    G --> O
    H --> O
    I --> O
    J --> O
```

## Authentication Flow

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth
    participant DB
    
    Client->>API: POST /api/auth/register
    API->>Auth: Validate Input
    Auth->>DB: Create User
    DB-->>Auth: User Created
    Auth-->>API: Registration Success
    API-->>Client: User Created & JWT Token
    
    Client->>API: POST /api/auth/login
    API->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: Valid User
    Auth->>Auth: Generate Token
    Auth-->>API: Login Success
    API-->>Client: JWT Token
```

## REST API Endpoints

### Authentication

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/auth/register</code>
<p>Register a new user.</p>

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "userType": "boater" or "dock_owner",
  "phoneNumber": "+1234567890" (optional)
}
```

**Response**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "userType": "boater",
    "phoneNumber": "+1234567890"
  }
}
```
</div>

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/auth/login</code>
<p>Login a user.</p>

**Request Body**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "userType": "boater",
    "phoneNumber": "+1234567890"
  }
}
```
</div>

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/auth/forgot-password</code>
<p>Send a password reset email.</p>

**Request Body**
```json
{
  "email": "user@example.com"
}
```

**Response**
```json
{
  "message": "Password reset email sent"
}
```
</div>

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/auth/reset-password</code>
<p>Reset password using token from email.</p>

**Request Body**
```json
{
  "token": "reset_token",
  "password": "new_password"
}
```

**Response**
```json
{
  "message": "Password reset successful"
}
```
</div>

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/auth/me</code>
<p>Get current user profile.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Response**
```json
{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "userType": "boater",
  "phoneNumber": "+1234567890",
  "role": "user"
}
```
</div>

### Listings

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/listings</code>
<p>Get all listings with optional filtering.</p>

**Query Parameters**
| Parameter | Type | Description |
|-----------|------|-------------|
| latitude | number | Latitude for location-based search |
| longitude | number | Longitude for location-based search |
| radius | number | Search radius in kilometers |
| startDate | date | Start date for availability |
| endDate | date | End date for availability |
| maxLength | number | Maximum boat length |
| maxBeam | number | Maximum boat beam |
| maxDraft | number | Maximum boat draft |
| minPrice | number | Minimum price |
| maxPrice | number | Maximum price |
| amenities | array | Array of amenities to filter by |
| limit | number | Maximum number of results to return (1-100) |
| offset | number | Number of results to skip |

**Response**
```json
[
  {
    "id": "listing_id",
    "title": "Luxury Dock Slip",
    "description": "Beautiful dock with views",
    "location": {
      "latitude": 25.7617,
      "longitude": -80.1918,
      "address": "123 Marina Way"
    },
    "pricing": {
      "basePrice": 100,
      "currency": "USD",
      "unit": "day"
    },
    "amenities": ["power", "water", "wifi"],
    "images": ["image1.jpg", "image2.jpg"],
    "availability": {
      "start": "2023-07-01T00:00:00.000Z",
      "end": "2023-08-31T00:00:00.000Z"
    },
    "specifications": {
      "maxLength": 50,
      "maxBeam": 15,
      "maxDraft": 6,
      "power": true,
      "water": true,
      "fuel": false
    },
    "owner": {
      "id": "owner_id",
      "name": "Marina Owner",
      "rating": 4.5
    }
  }
]
```
</div>

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/listings/:id</code>
<p>Get a specific listing by ID.</p>

**Response**
```json
{
  "id": "listing_id",
  "title": "Luxury Dock Slip",
  "description": "Beautiful dock with views",
  "location": {
    "latitude": 25.7617,
    "longitude": -80.1918,
    "address": "123 Marina Way"
  },
  "pricing": {
    "basePrice": 100,
    "currency": "USD",
    "unit": "day"
  },
  "amenities": ["power", "water", "wifi"],
  "images": ["image1.jpg", "image2.jpg"],
  "availability": {
    "start": "2023-07-01T00:00:00.000Z",
    "end": "2023-08-31T00:00:00.000Z"
  },
  "specifications": {
    "maxLength": 50,
    "maxBeam": 15,
    "maxDraft": 6,
    "power": true,
    "water": true,
    "fuel": false
  },
  "owner": {
    "id": "owner_id",
    "name": "Marina Owner",
    "rating": 4.5
  },
  "reviews": [
    {
      "id": "review_id",
      "rating": 5,
      "comment": "Great place to dock!",
      "reviewer": {
        "id": "reviewer_id",
        "name": "John"
      },
      "createdAt": "2023-06-15T12:00:00.000Z"
    }
  ]
}
```
</div>

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/listings</code>
<p>Create a new listing (dock owner only).</p>

**Headers**
```
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "title": "Luxury Dock Slip",
  "description": "Beautiful dock with views",
  "address": "123 Marina Way",
  "latitude": 25.7617, 
  "longitude": -80.1918,
  "basePrice": 100,
  "currency": "USD",
  "pricingUnit": "day",
  "amenities": ["power", "water", "wifi"],
  "maxLength": 50,
  "maxBeam": 15,
  "maxDraft": 6,
  "hasPower": true,
  "hasWater": true,
  "hasFuel": false,
  "availableFrom": "2023-07-01T00:00:00.000Z",
  "availableTo": "2023-08-31T00:00:00.000Z"
}
```

**Response**
```json
{
  "id": "new_listing_id",
  "title": "Luxury Dock Slip",
  "description": "Beautiful dock with views",
  "location": {
    "latitude": 25.7617,
    "longitude": -80.1918,
    "address": "123 Marina Way"
  },
  "pricing": {
    "basePrice": 100,
    "currency": "USD",
    "unit": "day"
  },
  "amenities": ["power", "water", "wifi"],
  "images": [],
  "availability": {
    "start": "2023-07-01T00:00:00.000Z",
    "end": "2023-08-31T00:00:00.000Z"
  },
  "specifications": {
    "maxLength": 50,
    "maxBeam": 15,
    "maxDraft": 6,
    "power": true,
    "water": true,
    "fuel": false
  },
  "createdAt": "2023-06-01T10:00:00.000Z",
  "updatedAt": "2023-06-01T10:00:00.000Z"
}
```
</div>

### Bookings

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/bookings/create</code>
<p>Create a new booking.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "listingId": "listing_id",
  "startDate": "2023-07-10T10:00:00.000Z",
  "endDate": "2023-07-15T10:00:00.000Z"
}
```

**Response**
```json
{
  "id": "booking_id",
  "listingId": "listing_id",
  "boaterId": "boater_id",
  "ownerId": "owner_id",
  "startDate": "2023-07-10T10:00:00.000Z",
  "endDate": "2023-07-15T10:00:00.000Z",
  "status": "pending",
  "totalPrice": 500,
  "currency": "USD",
  "paymentStatus": "pending",
  "createdAt": "2023-06-01T10:00:00.000Z",
  "updatedAt": "2023-06-01T10:00:00.000Z"
}
```
</div>

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/bookings</code>
<p>Get all bookings for the current user.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Response**
```json
[
  {
    "id": "booking_id",
    "listing": {
      "id": "listing_id",
      "title": "Luxury Dock Slip",
      "location": {
        "address": "123 Marina Way"
      },
      "images": ["image1.jpg"]
    },
    "startDate": "2023-07-10T10:00:00.000Z",
    "endDate": "2023-07-15T10:00:00.000Z",
    "status": "confirmed",
    "totalPrice": 500,
    "currency": "USD",
    "paymentStatus": "paid",
    "owner": {
      "id": "owner_id",
      "name": "Marina Owner"
    },
    "createdAt": "2023-06-01T10:00:00.000Z"
  }
]
```
</div>

<div class="endpoint">
<span class="method put">PUT</span>
<code>/api/bookings/:id/status</code>
<p>Update a booking status.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "status": "cancelled"
}
```

**Response**
```json
{
  "id": "booking_id",
  "status": "cancelled",
  "updatedAt": "2023-06-02T10:00:00.000Z"
}
```
</div>

### Messages

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/conversations</code>
<p>Get all conversations for the current user.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Response**
```json
[
  {
    "id": "conversation_id",
    "otherUser": {
      "id": "other_user_id",
      "name": "Other User",
      "profileImage": "profile.jpg"
    },
    "lastMessage": {
      "content": "Hello there!",
      "createdAt": "2023-06-15T12:00:00.000Z"
    },
    "unreadCount": 2
  }
]
```
</div>

<div class="endpoint">
<span class="method get">GET</span>
<code>/api/conversations/:id/messages</code>
<p>Get messages for a specific conversation.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Response**
```json
[
  {
    "id": "message_id",
    "senderId": "sender_id",
    "content": "Hello there!",
    "readAt": null,
    "createdAt": "2023-06-15T12:00:00.000Z"
  },
  {
    "id": "message_id_2",
    "senderId": "other_user_id",
    "content": "Hi! How are you?",
    "readAt": "2023-06-15T12:05:00.000Z",
    "createdAt": "2023-06-15T12:03:00.000Z"
  }
]
```
</div>

<div class="endpoint">
<span class="method post">POST</span>
<code>/api/conversations/:id/messages</code>
<p>Send a message in a conversation.</p>

**Headers**
```
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "content": "Hello there!"
}
```

**Response**
```json
{
  "id": "message_id",
  "senderId": "sender_id",
  "content": "Hello there!",
  "readAt": null,
  "createdAt": "2023-06-15T12:00:00.000Z"
}
```
</div>

## WebSocket API

The Dokkerr application uses WebSockets for real-time communication:

```javascript
// Connect to WebSocket
const socket = io('wss://api.dokkerr.com');

// Authentication
socket.emit('authenticate', { token: 'jwt_token' });

// Listen for connection status
socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

// Listen for messages
socket.on('message', (data) => {
  console.log('New message:', data);
});

// Send a message
socket.emit('send_message', {
  conversationId: 'conversation_id',
  content: 'Hello there!'
});

// Listen for booking updates
socket.on('booking:update', (data) => {
  console.log('Booking updated:', data);
});
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "status": "error",
  "message": "Error message",
  "errors": {
    "field1": "Error for field1",
    "field2": "Error for field2"
  }
}
```

Common HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - The request was malformed or contained invalid parameters |
| 401 | Unauthorized - Missing or invalid authentication token |
| 403 | Forbidden - The user does not have permission to access the resource |
| 404 | Not Found - The requested resource was not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Something went wrong on the server |

<style>
.endpoint {
  background-color: #f7f7f7;
  border-left: 4px solid #0066cc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 0 5px 5px 0;
}
.method {
  display: inline-block;
  padding: 5px 10px;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
}
.get { background-color: #2e7d32; }
.post { background-color: #0066cc; }
.put { background-color: #ff9800; }
.delete { background-color: #d32f2f; }
</style> 