const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
    required: true,
  },
  voucher: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  state: {
    // si esta pagado o no
    type: Boolean,
    default: false,
  },
  customerId: {
    // relacionado muchas bills a un customer
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  create_at: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Bill', billSchema);
