const express = require('express');
const router = express.Router();
const loginCtrl = require('../controllers/loginCtrl');

router.post('/', loginCtrl.login);

module.exports = router;
