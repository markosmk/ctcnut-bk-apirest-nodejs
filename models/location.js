const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationSchema = Schema(
  {
    slug: {
      type: String,
      required: true, //sanrafael
      index: { unique: true }, // el email debe ser unico
    },
    name: {
      type: String, // San Rafael
      required: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        // required: true,
      },
    ],
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = mongoose.model('Location', locationSchema);
