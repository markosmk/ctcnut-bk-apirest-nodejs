const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Internet', 'Television', 'Packs'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  amount_normal: {
    type: String,
    required: true,
  },
  channels: {
    // para type TELEVISION
    type: String,
  },
  aditional: {
    // para type PACKS
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  create_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Service', serviceSchema);
