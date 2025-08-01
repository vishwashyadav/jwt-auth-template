// api.ts - Centralized API service using axios
import axios from 'axios';
// If using TypeScript, ensure axios types are installed: npm install --save-dev @types/axios

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:7016/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (data: { username: string; password: string; role: string }) => {
  const response = await api.post('auth/register', data);
  return response.data;
};

export interface LoginResponse {
  token: string;
  role: string;
  name: string;
  success?: boolean;
  message?: string;
}

export const loginUser = async (data: { username: string; password: string }): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('auth/login', data);
  if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('name', response.data.name);
  }
  return response.data;
};

export const getToken = () => localStorage.getItem('token');

export default api;
