/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
const User = require('../models/user');
const jwt = require('jsonwebtoken'); 
const { validationResult } = require('express-validator'); 

const loginUser = async (req, res) => {

  const errors = validationResult(req); 
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); 
  }

  const { email, password } = req.body; 
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' }); 
    }
    try {
      const isMatch = await user.comparePassword(password); 
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' }); 
      }
    } catch (compareError) {
      return res.status(500).json({ message: 'Server error: Password comparison failed' }); 
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email 
      },
    };

    jwt.sign(
      
      payload,
      'your-secret-key', 
      { expiresIn: '1h' }, 
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: 'Server error: JWT signing failed' }); 
        }
        res.json({ token }); 
      }
    );
    
    }
    catch (error) {
      res.status(500).json({ message: 'Server error' }); 
    }
        };
  

module.exports = {
  loginUser,
};
