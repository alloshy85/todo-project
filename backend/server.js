/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */

require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./database');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
connectDB();
app.use(bodyParser.json()); 
app.use(cors()); 
app.use('/api', taskRoutes);
app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});