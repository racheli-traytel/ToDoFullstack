import axios from 'axios';

const apiUrl =process.env.REACT_APP_API_URL;
axios.defaults.baseURL = apiUrl;

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    console.log("API Base URL:", process.env.REACT_APP_API_URL);
    const result = await axios.get('/tasks');
    return result.data?result.data:[];
  },

  addTask: async (name) => {
    await axios.post('/tasks', { name: name, isComplete: false });

  },
  setCompleted: async (id, isComplete,name) => {
    await axios.put(`/tasks/${id}`, {name:name,isComplete: isComplete });
  },

  deleteTask: async (id) => {
    await axios.delete(`/tasks/${id}`);
  }
};






