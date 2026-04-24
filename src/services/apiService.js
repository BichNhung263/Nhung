import axios from 'axios';

const API_BASE_URL = 'https://localhost:7038/api';

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
  // Liên kết với server Node.js riêng (cổng 3000) để tạo URL thanh toán chuẩn xác
  createVnPayUrl: (data) => axios.get(`http://localhost:3000/payment?amount=${data.amount}&orderId=${data.orderId}`),
  processVnPayReturn: (params) => api.get(`/Payments/vnpay-return${params}`),
};

export default api;
