import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.80:5001/api';

const apiService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers your API requires
  },
});

// Add a request interceptor
apiService.interceptors.request.use(
  config => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiService.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  error => {
    console.error('Response error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    return Promise.reject(error);
  }
);

export const getArticles = async () => {
  try {
    const response = await apiService.get('/articles');
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const getArticleById = async (id) => {
  try {
    const response = await apiService.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with id ${id}:`, error);
    throw error;
  }
};

// Add more API calls as needed

export default apiService;