import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { userService } from '../services/apiService';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await userService.resetPassword({
        email,
        token,
        newPassword: password
      });
      setIsSuccess(true);
      setMessage('Mật khẩu của bạn đã được đặt lại thành công.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Token không hợp lệ hoặc đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div style={{ width: '100%', maxWidth: '450px', background: 'var(--white)', borderRadius: '2rem', padding: '3rem', boxShadow: 'var(--shadow-xl)', border: '1px solid #f1f5f9', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <AlertCircle size={40} color="#ef4444" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>Link không hợp lệ</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Yêu cầu đặt lại mật khẩu của bạn đã hết hạn hoặc không hợp lệ. Vui lòng gửi yêu cầu mới.</p>
          <Link to="/forgot-password" className="btn btn-primary" style={{ display: 'inline-block', width: '100%', padding: '1rem', textDecoration: 'none' }}>
            Gửi lại yêu cầu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '450px', background: 'var(--white)', borderRadius: '2rem', padding: '3rem', boxShadow: 'var(--shadow-xl)', border: '1px solid #f1f5f9' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '1.25rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Đặt lại mật khẩu</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Vui lòng nhập mật khẩu mới cho tài khoản {email}</p>
        </div>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ width: '80px', height: '80px', background: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle size={40} color="#22c55e" />
            </div>
            <h3 style={{ color: '#166534', marginBottom: '1rem', fontWeight: 700 }}>Thành công!</h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{message}</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Bạn sẽ được chuyển hướng về trang đăng nhập trong giây lát...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {message && (
              <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '1rem', fontSize: '0.85rem', textAlign: 'center' }}>
                {message}
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Mật khẩu mới</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  style={{ width: '100%', padding: '0.875rem 3rem 0.875rem 3rem', borderRadius: '1rem', border: '1.5px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', background: 'var(--bg-color)' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-light)' }}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Xác nhận mật khẩu</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input 
                  type="password"
                  required 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu mới"
                  style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '1rem', border: '1.5px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', background: 'var(--bg-color)' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? <><Loader2 size={20} className="spinner" /> Đang cập nhật...</> : 'Cập nhật mật khẩu'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
