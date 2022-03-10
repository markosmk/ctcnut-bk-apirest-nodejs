const mongoose = require('mongoose');

function validID(req, _, next) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new Error('Identificador Invalido'));
  }
  next();
}
module.exports = validID;
