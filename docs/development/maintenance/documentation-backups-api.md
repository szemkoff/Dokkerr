# Documentation Backup API

This page describes the backend API endpoints for managing documentation backups programmatically.

## Overview

The Documentation Backup API allows you to:

- Create timestamped backups of the entire documentation
- List all available backups with metadata
- Restore the documentation from any previous backup

All endpoints are part of the maintenance API and require admin privileges for write operations.

## API Endpoints

### Create Documentation Backup

Creates a new backup of the documentation.

**URL**: `/api/maintenance/docs/backup`

**Method**: `POST`

**Auth Required**: Yes (Admin)

**Request Body**:

```json
{
  "description": "Optional description for the backup"
}
```

**Success Response**:

```json
{
  "message": "Documentation backup created successfully",
  "backup": {
    "filename": "docs_backup_2025-03-09_16-00-00.tar.gz",
    "path": "/path/to/backup/docs_backup_2025-03-09_16-00-00.tar.gz",
    "timestamp": "2025-03-09T16:00:00.000Z",
    "description": "Optional description for the backup",
    "size": "10.5 MB"
  }
}
```

### List Documentation Backups

Returns a list of all available documentation backups.

**URL**: `/api/maintenance/docs/backups`

**Method**: `GET`

**Auth Required**: No

**Success Response**:

```json
{
  "count": 2,
  "backups": [
    {
      "id": 1,
      "timestamp": "2025-03-09T15:00:00.000Z",
      "filename": "docs_backup_2025-03-09_15-00-00.tar.gz",
      "description": "First backup",
      "path": "/path/to/backup/docs_backup_2025-03-09_15-00-00.tar.gz",
      "size": "10.2 MB",
      "exists": true
    },
    {
      "id": 2,
      "timestamp": "2025-03-09T16:00:00.000Z",
      "filename": "docs_backup_2025-03-09_16-00-00.tar.gz",
      "description": "Second backup",
      "path": "/path/to/backup/docs_backup_2025-03-09_16-00-00.tar.gz",
      "size": "10.5 MB",
      "exists": true
    }
  ]
}
```

### Restore Documentation from Backup

Restores the documentation from a specified backup.

**URL**: `/api/maintenance/docs/restore`

**Method**: `POST`

**Auth Required**: Yes (Admin)

**Request Body**:

```json
{
  "backupFilename": "docs_backup_2025-03-09_16-00-00.tar.gz"
}
```

**Success Response**:

```json
{
  "message": "Documentation restored successfully",
  "result": {
    "status": "success",
    "message": "Documentation restored successfully from docs_backup_2025-03-09_16-00-00.tar.gz",
    "preRestoreBackup": "docs_backup_2025-03-10_10-30-00.tar.gz"
  }
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK`: The request was successful
- `400 Bad Request`: Missing required parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Not authorized to perform the action
- `500 Internal Server Error`: Server-side error

Error responses include a message and optional details:

```json
{
  "error": "Failed to create documentation backup",
  "details": "Error message details"
}
```

## Usage Examples

### Create a Backup Using cURL

```bash
curl -X POST 
  http://localhost:3000/api/maintenance/docs/backup 
  -H 'Content-Type: application/json' 
  -H 'Authorization: Bearer your_auth_token' 
  -d '{"description": "Important update backup"}'
```

### List Available Backups Using cURL

```bash
curl -X GET 
  http://localhost:3000/api/maintenance/docs/backups
```

### Restore from a Backup Using cURL

```bash
curl -X POST 
  http://localhost:3000/api/maintenance/docs/restore 
  -H 'Content-Type: application/json' 
  -H 'Authorization: Bearer your_auth_token' 
  -d '{"backupFilename": "docs_backup_2025-03-09_16-00-00.tar.gz"}'
```

## Security Considerations

- Only administrators can create backups or restore documentation
- All operations are logged for audit purposes
- Restore operations automatically create a safety backup before proceeding
- Old backups are automatically cleaned up based on the retention period setting