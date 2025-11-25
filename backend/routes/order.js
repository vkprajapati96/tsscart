import express from 'express';
import { protect } from '../middleware/auth.js';
import Razorpay from 'razorpay';
import Cart from '../model/CartModel.js';
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();



// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET

});

// CREATE Razorpay Order API
router.post('/create-razorpay-order', protect, async (req, res) => {
  try {
    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Total amount calculate
    let totalAmount = 0;
    for (const item of cart.items) {
      totalAmount += item.product.price * item.quantity;
    }

    // Razorpay order options
    const options = {
      amount: totalAmount * 100, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    // Create order
    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: razorpayOrder,
      key: process.env.RAZORPAY_KEY_ID,
      amount: totalAmount
    });

  } catch (error) {
    console.error('Razorpay Order Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;