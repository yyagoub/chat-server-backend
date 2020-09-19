const { addUser, removeUser, getUser, getUsersInRoom } = require('../users');

const join = (io, socket) => ({ name, room }, callback) => {
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
};

const sendMessage = (io, socket) => (message, callback) => {
  const user = getUser(socket.id);
  io.to(user.room).emit('message', { username: user.name, context: message });
  io.to(user.room).emit('roomData', {
    room: user.room,
    users: getUsersInRoom(user.room),
  });
  callback();
};

const disconnect = (io, socket) => () => {
  console.log('user end the connection');
  const user = removeUser(socket.id);
  if (user)
    io.to(user.room).emit('message', {
      username: 'admin',
      context: `${user.name}, has left.`,
    });
};

const connectionSocket = (io) => (socket) => {
  socket.on('join', join(io, socket));
  socket.on('sendMessage', sendMessage(io, socket));
  socket.on('disconnect', disconnect(io, socket));
};

module.exports = connectionSocket;
