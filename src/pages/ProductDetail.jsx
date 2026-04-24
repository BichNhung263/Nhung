import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check } from 'lucide-react';
import { productService } from '../services/apiService';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);
  
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await productService.getById(id);
        setProduct(res.data);
        
        // Fetch related products (same category)
        const allRes = await productService.getAll();
        const related = allRes.data
          .filter(p => p.category?.id === res.data.category?.id && p.id !== res.data.id)
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Quay lại trang chủ</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '2rem 1.5rem' }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: 500 }}>
        <ArrowLeft size={16} /> Quay lại
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginBottom: '4rem' }} className="product-detail-grid">
        {/* Left: Image */}
        <div className="product-detail-image-section">
          <div style={{ 
            borderRadius: '2rem', 
            overflow: 'hidden', 
            background: '#f8fafc',
            boxShadow: 'var(--shadow-lg)',
            aspectRatio: '1/1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {product.image ? (
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <ShoppingCart size={80} color="#cbd5e1" />
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-detail-info">
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{ 
              background: 'var(--primary-light)', 
              color: 'var(--primary-color)', 
              padding: '0.4rem 1rem', 
              borderRadius: '2rem', 
              fontSize: '0.8rem', 
              fontWeight: 700,
              display: 'inline-block',
              marginBottom: '1rem'
            }}>
              {product.category?.name || 'Sản phẩm'}
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1.2, marginBottom: '0.5rem' }}>
              {product.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', color: '#fbbf24' }}>
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill={s <= 4 ? "#fbbf24" : "none"} />)}
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>(48 nhận xét)</span>
              <span style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>|</span>
              <span style={{ color: product.quantity > 0 ? '#10b981' : '#ef4444', fontSize: '0.85rem', fontWeight: 600 }}>
                {product.quantity > 0 ? `Còn ${product.quantity} sản phẩm` : 'Hết hàng'}
              </span>
            </div>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '2rem' }}>
            {product.price?.toLocaleString('vi-VN')}đ
          </div>

          <p style={{ color: 'var(--text-light)', lineHeight: 1.6, marginBottom: '2.5rem', fontSize: '1rem' }}>
            {product.description || 'Sản phẩm cao cấp với chất liệu chọn lọc, mang lại sự thoải mái và phong cách thời thượng cho người mặc.'}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem', alignItems: 'center' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              background: '#f1f5f9', 
              borderRadius: '1rem', 
              padding: '0.5rem' 
            }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'white', border: 'none', borderRadius: '0.75rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <Minus size={16} />
              </button>
              <span style={{ width: '40px', textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                style={{ background: 'white', border: 'none', borderRadius: '0.75rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className="btn btn-primary" 
              style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '1rem' }}
            >
              <ShoppingCart size={20} />
              {product.quantity === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
            </button>
            
            <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '1rem', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <Heart size={20} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '1rem' }}>
              <Truck size={20} color="var(--primary-color)" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Miễn phí vận chuyển</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Cho đơn hàng trên 500k</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', background: '#f8fafc', borderRadius: '1rem' }}>
              <RotateCcw size={20} color="var(--primary-color)" />
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700 }}>Đổi trả dễ dàng</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>Trong vòng 30 ngày</div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem' }}>Sản phẩm tương tự</h2>
          <div className="product-grid">
            {relatedProducts.map(p => (
              <div key={p.id} className="product-card">
                <Link to={`/product/${p.id}`} className="product-image-container">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="product-image" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                      <ShoppingCart size={32} color="#cbd5e1" />
                    </div>
                  )}
                </Link>
                <div className="product-info">
                  <span className="product-category">{p.category?.name}</span>
                  <Link to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name">{p.name}</h3>
                  </Link>
                  <div className="product-footer">
                    <span className="product-price">{p.price?.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Detail Page Toast */}
      <div className={`cart-toast ${toast ? 'cart-toast-show' : ''}`} style={{ bottom: '2rem', right: '2rem' }}>
        <div className="cart-toast-icon">
          <Check size={18} />
        </div>
        <div className="cart-toast-content">
          <span className="cart-toast-title">Đã thêm {quantity} sản phẩm!</span>
          <span className="cart-toast-product">{product.name}</span>
        </div>
        <Link to="/cart" className="cart-toast-action">
          Xem giỏ
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
