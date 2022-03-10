const mongoose = require('mongoose');

const billSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('Bill', billSchema);
