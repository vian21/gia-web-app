const express = require('express');
const router = express.Router();

const db = require('../../../helpers/db');

router.post('/', async (req, res) => {
    const data = req.body;

    //generate confirmation code
    const code = Math.floor(Math.random() * (10000 - 1000)) + 1000;

    const [result] = await db.execute(`UPDATE users  SET email = ?, activationCode = ? WHERE id = ? and accountActive=0`, [data.email, code, data.id])
        .catch(error => {
            console.log(error);
        })

    if (result.affectedRows) {
        //send email
        res.json({
            success: {
                message: "Email sent",
                id: data.id
            }
        })

    } else {
        res.json({ error: "Account is already activated" })
    }
});

module.exports = router;