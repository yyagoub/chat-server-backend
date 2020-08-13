const mongoose = require('mongoose');

const ConversationSchema = mongoose.Schema({
  CreatedByUsername: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Conversation', ConversationSchema);
