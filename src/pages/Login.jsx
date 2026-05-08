import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Loader2, UserPlus, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await userService.login({ email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ width: '100%', maxWidth: '450px', background: 'var(--white)', borderRadius: '2rem', padding: '3rem', boxShadow: 'var(--shadow-xl)', border: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '1.25rem', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(79, 70, 229, 0.2)' }}>
            <LogIn size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Chào mừng trở lại</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Đăng nhập để quản lý đơn hàng và giỏ hàng của bạn</p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Email</label>
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

          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)' }}>Mật khẩu</label>
              <Link to="/forgot-password" style={{ fontSize: '0.75rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>Quên mật khẩu?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.875rem 1rem 0.875rem 3rem', borderRadius: '1rem', border: '1.5px solid #e2e8f0', outline: 'none', transition: 'all 0.2s', background: 'var(--bg-color)' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <><Loader2 size={20} className="spinner" /> Đang đăng nhập...</> : 'Đăng nhập'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem', color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={14} /> Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Login;
