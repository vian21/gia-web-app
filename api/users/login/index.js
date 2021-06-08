const express = require('express');
const router = express.Router();

require('dotenv').config()

const db = require('../../../helpers/db');

const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const data = req.body;

    let query = 'SELECT * FROM users ';

    if (validator.isEmail(data.email)) {
        query += `WHERE email='${data.email}';`;
    } else {
        query += `WHERE idNumber = ${data.email};`;
    }

    const [result] = await db.query(query)

        .catch(error => {
            console.log(error)
        })

    if (result == '') {
        res.json({ error: "Account not found!" })
    } else {
        bcrypt.compare(data.password, result[0].password, (error, match) => {
            if (error) throw error

            if (!match) {
                res.json({ error: "Wrong password" })
            }
            else {
                //create a user object with data to be sent in JWT 
                const user = {
                    id: result[0].id,
                    name: result[0].name
                };

                const token = jwt.sign(user, process.env.JWT_KEY, {
                    expiresIn: 365 * 24 * 60 * 60
                });

                res.json({ token: token });
            }
        })
    }



})

module.exports = router;