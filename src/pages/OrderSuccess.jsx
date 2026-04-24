import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="container animate-fade-in" style={{
      padding: '4rem 1.5rem', textAlign: 'center', minHeight: '60vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    }}>
      <div style={{
        width: '120px', height: '120px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 2rem',
        boxShadow: '0 12px 40px rgba(34, 197, 94, 0.3)',
        animation: 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        <CheckCircle size={56} color="white" />
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
        Đặt hàng thành công! 🎉
      </h1>
      <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', maxWidth: '500px', marginBottom: '1rem', lineHeight: 1.6 }}>
        Cảm ơn bạn đã mua hàng tại <strong style={{ color: 'var(--primary-color)' }}>NhungStore</strong>. 
        Đơn hàng của bạn đã được ghi nhận và đang được xử lý.
      </p>
      <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
        Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
          <ShoppingBag size={18} /> Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
