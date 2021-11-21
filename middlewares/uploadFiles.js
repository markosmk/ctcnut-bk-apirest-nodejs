const crypto = require('crypto');
const multer = require('multer');
const { FILE_TYPE_MIME, FILE_MAX_SIZE, FILE_MAX_CANT, FILE_MAX } = require('../config');

// 1er Paso -> Multer Filter Personalizado
const filterMulter = (req, file, callback) => {
  // no esta demas controlar  el tamaño / pero pasado en cabeceras
  const fileSize = parseInt(req.headers['content-length']);
  if (fileSize > FILE_MAX_SIZE) {
    return callback(
      new Error(
        `El archivo es demasiado grande, se permiten archivos hasta ${
          FILE_MAX_SIZE / 1000000
        }Mb`
      ),
      false
    );
  }

  // filtramos archivos permitidos
  const isValid = FILE_TYPE_MIME[file.mimetype];
  if (!isValid) {
    return callback(
      new Error(
        `Tipo de Imagen Invalido, permitidos ${Object.values(FILE_TYPE_MIME).join(', ')}`
      ),
      false
    );
  }

  // sino hay mas filtros continuamos
  callback(null, true);
};

// 2do Paso -> Multer Limits
const limitsMulter = {
  // para controlar ataques de denegación de servicio (DoS)
  fileSize: FILE_MAX_SIZE,
  fields: FILE_MAX_CANT,
  files: FILE_MAX_CANT,
  parts: FILE_MAX_CANT * 2,
  headerPairs: 1000,
};

// 3er Paso -> Multer Storage
const storageMulter = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    const extension = FILE_TYPE_MIME[file.mimetype];
    // NOTE o usar crypto.randomUUID()
    // No use Date.now() para evitar problemas a futuro
    const randomKey = crypto.randomBytes(16).toString('hex');
    callback(null, file.fieldname + '-' + randomKey + '.' + extension);
  },
});

// EndPoint Obj para una imagen
const uploadImage = multer({
  // FIXME cuando se envia un archivo grande diferente al permitido demora al procesar multer, se deberia verificar el bufer o controlar el tamaño desde la solicitud del cliente
  // Sync
  storage: storageMulter,
  limits: limitsMulter,
  fileFilter: filterMulter,
});

// EndPoint Obj para varias imagenes
const uploadMultiImage = multer({
  storage: storageMulter,
  limits: limitsMulter,
  fileFilter: filterMulter,
  // fileFilter: [filterMulter, ImageFilter], // TODO añadir algun filtro para comprimir
});

module.exports = { uploadImage, uploadMultiImage };
