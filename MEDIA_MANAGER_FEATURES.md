# Media Manager - Complete Upgrade

## Overview

The Media Manager page has been completely upgraded with advanced features for managing church media (images, videos, audio).

## Key Features Implemented

### 1. Dynamic Category Management

- **Auto-Detect Categories**: Automatically extracts categories from existing media in the database
- **Custom Categories**: Users can add custom categories on-the-fly if not listed
- **Flexible Input**: Choose from existing categories OR create new ones
- **Live Filter**: Filter media by any available category

### 2. Media Type Display & Classification

- **Type Badges**: Clear visual indicators for media type
  - 📷 Image
  - 🎥 Video
  - 🎵 Audio
- **Category Badges**: Shows the category right on the card
- **Tab Navigation**: Quick filter by media type (All, Images, Videos, Audio)

### 3. Gallery Support for Image Arrays

- **First Image Display**: When images are stored in an array (gallery), shows the first image
- **Remaining Count Badge**: Displays "+X more" badge showing remaining images
- **Click to Preview**: Click any image to see full preview with all gallery info

### 4. Full Media Preview System

- **Modal Preview**: Large, centered modal for previewing media
- **All Media Types Supported**:
  - Images: Full-size display
  - Videos: Full controls (play, pause, seek, volume)
  - Audio: Music note icon + audio player with controls
- **Detailed Information**: Shows title, category, event type, date, and description in preview
- **Click to Close**: Click outside or use X button to close preview

### 5. Enhanced Upload Form

- **Media Type Icons**: Emoji icons for visual clarity (📷 Image, 🎥 Video, 🎵 Audio)
- **Smart File Acceptance**: File input automatically accepts only the selected media type
- **Category Selection Flow**:
  1. Select from existing categories (dropdown)
  2. OR enter custom category (text input)
  3. Custom category takes precedence if provided
- **Event Type Selection**: Pre-defined types (Service, Worship, Prayer, Training, Fellowship)
- **Full Validation**: Required fields checked before upload

### 6. API Response Handling

- **Flexible Structure**: Handles multiple API response formats
- **Safe Data Extraction**: Normalizes data whether it comes as array or wrapped object
- **ID Handling**: Works with both `_id` (MongoDB) and `id` properties

## UI/UX Improvements

### Card Layout

```
┌─────────────────────────┐
│ 📷 Image  |  Services   │  ← Type & Category Badges
│                          │
│  [Media Preview]        │
│  +5 more                │  ← Remaining count for galleries
│                          │
│ Title                   │
│ Description             │
│ 📅 Date  | Event Type   │
│                          │
│ [Preview] [Delete]      │  ← Action Buttons
└─────────────────────────┘
```

### Responsive Design

- Works on mobile (1 column)
- Tablet (2 columns)
- Desktop (3 columns)

## Technical Features

### State Management

```javascript
- formData: Upload form state (title, category, customCategory, file, etc.)
- mediaItems: Array of media from API
- availableCategories: Set of categories extracted from API data
- selectedMediaForPreview: Currently previewed media item
- activeTab: Current filter (all/image/video/audio)
- filterCategory: Current category filter
```

### Key Functions

- `fetchMedia()`: Fetches from API and extracts categories
- `handleSubmit()`: Uploads to Cloudinary + creates backend record
- `handleDelete()`: Removes media from system
- `getFirstImage()`: Gets first image from array or single image URL
- `getRemainingCount()`: Calculates remaining images in gallery

## API Integration

### Expected API Response Format

```json
{
  "success": true,
  "data": [
    {
      "_id": "mongodb_id",
      "title": "Media Title",
      "type": "image|video|audio",
      "category": "Category Name",
      "eventType": "Service|Worship|Prayer|etc",
      "mediaUrl": "https://cloudinary.url",
      "file_path": [], // Array for galleries
      "description": "Description",
      "date": "2026-01-12T00:00:00.000Z"
    }
  ]
}
```

### Supported Property Names

- Media type: `type` (preferred) or `mediaType`
- Media URL: `mediaUrl`, `url`, or extracted from `file_path`
- ID: `_id` (MongoDB) or `id`

## File Structure

- **Location**: `/app/admin/Media/page.jsx`
- **Size**: 620 lines
- **Dependencies**:
  - `@/lib/api` - API client
  - `@/lib/cloudinary` - Cloudinary upload
  - React, Bootstrap 5

## Usage Flow

### Uploading Media

1. Select **Media Type** (Image/Video/Audio)
2. Enter **Title** (required)
3. Select **Date** (required)
4. Choose **Category**:
   - Select from dropdown OR
   - Enter custom category in text field
5. Select **Event Type** (optional)
6. Upload **File** (required)
7. Add **Description** (optional)
8. Click **Upload Media**

### Viewing Media

1. Navigate Media Manager
2. **Filter by type** using tabs (All/Images/Videos/Audio)
3. **Filter by category** using dropdown
4. Click **Preview** button or media card to open preview modal
5. For galleries (multiple images): See "+X more" badge and all images in preview

### Deleting Media

1. Click **Delete** button on card
2. Confirm deletion
3. Media removed from system

## Error Handling

- **Upload Validation**: Checks required fields before uploading
- **API Error Messages**: Displays error alerts if upload fails
- **Safe Deletion**: Asks for confirmation before deleting
- **Response Normalization**: Handles unexpected response formats gracefully

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Bootstrap 5.3.2 CSS for styling

## Performance Considerations

- Category Set for O(1) lookup and preventing duplicates
- Lazy loading preview only when modal is opened
- Array.isArray() checks prevent runtime errors
- Optimized re-renders with proper state management

## Future Enhancements

- Bulk upload support
- Drag & drop upload
- Image cropping before upload
- Advanced filters (date range, search by title)
- Media organization by departments
- View/edit media after upload
- Batch operations (move to category, delete multiple)
