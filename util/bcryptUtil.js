const bcrypt = require('bcryptjs');

const bcryptGenerate = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const bcryptCompare = async (password, comparedToPassword) => {
  const validatePass = await bcrypt.compare(password, comparedToPassword);
  return validatePass;
};

module.exports = { bcryptGenerate, bcryptCompare };
