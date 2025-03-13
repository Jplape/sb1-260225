import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  role: 'admin' | 'technician';
  name: string;
}

const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<{ token: string; user: User }>('/auth/login', credentials);
    localStorage.setItem('auth_token', response.data.token);
    return response.data;
  },

  async logout() {
    localStorage.removeItem('auth_token');
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async updateProfile(data: Partial<User>) {
    const response = await api.put<User>('/auth/profile', data);
    return response.data;
  },

  isAuthenticated() {
    return !!localStorage.getItem('auth_token');
  }
};

export default authService;