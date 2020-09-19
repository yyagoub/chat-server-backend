const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../services/User');
const { assignJwt } = require('../util/jwtUtil');

const loginCtrl = {
  login: async (req, res) => {
    // validate the data
    const { error } = loginValidation(req.body);
    if (error) return res.status(422).send(error.details[0].message);
    // authenticate the user
    const authenticatedUser = await User.findOne({
      username: req.body.username,
    });
    if (!authenticatedUser)
      return res.status(422).send('username and password is wrong');
    const validatePass = await bcrypt.compare(
      req.body.password,
      authenticatedUser.password
    );
    if (!validatePass)
      return res.status(422).send('username and password is wrong');
    // create and assing a token
    const token = assignJwt(authenticatedUser);
    const user = { username: authenticatedUser.username, token };
    res.header('authorization', token);
    res.send(user);
  },
};

module.exports = loginCtrl;
