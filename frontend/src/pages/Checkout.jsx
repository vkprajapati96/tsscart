import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
    loadRazorpayScript();
  }, []);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data.cart);
    } catch (error){
        console.log(error)
      toast.error('Failed to load cart');
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  
  const handlePayment = async () => {
    if (!cart || cart.items.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      // Create Razorpay order
      const { data: orderData } = await api.post('/orders/create-razorpay-order');

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: 'INR',
        name: 'QuickCart',
        description: 'Purchase from QuickCart',
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            // Verify payment
            await api.post('/orders/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            toast.success('Order placed successfully!');
            navigate('/orders');
          } catch (error) {
            console.log(error)
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com'
        },
        theme: {
          color: '#2563eb'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
        console.log(error)
      toast.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  if (!cart) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.content}>
        <div style={styles.orderSummary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>
          {cart.items.map(item => (
            <div key={item._id} style={styles.item}>
              <span>{item.product.name} x {item.quantity}</span>
              <span>₹{item.product.price * item.quantity}</span>
            </div>
          ))}
          <div style={styles.total}>
            <span>Total:</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>

        <button 
          onClick={handlePayment} 
          style={styles.payBtn}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' },
  title: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' },
  content: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  orderSummary: { border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1.5rem', background: 'white' },
  sectionTitle: { fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' },
  item: { display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #e5e7eb' },
  total: { display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem' },
  payBtn: { background: '#2563eb', color: 'white', border: 'none', padding: '1rem 2rem', fontSize: '1rem', fontWeight: '600', borderRadius: '6px', cursor: 'pointer' },
  loading: { textAlign: 'center', padding: '3rem', fontSize: '1.2rem' }
};


export default Checkout;







