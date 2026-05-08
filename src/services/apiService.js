import axios from 'axios';

// ✅ Tự động nhận diện môi trường: Localhost hoặc Render
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_URL = isLocal 
  ? 'https://localhost:7038' 
  : 'https://hothibichnhung-2123110314.onrender.com';

const API_BASE_URL = `${BASE_URL}/api`;

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.includes('localhost:7038') || url.includes('onrender.com')) {
    // Nếu là link tuyệt đối, chỉ cần đảm bảo nó dùng đúng BASE_URL hiện tại
    const path = url.split('/api/')[1] || url.split('/uploads/')[1];
    if (path) return `${BASE_URL}/uploads/${path.split('/').pop()}`;
  }
  if (url.startsWith('/')) {
    return `${BASE_URL}${url}`;
  }
  return url;
};

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

export const userService = {
  login: (data) => api.post('/Users/login', data),
  register: (data) => api.post('/Users', data),
  forgotPassword: (data) => api.post('/Users/forgot-password', data),
  resetPassword: (data) => api.post('/Users/reset-password', data),
};

export const paymentService = {
  createPayment: (orderId) => api.post(`/Payments/vn-pay?orderId=${orderId}`),
  processVnPayReturn: (queryString) => api.get(`/Payments/vnpay-return${queryString}`),
};

export default api;
