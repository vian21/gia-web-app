const express = require('express');
const router = express.Router();

const db = require('../../../helpers/db');

router.post('/', (req, res) => {
    const data = req.body;

    //generate confirmation code
    const code = Math.floor(Math.random() * (10000 - 1000)) + 1000;

    db.query(`UPDATE users 
            SET email='${data.email}',
            activationCode=${code}
            WHERE id=${data.id} and 
            accountActive=0`, (error, result) => {
        if (error) throw error;

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
    })
});

module.exports = router;