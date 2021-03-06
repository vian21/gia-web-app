const express = require('express');
const router = express.Router();

require('dotenv').config()

const {db} = require('../../../helpers/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const data = req.body;

    const hash = bcrypt.hashSync(data.password, 12);

    const [result] = await db.execute(`UPDATE users SET password = ?, accountActive = 1 WHERE id = ? AND activationCode = ? AND accountActive = 0`, [hash, data.id, data.code])
        .catch(error => {
            console.log(error)
        })

    if (result.affectedRows) {
        const user = {
            id: data.id
        }
        const token = jwt.sign(user, process.env.JWT_KEY, {
            expiresIn: 24 * 60 * 60
        });

        res.json({
            success: {
                token: token,
                message: "Account successfully created!"
            }
        })
    } else {
        res.json({ error: "Account is already activated!" })
    }



})

module.exports = router;