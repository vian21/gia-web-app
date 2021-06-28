const express = require('express');
const router = express.Router();

const db = require('../../helpers/db');
const authenticated = require('../../helpers/authenticated');

const getStatus = require('../../helpers/functions/status/select').getStatus;
const getAuthenticatedUserId = require('../../helpers/getUserId');
const { getUserName, getUserImage } = require('../../helpers/functions/users/select');
const { getUserStatuses } = require('../../helpers/functions/status/select');

router.post('/', authenticated, async (req, res) => {
    const userId = res.locals.id;

    const offSet = req.body.offSet || 0;

    const [results] = await db.execute('SELECT user FROM status  GROUP BY user ORDER BY time DESC LIMIT ?,20', [offSet])
        .catch(console.log);

    if (results.length == 0) {
        //if empty return an empty object
        res.json({ data: {} });

    }
    else {
        //Variable to store users with status updates
        let users = [];

        await Promise.all(results.map(async (result) => {
            const userName = await getUserName(result.user);
            const userImage = await getUserImage(result.user);
            const user = {
                user: result.user,
                userName: userName,
                userImage: userImage,
                status: await getUserStatuses(result.user) || [],
            }
            users.push(user);
        }))

        res.json({
            success: {
                data: users,
            }
        });
    }

})

router.post('/:id', async (req, res) => {
    const userId = await getAuthenticatedUserId(req);

    const status = await getStatus(req.params.id, userId);


    if (status) {
        res.json({
            success: {
                data: status
            }
        });

    } else {
        res.json({ error: "Status not found" });

    }

})

module.exports = router;