const express = require('express');
const session = require('express-session');
const socketio = require('socket.io');
const connectionSocket = require('./socket/connectionSocket');
const cors = require('cors');
const http = require('http');
const MongoStore = require('connect-mongo')(session);
const { verifyJwt } = require('./util/jwtUtil');
require('dotenv').config();

// intialize the project
const app = express();

// interceptor: to enable cors
app.use(cors());

// interceptor: to convert every request.body to JSON object
app.use(express.json());

require('./config/database');

app.use(require('./routes/routes').public);
app.use(verifyJwt, require('./routes/routes').private);

const server = http.createServer(app);

const io = socketio(server);
io.on('connection', connectionSocket(io));

// Server listens on http://localhost:5000
const port = process.env.PORT || 5000;

// as long as we are using socket.io we need to run `server` instead of `app`
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
