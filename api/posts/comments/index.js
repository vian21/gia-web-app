const express = require('express');
const router = express.Router();

const getComments = require('../../../helpers/functions/posts/select').getComments;

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
        res.json({ error: 'No posts' })
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
        res.json({ error: 'No posts' })
    }
})

module.exports = router;