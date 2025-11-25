import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },

    image: {
      type: String, // Simple image URL
      default: 'https://via.placeholder.com/300'
    
    },
    
    category: {
      type: String,
      required: true,
      enum: ['electronics', 'clothing', 'books', 'home', 'other']
    
    },

    stock: {
      type: Number,
      required: true,
      default: 0
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },

  {
    timestamps: true
  }

);

const Product = mongoose.model('Product', productSchema);

export default Product