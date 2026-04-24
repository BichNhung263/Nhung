import React from 'react';
import { Share2, MessageCircle, Globe, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-col">
            <h4 style={{ color: 'var(--primary-color)', fontSize: '1.5rem', marginBottom: '1rem' }}>NhungStore</h4>
            <p>Mang đến trải nghiệm mua sắm tuyệt vời nhất với những sản phẩm chất lượng cao và dịch vụ chu đáo.</p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#" style={{ color: 'var(--text-light)' }} title="Chia sẻ"><Share2 size={20} /></a>
              <a href="#" style={{ color: 'var(--text-light)' }} title="Cộng đồng"><MessageCircle size={20} /></a>
              <a href="#" style={{ color: 'var(--text-light)' }} title="Website"><Globe size={20} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Danh mục</h4>
            <a href="#">Chó Con</a>
            <a href="#">Mèo con</a>
            <a href="#">Thức Ăn</a>
            
          </div>
          
          <div className="footer-col">
            <h4>Hỗ trợ</h4>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Hướng dẫn mua hàng</a>
            <a href="#">Theo dõi đơn hàng</a>
            <a href="#">Câu hỏi thường gặp</a>
          </div>
          
          <div className="footer-col">
            <h4>Liên hệ</h4>
            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <MapPin size={16} /> 123 Đường Xuân Thủy, Hà Nội
            </p>
            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Phone size={16} /> 0123 456 789
            </p>
            <p style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Mail size={16} /> support@nhungstore.com
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NhungStore. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
