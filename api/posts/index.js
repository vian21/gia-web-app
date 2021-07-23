const express = require('express');
const router = express.Router();

const action = require('./action');
const comments = require('./comments');
const create = require('./create');

const getPost = require('../../helpers/functions/posts/select').getPost;
const getAuthenticatedUserId = require('../../helpers/getUserId');

router.use('/', action);

router.use('/', comments);

router.use('/', create);

router.post('/:id', async (req, res) => {
    const userId = await getAuthenticatedUserId(req);

    const post = await getPost(req.params.id, userId);


    if (post) {
        res.json({
            success: {
                data: post
            }
        });

    } else {
        res.json({ error: "Post not found" });

    }

})




module.exports = router;