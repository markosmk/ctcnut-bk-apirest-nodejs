const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: {
        values: ['Internet', 'Television', 'Packs'],
        message: '{VALUE} no esta permitido',
      },
      required: true,
    },
    name: {
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
    order: {
      type: Number,
      default: 0,
      required: true,
    },
    description: {
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
    location: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        // index: true,
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
