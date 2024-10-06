const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');

// POST professor rating
router.post('/', async (req, res) => {
  const newProfessor = new Professor(req.body);
  try {
    const savedProfessor = await newProfessor.save();
    res.status(201).json(savedProfessor);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
