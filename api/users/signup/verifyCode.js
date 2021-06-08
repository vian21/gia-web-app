const express = require('express');
const router = express.Router();

const db = require('../../../helpers/db');

router.post('/', async (req, res) => {
    const data = req.body;
    const [result] = await db.query(`SELECT id,activationCode,email FROM users where id=${data.id} AND activationCode=${data.code} AND accountActive=0`)
        .catch(error => {
            console.log(error);
        })
    if (result.length !== 0) {

        res.json({
            success: {
                id: result[0].id,
                code: result[0].activationCode,
                message: "Code Verified!"
            }
        });

    } else {
        res.json({ error: "Invalid code!" });
    }

});

module.exports = router;