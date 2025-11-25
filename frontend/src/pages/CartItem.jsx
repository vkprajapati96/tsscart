import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div style={styles.item}>
      <img src={item.product.image} alt={item.product.name} style={styles.image} />
      
      <div style={styles.details}>
        <h3 style={styles.name}>{item.product.name}</h3>
        <p style={styles.price}>₹{item.product.price}</p>
      </div>

      <div style={styles.actions}>
        <input
          type="number"
          min="1"
          max={item.product.stock}
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value))}
          style={styles.quantityInput}
        />
        <button onClick={() => onRemove(item._id)} style={styles.removeBtn}>Remove</button>
      </div>

      <div style={styles.total}>₹{item.product.price * item.quantity}</div>
    </div>
  );
};

const styles = {
  item: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white' },
  image: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' },
  details: { flex: 1 },
  name: { fontSize: '1.1rem', fontWeight: '600', margin: '0 0 0.5rem 0' },
  price: { fontSize: '1rem', color: '#6b7280', margin: 0 },
  actions: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  quantityInput: { width: '70px', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px' },
  removeBtn: { background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' },
  total: { fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }
};

export default CartItem;


