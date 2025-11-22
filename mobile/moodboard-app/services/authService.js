import api from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { user, session } = response.data;

      // Store tokens and user data
      await AsyncStorage.setItem('access_token', session.access_token);
      await AsyncStorage.setItem('refresh_token', session.refresh_token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { user, session };
    } catch (error) {
      throw error.response?.data || { error: 'Login failed' };
    }
  },

  async register(email, password, name) {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      const { user, session } = response.data;

      if (session) {
        await AsyncStorage.setItem('access_token', session.access_token);
        await AsyncStorage.setItem('refresh_token', session.refresh_token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      }

      return { user, session };
    } catch (error) {
      throw error.response?.data || { error: 'Registration failed' };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      await AsyncStorage.multiRemove(['access_token', 'refresh_token', 'user']);
    }
  },

  async getCurrentUser() {
    try {
      const userStr = await AsyncStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      return null;
    }
  },

  async isAuthenticated() {
    const token = await AsyncStorage.getItem('access_token');
    return !!token;
  },
};
