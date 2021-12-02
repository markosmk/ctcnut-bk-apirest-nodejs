const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    /*
    AN: { // numero cuenta
      type: String,
      required: true,
      default: 'asdaf'
    },
*/
    // datos authentica
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
    avatar: {
      type: String,
      required: false,
    },
    // datos ubicacion
    address: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    dni: {
      type: String,
      required: false,
    },
    department: {
      type: String,
      required: false,
    },
    // datos de servicio
    location: {
      type: String,
      required: false,
      enum: {
        values: ['Tunuyan', 'San-Rafael', 'Malargue'],
        message: '{VALUE} no esta permitido',
      },
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: false,
      index: true,
      // relacionado 1 to 1
    },
    // datos para admin/cuenta
    isAdmin: {
      type: Boolean,
      default: false,
    },
    logged_in: {
      type: Boolean,
      default: false,
    },
    last_session: {
      type: Date,
      required: false,
    },
    verified: {
      type: Boolean,
      default: false,
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
  const salt = bcrypt.genSaltSync(12);
  return await bcrypt.hash(pass, salt);
}

// al guardar hashear el password
userSchema.pre('save', function preSave(next) {
  const user = this;
  if (user.isModified('password')) {
    return generateHash(user.password)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  }
  return next();
});

// metodo agregado al modelo para comparar pass
userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
