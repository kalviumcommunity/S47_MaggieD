// route.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserModel = require("./UserModel.js");

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// GET route to fetch all entities
router.get("/getting", async (req, res) => {
  try {
    const steps = await UserModel.find();
    res.json(steps);
  } catch (err) {
    res.status(500).send(`Error fetching data: ${err.message}`);
  }
});

// POST route to add a new entity
router.post('/posting', async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create entity', error: err.message });
  }
});

// PUT route to update an existing entity by ID
router.put('/updating/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).send('Entity not found');
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update entity', error: err.message });
  }
});

// DELETE route to delete an existing entity by ID
router.delete('/deleting/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send('Entity not found');
    }
    res.json({ message: 'Entity deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete entity', error: err.message });
  }
});

// POST route for login

// POST route for login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate the username and password against your database here
  // For demonstration, assume login is successful if username and password are not empty

  if (username && password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, sameSite: 'None', secure: true }); // Set token cookie
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
// POST route for logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', { path: '/' }); // Clear token cookie
  res.json({ message: 'Logout successful' });
});

module.exports = router;
