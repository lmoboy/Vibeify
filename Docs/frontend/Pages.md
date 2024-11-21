# Frontend Pages Documentation

## History.jsx

The History page displays a user's saved playlists in a responsive layout that adapts to different screen sizes.

### Features
- Displays saved playlists with cover images, names, and moods
- Responsive design that changes layout based on screen size
- Error handling for failed image loads
- Loading states during data fetching

### Layout
- **Mobile (Small Screens)**:
  - Horizontal layout with playlist cover (96x96px) on the left
  - Content flows to the right of the image
  - Single column design optimized for mobile viewing

- **Desktop (Large Screens)**:
  - Card layout with cover image (full width, height: 192px) at the top
  - Content flows below the image
  - Two columns on large screens (lg:grid-cols-2)
  - Three columns on extra-large screens (xl:grid-cols-3)

### Props
- None (Uses internal state management)

### State Management
- `histories`: Array of saved playlist history
- `isLoading`: Boolean for loading state
- `error`: Error state for failed API calls

### API Integration
- Fetches history data from `/api/history`
- Supports filtering by mood via `/api/history/mood/{mood}`
- Handles deletion through `/api/history/{history}`

## Dashboard.jsx

The main dashboard page where users can capture their mood and get playlist suggestions.

### Features
- Camera integration for mood detection
- Real-time emotion analysis
- Playlist suggestions based on detected mood

### Components Used
- `CameraDisplay`: For capturing and displaying camera feed
- `SuggestedPlaylist`: For displaying recommended playlists
