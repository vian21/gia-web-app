const express = require('express');
const router = express.Router();

const upload = require('../../../helpers/multer');

const { updateProfilePicture, updateIdNumber, updateName, updateEmail, updateDOB, updateGender } = require('../../../helpers/functions/users/update');

const getContacts = require('../../../helpers/functions/users/select').getContacts;
const updateContact = require('../../../helpers/functions/users/update').updateContact;
const deleteFile = require('../../../helpers/deleteFile');

router.post('/profilePicture', upload.single('media'), async (req, res) => {
    const data = req.body;
    const media = req.file;

    if (updateProfilePicture(res.locals.id, media.filename)) {
        res.json({ success: media.filename });

        //delete old profile picture [clean up]
        deleteFile(data.oldImage);
        
    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/idNumber', async (req, res) => {
    const data = req.body.idNumber

    if (updateIdNumber(res.locals.id, data)) {
        res.json({ sucess: "ok" });

    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/name', async (req, res) => {
    const data = req.body.name

    if (updateName(res.locals.id, data)) {
        res.json({ sucess: "ok" });

    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/email', async (req, res) => {
    const email = req.body.email

    if (updateEmail(res.locals.id, email)) {
        res.json({ sucess: "ok" });

    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/DOB', async (req, res) => {
    const DOB = req.body.DOB

    if (updateDOB(res.locals.id, DOB)) {
        res.json({ sucess: "ok" });

    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/gender', async (req, res) => {
    const gender = req.body.gender

    if (updateGender(res.locals.id, gender)) {
        res.json({ sucess: "ok" });

    } else {
        res.json({ error: "Failed to save!" })
    }
});

router.post('/contact', async (req, res) => {
    const data = req.body;

    getContacts(res.locals.id).then((contacts) => {
        contacts[data.index].value = data.value

        if (updateContact(res.locals.id, JSON.stringify(contacts))) {
            res.json({
                success: {
                    message: 'ok'
                }
            })

        } else {
            res.json({ error: "Failed to save contact!" })
        }
    })


});

module.exports = router;