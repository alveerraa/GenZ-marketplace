// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Automatically attach token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
