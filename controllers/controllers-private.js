const express = require('express');
const router = express.Router();

router.use('/conversation', require('./conversation'));

router.use('/friends', require('./friends'));

module.exports = router;
