import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Heart, Layers, ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productService, categoryService, getImageUrl } from '../services/apiService';
import Hero from '../components/Hero';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [toast, setToast] = useState({ show: false, productName: '' });

  const { addToCart, itemCount } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          productService.getAll(),
          categoryService.getAll()
        ]);

        setAllProducts(prodRes.data);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddToCart = useCallback((product) => {
    addToCart(product);
    setToast({ show: true, productName: product.name });

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, productName: '' });
    }, 3000);
  }, [addToCart]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    if (categoryId === null) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(p => p.category?.id === categoryId);
      setProducts(filtered);
    }

    // Scroll to products section smoothly
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      <Hero />

      <main className="container">
        {/* Categories Section */}
        <section id="categories" style={{ paddingTop: '2rem' }}>
          <div className="section-header">
            <div>
              <h2 className="section-title">Danh Mục Nổi Bật</h2>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>Khám phá các sản phẩm theo từng phong cách</p>
            </div>
            <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Xem tất cả <ArrowRight size={16} />
            </a>
          </div>

          <div className="category-grid">
            <div
              className={`category-card ${selectedCategoryId === null ? 'active' : ''}`}
              onClick={() => handleCategorySelect(null)}
              style={{ cursor: 'pointer' }}
            >
              <div className="category-icon">
                <Layers size={28} color={selectedCategoryId === null ? 'white' : 'var(--primary-color)'} />
              </div>
              <h3 className="category-name">Tất cả</h3>
            </div>

            {categories.length > 0 ? categories.map((cat) => (
              <div
                key={cat.id}
                className={`category-card ${selectedCategoryId === cat.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(cat.id)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-icon">
                  {cat.image ? (
                    <img src={getImageUrl(cat.image)} alt={cat.name} />
                  ) : (
                    <Layers size={28} color={selectedCategoryId === cat.id ? 'white' : 'var(--primary-color)'} />
                  )}
                </div>
                <h3 className="category-name">{cat.name}</h3>
              </div>
            )) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>Chưa có danh mục nào.</p>
            )}
          </div>
        </section>

        {/* Products Section */}
        <section id="products">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                {selectedCategoryId ? `Sản phẩm: ${categories.find(c => c.id === selectedCategoryId)?.name}` : 'Sản Phẩm Mới Nhất'}
              </h2>
              <p style={{ color: 'var(--text-light)', marginTop: '0.5rem' }}>{selectedCategoryId ? `Đang hiển thị các sản phẩm thuộc danh mục này` : 'Những món đồ không thể thiếu trong tủ đồ của bạn'}</p>
            </div>
            <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Xem tất cả <ArrowRight size={16} />
            </a>
          </div>

          <div className="product-grid">
            {products.length > 0 ? products.map((product) => (
              <div key={product.id} className="product-card">
                {product.quantity < 5 && product.quantity > 0 && (
                  <span className="product-badge" style={{ color: 'var(--secondary-color)' }}>Sắp hết</span>
                )}
                {product.quantity === 0 && (
                  <span className="product-badge" style={{ color: '#ef4444' }}>Hết hàng</span>
                )}

                <Link to={`/product/${product.id}`} className="product-image-container">
                  {product.image ? (
                    <img src={getImageUrl(product.image)} alt={product.name} className="product-image" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                      <ShoppingCart size={40} color="#cbd5e1" />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'var(--glass-bg)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    color: 'var(--text-dark)',
                    zIndex: 2
                  }}>
                    <Heart size={18} />
                  </div>
                </Link>

                <div className="product-info">
                  <span className="product-category">{product.category?.name || 'Sản phẩm'}</span>
                  <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="product-name">{product.name}</h3>
                  </Link>
                  <p className="product-desc">{product.description || 'Chất lượng cao, thiết kế độc đáo.'}</p>

                  <div className="product-footer">
                    <span className="product-price">{product.price?.toLocaleString('vi-VN')}đ</span>
                    <button
                      className="product-add-btn"
                      title="Thêm vào giỏ"
                      onClick={() => handleAddToCart(product)}
                      disabled={product.quantity === 0}
                      style={{ opacity: product.quantity === 0 ? 0.5 : 1, cursor: product.quantity === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>Chưa có sản phẩm nào.</p>
            )}
          </div>
        </section>
      </main>

      {/* Toast Notification */}
      <div className={`cart-toast ${toast.show ? 'cart-toast-show' : ''}`}>
        <div className="cart-toast-icon">
          <Check size={18} />
        </div>
        <div className="cart-toast-content">
          <span className="cart-toast-title">Đã thêm vào giỏ hàng!</span>
          <span className="cart-toast-product">{toast.productName}</span>
        </div>
        <Link to="/cart" className="cart-toast-action">
          <ShoppingBag size={16} />
          Xem giỏ ({itemCount})
        </Link>
      </div>
    </>
  );
};

export default Home;
