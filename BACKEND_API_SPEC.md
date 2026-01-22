# 🔐 House of God Church ADMIN DASHBOARD - Backend API Specification

**THIS SPECIFICATION IS FOR THE ADMIN DASHBOARD ONLY**

> This document covers **all API endpoints required by the admin dashboard** to manage church content, media, events, announcements, departments, banners, hero slides, and sermons.
>
> For the **public client website** API endpoints, see a separate documentation.

---

**Admin Dashboard Frontend URL:** `http://localhost:3000` (development) or production deploy  
**Backend Base URL:** `https://house-of-god-church-backend.onrender.com/api` (or `http://localhost:3001/api` for local backend)  
**Environment Variable:** `NEXT_PUBLIC_API_URL`

## 🎯 COMPLETE API ARCHITECTURE

This backend serves **both** the public client website and the admin dashboard with different access levels:

```
ADMIN ENDPOINTS (Full CRUD - Authenticated):
├── /api/admin/media (GET, POST, PUT, DELETE)
├── /api/admin/events (GET, POST, PUT, DELETE)
├── /api/admin/announcements (GET, POST, PUT, DELETE)
├── /api/admin/departments (GET, POST, PUT, DELETE)
├── /api/admin/about/church (GET, PUT)
├── /api/admin/about/pastor (GET, PUT)
├── /api/admin/hero (GET, POST, PUT, DELETE)
├── /api/admin/banners (GET, POST, PUT, DELETE)
├── /api/admin/sermons (GET, POST, PUT, DELETE)
└── /api/admin/stats (GET)

CLIENT ENDPOINTS (GET Only - Read-Only, No Auth):
├── /api/client/media (GET) - Display gallery in public site
├── /api/client/events (GET) - Display events in public site
├── /api/client/announcements (GET) - Display announcements
├── /api/client/departments (GET) - Display departments
├── /api/client/about/church (GET) - Display church info
├── /api/client/about/pastor (GET) - Display pastor info
├── /api/client/hero (GET) - Display hero carousel
├── /api/client/banners (GET) - Display banners
├── /api/client/sermons (GET) - Display sermons
├── /api/client/stats (GET) - Display statistics
└── /api/client/converts (POST) ⭐ ONLY POST ENDPOINT - Accept conversion forms
```

## 📋 ACCESS SUMMARY

| Endpoint               | Admin                                      | Client       | Purpose                        |
| ---------------------- | ------------------------------------------ | ------------ | ------------------------------ |
| `/api/admin/*`         | ✅ Full CRUD                               | ❌ No Access | Manage church content          |
| `/api/client/*` (GET)  | ❌ No Access                               | ✅ Read-Only | Display content on public site |
| `/api/client/converts` | ✅ Full CRUD (view, update status, delete) | ✅ POST      | Accept conversion submissions  |

## ⚠️ FRONTEND CONFIGURATION

**Admin Dashboard `.env.local`:**

```
NEXT_PUBLIC_API_URL=https://house-of-god-church-backend.onrender.com/api/admin
```

**Public Client Website** (separate Next.js project):

```
NEXT_PUBLIC_API_URL=https://house-of-god-church-backend.onrender.com/api/client
```

---

## Table of Contents

1. [Request/Response Format](#requestresponse-format)
2. [Media/Gallery Endpoints](#mediagallery-endpoints)
3. [Events Endpoints](#events-endpoints)
4. [About/Church Info Endpoints](#aboutchurch-info-endpoints)
5. [Announcements Endpoints](#announcements-endpoints)
6. [Departments Endpoints](#departments-endpoints)
7. [Hero Slides Endpoints](#hero-slides-endpoints)
8. [Banners Endpoints](#banners-endpoints)
9. [Sermons Endpoints](#sermons-endpoints)
10. [Statistics Endpoints](#statistics-endpoints)
11. [Converts Endpoint (Public)](#converts-endpoint-public)

---

## Request/Response Format

### Standard Response Structure

All endpoints return JSON with this structure:

```javascript
// Success Response
{
  "success": true,
  "data": { /* endpoint-specific data */ }
}

// Error Response
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### Request Headers

```
Content-Type: application/json
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

---

## Media/Gallery Endpoints

### GET `/media`

**Description:** Fetch all media items with optional filters

**Query Parameters:**

```javascript
{
  "type": "image|video|audio",  // Optional filter
  "category": "General|Events|Services",  // Optional filter
  "eventType": "Service|Worship|Meeting"  // Optional filter
}
```

**Example Request:**

```bash
GET /api/media?type=image&category=General
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Sunday Service 2025",
      "description": "Beautiful worship moment",
      "mediaUrl": "https://res.cloudinary.com/ddzpchp5x/...",
      "publicId": "hog-church/service-001",
      "type": "image",
      "category": "General",
      "eventType": "Service",
      "date": "2025-01-08T00:00:00Z",
      "createdAt": "2025-01-08T12:30:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    },
    // ... more media items
  ]
}
```

---

### POST `/media`

**Description:** Create a new media item

**Request Body:**

```javascript
{
  "title": "Sunday Worship Session",
  "description": "Praise and worship time",
  "mediaUrl": "https://res.cloudinary.com/ddzpchp5x/...",  // From Cloudinary
  "publicId": "hog-church/worship-001",  // From Cloudinary
  "type": "image",  // image|video|audio
  "category": "General",  // General|Events|Services
  "eventType": "Service",  // Service|Worship|Meeting
  "date": "2025-01-08"
}
```

**Example Request:**

```bash
POST /api/media
Content-Type: application/json

{
  "title": "Sunday Worship",
  "description": "Beautiful worship moment",
  "mediaUrl": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/worship-001.jpg",
  "publicId": "hog-church/worship-001",
  "type": "image",
  "category": "General",
  "eventType": "Service",
  "date": "2025-01-08"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Sunday Worship",
    "description": "Beautiful worship moment",
    "mediaUrl": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/worship-001.jpg",
    "publicId": "hog-church/worship-001",
    "type": "image",
    "category": "General",
    "eventType": "Service",
    "date": "2025-01-08T00:00:00Z",
    "createdAt": "2025-01-08T12:30:00Z",
    "updatedAt": "2025-01-08T12:30:00Z"
  }
}
```

---

### PUT `/media/:id`

**Description:** Update an existing media item

**URL Parameter:**

```
:id = MongoDB ObjectId of the media item
```

**Request Body:** (Same as POST, only include fields to update)

```javascript
{
  "title": "Updated Title",
  "description": "Updated description",
  "category": "Events"
}
```

**Example Request:**

```bash
PUT /api/media/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "title": "Updated Worship Session",
  "category": "Events"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Worship Session",
    "description": "Beautiful worship moment",
    "mediaUrl": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/worship-001.jpg",
    "publicId": "hog-church/worship-001",
    "type": "image",
    "category": "Events",
    "eventType": "Service",
    "date": "2025-01-08T00:00:00Z",
    "createdAt": "2025-01-08T12:30:00Z",
    "updatedAt": "2025-01-08T13:45:00Z"
  }
}
```

---

### DELETE `/media/:id`

**Description:** Delete a media item

**URL Parameter:**

```
:id = MongoDB ObjectId of the media item
```

**Example Request:**

```bash
DELETE /api/media/507f1f77bcf86cd799439011
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Media deleted successfully",
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

---

## Events Endpoints

### GET `/events`

**Description:** Fetch all events with optional filters

**Query Parameters:**

```javascript
{
  "date": "2025-01-08",  // Optional filter
  "location": "Main Church"  // Optional filter
}
```

**Example Request:**

```bash
GET /api/events
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Sunday Service",
      "date": "2025-01-12T00:00:00Z",
      "time": "09:00 AM",
      "location": "Main Church Hall",
      "description": "Weekly Sunday worship service",
      "createdAt": "2025-01-08T12:30:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Prayer Meeting",
      "date": "2025-01-15T00:00:00Z",
      "time": "06:00 PM",
      "location": "Prayer Room",
      "description": "Midweek prayer and intercession",
      "createdAt": "2025-01-08T12:30:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/events`

**Description:** Create a new event

**Request Body:**

```javascript
{
  "title": "Special Revival Meeting",
  "date": "2025-02-01",
  "time": "07:00 PM",
  "location": "Main Church Hall",
  "description": "Special guest speaker from out of town"
}
```

**Example Request:**

```bash
POST /api/events
Content-Type: application/json

{
  "title": "Special Revival Meeting",
  "date": "2025-02-01",
  "time": "07:00 PM",
  "location": "Main Church Hall",
  "description": "Special guest speaker from out of town"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Special Revival Meeting",
    "date": "2025-02-01T00:00:00Z",
    "time": "07:00 PM",
    "location": "Main Church Hall",
    "description": "Special guest speaker from out of town",
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:00:00Z"
  }
}
```

---

### PUT `/events/:id`

**Description:** Update an existing event

**URL Parameter:**

```
:id = MongoDB ObjectId of the event
```

**Request Body:** (Only include fields to update)

```javascript
{
  "title": "Updated Event Title",
  "time": "08:00 PM"
}
```

**Example Request:**

```bash
PUT /api/events/507f1f77bcf86cd799439014
Content-Type: application/json

{
  "title": "Special Revival Meeting - Updated",
  "time": "08:00 PM"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Special Revival Meeting - Updated",
    "date": "2025-02-01T00:00:00Z",
    "time": "08:00 PM",
    "location": "Main Church Hall",
    "description": "Special guest speaker from out of town",
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:15:00Z"
  }
}
```

---

### DELETE `/events/:id`

**Description:** Delete an event

**URL Parameter:**

```
:id = MongoDB ObjectId of the event
```

**Example Request:**

```bash
DELETE /api/events/507f1f77bcf86cd799439014
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Event deleted successfully",
    "_id": "507f1f77bcf86cd799439014"
  }
}
```

---

## About/Church Info Endpoints

### GET `/about/church`

**Description:** Fetch church information

**Example Request:**

```bash
GET /api/about/church
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Welcome to House of God Church",
    "subtitle": "A place of worship and fellowship",
    "body": "We are a community of believers dedicated to serving God and our community...",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/church-001.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-08T12:30:00Z"
  }
}
```

---

### PUT `/about/church`

**Description:** Update church information

**Request Body:**

```javascript
{
  "title": "Welcome to House of God Church",
  "subtitle": "A place of worship and fellowship",
  "body": "We are a community of believers dedicated to serving God and our community...",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/church-001.jpg"
}
```

**Example Request:**

```bash
PUT /api/about/church
Content-Type: application/json

{
  "title": "Welcome to House of God Church",
  "subtitle": "A place of worship and fellowship",
  "body": "We are a community of believers dedicated to serving God and our community...",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/church-001.jpg"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "title": "Welcome to House of God Church",
    "subtitle": "A place of worship and fellowship",
    "body": "We are a community of believers dedicated to serving God and our community...",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/church-001.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-08T13:45:00Z"
  }
}
```

---

### GET `/about/pastor`

**Description:** Fetch pastor information

**Example Request:**

```bash
GET /api/about/pastor
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "title": "Meet Our Senior Pastor",
    "subtitle": "Rev. John Doe - Founder & Senior Pastor",
    "body": "With over 20 years of ministry experience, Pastor John has dedicated his life to spreading God's word and building a thriving Christian community...",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/pastor-001.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-08T12:30:00Z"
  }
}
```

---

### PUT `/about/pastor`

**Description:** Update pastor information

**Request Body:**

```javascript
{
  "title": "Meet Our Senior Pastor",
  "subtitle": "Rev. John Doe - Founder & Senior Pastor",
  "body": "With over 20 years of ministry experience, Pastor John has dedicated his life to spreading God's word and building a thriving Christian community...",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/pastor-001.jpg"
}
```

**Example Request:**

```bash
PUT /api/about/pastor
Content-Type: application/json

{
  "title": "Meet Our Senior Pastor",
  "subtitle": "Rev. John Doe - Founder & Senior Pastor",
  "body": "With over 20 years of ministry experience, Pastor John has dedicated his life to spreading God's word and building a thriving Christian community...",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/pastor-001.jpg"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439021",
    "title": "Meet Our Senior Pastor",
    "subtitle": "Rev. John Doe - Founder & Senior Pastor",
    "body": "With over 20 years of ministry experience, Pastor John has dedicated his life to spreading God's word and building a thriving Christian community...",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/pastor-001.jpg",
    "createdAt": "2025-01-01T00:00:00Z",
    "updatedAt": "2025-01-08T13:45:00Z"
  }
}
```

---

## Announcements Endpoints

### GET `/announcements`

**Description:** Fetch all announcements with optional filters

**Query Parameters:**

```javascript
{
  "priority": "high|normal|low",  // Optional filter
  "status": "active|archived"  // Optional filter
}
```

**Example Request:**

```bash
GET /api/announcements?priority=high
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "title": "Important Notice",
      "content": "Please note that we will have a special service this Sunday at 2 PM",
      "priority": "high",
      "status": "active",
      "date": "2025-01-08T00:00:00Z",
      "createdAt": "2025-01-08T12:30:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/announcements`

**Description:** Create a new announcement

**Request Body:**

```javascript
{
  "title": "Important Notice",
  "content": "Please note that we will have a special service this Sunday at 2 PM",
  "priority": "high",  // high|normal|low
  "status": "active",  // active|archived
  "date": "2025-01-08"
}
```

**Example Request:**

```bash
POST /api/announcements
Content-Type: application/json

{
  "title": "Important Notice",
  "content": "Please note that we will have a special service this Sunday at 2 PM",
  "priority": "high",
  "status": "active",
  "date": "2025-01-08"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "title": "Important Notice",
    "content": "Please note that we will have a special service this Sunday at 2 PM",
    "priority": "high",
    "status": "active",
    "date": "2025-01-08T00:00:00Z",
    "createdAt": "2025-01-08T12:30:00Z",
    "updatedAt": "2025-01-08T12:30:00Z"
  }
}
```

---

### PUT `/announcements/:id`

**Description:** Update an announcement

**URL Parameter:**

```
:id = MongoDB ObjectId of the announcement
```

**Request Body:** (Only include fields to update)

```javascript
{
  "title": "Updated Title",
  "status": "archived"
}
```

**Example Request:**

```bash
PUT /api/announcements/507f1f77bcf86cd799439030
Content-Type: application/json

{
  "status": "archived"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "title": "Important Notice",
    "content": "Please note that we will have a special service this Sunday at 2 PM",
    "priority": "high",
    "status": "archived",
    "date": "2025-01-08T00:00:00Z",
    "createdAt": "2025-01-08T12:30:00Z",
    "updatedAt": "2025-01-08T14:00:00Z"
  }
}
```

---

### DELETE `/announcements/:id`

**Description:** Delete an announcement

**URL Parameter:**

```
:id = MongoDB ObjectId of the announcement
```

**Example Request:**

```bash
DELETE /api/announcements/507f1f77bcf86cd799439030
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Announcement deleted successfully",
    "_id": "507f1f77bcf86cd799439030"
  }
}
```

---

## Departments Endpoints

### GET `/departments`

**Description:** Fetch all departments

**Example Request:**

```bash
GET /api/departments
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439040",
      "name": "Worship Team",
      "description": "Responsible for praise and worship during services",
      "head": "John Smith",
      "email": "worship@hogchurch.com",
      "phone": "+1-555-0123",
      "members": 15,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439041",
      "name": "Ushers Ministry",
      "description": "Welcome and guide visitors",
      "head": "Mary Johnson",
      "email": "ushers@hogchurch.com",
      "phone": "+1-555-0124",
      "members": 25,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/departments`

**Description:** Create a new department

**Request Body:**

```javascript
{
  "name": "Children's Ministry",
  "description": "Program for kids aged 4-12",
  "head": "Sarah Williams",
  "email": "children@hogchurch.com",
  "phone": "+1-555-0125",
  "members": 8
}
```

**Example Request:**

```bash
POST /api/departments
Content-Type: application/json

{
  "name": "Children's Ministry",
  "description": "Program for kids aged 4-12",
  "head": "Sarah Williams",
  "email": "children@hogchurch.com",
  "phone": "+1-555-0125",
  "members": 8
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439042",
    "name": "Children's Ministry",
    "description": "Program for kids aged 4-12",
    "head": "Sarah Williams",
    "email": "children@hogchurch.com",
    "phone": "+1-555-0125",
    "members": 8,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:00:00Z"
  }
}
```

---

### PUT `/departments/:id`

**Description:** Update a department

**URL Parameter:**

```
:id = MongoDB ObjectId of the department
```

**Request Body:** (Only include fields to update)

```javascript
{
  "members": 10,
  "email": "newchildrens@hogchurch.com"
}
```

**Example Request:**

```bash
PUT /api/departments/507f1f77bcf86cd799439042
Content-Type: application/json

{
  "members": 10
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439042",
    "name": "Children's Ministry",
    "description": "Program for kids aged 4-12",
    "head": "Sarah Williams",
    "email": "children@hogchurch.com",
    "phone": "+1-555-0125",
    "members": 10,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:15:00Z"
  }
}
```

---

### DELETE `/departments/:id`

**Description:** Delete a department

**URL Parameter:**

```
:id = MongoDB ObjectId of the department
```

**Example Request:**

```bash
DELETE /api/departments/507f1f77bcf86cd799439042
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Department deleted successfully",
    "_id": "507f1f77bcf86cd799439042"
  }
}
```

---

## Hero Slides Endpoints

### GET `/hero`

**Description:** Fetch all hero carousel slides

**Example Request:**

```bash
GET /api/hero
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439050",
      "title": "Welcome to Our Church",
      "subtitle": "Join us for worship and fellowship",
      "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-001.jpg",
      "order": 1,
      "active": true,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439051",
      "title": "Experience God's Love",
      "subtitle": "Come as you are",
      "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-002.jpg",
      "order": 2,
      "active": true,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/hero`

**Description:** Create a new hero slide

**Request Body:**

```javascript
{
  "title": "Grow in Faith",
  "subtitle": "Discover your purpose",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-003.jpg",
  "order": 3,
  "active": true
}
```

**Example Request:**

```bash
POST /api/hero
Content-Type: application/json

{
  "title": "Grow in Faith",
  "subtitle": "Discover your purpose",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-003.jpg",
  "order": 3,
  "active": true
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439052",
    "title": "Grow in Faith",
    "subtitle": "Discover your purpose",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-003.jpg",
    "order": 3,
    "active": true,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:00:00Z"
  }
}
```

---

### PUT `/hero/:id`

**Description:** Update a hero slide

**URL Parameter:**

```
:id = MongoDB ObjectId of the hero slide
```

**Request Body:** (Only include fields to update)

```javascript
{
  "title": "Updated Title",
  "order": 4
}
```

**Example Request:**

```bash
PUT /api/hero/507f1f77bcf86cd799439052
Content-Type: application/json

{
  "order": 4
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439052",
    "title": "Grow in Faith",
    "subtitle": "Discover your purpose",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/hero-003.jpg",
    "order": 4,
    "active": true,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:15:00Z"
  }
}
```

---

### DELETE `/hero/:id`

**Description:** Delete a hero slide

**URL Parameter:**

```
:id = MongoDB ObjectId of the hero slide
```

**Example Request:**

```bash
DELETE /api/hero/507f1f77bcf86cd799439052
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Hero slide deleted successfully",
    "_id": "507f1f77bcf86cd799439052"
  }
}
```

---

## Banners Endpoints

### GET `/banners`

**Description:** Fetch all banners

**Example Request:**

```bash
GET /api/banners
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439060",
      "title": "Coming Soon: Youth Camp",
      "content": "Register now for our summer youth retreat",
      "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/banner-001.jpg",
      "link": "https://hogchurch.com/youth-camp",
      "type": "info",
      "active": true,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/banners`

**Description:** Create a new banner

**Request Body:**

```javascript
{
  "title": "New Sermon Series",
  "content": "Join us for our new series: Living for God's Purpose",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/banner-002.jpg",
  "link": "https://hogchurch.com/new-series",
  "type": "promo",  // info|promo|event|alert
  "active": true
}
```

**Example Request:**

```bash
POST /api/banners
Content-Type: application/json

{
  "title": "New Sermon Series",
  "content": "Join us for our new series: Living for God's Purpose",
  "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/banner-002.jpg",
  "link": "https://hogchurch.com/new-series",
  "type": "promo",
  "active": true
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439061",
    "title": "New Sermon Series",
    "content": "Join us for our new series: Living for God's Purpose",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/banner-002.jpg",
    "link": "https://hogchurch.com/new-series",
    "type": "promo",
    "active": true,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:00:00Z"
  }
}
```

---

### PUT `/banners/:id`

**Description:** Update a banner

**URL Parameter:**

```
:id = MongoDB ObjectId of the banner
```

**Request Body:** (Only include fields to update)

```javascript
{
  "active": false,
  "content": "Updated content"
}
```

**Example Request:**

```bash
PUT /api/banners/507f1f77bcf86cd799439061
Content-Type: application/json

{
  "active": false
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439061",
    "title": "New Sermon Series",
    "content": "Join us for our new series: Living for God's Purpose",
    "image": "https://res.cloudinary.com/ddzpchp5x/image/upload/v1641234567/hog-church/banner-002.jpg",
    "link": "https://hogchurch.com/new-series",
    "type": "promo",
    "active": false,
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:15:00Z"
  }
}
```

---

### DELETE `/banners/:id`

**Description:** Delete a banner

**URL Parameter:**

```
:id = MongoDB ObjectId of the banner
```

**Example Request:**

```bash
DELETE /api/banners/507f1f77bcf86cd799439061
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Banner deleted successfully",
    "_id": "507f1f77bcf86cd799439061"
  }
}
```

---

## Sermons Endpoints

### GET `/sermons`

**Description:** Fetch all sermons with optional filters

**Query Parameters:**

```javascript
{
  "date": "2025-01-08",  // Optional filter
  "pastor": "John Doe",  // Optional filter
  "status": "published|draft"  // Optional filter
}
```

**Example Request:**

```bash
GET /api/sermons?status=published
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439070",
      "title": "Finding Peace in Chaos",
      "pastor": "Rev. John Doe",
      "date": "2025-01-05T00:00:00Z",
      "description": "A powerful message about finding God's peace in difficult times",
      "audioUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-001.mp3",
      "videoUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-001.mp4",
      "scripture": "Philippians 4:6-7",
      "status": "published",
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-08T12:30:00Z"
    }
  ]
}
```

---

### POST `/sermons`

**Description:** Create a new sermon

**Request Body:**

```javascript
{
  "title": "Living by Faith",
  "pastor": "Rev. John Doe",
  "date": "2025-01-12",
  "description": "How to live a life of faith and trust in God",
  "audioUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp3",
  "videoUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp4",
  "scripture": "Hebrews 11:1",
  "status": "published"
}
```

**Example Request:**

```bash
POST /api/sermons
Content-Type: application/json

{
  "title": "Living by Faith",
  "pastor": "Rev. John Doe",
  "date": "2025-01-12",
  "description": "How to live a life of faith and trust in God",
  "audioUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp3",
  "videoUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp4",
  "scripture": "Hebrews 11:1",
  "status": "published"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439071",
    "title": "Living by Faith",
    "pastor": "Rev. John Doe",
    "date": "2025-01-12T00:00:00Z",
    "description": "How to live a life of faith and trust in God",
    "audioUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp3",
    "videoUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp4",
    "scripture": "Hebrews 11:1",
    "status": "published",
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:00:00Z"
  }
}
```

---

### PUT `/sermons/:id`

**Description:** Update a sermon

**URL Parameter:**

```
:id = MongoDB ObjectId of the sermon
```

**Request Body:** (Only include fields to update)

```javascript
{
  "title": "Updated Title",
  "status": "draft"
}
```

**Example Request:**

```bash
PUT /api/sermons/507f1f77bcf86cd799439071
Content-Type: application/json

{
  "status": "draft"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439071",
    "title": "Living by Faith",
    "pastor": "Rev. John Doe",
    "date": "2025-01-12T00:00:00Z",
    "description": "How to live a life of faith and trust in God",
    "audioUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp3",
    "videoUrl": "https://res.cloudinary.com/ddzpchp5x/video/upload/v1641234567/hog-church/sermon-002.mp4",
    "scripture": "Hebrews 11:1",
    "status": "draft",
    "createdAt": "2025-01-08T13:00:00Z",
    "updatedAt": "2025-01-08T13:15:00Z"
  }
}
```

---

### DELETE `/sermons/:id`

**Description:** Delete a sermon

**URL Parameter:**

```
:id = MongoDB ObjectId of the sermon
```

**Example Request:**

```bash
DELETE /api/sermons/507f1f77bcf86cd799439071
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Sermon deleted successfully",
    "_id": "507f1f77bcf86cd799439071"
  }
}
```

---

## Statistics Endpoints

### GET `/stats`

**Description:** Fetch site statistics and overview

**Example Request:**

```bash
GET /api/stats
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "totalEvents": 15,
    "totalMedia": 87,
    "totalSermons": 42,
    "totalAnnouncements": 8,
    "totalDepartments": 6,
    "upcomingEvents": 3,
    "activeAnnouncements": 5,
    "totalMembers": 234,
    "lastUpdated": "2025-01-08T12:30:00Z"
  }
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request:**

```javascript
{
  "success": false,
  "error": "Invalid input: title is required"
}
```

**404 Not Found:**

```javascript
{
  "success": false,
  "error": "Resource not found with ID: 507f1f77bcf86cd799439011"
}
```

**500 Server Error:**

```javascript
{
  "success": false,
  "error": "Internal server error"
}
```

---

## Important Notes

1. **Date Format:** Use ISO 8601 format (YYYY-MM-DD or full timestamp)
2. **Image URLs:** All images should be uploaded to Cloudinary first, then the URL and publicId are sent to the backend
3. **Authentication:** Add authentication headers as needed (not shown in this spec, implement as required)
4. **CORS:** Ensure backend allows requests from admin frontend URL
5. **Rate Limiting:** Consider implementing rate limiting for production
6. **Validation:** Implement proper validation on backend for all inputs
7. **Timestamps:** All dates returned should include timezone information

---

## Example Full Workflow: Upload Media with Image

```javascript
// Step 1: Upload image to Cloudinary (from frontend)
const uploadResponse = await uploadToCloudinary(file, "hog-church");
// Returns: { success: true, url, publicId, data }

// Step 2: Send media data to backend
const mediaResponse = await createMedia({
  title: "Sunday Worship",
  description: "Beautiful worship moment",
  mediaUrl: uploadResponse.url, // From Cloudinary
  publicId: uploadResponse.publicId, // From Cloudinary
  type: "image",
  category: "General",
  eventType: "Service",
  date: "2025-01-08",
});
// Returns: { success: true, data: { _id, title, ... } }

// Step 3: Media is now stored in MongoDB with Cloudinary reference
```

---

## Converts Endpoint (Public)

### POST `/api/client/converts`

**Description:** Accept conversion form submissions from the public website. This is the **ONLY POST endpoint** available to the public client.

**Example Request:**

```bash
POST /api/client/converts
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0100",
  "address": "123 Main St, City, State",
  "conversionDate": "2025-01-09",
  "comments": "I would like to join the church"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439080",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "address": "123 Main St, City, State",
    "conversionDate": "2025-01-09T00:00:00Z",
    "comments": "I would like to join the church",
    "status": "pending",
    "createdAt": "2025-01-09T14:30:00Z",
    "updatedAt": "2025-01-09T14:30:00Z"
  }
}
```

### GET `/api/admin/converts`

**Description:** [Admin Only] Fetch all conversion submissions

**Example Request:**

```bash
GET /api/admin/converts
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439080",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0100",
      "address": "123 Main St, City, State",
      "conversionDate": "2025-01-09T00:00:00Z",
      "comments": "I would like to join the church",
      "status": "pending",
      "createdAt": "2025-01-09T14:30:00Z",
      "updatedAt": "2025-01-09T14:30:00Z"
    }
  ]
}
```

### PUT `/api/admin/converts/:id`

**Description:** [Admin Only] Update conversion status

**Request Body:**

```javascript
{
  "status": "approved"  // approved|pending|rejected
}
```

**Example Request:**

```bash
PUT /api/admin/converts/507f1f77bcf86cd799439080
Content-Type: application/json

{
  "status": "approved"
}
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439080",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-0100",
    "address": "123 Main St, City, State",
    "conversionDate": "2025-01-09T00:00:00Z",
    "comments": "I would like to join the church",
    "status": "approved",
    "createdAt": "2025-01-09T14:30:00Z",
    "updatedAt": "2025-01-09T15:00:00Z"
  }
}
```

### DELETE `/api/admin/converts/:id`

**Description:** [Admin Only] Delete a conversion record

**Example Request:**

```bash
DELETE /api/admin/converts/507f1f77bcf86cd799439080
Content-Type: application/json
```

**Expected Response:**

```javascript
{
  "success": true,
  "data": {
    "message": "Conversion deleted successfully",
    "_id": "507f1f77bcf86cd799439080"
  }
}
```

---

**Version:** 1.0  
**Last Updated:** January 8, 2026  
**Admin Dashboard:** House of God Church Admin  
**Backend Repository:** https://github.com/abrahamisaiah129/house-of-god-church-backend
