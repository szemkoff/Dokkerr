
# Search System

## Overview

Dokkerr's search system provides powerful location-based search capabilities for finding dock listings. The system uses PostgreSQL with PostGIS for geospatial queries and Elasticsearch for full-text search, offering fast and accurate results with various filtering options.

## Geospatial Search

### Database Schema

```sql
CREATE EXTENSION postgis;

CREATE TABLE listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location GEOGRAPHY(POINT, 4326),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX listings_location_idx ON listings USING GIST (location);
```

### Location Queries

```typescript
async function searchNearby(lat: number, lng: number, radius: number) {
  const query = `
    SELECT 
      id,
      title,
      ST_Distance(
        location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)
      ) as distance
    FROM listings
    WHERE ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint($1, $2), 4326),
      $3
    )
    ORDER BY distance
    LIMIT 50
  `;
  
  return await db.query(query, [lng, lat, radius]);
}
```

## Elasticsearch Integration

### Index Configuration

```typescript
const listingIndex = {
  mappings: {
    properties: {
      id: { type: 'keyword' },
      title: { 
        type: 'text',
        analyzer: 'english'
      },
      description: {
        type: 'text',
        analyzer: 'english'
      },
      amenities: { type: 'keyword' },
      location: { type: 'geo_point' },
      price: { type: 'float' },
      length: { type: 'integer' },
      width: { type: 'integer' }
    }
  }
};
```

### Search Implementation

```typescript
async function searchListings(params: SearchParams) {
  const query = {
    bool: {
      must: [
        params.keyword && {
          multi_match: {
            query: params.keyword,
            fields: ['title^2', 'description']
          }
        },
        params.location && {
          geo_distance: {
            distance: `${params.radius}mi`,
            location: {
              lat: params.location.lat,
              lon: params.location.lng
            }
          }
        }
      ].filter(Boolean),
      filter: [
        params.minPrice && { range: { price: { gte: params.minPrice } } },
        params.maxPrice && { range: { price: { lte: params.maxPrice } } },
        params.amenities && { terms: { amenities: params.amenities } }
      ].filter(Boolean)
    }
  };
  
  return await elasticsearch.search({
    index: 'listings',
    body: { query }
  });
}
```

## Search API

### Endpoints

```typescript
router.get('/api/search', async (req, res) => {
  const params = {
    keyword: req.query.q,
    location: {
      lat: parseFloat(req.query.lat),
      lng: parseFloat(req.query.lng)
    },
    radius: parseInt(req.query.radius) || 10,
    minPrice: parseFloat(req.query.minPrice),
    maxPrice: parseFloat(req.query.maxPrice),
    amenities: req.query.amenities?.split(','),
    sortBy: req.query.sortBy || 'distance'
  };
  
  const results = await searchListings(params);
  res.json(results);
});
```

### Response Format

```typescript
interface SearchResponse {
  hits: {
    total: number;
    hits: Array<{
      _id: string;
      _source: {
        title: string;
        description: string;
        price: number;
        location: {
          lat: number;
          lon: number;
        };
        distance?: number;
        amenities: string[];
      };
    }>;
  };
  aggregations?: {
    price_ranges: {
      buckets: Array<{
        key: string;
        doc_count: number;
      }>;
    };
  };
}
```

## Search Optimization

### Indexing Strategy

```typescript
class SearchIndexer {
  static async indexListing(listing: Listing) {
    const document = {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      location: {
        lat: listing.latitude,
        lon: listing.longitude
      },
      price: listing.pricePerDay,
      amenities: listing.amenities,
      lastUpdated: new Date()
    };
    
    await elasticsearch.index({
      index: 'listings',
      id: listing.id,
      body: document
    });
  }
}
```

### Bulk Indexing

```typescript
async function bulkIndexListings(listings: Listing[]) {
  const operations = listings.flatMap(listing => [
    { index: { _index: 'listings', _id: listing.id } },
    {
      id: listing.id,
      title: listing.title,
      // ... other fields
    }
  ]);
  
  return await elasticsearch.bulk({ body: operations });
}
```

## Search Filters

### Filter Implementation

```typescript
interface SearchFilters {
  priceRange: {
    min: number;
    max: number;
  };
  amenities: string[];
  boatSize: {
    length: number;
    width: number;
  };
  availability: {
    startDate: Date;
    endDate: Date;
  };
}

function buildFilters(filters: SearchFilters) {
  return {
    bool: {
      filter: [
        {
          range: {
            price: {
              gte: filters.priceRange.min,
              lte: filters.priceRange.max
            }
          }
        },
        {
          terms: {
            amenities: filters.amenities
          }
        },
        {
          range: {
            length: { gte: filters.boatSize.length }
          }
        },
        {
          range: {
            width: { gte: filters.boatSize.width }
          }
        }
      ]
    }
  };
}
```

## Caching

### Redis Cache Implementation

```typescript
import Redis from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
});

async function getCachedSearch(key: string) {
  const cached = await redis.get(key);
  return cached ? JSON.parse(cached) : null;
}

async function cacheSearch(key: string, results: any) {
  await redis.set(key, JSON.stringify(results), 'EX', 3600);
}
```

## Monitoring

### Search Analytics

```typescript
class SearchAnalytics {
  static async track(params: SearchParams, results: SearchResponse) {
    await db.searchLogs.create({
      data: {
        query: params,
        resultCount: results.hits.total,
        timestamp: new Date(),
        executionTime: results.took
      }
    });
  }
  
  static async getMetrics() {
    return {
      averageResponseTime: await calculateAverageResponseTime(),
      popularSearches: await getPopularSearches(),
      zeroResultQueries: await getZeroResultQueries()
    };
  }
}
```

### Performance Monitoring

```typescript
class SearchMonitor {
  static async checkHealth() {
    return {
      elasticsearch: await checkElasticsearchHealth(),
      postgis: await checkPostGISHealth(),
      cache: await checkRedisHealth(),
      indices: await getIndicesStats()
    };
  }
}
```

## Testing

### Search Tests

```typescript
describe('Search System', () => {
  it('should return nearby listings', async () => {
    const results = await searchNearby(25.7617, -80.1918, 10);
    expect(results.hits.length).toBeGreaterThan(0);
    expect(results.hits[0].distance).toBeLessThan(10);
  });
  
  it('should filter by amenities', async () => {
    const results = await searchListings({
      amenities: ['power', 'water']
    });
    expect(results.hits.every(hit => 
      hit._source.amenities.includes('power') &&
      hit._source.amenities.includes('water')
    )).toBe(true);
  });
});
```

## Troubleshooting

Common issues and solutions:

1. **Slow Queries**
   - Check index optimization
   - Verify query complexity
   - Monitor cache hit rates

2. **Inconsistent Results**
   - Verify index synchronization
   - Check mapping configuration
   - Review analyzer settings

3. **Geospatial Issues**
   - Validate coordinate formats
   - Check PostGIS installation
   - Verify spatial index 