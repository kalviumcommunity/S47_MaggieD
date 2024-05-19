const express = require('express');
const router = express.Router();
const UserModel = require("./UserModel.js");

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
    res.status(201).json(newUser); // Respond with the new entity
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

module.exports = router;