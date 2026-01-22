# Quick Start Guide - Frontend Only

## Prerequisites

- Node.js 18+ and npm installed
- Backend API running separately at `http://localhost:3000/api/admin/`

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Backend URL

Edit `.env.local`:

```bash
# Development (backend running locally)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Production (change to your backend domain)
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
```

## 3. Start Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser (or next available port if 3000 is in use)

**Important**: Your backend API must be running at `http://localhost:3000/api/admin/` before the dashboard will work!

## 4. Navigate the Dashboard

- **Sidebar** (Desktop) - Click to navigate between sections
- **Hamburger Menu** (Mobile) - Click to open offcanvas menu
- **Dark Mode** - Toggle in navbar (top right)
- **Admin Sections**:
  - Events: Manage church events
  - Media: Manage media files
  - Announcements: Create announcements
  - Department: Manage departments
  - About: Edit church and pastor info
  - Converts: Track new converts
  - Users: Manage user accounts

## 5. API Communication

The frontend communicates with your backend API:

```
Frontend: http://localhost:3000
   ↓ (API calls)
Backend: http://localhost:3000/api/admin/
   ↓ (Database operations)
Database: MongoDB Atlas (managed by backend)
```

All data operations go through your backend API.

## 6. Build for Production

```bash
npm run build
npm start
```

## Common Tasks

### View Dashboard

1. Start the app with `npm run dev`
2. Navigate to `/admin` to see the dashboard
3. Admin stats load from backend API

### Create Event

1. Go to Events section
2. Click "Add Event"
3. Fill in event details
4. Data saves to backend database

### Manage Media

1. Go to Media section
2. Upload files (processed by backend)
3. Files stored via backend configuration

### Edit Church Info

1. Go to About section
2. Update church or pastor information
3. Changes sync with backend database

## Troubleshooting

### "Cannot connect to API" Error

- **Check**: Backend is running at `http://localhost:3000/api/admin/`
- **Check**: `.env.local` has correct `NEXT_PUBLIC_API_URL`
- **Check**: No CORS errors in browser console
- **Fix**: Start backend server first, then frontend

### Dashboard shows no data

- Verify backend is running
- Check browser console for API errors
- Ensure backend database has data

### Port 3000 Already in Use

- Next.js will automatically use next available port (3001, 3002, etc.)
- Or start backend on different port and update `NEXT_PUBLIC_API_URL`

- Check browser localStorage is enabled
- Clear browser cache if issues persist

## File Locations

- **API utilities**: `/lib/api.js`
- **Cloudinary utils**: `/lib/cloudinary.js`
- **Admin pages**: `/app/admin/*/page.jsx`
- **Components**: `/app/components/`
- **Styles**: `/app/globals.css`

## Need Help?

1. Check `API_INTEGRATION_GUIDE.md` for full API reference
2. Check `PROJECT_SUMMARY.md` for project overview
3. Review component code comments
4. Check backend API documentation

---

Ready to start? Run `npm run dev` and visit http://localhost:3000 🚀
