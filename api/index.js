const express = require('express');
const router = express.Router();
/*
 * Fix
 * when you start with posts require, code breaks
 * fix it and understand why :) - past you
 */
const users = require('./users');
const posts = require('./posts');

const feed = require('./feed');

const status = require('./status');

router.use('/users', users);

router.use('/posts', posts);

router.use('/feed', feed);

router.use('/status', status);

module.exports = router;