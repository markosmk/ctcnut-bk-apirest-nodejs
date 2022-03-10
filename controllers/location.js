const Location = require('../models/location');

async function getAll(_, res, next) {
  try {
    const location = await Location.find().populate('services');
    res.json(location);
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  // query by types
  try {
    const { id } = req.params;
    const location = await Location.findById(id).populate('services');

    return !location
      ? next(new Error('Recurso No encontrado'))
      : res.status(200).send({ location });
  } catch (error) {
    return next(error);
  }
}

async function createNew(req, res, next) {
  const { name, slug, services } = req.body;

  const createLocation = new Location({
    name,
    slug,
    services,
  });

  try {
    const location = await createLocation.save();
    return !location
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ message: 'Creado Exitosamente', location });
  } catch (error) {
    return next(error);
  }
}

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: `data` guarda todo lo que enviemos, arreglar con `save()` o creando un nuevo objeto

    const location = await Location.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    return !location
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Actualizado', location });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAll, getOne, createNew, updateOne };
