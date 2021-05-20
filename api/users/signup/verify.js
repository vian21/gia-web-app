const express = require('express');
const router = express.Router();

const similar = require('string-similarity');

const db = require('../../../helpers/db');

router.post('/', (req, res) => {
    const data = req.body;
    db.query(`SELECT*FROM users WHERE idNumber=${data.id}`, (error, result, fields) => {
        if (error) throw error

        if (result == '') {
            res.json({ error: "Identity could not be confirmed! Check your ID or name" });
        }

        //continue only if account is not activated
        if (result[0].accountActive == 0) {
            if (similar.compareTwoStrings(data.name, result[0].name) > 0.6) {
                res.json({
                    success: {
                        message: "Identity confirmed",
                        id: result[0].id
                    }
                });
            } else {
                res.json({ error: "Incorrect name spelling!" });

            }
        } else {
            res.json({ exists: "Your account is already activated!" })
        }
    })


})
module.exports = router;