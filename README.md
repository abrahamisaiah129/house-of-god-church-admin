# House of God Church Admin Dashboard

Frontend-only admin dashboard for House of God Church, consuming a separate REST API backend.

## Architecture

This is a **frontend-only** Next.js application that consumes a backend REST API. The backend API runs separately at `http://localhost:3000/api/admin/`.

### Key Characteristics
- **Frontend Framework**: Next.js 16 with React 19
- **Backend API**: External REST API (separate server)
- **Styling**: Bootstrap 5.3.2
- **Icons**: FontAwesome
- **Environment**: Node.js 18+

## Installation

```bash
# Install dependencies
npm install

# Configure environment variables
# Edit .env.local and set:
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Running the Application

```bash
# Development mode (runs on http://localhost:3000)
npm run dev

# Production build
npm run build
npm start
```

**Note**: The backend API must be running separately at `http://localhost:3000/api/admin/` for the application to function.

## Project Structure

```
app/
├── globals.css              # Global styles
├── layout.jsx               # Root layout
├── page.jsx                 # Home page
├── admin/                   # Admin dashboard pages
│   ├── page.jsx            # Dashboard overview
│   ├── Events/page.jsx      # Event management
│   ├── Media/page.jsx       # Media management
│   ├── Announcements/page.jsx
│   ├── Department/page.jsx
│   ├── About/page.jsx
│   ├── Converts/page.jsx
│   └── Users/page.jsx
├── components/              # Reusable UI components
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Banner.jsx
│   └── [other components]
├── auth/                    # Authentication pages
└── hooks/
    └── useCloudinary.js     # Cloudinary integration hook

lib/
├── api.js                   # API client with all endpoint functions
├── cloudinary.js            # Cloudinary configuration

public/
└── assets/                  # Static assets
```

## API Client

All API calls are made through `lib/api.js`, which provides functions for:

### Admin Endpoints
- **Events**: `getEvents()`, `createEvent()`, `updateEvent()`, `deleteEvent()`
- **Media**: `getMedia()`, `createMedia()`, `updateMedia()`, `deleteMedia()`
- **Announcements**: `getAnnouncements()`, `createAnnouncement()`, `updateAnnouncement()`, `deleteAnnouncement()`
- **Departments**: `getDepartments()`, `createDepartment()`, `updateDepartment()`, `deleteDepartment()`
- **About**: `getAboutChurch()`, `updateAboutChurch()`, `getAboutPastor()`, `updateAboutPastor()`
- **Converts**: `getConverts()`, `createConvert()`, `updateConvert()`, `deleteConvert()`
- **Hero/Banners/Sermons**: Similar CRUD operations
- **Stats**: `getAdminStats()`

### Client Endpoints (read-only)
- Get public data for frontend website display

## Configuration

### Environment Variables (.env.local)

```bash
# API Configuration - External Backend
NEXT_PUBLIC_API_URL=http://localhost:3000/api
# For production: NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

### Backend API Requirement

This frontend requires a backend API running with the following structure:
```
http://localhost:3000/api/admin/
├── events
├── media
├── announcements
├── departments
├── about
├── converts
├── hero
├── banners
├── sermons
├── stats
└── users
```

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Development Workflow
1. Frontend runs on `http://localhost:3000` (or next available port if 3000 is in use)
2. Backend API runs separately at `http://localhost:3000/api/admin/`
3. All HTTP requests from frontend go to the backend API

## API Integration

The frontend communicates with the backend API using the fetch API. The base URL is configured in `.env.local`:

```javascript
// From lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// Example API call:
const response = await fetch(`${API_BASE_URL}/admin/events`);
const data = await response.json();
```

## Troubleshooting

### API Calls Failing
1. Verify the backend API is running at the configured URL
2. Check `NEXT_PUBLIC_API_URL` in `.env.local` is correct
3. Ensure backend is listening on the correct port (default: 3000)
4. Check browser console for CORS errors

### Port Conflicts
If port 3000 is already in use:
```bash
# Next.js will automatically use the next available port
npm run dev
```

## API Specification Reference

For complete API endpoint specifications, see `API_INTEGRATION_GUIDE.md`.

## Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Configure environment variables on your hosting platform:
   - `NEXT_PUBLIC_API_URL=https://your-backend-api.com/api`

3. Deploy to your hosting provider (Vercel, Netlify, AWS, etc.)

## Support

For issues or questions, check the backend API logs and ensure it's running correctly at the configured endpoint.
