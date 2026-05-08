import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Mail, Save, Loader2, CheckCircle } from 'lucide-react';
import { userService } from '../services/apiService';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: '' // Email thường không cho đổi để giữ định danh
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Lấy thông tin user từ localStorage (giả sử bạn lưu user ở đó khi login)
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUserData(savedUser);
      setFormData({
        name: savedUser.name || '',
        phone: savedUser.phone || '',
        address: savedUser.address || '',
        email: savedUser.email || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await userService.updateProfile(userData.id, {
        ...userData, // Giữ các thông tin cũ (id, password, role...)
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      });

      // Cập nhật lại localStorage
      const updatedUser = { ...userData, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);

      setIsSuccess(true);
      setMessage('Thông tin cá nhân đã được cập nhật thành công!');
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setMessage('Có lỗi xảy ra khi cập nhật thông tin.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-8 py-12 text-center text-white">
          <div className="inline-block p-4 rounded-full bg-white/20 mb-4">
            <User className="w-16 h-16" />
          </div>
          <h1 className="text-3xl font-bold">{formData.name}</h1>
          <p className="opacity-80">{formData.email}</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <User className="w-4 h-4 mr-2" /> Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2" /> Địa chỉ giao hàng
                </label>
                <textarea
                  name="address"
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="sm:col-span-2 space-y-2 opacity-60">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> Email (Không thể thay đổi)
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-lg cursor-not-allowed"
                  value={formData.email}
                  disabled
                />
              </div>
            </div>

            {message && (
              <div className={`p-4 rounded-lg flex items-center ${isSuccess ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {isSuccess && <CheckCircle className="w-5 h-5 mr-2" />}
                {message}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Save className="w-5 h-5 mr-2" />
                )}
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
