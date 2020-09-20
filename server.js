const express = require('express');
const loaders = require('./loaders/loaders');

const starter = async () => {
  // intialize the project
  //const app = express();
  const server = await loaders();
  // Server listens on http://localhost:5000
  const port = process.env.PORT || 5000;
  // as long as we are using socket.io we need to run `server` instead of `app`
  server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
};

starter();
