import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data.product);
    } catch (error) {
      toast.error('Failed to load product');
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }

    try {
      await api.post('/cart/add', { productId: product._id, quantity });
      toast.success('Added to cart!');
      navigate('/cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.loading}>Product not found</div>;

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img src={product.image} alt={product.name} style={styles.image} />
        
        <div style={styles.details}>
          <h1 style={styles.name}>{product.name}</h1>
          <p style={styles.category}>{product.category}</p>
          <p style={styles.description}>{product.description}</p>
          <div style={styles.price}>₹{product.price}</div>
          <div style={styles.stock}>
            {product.stock > 0 ? (
              <span style={{color: '#10b981'}}>In Stock ({product.stock} available)</span>
            ) : (
              <span style={{color: '#ef4444'}}>Out of Stock</span>
            )}
          </div>

          {product.stock > 0 && (
            <>
              <div style={styles.quantitySection}>
                <label style={styles.label}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={styles.quantityInput}
                />
              </div>
              <button onClick={handleAddToCart} style={styles.addToCartBtn}>Add to Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  content: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' },
  image: { width: '100%', borderRadius: '8px', border: '1px solid #e5e7eb' },
  details: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  name: { fontSize: '2rem', fontWeight: 'bold', margin: 0 },
  category: { fontSize: '0.9rem', color: '#6b7280', textTransform: 'uppercase' },
  description: { fontSize: '1rem', color: '#374151', lineHeight: '1.6' },
  price: { fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' },
  stock: { fontSize: '1rem', fontWeight: '500' },
  quantitySection: { display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' },
  label: { fontSize: '1rem', fontWeight: '500' },
  quantityInput: { width: '80px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '1rem' },
  addToCartBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }
};

export default ProductDetail;

