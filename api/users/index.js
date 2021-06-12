const express = require('express');
const router = express.Router();

const login = require('./login');
const signup = require('./signup');
const settings = require('./settings');

const update = require('./update');

const authenticated = require('../../helpers/authenticated');

router.use('/login', login);

router.use('/signup', signup);

router.use('/settings', authenticated, settings);

router.use('/update', authenticated, update);


module.exports = router;