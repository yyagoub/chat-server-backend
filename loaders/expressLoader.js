const express = require('express');
const cors = require('cors');
const { verifyJwt } = require('../util/jwtUtil');
//const errorHandler = require('../config/errorHandlers');
require('dotenv').config();

const expressLoader = () => {
  const app = express();
  // interceptor: to enable cors
  app.use(cors());
  // interceptor: to convert every request.body to JSON object
  app.use(express.json());

  app.use(require('../routes/routes').public);
  app.use(verifyJwt, require('../routes/routes').private);

  return app;
};

module.exports = expressLoader;
