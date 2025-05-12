/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
const express = require('express');
    const { check } = require('express-validator');
    const { loginUser } = require('../controllers/userController');
    
    const router = express.Router();
    
    router.post(
      '/login',
      [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
      ],
      loginUser
    );
    
    module.exports = router;