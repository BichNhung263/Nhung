import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { itemCount } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="navbar glass">
      <div className="container">
        <Link to="/" className="logo">
          <ShoppingBag size={28} color="var(--primary-color)" />
          <span>NhungStore</span>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/promotions">Khuyến mãi</Link></li>
          <li><Link to="/contact">Liên hệ</Link></li>
        </ul>

        <div className="flex items-center gap-4" style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }}>
            <Search size={22} />
          </button>
          
          {isLoggedIn ? (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem' }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hide-on-mobile">{user.name}</span>
                <ChevronDown size={14} />
              </button>
              
              {showUserMenu && (
                <div className="glass" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '1rem', width: '200px', borderRadius: '1rem', padding: '0.5rem', boxShadow: 'var(--shadow-lg)', zIndex: 100 }}>
                  <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: 'var(--text-dark)', fontSize: '0.875rem', borderRadius: '0.75rem' }} className="hover-bg">
                    <User size={16} /> Hồ sơ của tôi
                  </Link>
                  <button 
                    onClick={handleLogout}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', border: 'none', background: 'none', color: '#ef4444', fontSize: '0.875rem', cursor: 'pointer', borderRadius: '0.75rem' }}
                    className="hover-bg"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }}>
              <User size={22} />
            </Link>
          )}

          <Link to="/cart" style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }}>
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--secondary-color)',
                color: 'white',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {itemCount}
              </span>
            )}
          </Link>
          <button style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dark)' }} className="menu-btn">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
