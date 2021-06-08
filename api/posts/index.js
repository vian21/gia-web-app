const express = require('express');
const router = express.Router();

const authenticated = require('../../helpers/authenticated');


const getPost = require('../../helpers/functions/posts/select').getPost;
const like = require('../../helpers/functions/posts/update').like;
const unlike = require('../../helpers/functions/posts/update').unlike;

router.post('/:id', async (req, res) => {
    const post = await getPost(req.params.id);

    if (post) {
        res.json({
            success: {
                data: post
            }
        })

    } else {
        res.json({ error: "Post not found" })

    }

})

router.post('/:id/like', authenticated, async (req, res) => {
    const post = req.params.id;
    const user = res.locals.id;
    
    if (like(post, user)) {
        res.json({ success: {} })
    } else {
        res.json({ error: {} })
    }

})

router.post('/:id/unlike', authenticated, async (req, res) => {
    const post = req.params.id;
    const user = res.locals.id;

    if (unlike(post, user)) {
        res.json({ success: {} })
    } else {
        res.json({ error: {} })
    }

})



module.exports = router;