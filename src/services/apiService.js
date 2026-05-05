import axios from 'axios';

const API_BASE_URL = 'https://hothibichnhung-2123110314.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getAll: () => api.get('/Products'),
  getById: (id) => api.get(`/Products/${id}`),
};

export const categoryService = {
  getAll: () => api.get('/Categories'),
  getById: (id) => api.get(`/Categories/${id}`),
};

export const orderService = {
  create: (data) => api.post('/Orders', data),
  getAll: () => api.get('/Orders'),
  getById: (id) => api.get(`/Orders/${id}`),
};

export const userService = {
  login: (credentials) => api.post('/Users/login', credentials),
  register: (userData) => api.post('/Users', userData),
  getAll: () => api.get('/Users'),
  getById: (id) => api.get(`/Users/${id}`),
};

export const paymentService = {
  createVnPayUrl: (data) => api.post('/Payments/create-vnpay-url', data),
  processVnPayReturn: (params) => api.get(`/Payments/vnpay-return${params}`),
  createDemoVnPayUrl: async ({ amount, orderId }) => {
    // Gọi thẳng sang Node.js server demo vnpay
    const response = await fetch(`http://localhost:3000/payment?amount=${amount}&orderId=${orderId}`);
    return await response.json();
  }
};

export default api;
