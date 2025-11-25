import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';
import { protect, rateLimiter } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public

// routes/auth.js

  router.post('/register', async (req, res) => {
  console.log('=== DEBUGGING START ===');
  console.log('1. req.body:', req.body);
  console.log('2. req.body type:', typeof req.body);
  console.log('3. Content-Type:', req.headers['content-type']);
  console.log('4. req.headers:', req.headers);
  console.log('=== DEBUGGING END ===');

  try {
    // Temporary: Direct access without destructuring
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;
    const role = req.body?.role;


    
    console.log('Parsed values:', { name, email, password,role});
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required',
        received: { name, email, password } // 👈 ye dekhne ke liye
      });
    }
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists' 
      });
    }
    
    // Create user
    const user = await User.create({ 
      name, 
      email, 
      password ,
      role:role || "user"

    });
    
    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    // Save refresh token to DB
    user.refreshToken = refreshToken;
    await user.save();
    
    
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    });
  } catch (error) {
    console.log("❌ Error inside register route:", error.message);
    console.error('Register Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});


// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', rateLimiter, async (req, res) => {
  console.log('🔐 Login attempt started');
  console.log('📩 Request body:', req.body);
  
    try {
    
      const { email, password } = req.body;
    console.log('📧 Email:', email);
    console.log('🔑 Password received:', password ? 'Yes' : 'No');
    
    // Validation
    if (!email || !password) {
      console.log('❌ Validation failed');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password required' 
      });
    }
    
    // Find user with password field

    const user = await User.findOne({ email }).select('+password +refreshToken');    
    console.log('👤 User found:', user ? 'Yes' : 'No');

    if (!user) {
      console.log('❌ User not found in database');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
     
    
    // Check password
    
    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    if (!isMatch){
      console.log('Password incorrect');
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid credentials' 
      });
    }
    
    
    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    console.log('🎫 Tokens generated');
    
    
    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    console.log('💾 Refresh token saved to DB');
    
    // Set cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    

      res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    
    });
    
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken
    });
  } catch (error) {
    console.error('💥 Login Error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});
// @route   POST /api/auth/refresh
// @desc    Refresh access token
// @access  Public

router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    
    if (!refreshToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'No refresh token' 
      });
  
    }

    // Verify refresh token

    const decoded = jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_SECRET || 'refresh-secret-key'
    );
    
    // Find user and check if refresh token matches
    const user = await User.findById(decoded.id).select('+refreshToken');
    
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid refresh token' 
      });
    }
    
    // Generate new access token
    const newAccessToken = user.generateAccessToken();
    
    // Set cookie
    res.cookie('accessToken', newAccessToken,{
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    
    res.json({
      success: true,
      message: 'Token refreshed',
      accessToken: newAccessToken
    });
  } catch (error) {
    console.error('Refresh Error:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Invalid refresh token' 
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private

router.post('/logout', protect, async (req, res) => {
  try {
    // Remove refresh token from DB
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

    
    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    
    res.json({
      success: true,
      message: 'Logged out successfully'
    });

  }catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private

router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });

});


// @route   POST /api/auth/forgot-password
// @desc    Request password reset
// @access  Public

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();
    await user.save();
    
    // In production, send email with resetToken
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
    
    console.log('Reset URL:', resetUrl); 
    res.json({
      success: true,
      message: 'Reset token generated',
      resetToken, // Don’t send in production!
      resetUrl
    });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { password } = req.body;
    
    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');
    
    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid or expired token' 
      });
    }
    
    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

export default router;