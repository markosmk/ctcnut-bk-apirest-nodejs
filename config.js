module.exports = {
  URI_MONGO:
    process.env.NODE_ENV === 'testing'
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI,
  PORT: process.env.PORT || 3000,
  SECRET_KEY: process.env.SECRET_KEY || 'T3Fad68htrGs89hsAS',
  FILE_TYPE_MIME: {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
  },
  FILE_MAX_SIZE: 1 * 1000000, // 1MB (bytes)
  FILE_MAX_CANT: 10, // items maximos permitidos
};
