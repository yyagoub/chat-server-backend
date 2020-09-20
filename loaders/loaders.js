const loaders = async () => {
  const app = require('./expressLoader')();
  require('./mongoLoader')(app);
  const server = require('./socketLoader')(app);
  return server;
};

module.exports = loaders;
