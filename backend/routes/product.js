// ==================== STEP 4: Product Routes (routes/product.js) ====================
import express from 'express';
import Product from '../model/ProductModel.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('-createdBy');

    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET single product (Public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// CREATE product (Admin only)
router.post('/', protect, authorize('admin'), async (req, res) => {
  try{
    const { name, description, price, image, category, stock } = req.body;

    // Validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      image,
      category,
      stock: stock || 0,
      createdBy: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// UPDATE product (Admin only)
router.put('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const { name, description, price, image, category, stock } = req.body;

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (image) product.image = image;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = stock;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// DELETE product (Admin only)

router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    try {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
        success: false,
        message: 'Product not found'
        
    });
    
}

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }

});

export default router;
