/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
const Task = require('../models/task');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, 'your-secret-key'); 
    req.user = decoded.user; 
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



exports.createTask = [authenticateUser, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const newTask = new Task({ ...req.body, user: userId }); 
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];


exports.getAllTasks = [authenticateUser, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 }); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];


exports.getTaskById = [authenticateUser, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id }); 
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];


exports.updateTask = [authenticateUser, async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // التأكد من أن المستخدم هو صاحب المهمة
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}];

exports.deleteTask = [authenticateUser, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); 
    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}];