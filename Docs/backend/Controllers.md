# Backend Controllers Documentation

## HistoryController

Manages user playlist history operations.

### Endpoints

#### GET `/api/history`
Retrieves all history entries for the authenticated user.

**Response:**
```json
{
    "histories": [
        {
            "id": 1,
            "user_id": 1,
            "playlist_id": "spotify_playlist_id",
            "playlist_name": "Playlist Name",
            "playlist_url": "https://open.spotify.com/playlist/...",
            "cover_url": "https://i.scdn.co/image/...",
            "mood": "happy",
            "created_at": "2024-01-24T00:00:00.000000Z",
            "updated_at": "2024-01-24T00:00:00.000000Z"
        }
    ]
}
```

#### POST `/api/history`
Saves a new playlist to user history.

**Request Body:**
```json
{
    "playlist_id": "required|string",
    "playlist_name": "required|string",
    "playlist_url": "required|string",
    "cover_url": "required|string",
    "mood": "required|string"
}
```

**Response:**
```json
{
    "message": "History saved successfully",
    "history": {
        "id": 1,
        "user_id": 1,
        "playlist_id": "spotify_playlist_id",
        "playlist_name": "Playlist Name",
        "playlist_url": "https://open.spotify.com/playlist/...",
        "cover_url": "https://i.scdn.co/image/...",
        "mood": "happy",
        "created_at": "2024-01-24T00:00:00.000000Z",
        "updated_at": "2024-01-24T00:00:00.000000Z"
    }
}
```

#### GET `/api/history/mood/{mood}`
Retrieves history entries filtered by mood.

**Parameters:**
- `mood`: string - The mood to filter by

**Response:** Same format as GET `/api/history`

#### DELETE `/api/history/{history}`
Deletes a specific history entry.

**Parameters:**
- `history`: integer - The ID of the history entry to delete

**Response:**
```json
{
    "message": "History deleted successfully"
}
```

### Validation
- All required fields must be present and non-empty
- User must be authenticated
- User can only delete their own history entries
