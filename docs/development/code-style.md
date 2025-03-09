---
title: Code Style Guide
description: Documentation for Dokkerr's code style and formatting standards
---

# Code Style Guide

## Overview

This guide outlines Dokkerr's coding standards and best practices to ensure consistency, maintainability, and readability across the codebase.

## TypeScript Guidelines

### Naming Conventions

```typescript
// Classes - PascalCase
class UserService {
  // Properties - camelCase
  private readonly maxLoginAttempts: number = 3;
  
  // Methods - camelCase
  public async authenticateUser(credentials: UserCredentials): Promise<User> {
    // Implementation
  }
}

// Interfaces - PascalCase with 'I' prefix for clarity
interface IUserCredentials {
  email: string;
  password: string;
}

// Types - PascalCase
type UserRole = 'admin' | 'dock_owner' | 'boater';

// Constants - UPPER_SNAKE_CASE
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
```

### Code Organization

```typescript
// File structure for a typical service
import { Dependencies } from './dependencies';
import { Types } from './types';

export class ListingService {
  // 1. Properties
  private readonly db: Database;
  private readonly cache: Cache;
  
  // 2. Constructor
  constructor(dependencies: Dependencies) {
    this.db = dependencies.db;
    this.cache = dependencies.cache;
  }
  
  // 3. Public methods
  public async getListing(id: string): Promise<Listing> {
    // Implementation
  }
  
  // 4. Private methods
  private async validateListing(listing: Listing): Promise<void> {
    // Implementation
  }
}
```

### Type Definitions

```typescript
// Prefer interfaces for object definitions
interface Listing {
  id: string;
  title: string;
  description: string;
  price: {
    amount: number;
    currency: string;
  };
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  owner: User;
  status: ListingStatus;
}

// Use enums for fixed sets of values
enum ListingStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// Use type aliases for unions and complex types
type ListingFilter = {
  status?: ListingStatus;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
};
```

## React Guidelines

### Component Structure

```typescript
// Functional components with TypeScript
interface ProfileProps {
  user: User;
  onUpdate: (user: User) => Promise<void>;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  // 1. Hooks
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  
  // 2. Handlers
  const handleSubmit = async (data: UserUpdateData) => {
    try {
      await onUpdate({ ...user, ...data });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  
  // 3. Render helpers
  const renderForm = () => (
    // Form implementation
  );
  
  // 4. Main render
  return (
    <div className="profile-container">
      {isEditing ? renderForm() : renderProfile()}
    </div>
  );
};
```

### Styling Conventions

```typescript
// Use Tailwind CSS classes with consistent ordering
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary' }) => (
  <button
    className={clsx(
      // 1. Layout
      'flex items-center justify-center',
      // 2. Spacing
      'px-4 py-2',
      // 3. Typography
      'text-sm font-medium',
      // 4. Colors
      variant === 'primary' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800',
      // 5. Borders
      'rounded-lg border border-transparent',
      // 6. Effects
      'hover:opacity-90 transition-opacity',
      // 7. States
      'disabled:opacity-50 disabled:cursor-not-allowed'
    )}
  >
    {children}
  </button>
);
```

## API Guidelines

### RESTful Endpoints

```typescript
// Route definitions
router.get('/api/v1/listings', listingController.getListings);
router.post('/api/v1/listings', listingController.createListing);
router.get('/api/v1/listings/:id', listingController.getListing);
router.put('/api/v1/listings/:id', listingController.updateListing);
router.delete('/api/v1/listings/:id', listingController.deleteListing);

// Controller structure
class ListingController {
  // Use descriptive method names
  async getListings(req: Request, res: Response) {
    try {
      const filters = this.parseFilters(req.query);
      const listings = await listingService.findListings(filters);
      
      res.json({
        status: 'success',
        data: listings
      });
    } catch (error) {
      this.handleError(error, res);
    }
  }
}
```

### Error Handling

```typescript
// Custom error classes
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code: string
  ) {
    super(message);
  }
}

// Error handler middleware
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      code: error.code,
      message: error.message
    });
  }
  
  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  return res.status(500).json({
    status: 'error',
    code: 'INTERNAL_ERROR',
    message: 'An unexpected error occurred'
  });
};
```

## Testing Guidelines

### Unit Tests

```typescript
// Use descriptive test names
describe('ListingService', () => {
  describe('createListing', () => {
    it('should create a new listing with valid data', async () => {
      // Arrange
      const listingData = createMockListingData();
      
      // Act
      const result = await listingService.createListing(listingData);
      
      // Assert
      expect(result).toMatchObject({
        id: expect.any(String),
        ...listingData
      });
    });
    
    it('should throw an error if required fields are missing', async () => {
      // Arrange
      const invalidData = { title: 'Test' }; // Missing required fields
      
      // Act & Assert
      await expect(
        listingService.createListing(invalidData)
      ).rejects.toThrow('Missing required fields');
    });
  });
});
```

## Documentation Guidelines

### Code Comments

```typescript
/**
 * Processes a booking request for a dock listing
 * @param bookingData - The booking request data
 * @param userId - ID of the user making the booking
 * @returns Promise resolving to the created booking
 * @throws {ValidationError} If booking data is invalid
 * @throws {AvailabilityError} If listing is not available
 */
async function processBooking(
  bookingData: BookingRequest,
  userId: string
): Promise<Booking> {
  // Implementation
}

// Use inline comments sparingly, only for complex logic
function calculatePrice(duration: number, baseRate: number): number {
  // Apply progressive discount based on duration
  // 1-7 days: no discount
  // 8-30 days: 10% discount
  // 31+ days: 20% discount
  const discount = duration <= 7 ? 0 :
                  duration <= 30 ? 0.1 :
                  0.2;
                  
  return baseRate * duration * (1 - discount);
}
```

## Version Control

### Commit Messages

```bash
# Format: <type>(<scope>): <description>
# Types: feat, fix, docs, style, refactor, test, chore
# Example commits:
feat(auth): add multi-factor authentication
fix(api): handle null response in listing search
docs(readme): update deployment instructions
refactor(database): optimize booking queries
```

### Branch Naming

```bash
# Format: <type>/<description>
# Examples:
feature/user-notifications
bugfix/payment-processing
hotfix/security-vulnerability
refactor/api-structure
```

## Best Practices

1. **Code Quality**
   - Write self-documenting code
   - Follow DRY (Don't Repeat Yourself) principle
   - Keep functions small and focused
   - Use meaningful variable names

2. **Performance**
   - Optimize database queries
   - Implement proper caching
   - Minimize HTTP requests
   - Use lazy loading where appropriate

3. **Security**
   - Validate all inputs
   - Sanitize data before display
   - Use parameterized queries
   - Follow least privilege principle

4. **Accessibility**
   - Use semantic HTML
   - Provide ARIA labels
   - Ensure keyboard navigation
   - Maintain color contrast 