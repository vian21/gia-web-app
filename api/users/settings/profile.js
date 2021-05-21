const express = require('express');
const router = express.Router();

const authenticated = require('../../../helpers/authenticated');
const db = require('../../../helpers/db');

router.post('/', authenticated, (req, res) => {
    db.query(`SELECT id,idNumber,name, email, contacts, profilePicture, DOB, gender FROM users WHERE id=${res.locals.id}`, (error, result) => {
        if (error) throw error;

        if (result.length !== 0) {
            res.json(result[0]);
        }
        else {
            res.json({
                error: "Failed to fecth data!"
            });
        }
    })

})

module.exports = router;