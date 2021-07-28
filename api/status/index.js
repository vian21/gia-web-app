const db = require('../../helpers/db');

const getStatus = require('../../helpers/functions/status/select').getStatus;
const { getUserName, getUserImage } = require('../../helpers/functions/users/select');
const { getUserStatuses } = require('../../helpers/functions/status/select');

const status = async (socket, io) => {
    socket.on('getStatuses', async (offSet = 0) => {
        // const userId = socket.userId;

        const [results] = await db.execute('SELECT user FROM status  GROUP BY user ORDER BY id DESC LIMIT ?,20', [offSet])
            .catch(console.log);

        if (!results || results.length == 0) {
            //if empty return an empty object
            socket.emit('getStatuses', { error: "Failed to fetch status updates" })
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

            socket.emit('getStatuses', users)
        }

    })

    socket.on('status', async (id) => {
        const userId = socket.userId;

        const status = await getStatus(id, userId);


        if (status) {

            socket.emit('status', status);

        } else {
            // res.json({ error: "Status not found" });
            socket.emit('status', { error: "Status not found" })

        }

    })

}

module.exports = status;