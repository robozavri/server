export default {
  port: 4002,

  url: {
    scheme: 'http',
    host: 'core.com',
    api: 'core.com',
  },

  mongo: {
    uri: `mongodb://localhost:27017/core`,
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  },

  winstonConsole: false,

  // seedDB: true,
};
