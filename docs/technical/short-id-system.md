
# Short ID System Documentation

## Overview

The Dokkerr application implements a dual-identifier system that combines the security benefits of UUIDs with the usability advantages of shorter identifiers. This document explains how the system works, its implementation details, and how to use it effectively.

## Core Concepts

### Why Use Both UUIDs and Short IDs?

- **UUIDs (Universally Unique Identifiers)**: 36-character strings that provide guaranteed uniqueness across distributed systems, but are cumbersome for users to read, remember, or type.
- **Short IDs**: 8-character identifiers derived from UUIDs that are more user-friendly while maintaining sufficient uniqueness for practical purposes.

### Implementation Approach

Our approach retains UUIDs as primary keys in the database while adding `short_id` columns that store the first 8 hexadecimal characters of the UUID (with hyphens removed). This gives us:

1. Database integrity through genuinely unique UUIDs
2. User-friendly short IDs in the UI and URLs
3. Backward compatibility with existing code

## Database Schema

The system adds a `short_id` column to the following tables:

```sql
-- Users table
ALTER TABLE users ADD COLUMN short_id VARCHAR(8) UNIQUE;

-- Listings table
ALTER TABLE listings ADD COLUMN short_id VARCHAR(8) UNIQUE;

-- Bookings table
ALTER TABLE bookings ADD COLUMN short_id VARCHAR(8) UNIQUE;
```

Each short ID is indexed for fast lookups and has a UNIQUE constraint to prevent collisions.

## How to Use Short IDs

### In URLs and Routes

All API routes and frontend URLs support both short IDs and full UUIDs:

```
/api/users/12ab34cd      // Using short ID
/api/users/123e4567-e89b-12d3-a456-426614174000  // Using UUID
```

### In Database Queries

Models automatically handle both formats:

```javascript
// Both of these work for the same user
const user1 = await User.findById('12ab34cd');        // Short ID
const user2 = await User.findById('123e4567-e89b-12d3-a456-426614174000');  // UUID
```

### In the User Interface

The admin dashboard displays short IDs with tooltips showing the full UUID when hovered:

```html
<span class="id-short" data-bs-toggle="tooltip" title="Full UUID">12ab34cd</span>
```

## Technical Implementation

### ID Generation

When creating new records, the system:

1. Generates a UUID using the `uuid` package
2. Extracts the first 8 characters (with hyphens removed) to create the short ID
3. Stores both in the database

```javascript
const { v4: uuidv4 } = require('uuid');

function generateIds() {
  const id = uuidv4();
  const shortId = id.replace(/-/g, '').substring(0, 8);
  return { id, shortId };
}
```

### ID Resolution

When looking up records, the system determines which field to query based on the format:

```javascript
function isShortId(id) {
  return id && id.length === 8 && !id.includes('-');
}

async function findById(id) {
  let query;
  
  if (isShortId(id)) {
    query = 'SELECT * FROM users WHERE short_id = $1';
  } else {
    query = 'SELECT * FROM users WHERE id = $1';
  }
  
  // Execute query...
}
```

## Migration Process

### For New Installations

The `short_id` columns are created as part of the standard migration process.

### For Existing Installations

For existing installations with data, run:

```bash
npm run setup-short-ids
```

This script:
1. Adds the necessary `short_id` columns to the tables
2. Generates short IDs for all existing records

## Best Practices

1. **API Responses**: Always include both `id` and `shortId` in API responses
2. **URLs**: Use short IDs in URLs for better usability
3. **Internal Processing**: For join operations and internal lookups, prefer UUIDs
4. **User Display**: Always show short IDs in the UI, with full UUIDs available on hover or click

## Troubleshooting

If you encounter issues with ID resolution:

1. Verify that the short ID generation has been run (`npm run generate-short-ids`)
2. Ensure that all model methods are using the ID resolution helpers
3. Check for null values in the `short_id` columns

## Technical Reference

### Key Files

- `src/utils/idUtils.js`: Core utility functions for ID generation and verification
- `src/db/migrations/add_short_id_to_tables.js`: Database migration for adding short ID columns
- `src/db/scripts/generate_short_ids.js`: Script for generating short IDs for existing records
- `src/models/User.js`, `src/models/Listing.js`, etc.: Model implementations using the short ID system

### NPM Scripts

- `npm run setup-short-ids`: Run full setup (migrations + ID generation)
- `npm run generate-short-ids`: Generate short IDs for existing records only 