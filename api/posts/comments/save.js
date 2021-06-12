const express = require('express');
const router = express.Router();

const authenticated = require('../../../helpers/authenticated');

const saveComment = require('../../../helpers/functions/posts/comments/create').saveComment;

router.post('/', authenticated, async (req, res) => {
    const postId = req.body.postId;
    const user = res.locals.id;
    const comment = req.body.comment;

    if (comment && postId) {
        if (saveComment(postId, user, comment)) {
            res.json({ success: 'posted!' })
        } else {
            res.json({ error: 'Failed to post comment!' });
        }
    } else {
        res.json({ error: 'Please enter a comment!' })
    }
})
module.exports = router;