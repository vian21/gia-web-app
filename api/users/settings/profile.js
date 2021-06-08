const express = require('express');
const router = express.Router();

const dayjs = require('dayjs')

const db = require('../../../helpers/db');

router.post('/', async (req, res) => {
    const [result] = await db.query(`SELECT id,idNumber,name, email, contacts, profilePicture, DOB, gender FROM users WHERE id=${res.locals.id}`)
        .catch(console.log)

    if (result.length !== 0) {
        res.json({
            success: {
                message: "ok",
                data: {
                    id: result[0].id,
                    idNumber: result[0].idNumber,
                    name: result[0].name,
                    email: result[0].email,
                    contacts: JSON.parse(result[0].contacts || null),
                    profilePicture: result[0].profilePicture,
                    DOB: dayjs(result[0].DOB).format('YYYY-MM-DD'),
                    gender: result[0].gender,
                }
            }
        });
    }
    else {
        res.json({
            error: "Failed to fecth data!"
        });
    }

})

module.exports = router;