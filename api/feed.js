const express = require('express');
const router = express.Router();

const db = require('../helpers/db');
const authenticated = require('../helpers/authenticated');


router.post('/', authenticated, async (req, res) => {
    const userId = res.locals.id;

    const offSet = req.body.offSet || 0;

    const [result] = await db.execute('SELECT id FROM posts LIMIT ?,20', [offSet])
        .catch(console.log);

    res.json({
        data: result
    });
})

module.exports = router;