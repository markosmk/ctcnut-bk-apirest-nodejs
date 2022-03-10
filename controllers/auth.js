const User = require('../models/user');
const jwt = require('../utils/jwt');

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw 'Email y Contraseña son necesarios';

    const user = await User.findOne({ email });
    const equalPass = await user.comparePassword(password);

    if (!equalPass) throw 'Password no coincide';

    user.logged_in = true;
    await user.save();

    const token = await jwt.createToken(user);

    res.status(200).send({ token, user });
  } catch (error) {
    next(new Error(error));
  }
}

async function register(req, res, next) {
  const { email, password } = req.body;

  try {
    if (!email) throw 'Email es necesario';
    if (!password) throw 'Password es necesario';

    const existsEmail = await User.findOne({ email });
    if (existsEmail) throw 'Email ya esta en uso';

    const user = new User({ email, password });
    const newUser = await user.save();

    return !newUser
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Creado Exitosamente', data: newUser });
  } catch (error) {
    next(new Error(error));
  }
}

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    if (!id) throw 'No se pudo cerrar la sesion';

    const user = await User.findOne({ _id: id });
    if (!user) throw 'Usuario no encontrado';

    user.logged_in = false;
    user.last_session = new Date();
    const updateUser = await user.save();

    return !updateUser
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ message: 'Cerraste Sesion Correctamente' });
  } catch (error) {
    next(new Error(error));
  }
};

module.exports = {
  login,
  register,
  logout,
  // verifyUser,
  // forgetpsw,
  // renewpsw,
};
