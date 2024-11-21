# Frontend Components Documentation

## SuggestedPlaylist.jsx

A component that fetches and displays Spotify playlists based on detected emotions.

### Props
- `emotion`: string[] - Array of emotions to search for
- `accessKey`: string - Spotify API access token

### Features
- Fetches playlists from Spotify API based on emotion
- Displays up to 3 random playlists from search results
- Handles saving playlists to user history
- Shows loading states during API calls
- Error handling for failed API requests

### State Management
- `items`: Stores fetched playlist data
- `offset`: Random offset for playlist pagination
- `isLoading`: Loading state for playlist fetch
- `isSaving`: Loading state for save operation
- `saveError`: Error state for save operation

### API Integration
- Uses Spotify Web API for playlist search
- Saves playlists to backend via POST to `/api/history`
- Includes playlist metadata (ID, name, URL, cover image)

## CameraDisplay.jsx

Component for handling camera feed and emotion detection.

### Props
- None (Uses internal state management)

### Features
- Manages camera access and video feed
- Captures images for emotion analysis
- Real-time emotion detection display
- Error handling for camera access

### State Management
- `stream`: MediaStream object for camera feed
- `error`: Error state for camera access issues
- `emotions`: Detected emotions from analysis

## AuthenticatedLayout.jsx

Base layout component for authenticated users.

### Features
- Consistent navigation header
- Responsive sidebar navigation
- User authentication status display
- Mobile-friendly navigation menu

### Props
- `children`: ReactNode - Page content
- `user`: Object - Current user data
- `header`: ReactNode - Optional custom header content
