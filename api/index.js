const express = require('express');
const router = express.Router();

//routes
const users = require('./users')

router.use('/users', users)

module.exports = router;