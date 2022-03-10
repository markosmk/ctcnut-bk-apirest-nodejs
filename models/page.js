const { Schema, model } = require('mongoose');

const pageSchema = Schema(
  {
    slug: {
      type: String,
      required: true,
      index: { unique: true },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    section: String,
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  }
);

module.exports = model('Page', pageSchema);
