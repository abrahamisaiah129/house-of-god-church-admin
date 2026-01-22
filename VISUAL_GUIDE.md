# 🎨 Admin Dashboard - Visual Guide

## Interface Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         HEADER BAR                                   │
│  House of God Church - Admin  │ API: Connected ✅ │ Profile ▼      │
└─────────────────────────────────────────────────────────────────────┘
┌──────────────┐ ┌──────────────────────────────────────────────────────┐
│   SIDEBAR    │ │                 MAIN CONTENT AREA                    │
│   (260px)    │ │                                                      │
├──────────────┤ ├──────────────────────────────────────────────────────┤
│              │ │  Dashboard                                           │
│ 🏛️ ADMIN    │ │                                                      │
│              │ │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ ← ← ← ← ← → │ │  │Events│ │Media │ │Depts │ │Users │              │
│              │ │  │ 12   │ │ 45   │ │ 8    │ │ 15   │              │
│ 🏠 Dashboard │ │  └──────┘ └──────┘ └──────┘ └──────┘              │
│              │ │                                                      │
│ 📋 CONTENT   │ │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│ 📸 Media     │ │  │Series│ │Announ│ │Members│ │Convert│             │
│ 📅 Events    │ │  │ 5    │ │ 3    │ │ 250  │ │ 12   │              │
│ ℹ️ About     │ │  └──────┘ └──────┘ └──────┘ └──────┘              │
│              │ │                                                      │
│ ⚙️ MGMT      │ │  Quick Actions                                      │
│ 🏢 Depts    │ │  ┌──────────────┐ ┌──────────────┐                  │
│ 👥 Users     │ │  │Upload Media  │ │Create Event  │                  │
│ 🤝 Converts  │ │  └──────────────┘ └──────────────┘                  │
│              │ │  ┌──────────────┐ ┌──────────────┐                  │
│ 🔜 SOON      │ │  │Edit About    │ │View Converts │                  │
│ 🎬 Sermons   │ │  └──────────────┘ └──────────────┘                  │
│ 📢 Announce  │ │                                                      │
│ ▶️ Welcome   │ │                                                      │
│              │ │                                                      │
│ 📡 Connected │ │                                                      │
│ ✅ Running   │ │                                                      │
└──────────────┘ └──────────────────────────────────────────────────────┘
```

---

## 🎯 Sidebar States

### Expanded (Default)

```
┌──────────────────────┐
│ 🏛️ Admin Panel    ←  │
│ House of God        │
├──────────────────────┤
│ 🏠 Dashboard        │
│                      │
│ 📋 CONTENT          │
│ 📸 Media Gallery    │
│ 📅 Events           │
│ ℹ️ About            │
│                      │
│ ⚙️ MANAGEMENT       │
│ 🏢 Departments      │
│ 👥 Users            │
│ 🤝 Conversions      │
│                      │
│ 🔜 COMING SOON      │
│ 🎬 Sermons          │
│ 📢 Announcements    │
│ ▶️ Welcome Video    │
│                      │
│ 📡 API: Connected   │
│ ✅ Production Ready │
└──────────────────────┘
```

### Collapsed (Compact)

```
┌─────────┐
│ 🏛️  ←  │
│ 🏠      │
│ 📸      │
│ 📅      │
│ ℹ️      │
│ 🏢      │
│ 👥      │
│ 🤝      │
│ 🎬      │
│ 📢      │
│ ▶️      │
│ 📡 ✅  │
└─────────┘
```

---

## 📊 Dashboard Cards

### Statistics Layout

```
┌─ STATISTICS ─────────────────────────────────────────┐
│                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │ 📅 12   │  │ 📸 45   │  │ 🎬 5    │  │ 📢 3   │ │
│  │ Events  │  │ Media   │  │ Sermons │  │ Announ │ │
│  │ View all│  │ View all│  │ Coming  │  │ Coming │ │
│  └─────────┘  └─────────┘  └─────────┘  └────────┘ │
│                                                      │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │
│  │ 🏢 8    │  │ ⏰ 3    │  │ 👥 250  │  │ 🤝 12  │ │
│  │ Depts   │  │ Upcoming│  │ Members │  │ Converts│ │
│  │ View all│  │ View all│  │ View all│  │ View all│ │
│  └─────────┘  └─────────┘  └─────────┘  └────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## 🎨 Color Scheme

```
Primary Blue    : #0d6efd
Success Green   : #198754
Warning Yellow  : #ffc107
Danger Red      : #dc3545
Info Cyan       : #0dcaf0
Dark Gray       : #212529
Light Gray      : #f8f9fa
```

---

## 🖱️ User Interactions

### Sidebar Toggle

```
Click Arrow (←  or →)
│
└─ Sidebar expands/collapses
   └─ Labels show/hide
   └─ Icons remain visible
```

### Navigation

```
Click Sidebar Link
│
└─ Page loads
   └─ Active link highlighted (blue)
   └─ Content updates
```

### Dashboard Actions

```
Click Quick Action Button
│
├─ "Upload Media"    → Opens Media page
├─ "Create Event"    → Opens Events page
├─ "Edit About"      → Opens About page
└─ "View Converts"   → Opens Converts page
```

### User Profile

```
Click Profile Dropdown
│
├─ Shows user info
├─ Profile Settings option
├─ Settings option
└─ Logout option
```

---

## 📱 Responsive Breakpoints

```
Mobile (< 768px)
├─ Single column layout
├─ Sidebar collapses by default
└─ Full-width content

Tablet (768px - 1024px)
├─ 2-column grid for cards
├─ Sidebar can expand
└─ Optimized spacing

Desktop (> 1024px)
├─ Multi-column layout
├─ Full sidebar visible
├─ Cards in 4-column grid
└─ Full features visible
```

---

## 🎯 Page Flow

### Entry Point

```
User clicks http://localhost:3000/admin
                        ↓
        Redirects to /admin dashboard
                        ↓
            Dashboard loads statistics
                        ↓
        User sees stats & quick actions
```

### Navigation Flow

```
Dashboard
├─ Media Gallery
│  └─ View/Upload/Edit/Delete media
│
├─ Events
│  └─ View/Create/Edit/Delete events
│
├─ About
│  └─ Edit church/pastor info
│
├─ Departments
│  └─ Manage departments
│
├─ Users
│  └─ Manage admin users
│
└─ Conversions
   └─ Track new members
```

---

## 🔄 Data Flow

```
Admin Page
    │
    ├─ useState: [stats, loading, error]
    │
    ├─ useEffect (on mount)
    │  │
    │  └─ fetchStats()
    │     │
    │     ├─ getSiteStats() API call
    │     │  │
    │     │  └─ Get from backend
    │     │
    │     └─ Update state with response
    │
    └─ Render
       ├─ If loading: Show spinner
       ├─ If error: Show error message
       └─ If success: Show statistics cards
```

---

## 🎨 Component Hierarchy

```
AdminLayout
├─ Sidebar
│  ├─ Logo Area
│  ├─ Navigation Links
│  └─ Server Status
│
├─ Header
│  ├─ Title
│  ├─ API Status Badge
│  └─ User Profile Dropdown
│
└─ Main Content
   ├─ Dashboard (page.jsx)
   │  ├─ Statistics Cards Grid
   │  ├─ Quick Actions Grid
   │  └─ Refresh Button
   │
   ├─ Media Page
   │  ├─ Media List
   │  ├─ Upload Form
   │  └─ Edit Modal
   │
   ├─ Events Page
   │  ├─ Events List
   │  ├─ Create Form
   │  └─ Edit Modal
   │
   └─ Other Pages...
```

---

## 📊 Statistics Card Structure

```
┌─────────────────────────────┐
│  Icon  │   Title             │
│        │   Number            │
│        │   "View all →"      │
└─────────────────────────────┘
```

---

## 🔐 Access Control

```
Admin Routes (/admin/*)
├─ Dashboard         ✅ Open
├─ Media             ✅ Open (full CRUD)
├─ Events            ✅ Open (full CRUD)
├─ About             ✅ Open (read/edit)
├─ Departments       ✅ Open (full CRUD)
├─ Users             ✅ Open (full CRUD)
└─ Converts          ✅ Open (full CRUD)

Public Routes (/client/*)
├─ Media             ✅ GET only
├─ Events            ✅ GET only
├─ About             ✅ GET only
├─ Departments       ✅ GET only
└─ Converts          ✅ POST only (submit)
```

---

## 🎯 UI States

### Loading State

```
┌─────────────────────────────┐
│                             │
│     ⟳ Loading...           │
│                             │
│    Fetching statistics...   │
│                             │
└─────────────────────────────┘
```

### Error State

```
┌──────────────────────────────────┐
│ ⚠️ Error                    ✕    │
│ Failed to load statistics        │
└──────────────────────────────────┘
```

### Success State

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ 📅 12       │  │ 📸 45       │  │ 🎬 5        │
│ Events      │  │ Media Items │  │ Sermons     │
│ View all →  │  │ View all →  │  │ View all →  │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 🔗 Quick Links Map

```
Dashboard
├─ Upload Media          → /admin/Media
├─ Create Event          → /admin/Events
├─ Edit About            → /admin/About
├─ View Conversions      → /admin/Converts
├─ Total Events Card     → /admin/Events
├─ Media Items Card      → /admin/Media
├─ Departments Card      → /admin/Department
├─ Upcoming Events Card  → /admin/Events
└─ Members Card          → /admin/Users
```

---

## 🎨 Design System

### Typography

- **H1:** 28px, Bold (Dashboard titles)
- **H5:** 18px, Bold (Card headers)
- **Body:** 14px, Regular (Content)
- **Small:** 12px, Regular (Labels)

### Spacing

- **Padding:** 8px, 16px, 24px, 32px
- **Margin:** 8px, 16px, 24px, 32px
- **Gap:** 16px (flex gap)

### Shadows

- **Light:** 0px 1px 3px rgba(0,0,0,0.1)
- **Medium:** 0px 2px 8px rgba(0,0,0,0.15)
- **Dark:** 0px 4px 12px rgba(0,0,0,0.2)

### Borders

- **Radius:** 4px, 8px
- **Width:** 1px
- **Color:** #dee2e6

---

## ✨ Animation & Transitions

```css
Sidebar Toggle:
  Duration: 0.3s
  Timing: ease
  Property: all (width, opacity)

Hover Effects:
  Duration: 0.2s
  Timing: ease
  Property: background-color, color

Links:
  Duration: 0.2s
  Property: color, background-color

Modals/Transitions:
  Duration: 0.3s
  Timing: ease-in-out
  Property: opacity, transform
```

---

## 🎯 User Journey

```
1. User accesses /admin
   ↓
2. Sees Dashboard with statistics
   ↓
3. Can expand/collapse sidebar
   ↓
4. Click navigation link
   ↓
5. Load specific admin page
   ↓
6. Perform CRUD operations
   ↓
7. See updated data
   ↓
8. Return to dashboard
```

---

**End of Visual Guide**
