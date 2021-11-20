const Service = require('../models/service');

async function create(req, res) {
  const service = new Service();
  const data = req.body;
  service.type = data.type;
  service.name = data.name;
  service.description = data.description;
  service.location = data.location;
  service.amount = data.amount;
  service.amount_normal = data.amount_normal;

  try {
    const newService = await service.save();
    if (!newService) {
      res.status(400).send({ msg: 'No se ha guardado' });
    } else {
      res.status(200).send({ service: newService });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
}

module.exports = {
  create,
};
