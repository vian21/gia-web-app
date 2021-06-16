const express = require('express');
const router = express.Router();

const authenticated = require('../../../helpers/authenticated');


const getPost = require('../../../helpers/functions/posts/select').getPost;
const like = require('../../../helpers/functions/posts/update').like;
const unlike = require('../../../helpers/functions/posts/update').unlike;
const deletePost = require('../../../helpers/functions/posts/delete').deletePost;

router.post('/:id/like', authenticated, async (req, res) => {
    const post = req.params.id;
    const user = res.locals.id;

    if (like(post, user)) {
        res.json({ success: {} });
    } else {
        res.json({ error: {} });
    }

})

router.post('/:id/unlike', authenticated, async (req, res) => {
    const post = req.params.id;
    const user = res.locals.id;

    if (unlike(post, user)) {
        res.json({ success: {} });
    } else {
        res.json({ error: {} });
    }

})

router.post('/:id/delete', authenticated, async (req, res) => {
    const post = req.params.id;
    const user = res.locals.id;

    if (deletePost(post, user)) {
        res.json({ success: {} });
    } else {
        res.json({ error: {} });
    }

})

module.exports = router;