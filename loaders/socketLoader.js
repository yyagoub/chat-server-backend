const socketio = require('socket.io');
const connectionSocket = require('../socket/connectionSocket');
const http = require('http');

const socketLoader = async (app) => {
  const server = http.createServer(app);
  const io = socketio(server);
  io.on('connection', connectionSocket(io));
  return server;
};

module.exports = socketLoader;
