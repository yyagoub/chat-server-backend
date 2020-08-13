const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');
const cors = require('cors');
const http = require('http');
const MongoStore = require('connect-mongo')(session);
const { verifyJwt } = require('./util/jwtUtil');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
require('dotenv').config();

// intialize the project
const app = express();

// interceptor: to enable cors
app.use(cors());

// interceptor: to convert every request.body to JSON object
app.use(express.json());

// db connection
require('./config/database');

// public routes
app.use(require('./controllers/controllers-public'));
// authenticated routes
app.use(verifyJwt, require('./controllers/controllers-private'));

const server = http.createServer(app);
const io = socketio(server);
io.on('connection', (socket) => {
  // connection started
  socket.on('join', ({ name, room }, callback) => {
    //room = 'room';
    // test
    const { user, error } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit('message', {
      username: 'admin',
      context: `${user.name} connected`,
    });
    socket.broadcast.to(user.room).emit('message', {
      username: 'admin',
      context: `${user.name}, has joind!`,
    });
    socket.join(user.room);
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  // test
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { username: user.name, context: message });
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  // connection end
  socket.on('disconnect', () => {
    console.log('user end the connection');
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit('message', {
        username: 'admin',
        context: `${user.name}, has left.`,
      });
  });
});

// Server listens on http://localhost:5000
const port = process.env.PORT;

// as long as we are using socket.io we need to run `server` instead of `app`
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
