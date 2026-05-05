import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';
import { paymentService } from '../services/apiService';
import { useCart } from '../context/CartContext';

const VnPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing');
  const { clearCart } = useCart();

  useEffect(() => {
    const processPayment = async () => {
      try {
        const responseCode = searchParams.get('vnp_ResponseCode');
        
        // Gọi API backend C# để cập nhật trạng thái đơn hàng (nó sẽ bypass chữ ký do code C# cho phép)
        // Dùng location.search để lấy nguyên chuỗi query string
        await paymentService.processVnPayReturn(window.location.search);
        
        if (responseCode === '00') {
          setStatus('success');
          clearCart();
        } else {
          setStatus('fail');
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
        // Ngay cả khi backend lỗi, ta vẫn hiển thị theo responseCode của VNPay cho mục đích demo
        if (searchParams.get('vnp_ResponseCode') === '00') {
            setStatus('success');
            clearCart();
        } else {
            setStatus('fail');
        }
      }
    };

    if (searchParams.toString()) {
        processPayment();
    }
  }, [searchParams]);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f2f5', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '500px', 
        background: 'white', 
        borderRadius: '20px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ 
          background: '#005baa', 
          padding: '25px', 
          color: 'white', 
          textAlign: 'center',
          position: 'relative'
        }}>
          <img src="https://sandbox.vnpayment.vn/paymentv2/Images/brands/logo-vnpay.png" alt="VNPay" style={{ height: '35px', filter: 'brightness(0) invert(1)' }} />
          <p style={{ margin: '10px 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Kết quả giao dịch VNPay Demo</p>
        </div>

        {/* Body */}
        <div style={{ padding: '40px 30px', textAlign: 'center' }}>
          {status === 'processing' ? (
            <div>
              <Loader2 size={64} color="#005baa" className="animate-spin" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>Đang xử lý kết quả...</h3>
              <p style={{ color: '#666' }}>Vui lòng chờ trong giây lát</p>
            </div>
          ) : status === 'success' ? (
            <div>
              <CheckCircle size={80} color="#22c55e" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#22c55e', marginBottom: '10px' }}>Thanh toán thành công!</h3>
              <p style={{ color: '#64748b', marginBottom: '30px' }}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được thanh toán.</p>
              <Link to="/" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#005baa', color: 'white', padding: '12px 24px',
                borderRadius: '10px', textDecoration: 'none', fontWeight: 600,
                transition: 'all 0.2s'
              }}>
                Tiếp tục mua sắm <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div>
              <XCircle size={80} color="#ef4444" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ef4444', marginBottom: '10px' }}>Thanh toán thất bại</h3>
              <p style={{ color: '#64748b', marginBottom: '30px' }}>Giao dịch đã bị hủy hoặc xảy ra lỗi trong quá trình thanh toán.</p>
              <Link to="/cart" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#f8fafc', color: '#334155', padding: '12px 24px',
                border: '1px solid #cbd5e1', borderRadius: '10px', textDecoration: 'none', fontWeight: 600,
                transition: 'all 0.2s'
              }}>
                Quay lại giỏ hàng
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VnPayReturn;
