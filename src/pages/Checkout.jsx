import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, Phone, User, Mail, CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService, paymentService } from '../services/apiService';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart, itemCount } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: '',
    note: ''
  });

  const shippingFee = cartTotal > 500000 ? 0 : 30000;
  const finalTotal = cartTotal + (cartTotal > 0 ? shippingFee : 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ tên';
    if (!form.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^(0[3-9])\d{8}$/.test(form.phone.trim())) newErrors.phone = 'Số điện thoại không hợp lệ';
    if (!form.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ';
    if (!form.city.trim()) newErrors.city = 'Vui lòng nhập tỉnh/thành phố';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Email không hợp lệ';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Create a descriptive note with customer info since backend has limited fields
      const combinedNote = `Khách hàng: ${form.fullName}
Số ĐT: ${form.phone}
Địa chỉ: ${form.address}, ${form.city}
Ghi chú: ${form.note || 'Không có'}`;

      const orderData = {
        userId: user?.id || 1, // Dùng ID người dùng đăng nhập, hoặc mặc định 1
        totalPrice: finalTotal,
        status: 0, // 0 = Pending (Enum)
        orderDetails: cartItems.map(item => ({
          productId: item.id,
          price: item.price,
          quantity: item.quantity
        }))
      };

      const response = await orderService.create(orderData);
      const createdOrder = response.data;

      if (paymentMethod === 'vnpay') {
        // Gọi API lấy URL thanh toán VNPay
        const vnpayResponse = await paymentService.createVnPayUrl({
          orderId: createdOrder.id,
          amount: finalTotal
        });
        
        // Chuyển hướng sang VNPay
        window.location.href = vnpayResponse.data.url;
      } else {
        clearCart();
        navigate('/order-success');
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
      const errorMsg = error.response?.data?.title || error.response?.data || error.message;
      alert(`Có lỗi xảy ra: ${errorMsg}. Vui lòng kiểm tra lại!`);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100px', height: '100px', background: 'var(--bg-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
          <ShoppingBag size={48} color="var(--text-light)" />
        </div>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Giỏ hàng trống</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Bạn chưa có sản phẩm nào để thanh toán.</p>
        <Link to="/" className="btn btn-primary"><ArrowLeft size={18} /> Tiếp tục mua sắm</Link>
      </div>
    );
  }

  const inputStyle = (field) => ({
    width: '100%',
    padding: '0.875rem 1rem 0.875rem 2.75rem',
    border: `1.5px solid ${errors[field] ? '#ef4444' : '#e2e8f0'}`,
    borderRadius: '0.875rem',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'var(--bg-color)',
    color: 'var(--text-dark)',
    fontFamily: 'inherit'
  });

  const iconStyle = { position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)', pointerEvents: 'none' };
  const fieldWrap = { position: 'relative' };
  const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.4rem' };
  const errorStyle = { fontSize: '0.75rem', color: '#ef4444', marginTop: '0.3rem' };

  return (
    <div className="container animate-fade-in" style={{ padding: '2.5rem 1.5rem', minHeight: '60vh' }}>
      <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', fontWeight: 500, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Quay lại giỏ hàng
      </Link>

      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-dark)' }}>Thanh toán</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* Left: Form */}
          <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Shipping Info */}
            <div style={{ background: 'var(--white)', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Truck size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>Thông tin giao hàng</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Điền đầy đủ để chúng tôi giao hàng chính xác</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Họ và tên *</label>
                  <div style={fieldWrap}>
                    <User size={16} style={iconStyle} />
                    <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nguyễn Văn A" style={inputStyle('fullName')} />
                  </div>
                  {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
                </div>

                <div>
                  <label style={labelStyle}>Số điện thoại *</label>
                  <div style={fieldWrap}>
                    <Phone size={16} style={iconStyle} />
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="0912345678" style={inputStyle('phone')} />
                  </div>
                  {errors.phone && <p style={errorStyle}>{errors.phone}</p>}
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <div style={fieldWrap}>
                    <Mail size={16} style={iconStyle} />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={inputStyle('email')} />
                  </div>
                  {errors.email && <p style={errorStyle}>{errors.email}</p>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Địa chỉ *</label>
                  <div style={fieldWrap}>
                    <MapPin size={16} style={iconStyle} />
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123 Đường ABC, Phường XYZ, Quận 1" style={inputStyle('address')} />
                  </div>
                  {errors.address && <p style={errorStyle}>{errors.address}</p>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Tỉnh / Thành phố *</label>
                  <div style={fieldWrap}>
                    <MapPin size={16} style={iconStyle} />
                    <input name="city" value={form.city} onChange={handleChange} placeholder="TP. Hồ Chí Minh" style={inputStyle('city')} />
                  </div>
                  {errors.city && <p style={errorStyle}>{errors.city}</p>}
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Ghi chú</label>
                  <textarea name="note" value={form.note} onChange={handleChange} placeholder="Ghi chú thêm cho đơn hàng (không bắt buộc)" rows={3}
                    style={{ ...inputStyle('note'), paddingLeft: '1rem', resize: 'vertical', minHeight: '80px' }}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ background: 'var(--white)', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-sm)', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '0.75rem', background: 'linear-gradient(135deg, var(--secondary-color), #f472b6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={20} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)' }}>Phương thức thanh toán</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Chọn cách bạn muốn thanh toán</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', desc: 'Thanh toán bằng tiền mặt khi nhận hàng', icon: '💵' },
                  { id: 'vnpay', label: 'Thanh toán qua VNPay', desc: 'Thanh toán qua cổng VNPay (ATM, Visa, Master, QR Code)', icon: '💳' },
                  { id: 'bank', label: 'Chuyển khoản ngân hàng', desc: 'Chuyển khoản trước khi giao hàng', icon: '🏦' },
                ].map(method => (
                  <label key={method.id} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem',
                    border: `2px solid ${paymentMethod === method.id ? 'var(--primary-color)' : '#e2e8f0'}`,
                    borderRadius: '1rem', cursor: 'pointer', transition: 'all 0.2s',
                    background: paymentMethod === method.id ? 'rgba(79, 70, 229, 0.04)' : 'transparent'
                  }}>
                    <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--primary-color)' }}
                    />
                    <span style={{ fontSize: '1.5rem' }}>{method.id === 'vnpay' ? (
                      <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" alt="VNPay" style={{ height: '24px' }} />
                    ) : method.icon}</span>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{method.label}</p>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ flex: '1 1 380px', position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--white)', borderRadius: '1.5rem', padding: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid #f1f5f9' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
                Đơn hàng ({itemCount} sản phẩm)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {cartItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: '0.875rem', alignItems: 'center' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '0.75rem', overflow: 'hidden', flexShrink: 0, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #f1f5f9' }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <ShoppingBag size={20} color="#cbd5e1" />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>x{item.quantity}</p>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-dark)', flexShrink: 0 }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  <span>Tổng tiền hàng</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{cartTotal.toLocaleString('vi-VN')}đ</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  <span>Phí vận chuyển</span>
                  <span style={{ fontWeight: 600, color: shippingFee === 0 ? '#22c55e' : 'var(--text-dark)' }}>
                    {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}đ`}
                  </span>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600 }}>Tổng thanh toán</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{finalTotal.toLocaleString('vi-VN')}đ</span>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}
                style={{ width: '100%', padding: '1rem', fontSize: '1rem', gap: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <><Loader2 size={20} className="checkout-spinner" /> Đang xử lý...</>
                ) : (
                  <><CheckCircle size={20} /> Xác nhận đặt hàng</>
                )}
              </button>

              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '1rem' }}>
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
