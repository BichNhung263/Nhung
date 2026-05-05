import React, { useState, useEffect } from 'react';
import { Ticket, Zap, Gift, Clock, ArrowRight, Tag, Percent, ShoppingCart, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService } from '../services/apiService';
import { useCart } from '../context/CartContext';

const Promotions = () => {
  const [discountProducts, setDiscountProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, productName: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const res = await productService.getAll();
        // Giả lập sản phẩm có giảm giá (ví dụ sản phẩm có ID chẵn)
        const promoItems = res.data.map(p => ({
          ...p,
          oldPrice: p.id % 2 === 0 ? p.price * 1.25 : null,
          discount: p.id % 2 === 0 ? 20 : null
        })).filter(p => p.discount !== null);

        setDiscountProducts(promoItems);
      } catch (error) {
        console.error('Lỗi khi tải khuyến mãi:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast({ show: true, productName: product.name });
    setTimeout(() => setToast({ show: false, productName: '' }), 3000);
  };

  const vouchers = [
    { code: 'NHUNGNEW', desc: 'Giảm 50k cho đơn hàng đầu tiên', min: 'Đơn từ 200k', color: '#4f46e5' },
    { code: 'FREESHIP', desc: 'Miễn phí vận chuyển toàn quốc', min: 'Đơn từ 500k', color: '#ec4899' },
    { code: 'NHUNG20', desc: 'Giảm 20% cho bộ sưu tập hè', min: 'Đơn từ 1tr', color: '#f59e0b' },
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải ưu đãi hấp dẫn...</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      {/* Banner Khuyến Mãi */}
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5, #ec4899)',
        borderRadius: '2.5rem',
        padding: '4rem 3rem',
        color: 'white',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1.25rem', borderRadius: '2rem', width: 'fit-content', marginBottom: '1.5rem', fontSize: '0.9rem', fontWeight: 700 }}>
            <Zap size={18} fill="white" /> FLASH SALE ĐANG DIỄN RA
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Siêu Ưu Đãi <br /> Mùa Hè 2026
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem' }}>
            Giảm giá lên đến 50% cho tất cả các mặt hàng thời trang nam nữ. Đừng bỏ lỡ cơ hội sở hữu những món đồ yêu thích với mức giá không tưởng.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn" style={{ background: 'white', color: '#4f46e5', fontWeight: 800, padding: '1rem 2rem' }}>
              Mua Ngay
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem' }}>
              <Clock size={20} /> Kết thúc sau: 12:45:30
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: '-50px', top: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', right: '100px', bottom: '-20px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <Percent size={200} style={{ position: 'absolute', right: '50px', top: '50%', transform: 'translateY(-50%)', opacity: 0.1 }} />
      </section>

      {/* Mã Giảm Giá */}
      <section style={{ marginBottom: '5rem' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Mã Giảm Giá Của Bạn</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Lưu mã ngay để sử dụng khi thanh toán</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {vouchers.map((v, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '1.5rem',
              padding: '1.5rem',
              border: '2px dashed #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '1rem',
                background: v.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Ticket size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>{v.code}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>{v.desc}</p>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: v.color }}>{v.min}</span>
              </div>
              <button style={{
                padding: '0.5rem 1rem',
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '0.75rem',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}>
                Sao chép
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sản Phẩm Đang Giảm Giá */}
      <section>
        <div className="section-header">
          <div>
            <h2 className="section-title">Sản Phẩm Đang Sale</h2>
            <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Cơ hội cuối cùng để mua với giá ưu đãi</p>
          </div>
        </div>

        <div className="product-grid">
          {discountProducts.length > 0 ? discountProducts.map((product) => (
            <div key={product.id} className="product-card">
              <span className="product-badge" style={{ background: '#ef4444', color: 'white' }}>-{product.discount}%</span>
              <Link to={`/product/${product.id}`} className="product-image-container">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="product-image" />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                    <ShoppingCart size={40} color="#cbd5e1" />
                  </div>
                )}
              </Link>

              <div className="product-info">
                <span className="product-category">{product.category?.name}</span>
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="product-name">{product.name}</h3>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ef4444' }}>{product.price?.toLocaleString('vi-VN')}đ</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-light)', textDecoration: 'line-through' }}>{product.oldPrice?.toLocaleString('vi-VN')}đ</span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-primary"
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <ShoppingCart size={18} /> Thêm vào giỏ
                </button>
              </div>
            </div>
          )) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>Hiện chưa có sản phẩm giảm giá.</p>
          )}
        </div>
      </section>

      {/* Toast Notification */}
      <div className={`cart-toast ${toast.show ? 'cart-toast-show' : ''}`}>
        <div className="cart-toast-icon">
          <Check size={18} />
        </div>
        <div className="cart-toast-content">
          <span className="cart-toast-title">Đã thêm vào giỏ hàng!</span>
          <span className="cart-toast-product">{toast.productName}</span>
        </div>
        <Link to="/cart" className="cart-toast-action">
          Xem giỏ
        </Link>
      </div>
    </div>
  );
};

export default Promotions;
