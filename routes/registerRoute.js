const express = require('express');
const router = express.Router();
const registerCtrl = require('../controllers/registerCtrl');

// post a new user
router.post('/', registerCtrl.register);

module.exports = router;
