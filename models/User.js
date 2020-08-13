const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
  conversations: { type: [String], require: false },
});

module.exports = mongoose.model('User', UserSchema);
