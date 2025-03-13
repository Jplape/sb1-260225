import { useState, useEffect } from 'react';
import authService from '../services/authService';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'technician';
  name: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (authService.isAuthenticated()) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { user } = await authService.login({ email, password });
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      setError('Invalid credentials');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError('Failed to logout');
    }
  };

  return {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: authService.isAuthenticated(),
  };
}

export default useAuth;