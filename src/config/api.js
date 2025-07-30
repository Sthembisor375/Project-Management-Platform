// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_URL}/api/auth/login`,
    REGISTER: `${API_URL}/api/auth/register`,
    LOGOUT: `${API_URL}/api/auth/logout`,
  },
  TICKETS: {
    BASE: `${API_URL}/api/tickets/`,
    BY_ID: (id) => `${API_URL}/api/tickets/${id}`,
  },
  USERS: {
    BASE: `${API_URL}/api/users/`,
    CLIENTS: `${API_URL}/api/users/clients`,
  },
};
