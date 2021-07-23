const express = require('express');
const router = express.Router();

const upload = require('../../helpers/multer');

router.post('/create', upload.array('media', 10), async (req, res) => {
    console.log("here")
    const data = req.body;
    const media = req.files;

    console.log(media.length);

    res.send("hello");
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

module.exports = router;