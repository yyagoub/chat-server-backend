const express = require('express');
const router = express.Router();

// get all user's conversation
router.get('/', async (req, res) => {
  const userId = req.user._id;
  console.log('test');
  res.send('hello world');
});

// start new conversation
router.post('/', async (req, res) => {
  const userId = req.user._id;
  if (!req.body.user) return;
  const toUsername = req.body.user.username;
  // check if username is already in the database
  const usernameExist = await User.findOne({ username: toUsername });
  if (usernameExist) return res.status(422).send('username not found');
  res.send('we found your friend!');
});

// send message to conversation
router.patch('/', (req, res) => {
  console.log('test');
  res.send('hello world');
});

module.exports = router;
