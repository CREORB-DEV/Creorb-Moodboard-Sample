import api from '../api/axios';

export const moodService = {
  async getMoods() {
    try {
      const response = await api.get('/moods');
      return response.data.moods;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch moods' };
    }
  },

  async getMoodById(id) {
    try {
      const response = await api.get(`/moods/${id}`);
      return response.data.mood;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to fetch mood' };
    }
  },

  async createMood(mood, note, date) {
    try {
      const response = await api.post('/moods', { mood, note, date });
      return response.data.mood;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to create mood' };
    }
  },

  async updateMood(id, mood, note, date) {
    try {
      const response = await api.put(`/moods/${id}`, { mood, note, date });
      return response.data.mood;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to update mood' };
    }
  },

  async deleteMood(id) {
    try {
      const response = await api.delete(`/moods/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to delete mood' };
    }
  },
};
