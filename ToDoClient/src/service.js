import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5165";

axios.interceptors.response.use(
  (response) => response, 
  (error) => {
    console.error("API Error:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });

    return Promise.reject(error); 
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get('/tasks');
      return Array.isArray(result.data) ? result.data : [];  
    } catch (error) {
      return [];
    }
  },
  addTask: async (name) => {
    try {
      const newTask = { name, isComplete: false };
      const result = await axios.post('/tasks', newTask);
      return result.data;
    } catch (error) {
      return null;
    }
  },

  setCompleted: async (id, isComplete) => {
    try {
      const result = await axios.put(`/tasks/${id}`, { id, isComplete });
      return result.data;
    } catch (error) {
      return null;
    }
  },

  deleteTask: async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      return false;
    }
  }
};