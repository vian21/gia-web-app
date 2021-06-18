const express = require('express');
const router = express.Router();

const login = require('./login');
const signup = require('./signup');
const settings = require('./settings');

const update = require('./update');

const deleteAccount = require('./delete.js');


const authenticated = require('../../helpers/authenticated');

router.use('/login', login);

router.use('/signup', signup);

router.use('/settings', authenticated, settings);

router.use('/update', authenticated, update);

router.use('/delete', authenticated, deleteAccount);


module.exports = router;