import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight, ShoppingBag, Calendar, CreditCard } from 'lucide-react';
import { paymentService } from '../services/apiService';
import { useCart } from '../context/CartContext';

const VNPayReturn = () => {
  const location = useLocation();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Gửi toàn bộ query params về backend để verify chữ ký và cập nhật trạng thái
        const params = location.search;
        const response = await paymentService.processVnPayReturn(params);
        setResult(response.data);
        clearCart(); // Thanh toán thành công mới xóa giỏ hàng (hoặc tùy logic)
      } catch (err) {
        console.error('Lỗi xác thực thanh toán:', err);
        setError(err.response?.data?.message || 'Có lỗi xảy ra trong quá trình thanh toán');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [location, clearCart]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center' }}>
        <Loader2 size={48} className="checkout-spinner" style={{ color: 'var(--primary-color)', margin: '0 auto 1.5rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Đang xác thực giao dịch...</h2>
        <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Vui lòng không tắt trình duyệt</p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        background: 'white', 
        borderRadius: '2rem', 
        padding: '3rem', 
        boxShadow: 'var(--shadow-lg)',
        textAlign: 'center',
        border: '1px solid #f1f5f9'
      }}>
        {result ? (
          <>
            <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <CheckCircle size={48} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>Thanh toán thành công!</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Cảm ơn bạn đã tin tưởng và mua sắm tại NhungStore. Đơn hàng của bạn đã được thanh toán qua VNPay và đang được xử lý.
            </p>

            <div style={{ background: '#f8fafc', borderRadius: '1.5rem', padding: '1.5rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShoppingBag size={16} /> Mã đơn hàng:</span>
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>#{result.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CreditCard size={16} /> Phương thức:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>VNPay</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Thời gian:</span>
                <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{new Date().toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/" className="btn btn-primary" style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Quay lại trang chủ <ArrowRight size={18} />
              </Link>
              <Link to="/profile" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                Xem lịch sử đơn hàng
              </Link>
            </div>
          </>
        ) : (
          <>
            <div style={{ width: '80px', height: '80px', background: '#fef2f2', color: '#ef4444', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
              <XCircle size={48} />
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '1rem' }}>Thanh toán thất bại</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {error || 'Giao dịch của bạn không thể hoàn tất. Vui lòng kiểm tra lại số dư hoặc thử lại với phương thức khác.'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Thử lại thanh toán
              </Link>
              <Link to="/" style={{ color: 'var(--text-light)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                Quay về trang chủ
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VNPayReturn;
