const express = require('express');
const public = express.Router();
const private = express.Router();

public.use('/register', require('./registerRoute'));

public.use('/auth', require('./loginRoute'));

private.route('/').get(() => 'hello');

module.exports = { public, private };
