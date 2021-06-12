const express = require('express');
const router = express.Router();

const verify = require('./verify');

const verifyEmail=require('./verifyEmail');
const verifyCode=require('./verifyCode');
const setPassword=require('./setPassword');

router.use('/verify', verify);

router.use('/verify-email',verifyEmail);

router.use('/verify-code',verifyCode);

router.use('/set-password',setPassword);

module.exports = router;