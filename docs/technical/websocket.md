
# WebSocket Integration

## Overview

Dokkerr uses WebSocket technology to provide real-time features such as instant messaging, live notifications, and booking status updates. The implementation uses Socket.IO for reliable real-time bidirectional communication.

## Connection

### Server Setup

The WebSocket server is initialized in `src/services/websocket.ts`:

```typescript
import { Server } from 'socket.io';
import { createServer } from 'http';

export class WebSocketService {
  private static io: Server;

  static initialize(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true
      }
    });

    this.setupEventHandlers();
  }
}
```

### Client Connection

Connect to the WebSocket server from the client:

```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:5174', {
  withCredentials: true
});

socket.on('connect', () => {
  console.log('Connected to WebSocket server');
});
```

## Events

### System Events

| Event | Description | Direction |
|-------|-------------|-----------|
| `connect` | Client connected | Server → Client |
| `disconnect` | Client disconnected | Server → Client |
| `error` | Error occurred | Server → Client |

### Message Events

| Event | Description | Payload |
|-------|-------------|---------|
| `message.new` | New message | `{ messageId, senderId, content, timestamp }` |
| `message.read` | Message read | `{ messageId, readAt }` |
| `message.typing` | User typing | `{ userId, conversationId }` |

### Booking Events

| Event | Description | Payload |
|-------|-------------|---------|
| `booking.created` | New booking | `{ bookingId, listingId, status }` |
| `booking.updated` | Status change | `{ bookingId, status, timestamp }` |
| `booking.cancelled` | Cancellation | `{ bookingId, reason }` |

### Payment Events

| Event | Description | Payload |
|-------|-------------|---------|
| `payment.processing` | Payment started | `{ paymentId, amount }` |
| `payment.completed` | Payment success | `{ paymentId, status }` |
| `payment.failed` | Payment failed | `{ paymentId, error }` |

## Implementation

### Authentication

WebSocket connections are authenticated using JWT tokens:

```typescript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error('Authentication error'));
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.user = decoded;
    next();
  } catch (error) {
    next(new Error('Invalid token'));
  }
});
```

### Room Management

Users are automatically joined to relevant rooms:

```typescript
socket.on('connect', async () => {
  const userId = socket.data.user.id;
  
  // Join user's private room
  socket.join(`user:${userId}`);
  
  // Join rooms for user's active bookings
  const bookings = await getActiveBookings(userId);
  bookings.forEach(booking => {
    socket.join(`booking:${booking.id}`);
  });
});
```

### Error Handling

```typescript
socket.on('error', (error) => {
  console.error('WebSocket error:', error);
  socket.emit('error', {
    message: 'An error occurred',
    code: error.code
  });
});
```

## Best Practices

1. **Connection Management**
   - Implement reconnection logic
   - Handle disconnections gracefully
   - Monitor connection health

2. **Performance**
   - Use binary data when appropriate
   - Implement message queuing for offline clients
   - Optimize payload size

3. **Security**
   - Validate all incoming messages
   - Implement rate limiting
   - Use secure WebSocket (wss://)

## Example Usage

### Sending Messages

```javascript
// Client-side
socket.emit('message.new', {
  recipientId: '123e4567',
  content: 'Hello!',
  type: 'text'
});

// Server-side
socket.on('message.new', async (data) => {
  const message = await saveMessage(data);
  io.to(`user:${data.recipientId}`).emit('message.new', message);
});
```

### Booking Updates

```javascript
// Server-side booking status update
io.to(`booking:${bookingId}`).emit('booking.updated', {
  bookingId,
  status: 'confirmed',
  timestamp: new Date()
});

// Client-side booking status listener
socket.on('booking.updated', (data) => {
  updateBookingStatus(data.bookingId, data.status);
});
```

## Monitoring

The WebSocket service includes monitoring capabilities:

```typescript
class WebSocketMonitor {
  static getMetrics() {
    return {
      connections: io.engine.clientsCount,
      rooms: io.sockets.adapter.rooms.size,
      events: eventCounter.getMetrics()
    };
  }
}
```

## Troubleshooting

Common issues and solutions:

1. **Connection Failed**
   - Check CORS configuration
   - Verify authentication token
   - Ensure server is running

2. **Message Not Received**
   - Verify room membership
   - Check event name spelling
   - Confirm payload format

3. **Performance Issues**
   - Monitor message queue size
   - Check server resources
   - Optimize payload size 