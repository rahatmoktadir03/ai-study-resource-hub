const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model('Professor', professorSchema);
