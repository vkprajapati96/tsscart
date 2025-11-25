import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    
    orderNumber: {
      type: String,
      unique: true
    },

    items: [

      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
          
        },

        name: String,
        price: Number,
        quantity: Number,

      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending'
    },

    razorpayOrderId: String,
 
    razorpayPaymentId: String,
 
    razorpaySignature: String,

      orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered'],
      default: 'pending'

    }

  },

  {
    timestamps: true
  }
  
);

// Auto-generate order number
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `ORD${Date.now()}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
