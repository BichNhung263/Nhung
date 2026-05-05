import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, itemCount } = useCart();

  const shippingFee = cartTotal > 500000 ? 0 : 30000;
  const finalTotal = cartTotal + (cartTotal > 0 ? shippingFee : 0);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <ShoppingBag size={48} color="var(--text-light)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>Giỏ hàng của bạn đang trống</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={18} />
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1.5rem', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-dark)' }}>
        Giỏ hàng của bạn ({itemCount} sản phẩm)
      </h1>

      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Cart Items List */}
        <div style={{ flex: '1 1 600px', background: 'var(--white)', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '1rem', overflow: 'hidden', flexShrink: 0, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ShoppingBag size={32} color="#cbd5e1" />
                  )}
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>{item.name}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Danh mục: {item.category?.name || 'Sản phẩm'}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '0.5rem', borderRadius: '0.5rem', transition: 'all 0.2s' }}
                      className="hover:bg-red-50"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-color)', borderRadius: '9999px', padding: '0.25rem' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'var(--white)', borderRadius: '50%', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ width: '40px', textAlign: 'center', fontSize: '0.875rem', fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'var(--white)', borderRadius: '50%', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--text-dark)' }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, marginTop: '2rem' }}>
            <ArrowLeft size={16} /> Tiếp tục mua sắm
          </Link>
        </div>

        {/* Order Summary */}
        <div style={{ flex: '1 1 350px', background: 'var(--white)', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid #f1f5f9', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>Tóm tắt đơn hàng</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)' }}>
              <span>Tổng tiền hàng</span>
              <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{cartTotal.toLocaleString('vi-VN')}đ</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)' }}>
              <span>Phí vận chuyển</span>
              <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}</span>
            </div>
            {shippingFee > 0 && (
              <p style={{ fontSize: '0.75rem', color: 'var(--secondary-color)', marginTop: '-0.5rem' }}>* Miễn phí vận chuyển cho đơn từ 500,000đ</p>
            )}
          </div>

          <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-dark)' }}>Tổng thanh toán</span>
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-color)' }}>{finalTotal.toLocaleString('vi-VN')}đ</span>
          </div>

          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', textAlign: 'center' }}>
            Tiến hành thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
