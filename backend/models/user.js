/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
    const bcrypt = require('bcrypt');
    const userSchema = new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }, 
    });
    
    

    userSchema.methods.comparePassword = async function(password) {
      return this.password === password;
    };
    module.exports = mongoose.model('User', userSchema);
    