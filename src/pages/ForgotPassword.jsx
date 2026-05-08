import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle, KeyRound } from 'lucide-react';
import { userService } from '../services/apiService';

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
      const response = await userService.forgotPassword({ email });
      setMessage(response.data.message || 'Yêu cầu đã được gửi!');
      setIsSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '450px', background: 'var(--white)', borderRadius: '2rem', padding: '3rem', boxShadow: 'var(--shadow-xl)', border: '1px solid #f1f5f9' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '1.25rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}>
            <KeyRound size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Quên mật khẩu?</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Nhập email của bạn để nhận liên kết đặt lại mật khẩu</p>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={40} color="#22c55e" />
            </div>
            <h3 style={{ color: '#166534', marginBottom: '1rem', fontWeight: 700 }}>Thành công!</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>{message}</p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', width: '100%', padding: '1rem', textDecoration: 'none', textAlign: 'center' }}>
              Quay lại Đăng nhập
            </Link>
          </div>
        ) : (
          <>
            {message && (
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Email đăng ký</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '1rem', border: '1.5px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', background: 'var(--bg-color)' }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '1rem', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? <><Loader2 size={20} className="spinner" /> Đang gửi yêu cầu...</> : 'Gửi yêu cầu'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
                <ArrowLeft size={16} /> Quay lại Đăng nhập
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
