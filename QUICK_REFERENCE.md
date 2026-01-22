# 🚀 Quick Reference - Admin Dashboard

## Start Here

### 1. Run the Application

```bash
cd "c:\Users\user\Desktop\final versions\house-of-god-church-admin\house-of-god-church-admin"
npm run dev
```

👉 Open: **http://localhost:3000/admin**

### 2. Choose Your Backend

Edit `.env.local`:

**Development (Local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

**Production (Render):**

```env
NEXT_PUBLIC_API_URL=https://house-of-god-church-backend.onrender.com/api
```

---

## 📁 Important Files

| File                          | Purpose                        |
| ----------------------------- | ------------------------------ |
| `/app/admin/page.jsx`         | Dashboard home with statistics |
| `/app/admin/layout.jsx`       | Admin layout with sidebar      |
| `/app/components/Sidebar.jsx` | Navigation sidebar             |
| `/app/components/Header.jsx`  | Top header bar                 |
| `/lib/api.js`                 | All API functions              |
| `/lib/cloudinary.js`          | Media upload functions         |
| `.env.local`                  | Configuration                  |

---

## 🎯 Navigation

```
Admin Dashboard
├─ Dashboard (Home)
├─ Media Gallery (Images/Videos)
├─ Events (Event Management)
├─ About (Church & Pastor Info)
├─ Departments (Org Structure)
├─ Users (Admin Users)
└─ Conversions (New Members)
```

Click **← arrow** on sidebar to collapse/expand

---

## 🔌 API Functions

```javascript
// Media
getMedia() / createMedia(data) / updateMedia(id, data) / deleteMedia(id);

// Events
getEvents() / createEvent(data) / updateEvent(id, data) / deleteEvent(id);

// About
getAboutChurch() / updateAboutChurch(data);
getAboutPastor() / updateAboutPastor(data);

// Departments
getDepartments() /
  createDepartment(data) /
  updateDepartment(id, data) /
  deleteDepartment(id);

// Users
getUsers() / createUser(data) / updateUser(id, data) / deleteUser(id);

// Converts
getConverts() / updateConvertStatus(id, status) / deleteConvert(id);

// Stats
getSiteStats();
```

All return: `{ success: boolean, data: any, error?: string }`

---

## 📊 Dashboard Features

| Feature            | Status        |
| ------------------ | ------------- |
| Statistics Cards   | ✅ Working    |
| Quick Actions      | ✅ Working    |
| API Connection     | ✅ Configured |
| Sidebar Navigation | ✅ Working    |
| User Profile Menu  | ✅ Working    |
| Responsive Design  | ✅ Working    |

---

## 🛠️ Common Tasks

### Upload Media

1. Go to **Media Gallery**
2. Click **Upload Media** button
3. Select image/video/audio
4. Add title, description
5. Click **Upload**

### Create Event

1. Go to **Events**
2. Click **Create Event**
3. Fill event details
4. Set date/time
5. Click **Save**

### Update Church Info

1. Go to **About**
2. Click **Edit**
3. Update church or pastor info
4. Upload image if needed
5. Click **Save**

---

## 🔧 Troubleshooting

**API Connection Failed?**

- Check if backend is running
- Verify `.env.local` has correct API URL
- Check browser console for errors

**Sidebar Not Showing?**

- Refresh page
- Clear browser cache
- Check Bootstrap CSS is loaded

**Upload Failing?**

- Check file size
- Verify Cloudinary credentials
- Check file type is allowed

---

## 📞 API Endpoints

**Development:** `http://localhost:3001/api`
**Production:** `https://house-of-god-church-backend.onrender.com/api`

### Admin Routes

- `GET/POST /admin/media`
- `GET/POST /admin/events`
- `GET/PUT /admin/about/:section`
- `GET/POST /admin/departments`
- `GET/POST /admin/users`
- `GET/PUT /admin/converts`

### Client Routes

- `GET /client/media`
- `GET /client/events`
- `GET /client/about`
- `GET /client/departments`
- `POST /client/converts`

---

## 🎨 UI Components

**Sidebar**

- Collapsible menu
- Active page highlight
- Server status
- Navigation icons

**Header**

- API status badge
- User dropdown
- Settings menu
- Logout button

**Dashboard**

- 7 Statistics cards
- Quick action buttons
- Real-time data
- Responsive grid

---

## 📚 Documentation

1. **ADMIN_SETUP_GUIDE.md** - Full setup guide
2. **BACKEND_API_SPEC.md** - API documentation
3. **IMPLEMENTATION_SUMMARY.md** - What's included
4. **This file** - Quick reference

---

## ⚡ Build Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm start         # Start production
npm run lint      # Check code quality
```

---

## ✨ Status

✅ Build passes
✅ All routes working
✅ API integrated
✅ Production ready

---

## 🎯 Next Steps

1. Start dev server: `npm run dev`
2. Navigate to admin: http://localhost:3000/admin
3. Login with credentials
4. Manage your church content!

---

**Version:** 1.0.0 | **Status:** Production Ready ✅
