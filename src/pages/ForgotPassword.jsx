import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { userService } from '../services/apiService'; // ✅ Dùng service chung

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await userService.forgotPassword({ email }); // ✅ Tự động đổi URL
      setMessage(response.data.message || 'Yêu cầu đã được gửi!');
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <Link to="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại đăng nhập
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Quên mật khẩu?</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Nhập email để nhận link đặt lại mật khẩu.</p>
        </div>

        {isSuccess ? (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <p className="text-green-600 font-medium">{message}</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {message && <div className="text-sm text-center text-red-600">{message}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-all"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Gửi yêu cầu'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
