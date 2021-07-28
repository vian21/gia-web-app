const express = require('express');
const router = express.Router();

const authenticated = require('../../helpers/authenticated');

const upload = require('../../helpers/multer');

const { createPost } = require('../../helpers/functions/posts/create');

router.post('/create', authenticated, upload.array('media', 10), async (req, res) => {
    const data = req.body;
    const media = req.files;

    //user ID
    const user = res.locals.id;

    const date = new Date();
    const time = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

    const location = data.location || '';

    //post's text/description
    const text = data.text;

    //array to contain attachments info
    let attachments = [];

    //only loop through when there is data sent, not undefined
    console.log(req.files)
    if (media) {
        await Promise.all(media.map(async (file) => {
            let type = "image";

            if (file.mimetype.includes('video')) {
                type = "video";
            }
            const attachment = {
                url: file.filename,
                type: type,
                time: time
            }

            await attachments.push(attachment);
        }))
    }

    //verfiy if user sent images or text at least, if not post can't be create(empty post)
    if (media || text) {
        if (createPost(user, time, location, JSON.stringify(attachments), text)) {
            res.json({
                success: 'ok'
            })
        } else {
            res.json({
                error: "Failed to create post!"
            })
        }
    }



}, (error, req, res, next) => {
    res.status(400).json({ error: error.message })
})

module.exports = router;