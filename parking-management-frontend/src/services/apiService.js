import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add token to headers
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: token } : {};
};

// Admin login
export const adminLogin = async (username, password) => {
  const response = await axios.post(`${API_URL}/admin/login`, { username, password });
  return response.data;
};

// Fetch parking logs
export const getParkingLogs = async () => {
  const response = await axios.get(`${API_URL}/parking/logs`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

// Log vehicle entry
export const logVehicleEntry = async (formData) => {
  const response = await axios.post(`${API_URL}/parking/entry`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // Required for file uploads
  });
  return response.data;
};

// Log vehicle exit
export const logVehicleExit = async (data) => {
  const response = await axios.post(`${API_URL}/parking/exit`, data, {
    headers: getAuthHeader(),
  });
  return response.data;
};