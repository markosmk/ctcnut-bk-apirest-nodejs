const { findOne } = require('../models/user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

async function generateHash(pass) {
  const salt = bcrypt.genSaltSync(12);
  return bcrypt.hash(pass, salt);
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw 'Email y Contraseña son necesarios';

    const user = await User.findOne({ email });
    const equalPass = await user.comparePassword(password);

    if (!equalPass) throw 'Password no coincide';

    user.logged_in = true;
    await user.save();

    // creamos el jwt
    const token = await jwt.createToken(user);

    res.status(200).send({ token, user });
  } catch (error) {
    next(new Error(error));
  }
}
async function register(req, res, next) {
  const { email, password } = req.body;
  const user = new User({ email, password });

  try {
    if (!email) throw 'Email es necesario';
    if (!password) throw 'Password es necesario';

    // Comprobamos si el email esta utilizado
    const existsEmail = await User.findOne({ email });

    if (existsEmail) throw 'Email ya esta en uso';

    // const pass = await generateHash(password);
    const newUser = await user.save();

    return !newUser
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Creado Exitosamente', data: newUser });
  } catch (error) {
    next(new Error(error));
  }
}

async function getAll(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
}
async function getOne(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    return !user
      ? next(new Error('No se encontraron resultados'))
      : res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
}
function updateOne(req, res, next) {
  console.log('updating uno');
}

function uploadAvatar(req, res, next) {
  console.log(req.files);
}

module.exports = {
  login,
  register,
  getAll,
  getOne,
  updateOne,
  uploadAvatar,
};
