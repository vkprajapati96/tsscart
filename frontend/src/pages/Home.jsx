import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.products);
    } catch (error) {
    console.log(error)
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.loading}>Loading products...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Products</h1>
      {products.length === 0 ? (
        <p style={styles.empty}>No products available</p>
      ) : (
        <div style={styles.grid}>
          {products.map(product => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#6b7280' },
  empty: { textAlign: 'center', padding: '3rem', fontSize: '1.1rem', color: '#9ca3af' }
};

export default Home;

