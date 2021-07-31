const express = require('express');
const router = express.Router();

const {db} = require('../../helpers/db');

router.post('/', async (req, res) => {
    const userId = res.locals.id;

    const [result] = await db.query(`UPDATE users SET accountActive = 0 WHERE id = ?;DELETE FROM posts WHERE user = ?; DELETE FROM comments WHERE user = ?;`,
        [userId, userId, userId])
        .catch(console.log)

    //Using only the first query beacuse it usally is always true since update returns always true on update and delete returns false if there is nothing to delete.
    if (result[0].affectedRows) {
        res.json({ success: 'Deleted!' })

    } else {
        res.json({ error: 'Error' })
    }
})

module.exports = router