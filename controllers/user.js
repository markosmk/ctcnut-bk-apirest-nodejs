const User = require('../models/user');

async function getAll(req, res, next) {
  try {
    const users = await User.find().select('-password');
    res.status(200).send({ users });
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
      .populate('services')
      .populate('locations')
      .select('-password, -verificationToken');
    return !user
      ? next(new Error('No se encontraron resultados'))
      : res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
}

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: `data` guarda todo lo que enviemos, arreglar con `save()` o creando un nuevo objeto

    const user = await User.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    return !user
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ message: 'Actualizado', user });
  } catch (error) {
    return next(error);
  }
}

async function uploadAvatar(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(500).send({ msg: 'error del servidor' });
    }

    if (req.file) {
      const filePath = req.file.path;
      const basePath = `${req.protocol}://${req.get('host')}/`;

      user.avatar = basePath + filePath;
      const updateUser = await user.save();

      if (!updateUser) {
        return next(new Error('Error al procesar la solicitud'));
      }
      res.send({ data: updateUser });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteOne(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return !user
      ? next(new Error('No se encontraron resultados'))
      : res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getOne,
  updateOne,
  uploadAvatar,
  deleteOne,
};
