import jwt from 'jsonwebtoken';
import User from '../model/UserModel.js';

// Verify Access Token

export const protect = async (req, res, next) => {
  try {
    let token;
    // Check Authorization header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 

    // Check cookie
    else if (req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized, no token' 
      });
    }
    
    
    // Verify token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_ACCESS_SECRET || 'access-secret-key'
    );
    // Get user from DB
    
    req.user = await User.findById(decoded.id).select('-password');
    if(!req.user) {
        return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });  
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expired, please refresh' 
      });
    }
    

    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized, invalid token' 
    });
  }
};

// Role-based Authorization

export const authorize = (...roles) => {
     return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Role '${req.user.role}' is not authorized` 
      });
    }
    next();

};

};


// Rate Limiting (Simple in-memory implementation)
const loginAttempts = new Map();
export const rateLimiter = (req, res, next) => {
const ip = req.ip;
const attempts = loginAttempts.get(ip) || { count: 0, resetTime: Date.now() };  
// Reset after 15 minutes
  if (Date.now() > attempts.resetTime) {
    attempts.count = 0;
    attempts.resetTime = Date.now() + 15 * 60 * 1000;

}
attempts.count++;
loginAttempts.set(ip, attempts);

if (attempts.count > 5) {
    return res.status(429).json({ 
      success: false, 
      message: 'Too many login attempts, try again later' 
    });
  }

  next();
  
};
