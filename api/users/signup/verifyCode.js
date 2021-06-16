const express = require('express');
const router = express.Router();

const db = require('../../../helpers/db');

router.post('/', async (req, res) => {
    const data = req.body;
    const [result] = await db.execute(`SELECT id,activationCode,email FROM users WHERE id = ? AND activationCode = ? AND accountActive = 0`, [data.id, data.code])
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