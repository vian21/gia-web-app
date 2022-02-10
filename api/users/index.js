const express = require('express');
const router = express.Router();

const login = require('./login');
const signup = require('./signup');

const update = require('./update');

const deleteAccount = require('./delete.js');


const authenticated = require('../../helpers/authenticated');

const profile = require('./profile');
const posts = require('./posts')

router.use('/login', login);

router.use('/', authenticated, profile)                         //fetch user profile info
router.use('/', authenticated, posts)                           //fetch posts by user

router.use('/signup', signup);


router.use('/update', authenticated, update);

router.use('/delete', authenticated, deleteAccount);


module.exports = router;