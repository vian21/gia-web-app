const express = require('express');
const router = express.Router();

const saveComment = require('./save');
const getComments = require('../../../helpers/functions/posts/comments/select').getComments;

router.use('/comments/save', saveComment);

router.post('/:id/comments', async (req, res) => {
    const postId = req.params.id;
    const comments = await getComments(postId, 0)

    if (comments) {
        res.json({
            success: {
                data: {
                    comments
                }
            }
        });
    } else {
        res.json({ error: 'No comments' })
    }
})

router.post('/:id/comments/:offSet', async (req, res) => {
    const postId = req.params.id;
    const offSet = req.params.offSet;

    const comments = await getComments(postId, offSet);

    if (comments) {
        res.json({
            success: {
                data: {
                    comments
                }
            }
        });
    } else {
        res.json({ error: 'No comments' })
    }
})

module.exports = router;