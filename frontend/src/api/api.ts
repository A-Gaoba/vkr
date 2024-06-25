import axios from 'axios';
import { API_BASE_URL } from './url';

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
  return await API.post('/users', userData);
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  return await API.post('/login', credentials);
};

export const verifyEmail = async (token: string) => {
  return await API.get(`/verify-email?token=${token}`);
};

export const createStudent = async (studentData: {
  firstName: string,
  lastName?: string,
  dateOfBirth?: string,
  email: string,
  phoneNumber?: string,
  address?: string,
  grade?: number,
  class?: string,
  city?: string,
  image?: string,
  password: string
}) => {
  return await API.post('/students', studentData);
};

export default API;
