const express = require('express');
const router = express.Router();
/*
 * Fix
 * when you start with posts require, code breaks
 * fix it and understand why :) - past you
 */
const users = require('./users');
const posts = require('./posts');

const feed=require('./feed');

router.use('/users', users);

router.use('/posts', posts);

router.use('/feed',feed)

module.exports = router;