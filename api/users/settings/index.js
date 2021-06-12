const express = require('express');
const router = express.Router();

const profile = require('./profile');
const posts = require('./posts');


router.use('/profile', profile);
router.use('/posts', posts);


module.exports = router;