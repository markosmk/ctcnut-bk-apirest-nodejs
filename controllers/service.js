const mongoose = require('mongoose');
const Service = require('../models/service');

async function getAll(_, res, next) {
  try {
    // TODO recibir `req.query` para filtrar resultados
    const servicesAll = await Service.find({
      //type: 'Internet'
    }).sort({
      create_at: -1,
    });

    return !servicesAll
      ? next(new Error('Recursos No encontrados'))
      : res.status(200).send(servicesAll);
  } catch (error) {
    return next(error);
  }
}

async function getOne(req, res, next) {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);

    return !service
      ? next(new Error('Recurso No encontrado'))
      : res.status(200).send({ data: service });
  } catch (error) {
    return next(error);
  }
}

async function createNew(req, res, next) {
  const { type, name, description, location, amount, amount_normal } = req.body;

  const createService = new Service({
    type,
    name,
    description,
    location,
    amount,
    amount_normal,
  });

  try {
    const newService = await createService.save();

    return !newService
      ? next(new Error('Error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Creado Exitosamente', data: newService });
  } catch (error) {
    return next(error);
  }
}

async function updateOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    // TODO: `data` guarda todo lo que enviemos, arreglar con `save()` o creando un nuevo objeto

    const serviceUpdated = await Service.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });

    return !serviceUpdated
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ msg: 'Actualizado', data: serviceUpdated });
  } catch (error) {
    return next(error);
  }
}

async function deleteOne(req, res, next) {
  try {
    const { id } = req.params;

    const serviceDeleted = await Service.findByIdAndDelete(id);

    return !serviceDeleted
      ? next(new Error('Ocurrio un error al procesar la solicitud'))
      : res.status(200).send({ data: serviceDeleted });
  } catch (error) {
    return next(error);
  }
}

async function getServicesByUserId(req, res, next) {
  const userId = req.params.uid;
}

module.exports = {
  getAll,
  getOne,
  createNew,
  updateOne,
  deleteOne,
};
