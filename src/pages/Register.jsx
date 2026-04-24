import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, MapPin, UserPlus, Loader2, ArrowLeft } from 'lucide-react';
import { userService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Register user
      const res = await userService.register(form);
      // 2. Auto-login after registration
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi đăng ký. Email có thể đã tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 3rem',
    borderRadius: '1rem',
    border: '1.5px solid #e2e8f0',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'var(--bg-color)',
    fontSize: '0.9rem'
  };

  const iconStyle = {
    position: 'absolute',
    left: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--text-light)'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-dark)',
    marginBottom: '0.5rem'
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <div style={{ width: '100%', maxWidth: '500px', background: 'var(--white)', borderRadius: '2rem', padding: '3rem', boxShadow: 'var(--shadow-xl)', border: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '1.25rem', background: 'linear-gradient(135deg, var(--secondary-color), #f472b6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 10px 20px rgba(236, 72, 153, 0.2)' }}>
            <UserPlus size={32} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>Tạo tài khoản mới</h1>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Khám phá hàng ngàn sản phẩm thời trang hấp dẫn</p>
        </div>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '1rem', borderRadius: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={labelStyle}>Họ và tên *</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={iconStyle} />
              <input name="name" required value={form.name} onChange={handleChange} placeholder="Nguyễn Văn A" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={iconStyle} />
              <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Mật khẩu *</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={iconStyle} />
              <input name="password" type="password" required value={form.password} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Số điện thoại</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={iconStyle} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="09xxx" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Địa chỉ</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={iconStyle} />
                <input name="address" value={form.address} onChange={handleChange} placeholder="TP.HCM" style={inputStyle} />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '1rem', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <><Loader2 size={20} className="spinner" /> Đang xử lý...</> : 'Đăng ký tài khoản'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            Đã có tài khoản?{' '}
            <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
