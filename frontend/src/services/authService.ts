import apiClient from './apiClient';
import { AuthResponse } from '../types';

export const authService = {
  async signup(email: string, password: string, fullName: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/signup', {
      email,
      password,
      fullName,
    });
    return response.data;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  async getProfile(): Promise<AuthResponse> {
    const response = await apiClient.get<AuthResponse>('/auth/profile');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
