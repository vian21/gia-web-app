const express = require('express');
const router = express.Router();

const action = require('./action');
const comments = require('./comments');

router.use('/', action);

router.use('/', comments);

module.exports = router;