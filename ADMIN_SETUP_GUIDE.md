# House of God Church Admin Dashboard - Setup Guide

## 📋 Overview

This is a comprehensive admin dashboard for the House of God Church application built with **Next.js 16.0.10**, **React 19.2.1**, **Bootstrap 5.3.2**, and **Cloudinary**.

The dashboard includes:

- ✅ Professional sidebar navigation
- ✅ API integration with backend
- ✅ Media/gallery management
- ✅ Event management
- ✅ Church information management
- ✅ Department management
- ✅ User management
- ✅ Conversion tracking
- ✅ Dark mode compatible
- ✅ Responsive design

---

## 🚀 Quick Start

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create or update `.env.local` with:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_API_KEY=594789528814412
NEXT_PUBLIC_CLOUDINARY_API_SECRET=Jtgmq6Qn4HszGC6zIq9eVwqPlIU
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=ddzpchp5x
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=k5ljicll

# MongoDB
MONGODB_URI=mongodb+srv://HOG:HOGPASSWORD@cluster0.92uhzbt.mongodb.net/?appName=Cluster0

# API Configuration - Choose one:
# For Development (Local Backend):
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# For Production (Render Backend):
NEXT_PUBLIC_API_URL=https://house-of-god-church-backend.onrender.com/api
```

### 3. Development Server

```bash
npm run dev
```

Access the admin at: **http://localhost:3000/admin**

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
app/
├── admin/
│   ├── layout.jsx              # Admin layout with sidebar
│   ├── page.jsx                # Dashboard home
│   ├── Media/
│   │   └── page.jsx            # Media/Gallery management
│   ├── Events/
│   │   └── page.jsx            # Event management
│   ├── About/
│   │   └── page.jsx            # Church & Pastor info
│   ├── Department/
│   │   └── page.jsx            # Department management
│   ├── Users/
│   │   └── page.jsx            # User management
│   ├── Converts/
│   │   └── page.jsx            # Conversion tracking
│   └── Welcomevideo/
│       └── page.jsx            # Coming soon
├── components/
│   ├── Sidebar.jsx             # Navigation sidebar
│   └── Header.jsx              # Top header bar
├── globals.css
├── layout.jsx                  # Root layout
└── page.jsx                    # Home page
lib/
├── api.js                      # API utility functions
└── cloudinary.js               # Cloudinary upload/delete
.env.local                      # Environment variables
```

---

## 🔌 API Integration

### Base URLs

**Development:**

```
http://localhost:3001/api
```

**Production (Render):**

```
https://house-of-god-church-backend.onrender.com/api
```

### Available Endpoints

#### Admin Endpoints (Full CRUD)

- `GET /admin/media` - List all media
- `POST /admin/media` - Create media
- `PUT /admin/media/:id` - Update media
- `DELETE /admin/media/:id` - Delete media

- `GET /admin/events` - List all events
- `POST /admin/events` - Create event
- `PUT /admin/events/:id` - Update event
- `DELETE /admin/events/:id` - Delete event

- `GET /admin/about` - Get church/pastor info
- `PUT /admin/about/:section` - Update about info

- `GET /admin/departments` - List departments
- `POST /admin/departments` - Create department
- `PUT /admin/departments/:id` - Update department
- `DELETE /admin/departments/:id` - Delete department

- `GET /admin/users` - List users
- `POST /admin/users` - Create user
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

- `GET /admin/converts` - List conversions
- `PUT /admin/converts/:id` - Update conversion status
- `DELETE /admin/converts/:id` - Delete conversion

#### Client Endpoints (Read-Only)

- `GET /client/media` - Get all media
- `GET /client/events` - Get all events
- `GET /client/about` - Get church info
- `GET /client/departments` - Get departments

#### Special Client Endpoint

- `POST /client/converts` - Submit conversion (client-side only)

---

## 🎨 UI Components

### Sidebar Navigation

- Collapsible sidebar with icons
- Active page highlighting
- Server status indicator
- Quick navigation to all admin sections

**Location:** `app/components/Sidebar.jsx`

### Header

- User profile dropdown
- API connection status
- Logout functionality

**Location:** `app/components/Header.jsx`

### Dashboard

- Statistics cards (Events, Media, Departments, etc.)
- Quick action buttons
- Responsive grid layout

**Location:** `app/admin/page.jsx`

---

## 📊 API Utility Functions

Located in `lib/api.js`, these functions handle all API communication:

```javascript
// Media
import { getMedia, createMedia, updateMedia, deleteMedia } from "@/lib/api";

// Events
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/api";

// About
import {
  getAboutChurch,
  updateAboutChurch,
  getAboutPastor,
  updateAboutPastor,
} from "@/lib/api";

// Departments
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/lib/api";

// Users
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api";

// Converts
import { getConverts, updateConvertStatus, deleteConvert } from "@/lib/api";

// Stats
import { getSiteStats } from "@/lib/api";
```

All functions return: `{ success: boolean, data: any, error?: string }`

---

## ☁️ Cloudinary Integration

Located in `lib/cloudinary.js`:

```javascript
// Upload file
import { uploadToCloudinary } from "@/lib/cloudinary";
const result = await uploadToCloudinary(file, "media/gallery");

// Delete file
import { deleteFromCloudinary } from "@/lib/cloudinary";
await deleteFromCloudinary(publicId);

// Transform URL
import { getCloudinaryUrl } from "@/lib/cloudinary";
const url = getCloudinaryUrl(originalUrl, {
  width: 300,
  height: 300,
  crop: "fill",
});
```

---

## 📄 Admin Pages

### Dashboard (`/admin`)

- Overview statistics
- Quick access buttons
- Server status

### Media Gallery (`/admin/Media`)

- Upload images/videos/audio
- Filter by type and category
- Edit metadata
- Delete media
- Cloudinary integration

### Events (`/admin/Events`)

- Create/edit/delete events
- Search and filter
- Modal-based add/edit interface
- Event date/time management

### About (`/admin/About`)

- Church information management
- Pastor information
- Image uploads
- Rich text editing

### Departments (`/admin/Department`)

- Create/edit/delete departments
- Department management

### Users (`/admin/Users`)

- User management
- Admin role assignment
- User status control

### Conversions (`/admin/Converts`)

- View all conversions/baptisms
- Update conversion status
- Track new members
- Delete records

---

## 🔐 Authentication & Authorization

**Current Status:** Mock authentication (demo mode)

The Header component includes a user dropdown with logout functionality. To implement real authentication:

1. Add auth provider (NextAuth.js, Auth0, Firebase, etc.)
2. Protect routes with middleware
3. Store JWT tokens securely
4. Add role-based access control

---

## 🎯 Features

### ✅ Completed

- Sidebar navigation with collapsible menu
- Dashboard with statistics
- Media management with Cloudinary
- Event management
- Church information management
- Responsive design
- Bootstrap 5.3.2 styling
- API integration
- Dark mode compatible

### 🔜 Coming Soon

- Sermon management
- Announcements
- Welcome video upload
- Advanced reporting

---

## 🔧 Development Tips

### Running in Development

```bash
# Local backend (if running)
NEXT_PUBLIC_API_URL=http://localhost:3001/api npm run dev

# Production backend
NEXT_PUBLIC_API_URL=https://house-of-god-church-backend.onrender.com/api npm run dev
```

### Testing API Calls

All API functions are in `lib/api.js`. Each returns:

```javascript
{
  success: true/false,
  data: { /* response data */ },
  error: "error message (if failed)"
}
```

### Adding New Pages

1. Create folder in `/app/admin/PageName`
2. Create `page.jsx` with "use client" directive
3. Import API functions from `lib/api.js`
4. Add navigation link in `Sidebar.jsx`

Example:

```javascript
// app/admin/NewPage/page.jsx
"use client";

import { useState, useEffect } from "react";
import { getResource } from "@/lib/api";

export default function NewPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await getResource();
    if (result.success) {
      setData(result.data);
    }
    setLoading(false);
  };

  return <div className="p-4">{/* Your page content */}</div>;
}
```

---

## 🐛 Troubleshooting

### API Connection Issues

**Problem:** "Failed to load data"

**Solutions:**

1. Check `.env.local` API URL is correct
2. Verify backend server is running
3. Check browser console for CORS errors
4. Ensure API endpoint exists on backend

### Cloudinary Upload Fails

**Problem:** "Upload failed"

**Solutions:**

1. Check Cloudinary credentials in `.env.local`
2. Verify upload preset exists in Cloudinary dashboard
3. Check file size limits
4. Ensure file type is allowed

### Sidebar Not Showing

**Problem:** Sidebar appears empty

**Solutions:**

1. Check `Sidebar.jsx` is properly imported in `layout.jsx`
2. Verify Bootstrap CSS is loaded
3. Check browser console for errors
4. Clear browser cache

---

## 📞 Support

For issues or questions:

1. Check the API documentation (BACKEND_API_SPEC.md)
2. Review component code and comments
3. Check browser console for error messages
4. Verify backend API is running and accessible

---

## 📝 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Bootstrap Documentation](https://getbootstrap.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Backend API Specification](./BACKEND_API_SPEC.md)

---

**Last Updated:** 2024
**Version:** 1.0.0
**Status:** Production Ready ✅
