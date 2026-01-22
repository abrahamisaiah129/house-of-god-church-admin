import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error accessing token from local storage", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor to handle standard format and errors
api.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success) {
      return response.data.data !== undefined
        ? response.data.data
        : response.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Prevent redirect loop if the 401 comes from the login endpoint itself
      if (
        typeof window !== "undefined" &&
        (!error.config ||
          !error.config.url ||
          !error.config.url.includes("/login"))
      ) {
        try {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        } catch (e) {
          console.error("Error clearing local storage", e);
        }
        window.location.href = "/login";
      }
    }
    const responseData = error.response?.data;
    let errorMessage =
      responseData?.error ||
      responseData?.message ||
      (Array.isArray(responseData?.errors)
        ? responseData.errors
            .map((err) =>
              typeof err === "object" && err !== null
                ? err.msg || err.message || JSON.stringify(err)
                : err,
            )
            .join(", ")
        : null) ||
      (typeof responseData === "string" ? responseData : "") ||
      error.message ||
      "An unknown error occurred";

    if (typeof errorMessage === "object") {
      errorMessage = JSON.stringify(errorMessage);
    }
    return Promise.reject(new Error(errorMessage));
  },
);

/* 
  Phase 2: Content Management Modules 
*/

// Media Manager
export const getMedia = (params) => api.get("/admin/media", { params });
export const createMedia = (data) => api.post("/admin/media", data);
export const updateMedia = (id, data) => api.put(`/admin/media/${id}`, data);
export const deleteMedia = (id) => api.delete(`/admin/media/${id}`);

// Events Manager
export const getEvents = (params) => api.get("/admin/events", { params });
export const createEvent = (data) => api.post("/admin/events", data);
export const updateEvent = (id, data) => api.put(`/admin/events/${id}`, data);
export const deleteEvent = (id) => api.delete(`/admin/events/${id}`);

// Announcements Manager
export const getAnnouncements = (params) =>
  api.get("/admin/announcements", { params });
export const createAnnouncement = (data) =>
  api.post("/admin/announcements", data);
export const updateAnnouncement = (id, data) =>
  api.put(`/admin/announcements/${id}`, data);
export const deleteAnnouncement = (id) =>
  api.delete(`/admin/announcements/${id}`);

// Sermons Manager
export const getSermons = (params) => api.get("/admin/sermons", { params });
export const createSermon = (data) => api.post("/admin/sermons", data);
export const updateSermon = (id, data) => api.put(`/admin/sermons/${id}`, data);
export const deleteSermon = (id) => api.delete(`/admin/sermons/${id}`);

/* 
  Phase 3: Site Configuration Modules 
*/

// Hero Slides
export const getHeroSlides = (params) => api.get("/admin/hero", { params });
export const createHeroSlide = (data) => api.post("/admin/hero", data);
export const updateHeroSlide = (id, data) => api.put(`/admin/hero/${id}`, data);
export const deleteHeroSlide = (id) => api.delete(`/admin/hero/${id}`);

// Banners
export const getBanners = (params) => api.get("/admin/banners", { params });
export const createBanner = (data) => api.post("/admin/banners", data);
export const updateBanner = (id, data) => api.put(`/admin/banners/${id}`, data);
export const deleteBanner = (id) => api.delete(`/admin/banners/${id}`);

// About Pages
export const getAboutChurch = () => api.get("/admin/about/church");
export const updateAboutChurch = (data) => api.put("/admin/about/church", data);
export const getAboutPastor = () => api.get("/admin/about/pastor");
export const updateAboutPastor = (data) => api.put("/admin/about/pastor", data);

// Departments
export const getDepartments = (params) =>
  api.get("/admin/departments", { params });
export const createDepartment = (data) => api.post("/admin/departments", data);
export const updateDepartment = (id, data) =>
  api.put(`/admin/departments/${id}`, data);
export const deleteDepartment = (id) => api.delete(`/admin/departments/${id}`);

/* 
  Phase 4: Dashboard & Analytics 
*/

// Dashboard
export const getDashboardStats = (params) =>
  api.get("/admin/stats", { params });
export const getSiteStats = getDashboardStats;

// Converts
export const getConverts = (params) => api.get("/admin/converts", { params });
export const updateConvertStatus = (id, status) =>
  api.put(`/admin/converts/${id}`, { status });
export const deleteConvert = (id) => api.delete(`/admin/converts/${id}`);

// Users Management
export const getUsers = (params) => api.get("/admin/users", { params });
export const createUser = (data) => api.post("/admin/users", data);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export default api;
