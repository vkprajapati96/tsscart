import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
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
        console.log(error)
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
      console.log(error)
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <Link to="/admin/add-product">
          <button style={styles.addBtn}>Add New Product</button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p style={styles.empty}>No products available</p>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHeader}>
            <span style={styles.colImage}>Image</span>
            <span style={styles.colName}>Name</span>
            <span style={styles.colPrice}>Price</span>
            <span style={styles.colStock}>Stock</span>
            <span style={styles.colActions}>Actions</span>
          </div>

          {products.map(product => (
            <div key={product._id} style={styles.tableRow}>
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <span style={styles.colName}>{product.name}</span>
              <span style={styles.colPrice}>₹{product.price}</span>
              <span style={styles.colStock}>{product.stock}</span>
              <div style={styles.colActions}>
                <button 
                  onClick={() => handleDelete(product._id)} 
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
  title: { fontSize: '2rem', fontWeight: 'bold' },
  addBtn: { background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  table: { border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', background: 'white' },
  tableHeader: { display: 'grid', gridTemplateColumns: '80px 2fr 1fr 1fr 1fr', gap: '1rem', padding: '1rem', background: '#f9fafb', fontWeight: '600', borderBottom: '1px solid #e5e7eb' },
  tableRow: { display: 'grid', gridTemplateColumns: '80px 2fr 1fr 1fr 1fr', gap: '1rem', padding: '1rem', alignItems: 'center', borderBottom: '1px solid #e5e7eb' },
  productImage: { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' },
  colImage: { width: '80px' },
  colName: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  colPrice: {},
  colStock: {},
  colActions: { display: 'flex', gap: '0.5rem' },
  deleteBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  empty: { textAlign: 'center', padding: '3rem', fontSize: '1.1rem', color: '#9ca3af' }
};

export default AdminDashboard;
