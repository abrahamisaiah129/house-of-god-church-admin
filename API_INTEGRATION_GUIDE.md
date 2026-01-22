# 📘 Frontend API Integration Documentation

This document outlines how the Admin Panel frontend consumes the House of God Church Backend API. It details the service configuration, authentication flow, and data models for every module.

---

## 🔌 1. API Service Configuration (`lib/api.js`)

The application uses a centralized Axios instance to handle all HTTP requests.

### **Base Configuration**

- **URL**: Defaults to `http://localhost:3000/api` (or `NEXT_PUBLIC_API_URL` env var).
- **Timeout**: 15,000ms.
- **Headers**: `Content-Type: application/json`.

### **Key Features**

1.  **Auto-Authentication**:
    - The **Request Interceptor** automatically checks `localStorage` for a `token`.
    - If found, it adds the header: `Authorization: Bearer <token>`.

2.  **Response Unwrapping**:
    - The **Response Interceptor** automatically unwraps the standard backend response format.
    - Backend sends: `{ success: true, data: { ... } }`
    - Component receives: `{ ... }` (The data object directly).

3.  **Global Error Handling**:
    - **401 Unauthorized**: Automatically clears `localStorage` and redirects the user to `/login`.
    - **Error Messages**: Extracts readable error messages from various backend error formats (strings, arrays, objects) and rejects the promise with a clean string.

---

## 🔐 2. Authentication Flow

### **Login**

- **Endpoint**: `POST /admin/users/login`
- **Payload**: `{ email, password }`
- **Response**:
  ```json
  {
    "token": "jwt_token_string",
    "user": { "_id": "...", "name": "...", "email": "...", "role": "admin" }
  }
  ```
- **Action**: Save `token` and `user` to `localStorage`.

### **Protected Routes**

- All `/admin/*` endpoints require the token.
- The `api.js` interceptor handles this automatically.

---

## 📦 3. Module Reference & Data Models

Use the exported functions from `lib/api.js` to interact with these modules.

### **1. Media Manager**

- **Functions**: `getMedia`, `createMedia`, `updateMedia`, `deleteMedia`
- **Endpoint**: `/admin/media`
- **Data Model**:
  ```javascript
  {
    title: String,       // Required
    description: String,
    mediaUrl: String,    // Required (Cloudinary URL). Array for images, String for video/audio.
    publicId: String,    // Cloudinary Public ID
    type: String,        // "image" | "video" | "audio"
    category: String,    // "General" | "Events" | "Services"
    eventType: String,   // Optional
    date: Date           // ISO Date string
  }
  ```

### **2. Events Manager**

- **Functions**: `getEvents`, `createEvent`, `updateEvent`, `deleteEvent`
- **Endpoint**: `/admin/events`
- **Data Model**:
  ```javascript
  {
    title: String,       // Required
    date: Date,          // Required (ISO Date)
    time: String,        // Required (e.g., "10:00 AM")
    location: String,    // Required
    description: String  // Required
  }
  ```

### **3. Announcements**

- **Functions**: `getAnnouncements`, `createAnnouncement`, `updateAnnouncement`, `deleteAnnouncement`
- **Endpoint**: `/admin/announcements`
- **Data Model**:
  ```javascript
  {
    title: String,       // Required
    content: String,     // Required
    priority: String,    // "high" | "normal" | "low"
    status: String,      // "active" | "archived"
    date: Date
  }
  ```

### **4. Sermons**

- **Functions**: `getSermons`, `createSermon`, `updateSermon`, `deleteSermon`
- **Endpoint**: `/admin/sermons`
- **Data Model**:
  ```javascript
  {
    title: String,       // Required
    pastor: String,      // Required
    date: Date,          // Required
    description: String,
    audioUrl: String,    // Cloudinary URL
    videoUrl: String,    // Cloudinary URL
    scripture: String,
    status: String       // "published" | "draft"
  }
  ```

### **5. Hero Slides (Homepage Slider)**

- **Functions**: `getHeroSlides`, `createHeroSlide`, `updateHeroSlide`, `deleteHeroSlide`
- **Endpoint**: `/admin/hero`
- **Data Model**:
  ```javascript
  {
    title: String,
    subtitle: String,
    image: String,       // Required (Cloudinary URL)
    order: Number,       // For sorting
    active: Boolean
  }
  ```

### **6. Banners**

- **Functions**: `getBanners`, `createBanner`, `updateBanner`, `deleteBanner`
- **Endpoint**: `/admin/banners`
- **Data Model**:
  ```javascript
  {
    title: String,
    content: String,
    image: String,
    link: String,
    type: String,        // "info" | "promo" | "event" | "alert"
    active: Boolean
  }
  ```

### **7. About Pages**

- **Functions**:
  - `getAboutChurch`, `updateAboutChurch`
  - `getAboutPastor`, `updateAboutPastor`
- **Endpoint**: `/admin/about/church` or `/admin/about/pastor`
- **Data Model**:
  ```javascript
  {
    title: String,
    subtitle: String,
    body: String,        // Rich text / HTML
    image: String
  }
  ```

### **8. Departments**

- **Functions**: `getDepartments`, `createDepartment`, `updateDepartment`, `deleteDepartment`
- **Endpoint**: `/admin/departments`
- **Data Model**:
  ```javascript
  {
    name: String,        // Required
    description: String,
    head: String,        // Name of department head
    email: String,
    phone: String,
    members: Number
  }
  ```

### **9. Dashboard Stats**

- **Function**: `getSiteStats`
- **Endpoint**: `/admin/stats`
- **Response**:
  ```javascript
  {
    totalEvents: Number,
    totalMedia: Number,
    totalSermons: Number,
    totalAnnouncements: Number,
    totalDepartments: Number,
    upcomingEvents: Number,
    activeAnnouncements: Number,
    totalMembers: Number,
    lastUpdated: Date
  }
  ```

### **10. Converts**

- **Functions**: `getConverts`, `updateConvertStatus`, `deleteConvert`
- **Endpoint**: `/admin/converts`
- **Data Model**:
  ```javascript
  {
    name: String,
    email: String,
    phone: String,
    address: String,
    conversionDate: Date,
    status: String       // "pending" | "contacted" | "approved"
  }
  ```

---

## 🛠️ 4. Implementation Tips

1.  **Image Uploads**:
    - The backend expects **URLs**, not file objects.
    - Frontend must upload files to Cloudinary first, then send the resulting `secure_url` to the backend API.

2.  **Date Handling**:
    - Backend sends ISO strings (e.g., `2023-12-25T00:00:00.000Z`).
    - Use a library like `date-fns` or `moment` to format these for display in the UI.
    - When sending dates back, ensure they are valid ISO strings or Date objects.

3.  **Rich Text**:
    - For `About` pages and `Announcements`, use a rich text editor (like React Quill).
    - The backend stores the raw HTML string in the `body` or `content` fields.