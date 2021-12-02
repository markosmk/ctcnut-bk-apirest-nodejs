const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true, // recorta los espacios vacios a ambos lados
      lowercase: true, // normaliza el email a todo minusculas
      index: { unique: true }, // el email debe ser unico
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // La contraseña necesita al menos 8 caracteres
      trim: true,
    },
    verified: {
      type: Boolean,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dni: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      // relacionado 1 to 1
    },
    verificationToken: {
      type: String,
      required: true,
      index: true,
      unique: true,
      default: () => crypto.randomBytes(20).toString('hex'),
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// genera hash
async function generateHash(pass) {
  return bcrypt.hash(pass, 12);
}

// al guardar hashear el password
customerSchema.pre('save', function preSave(next) {
  const customer = this;
  if (customer.isModified('password')) {
    return generateHash(customer.password)
      .then((hash) => {
        customer.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});

// metodo para comparar pass
customerSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Customer', customerSchema);
