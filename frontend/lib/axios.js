import axios from "axios";
import Cookies from "js-cookie";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Add token dynamically before each request
instance.interceptors.request.use((config) => {
  let token;

  // Only read localStorage in browser
  if (typeof window !== "undefined") {
    token = Cookies.get("token") || localStorage.getItem("token");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default instance;
