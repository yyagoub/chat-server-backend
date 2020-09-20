const UserModel = require('../models/User');
const { loginValidation, registerValidation } = require('../services/User');
const User = require('../models/User');
const { bcryptGenerate, bcryptCompare } = require('../util/bcryptUtil');
const { assignJwt } = require('../util/jwtUtil');

const UserService = {
  login: async (username, password) => {
    const authenticatedUser = await userAuthentication(username, password);
    const token = assignJwt(authenticatedUser);
    return { username: authenticatedUser.username, token };
  },
  register: async (username, password) => {
    const hashedPassword = await validateNewUser({ username, password });
    const user = new User({ username, password: hashedPassword });
    // respond with saved user
    await user.save().catch((err) => {
      throw new Error(err);
    });
  },
};

const userAuthentication = async (username, password) => {
  const { error } = loginValidation({ username, password });
  if (error) throw new Error(error);
  const authenticatedUser = await User.findOne({ username });
  if (!authenticatedUser) throw new Error('username and password is wrong');
  const validatePass = await bcryptCompare(
    password,
    authenticatedUser.password
  );
  if (!validatePass) throw new Error('username and password is wrong');
  return authenticatedUser;
};

const validateNewUser = async ({ username, password }) => {
  const { error } = registerValidation({ username, password });
  if (error) throw new Error(error.details[0].message);
  const usernameExist = await User.findOne({ username });
  if (usernameExist) throw new Error('username already exists');
  const hashedPassword = await bcryptGenerate(req.body.password);
  return hashedPassword;
};

module.exports = UserService;
