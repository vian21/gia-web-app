const express = require('express');
const router = express.Router();

const { db } = require('../../helpers/db');

const dayjs = require('dayjs');

router.post('/:id/posts', async (req, res) => {
    const userId = (req.params.id > 0) ? req.params.id : res.locals.id;          //if there is no userid given, it will fetch the profile info of teh current user

    // res.locals.id is defined in ./helpers/authenticated
    const [results] = await db.execute(`SELECT * FROM posts WHERE user = ?`, [userId])
        .catch(error => {
            console.log(error)
        })

    if (results.length !== 0) {
        //This will store array of posts
        let data = [];

        //iterate through the posts and do data manipulation
        results.map((row, index) => {
            data.push({
                id: row.id,
                user: row.user,
                time: dayjs(row.time).format('YYYY-MM-DD'),
                attachments: JSON.parse(row.attachments || null),
                text: row.text,
                type: row.type,                        // 0 for text, 1 for images
                comments: row.comments,


            })
        })

        //response
        res.json({
            success: {
                message: "ok",
                data: data,
            }
        });
    }
    else {
        res.json({
            error: "No posts"
        });
    }
})

module.exports = router;