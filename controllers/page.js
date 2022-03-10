const Page = require('../models/page');

async function getAll(_, res, next) {
  try {
    const page = await Page.find();
    res.json(page);
  } catch (error) {
    next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const { id } = req.params;
    const page = await Page.findById(id);

    return !page
      ? next(new Error('Recurso No encontrado'))
      : res.status(200).send({ page });
  } catch (error) {
    return next(error);
  }
}

async function createNew(req, res, next) {
  const { name, slug, description, section } = req.body;

  const createPage = new Page({
    slug,
    name,
    description,
    section,
  });

  try {
    const page = await createPage.save();
    return !page
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ message: 'Creado Exitosamente', page });
  } catch (error) {
    return next(error);
  }
}

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: `data` guarda todo lo que enviemos, arreglar con `save()` o creando un nuevo objeto

    const page = await Page.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    return !page
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Actualizado', page });
  } catch (error) {
    return next(error);
  }
}

module.exports = { getAll, getOne, createNew, updateOne };
