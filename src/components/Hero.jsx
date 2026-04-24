import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container animate-fade-in">
        <h1 className="hero-title">
          Khám phá bộ sưu tập <br />
          <span style={{ color: 'var(--primary-color)' }}>Thời trang & Phụ kiện</span>
        </h1>
        <p className="hero-subtitle">
          Khám phá những xu hướng mới nhất với chất lượng tuyệt vời. 
          Nâng tầm phong cách của bạn ngay hôm nay cùng NhungStore.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#products" className="btn btn-primary">
            <ShoppingBag size={18} />
            Mua sắm ngay
          </a>
          <a href="#categories" className="btn btn-secondary">
            Xem danh mục
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
