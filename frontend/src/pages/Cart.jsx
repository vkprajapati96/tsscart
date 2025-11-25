import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import CartItem from '../components/CartItem';
import CartItem from './CartItem';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data.cart);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/update/${itemId}`, { quantity });
      setCart(data.cart);
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/remove/${itemId}`);
      setCart(data.cart);
      toast.success('Item removed');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (loading) return <div style={styles.loading}>Loading cart...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} style={styles.shopBtn}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>

      <div style={styles.content}>
        <div style={styles.items}>
          {cart.items.map(item => (
            <CartItem
              key={item._id} 
              item={item} 
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>

        <div style={styles.summary}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <button onClick={() => navigate('/checkout')} style={styles.checkoutBtn}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  content: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' },
  items: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  summary: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', background: 'white', height: 'fit-content' },
  summaryTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' },
  summaryTotal: { display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 'bold' },
  checkoutBtn: { width: '100%', background: '#2563eb', color: 'white', border: 'none', padding: '1rem', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' },
  empty: { textAlign: 'center', padding: '3rem' },
  shopBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1rem', borderRadius: '6px', cursor: 'pointer', marginTop: '1rem' }
};

export default Cart;


