import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, XCircle, ShieldCheck, Landmark, ArrowRight, Loader2 } from 'lucide-react';

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, processing, success, fail

  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  const handlePayment = async (isSuccess) => {
    setLoading(true);
    setStatus('processing');

    // Giả lập thời gian xử lý
    setTimeout(() => {
      const responseCode = isSuccess ? '00' : '01';
      const amountValue = amount ? parseInt(amount) * 100 : 0;
      
      // Gọi callback tới backend để cập nhật đơn hàng
      // Lưu ý: Thay URL này bằng URL API của bạn nếu deploy
      const backendUrl = 'https://hothibichnhung-2123110314.onrender.com/api/Payments/vnpay-return';
      const callbackUrl = `${backendUrl}?vnp_TxnRef=${orderId}&vnp_ResponseCode=${responseCode}&vnp_TransactionStatus=${responseCode}&vnp_Amount=${amountValue}&vnp_SecureHash=mock_hash`;

      if (isSuccess) {
        // Chuyển hướng tới backend để nó xử lý và sau đó backend sẽ không redirect được vì nó là API
        // Nên ta sẽ gọi API này qua fetch, sau đó navigate trên frontend
        fetch(callbackUrl)
          .then(() => {
            setStatus('success');
            setTimeout(() => navigate('/order-success'), 2000);
          })
          .catch(err => {
            console.error(err);
            alert('Lỗi kết nối server!');
            setLoading(false);
            setStatus('idle');
          });
      } else {
        setStatus('fail');
        setTimeout(() => {
            setLoading(false);
            setStatus('idle');
            alert('Thanh toán đã bị hủy hoặc thất bại.');
        }, 1500);
      }
    }, 2000);
  };

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
          <p style={{ margin: '10px 0 0', fontSize: '0.9rem', opacity: 0.8 }}>Cổng thanh toán giả lập (Demo Mode)</p>
        </div>

        {/* Body */}
        <div style={{ padding: '30px' }}>
          {status === 'processing' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <Loader2 size={48} color="#005baa" className="animate-spin" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Đang xác thực giao dịch...</h3>
              <p style={{ color: '#666' }}>Vui lòng không tắt trình duyệt</p>
            </div>
          ) : status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle size={64} color="#22c55e" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22c55e' }}>Thanh toán thành công!</h3>
              <p style={{ color: '#666' }}>Đang chuyển hướng về cửa hàng...</p>
            </div>
          ) : (
            <>
              <div style={{ 
                background: '#f8fafc', 
                borderRadius: '15px', 
                padding: '20px', 
                marginBottom: '25px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Mã đơn hàng:</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>#{orderId}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Số tiền:</span>
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#005baa' }}>
                    {parseInt(amount || 0).toLocaleString('vi-VN')}đ
                  </span>
                </div>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '15px', color: '#334155' }}>Chọn phương thức giả lập:</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button 
                  onClick={() => handlePayment(true)}
                  disabled={loading}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
                    border: '2px solid #e2e8f0', borderRadius: '12px', background: 'white',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#22c55e'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={20} color="#16a34a" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, margin: 0 }}>Thanh toán Thành công</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Giả lập kịch bản khách nhập đúng mã OTP</p>
                  </div>
                  <ArrowRight size={18} color="#94a3b8" />
                </button>

                <button 
                  onClick={() => handlePayment(false)}
                  disabled={loading}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '15px', padding: '15px',
                    border: '2px solid #e2e8f0', borderRadius: '12px', background: 'white',
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', width: '100%'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = '#ef4444'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <XCircle size={20} color="#dc2626" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, margin: 0 }}>Thanh toán Thất bại</p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Giả lập kịch bản thẻ không đủ số dư hoặc hủy</p>
                  </div>
                  <ArrowRight size={18} color="#94a3b8" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div style={{ 
          padding: '20px', 
          borderTop: '1px solid #f1f5f9', 
          textAlign: 'center',
          background: '#f8fafc'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
            <ShieldCheck size={14} />
            Giao dịch được bảo mật bởi VNPay Mock System
          </div>
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

export default MockPayment;
