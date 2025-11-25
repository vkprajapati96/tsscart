import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate(`/product/${product._id}`)}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description.substring(0, 80)}...</p>
        <div style={styles.footer}>
          <span style={styles.price}>₹{product.price}</span>
          <span style={styles.stock}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s', background: 'white' },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  content: { padding: '1rem' },
  name: { fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.5rem 0' },
  description: { fontSize: '0.9rem', color: '#6b7280', margin: '0 0 1rem 0' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' },
  stock: { fontSize: '0.85rem', color: '#10b981' }
};

export default ProductCard;


