// ==================== src/pages/Orders.jsx ====================
import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders/my-orders');
      setOrders(data.orders);
    } catch (error) {
      console.error('Fetch orders error:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading orders...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>

      {orders.length === 0 ? (
        <p style={styles.empty}>No orders yet</p>
      ) : (
        <div style={styles.ordersList}>
          {orders.map(order => (
            <div key={order._id} style={styles.order}>
              <div style={styles.orderHeader}>
                <span style={styles.orderNumber}>Order #{order.orderNumber}</span>
                <span style={styles.orderStatus}>{order.orderStatus}</span>
              </div>

              <div style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div style={styles.orderTotal}>
                <span>Total:</span>
                <span>₹{order.totalAmount}</span>
              </div>

              <div style={styles.orderDate}>
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem'
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  order: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1.5rem',
    background: 'white'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #e5e7eb'
  },
  orderNumber: {
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  orderStatus: {
    padding: '0.25rem 0.75rem',
    background: '#10b981',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.85rem',
    textTransform: 'capitalize'
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '1rem'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.95rem'
  },
  orderTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  },
  orderDate: {
    fontSize: '0.85rem',
    color: '#6b7280',
    marginTop: '0.5rem'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.2rem'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    fontSize: '1.1rem',
    color: '#9ca3af'
  }
};

export default Orders;