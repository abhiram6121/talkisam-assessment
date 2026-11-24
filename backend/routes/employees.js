const express = require('express');
const User = require('../models/User');
const { authenticate, requireSuperAdmin } = require('../middleware/auth');
const { hashPassword } = require('./auth');

const router = express.Router();

router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, department, phone } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (department) user.department = department;
    if (phone !== undefined) user.phone = phone;

    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/employees', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const { name, email, password, role, department, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newUser = new User({
      name,
      email,
      password: hashPassword(password),
      role: role || 'employee',
      department: department || 'General',
      phone: phone || ''
    });

    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      department: newUser.department,
      phone: newUser.phone
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/employees', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const employees = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/employees/:id', authenticate, requireSuperAdmin, async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    if (!target) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    if (target.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete yourself' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
