import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, MessageCircle, Share2 } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-dark)', marginBottom: '1rem' }}>Liên Hệ Với Chúng Tôi</h1>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          Bạn có câu hỏi hoặc cần hỗ trợ? Đội ngũ của NhungStore luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', marginBottom: '5rem' }} className="contact-grid">
        {/* Left: Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem' }}>Thông tin liên hệ</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '1rem', background: 'var(--primary-light)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Địa chỉ</div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    123 Đường Lê Lợi, Quận 1, <br />Thành phố Hồ Chí Minh, Việt Nam
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '1rem', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Điện thoại</div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>+84 123 456 789</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>+84 987 654 321</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '1rem', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Email</div>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>support@nhungstore.vn</p>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>contact@nhungstore.vn</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Kết nối với chúng tôi</div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', transition: 'all 0.2s' }} className="hover-bg"><Globe size={20} /></a>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', transition: 'all 0.2s' }} className="hover-bg"><MessageCircle size={20} /></a>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', transition: 'all 0.2s' }} className="hover-bg"><Share2 size={20} /></a>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--text-dark)', padding: '2rem', borderRadius: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <Clock size={24} color="var(--primary-color)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Giờ làm việc</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ opacity: 0.7 }}>Thứ 2 - Thứ 6:</span>
              <span style={{ fontWeight: 600 }}>08:00 - 21:00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <span style={{ opacity: 0.7 }}>Thứ 7:</span>
              <span style={{ fontWeight: 600 }}>09:00 - 18:00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ opacity: 0.7 }}>Chủ nhật:</span>
              <span style={{ fontWeight: 600 }}>Nghỉ</span>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div style={{ background: 'white', padding: '3rem', borderRadius: '2rem', boxShadow: 'var(--shadow-lg)', border: '1px solid #f1f5f9' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ width: '80px', height: '80px', background: '#ecfdf5', color: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <Send size={40} />
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Cảm ơn bạn!</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Tin nhắn của bạn đã được gửi đi thành công. Chúng tôi sẽ phản hồi lại bạn sớm nhất có thể.</p>
              <button onClick={() => setSubmitted(false)} className="btn btn-primary">Gửi tin nhắn mới</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>Gửi tin nhắn cho chúng tôi</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Họ và tên</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A" 
                    style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com" 
                    style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Chủ đề</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder="Vấn đề bạn cần hỗ trợ" 
                  style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: '#f8fafc' }} 
                />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nội dung tin nhắn</label>
                <textarea 
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Hãy cho chúng tôi biết chi tiết vấn đề của bạn..." 
                  rows="5" 
                  style={{ width: '100%', padding: '1rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'none' }} 
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
                style={{ width: '100%', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1rem', fontWeight: 700 }}
              >
                {isSubmitting ? (
                  <div className="spinner" style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: 'white' }}></div>
                ) : (
                  <>Gửi tin nhắn <Send size={20} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default Contact;
