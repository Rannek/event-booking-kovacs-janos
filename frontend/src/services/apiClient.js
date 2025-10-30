import axios from 'axios';

const API_URL = 'http://localhost/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const registerUser = (userData) => apiClient.post('/regisztracio', userData);
export const loginUser = (credentials) => apiClient.post('/bejelentkezes', credentials);
export const logoutUser = () => apiClient.post('/kijelentkezes');
export const getProfile = () => apiClient.get('/profil');

export const getEvents = () => apiClient.get('/esemenyek');

export const getMyBookings = () => apiClient.get('/sajat-foglalasok');
export const createBooking = (eventId, helyek_szama) => apiClient.post(`/esemenyek/${eventId}/foglalas`, { helyek_szama });
export const deleteBooking = (bookingId) => apiClient.delete(`/foglalasok/${bookingId}`);

export default apiClient;
