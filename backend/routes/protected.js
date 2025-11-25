import express from "express";
import { protect, authorize } from "../middleware/auth.js";


const router = express.Router();

// @route   GET /api/protected/user-data
// @desc    Get user specific data
// @access  Private
router.get('/user-data', protect, (req, res) => {
  res.json({
    success: true,
    message: 'This is protected user data',
    user: req.user
  });

});

// @route   GET /api/protected/admin-data
// @desc    Get admin data
// @access  Private (Admin only)
router.get('/admin-data', protect, authorize('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'This is admin-only data',
    user: req.user 
  });
});

export default router;
