const express = require('express');
const { sign } = require('jsonwebtoken');
const router = express.Router();

const login = require('./login');
const signup=require('./signup');

router.post('/', (req, res) => {
    const data = req.body
    res.json(data)
})

router.use('/login', login);

router.use('/signup',signup);

module.exports = router;