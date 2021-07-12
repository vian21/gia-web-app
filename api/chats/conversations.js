const db = require('../../helpers/db');
const { getUserImage, getUserName } = require('../../helpers/functions/users/select');

const dayjs = require('dayjs');

const conversations = async (userId) => {
    const [results] = await db.execute(`SELECT id, sender, receiver, time FROM chats WHERE sender = ? OR receiver = ? GROUP BY sender, receiver`, [userId, userId])
        .catch(error => console.log(error));

    if (results.length == 0) {
        return [];
    } else {


        let conversations = [];

        await Promise.all(results.map(async (result, index) => {
            const chat = (result.sender == userId) ? result.receiver : result.sender;

            await conversations.push({
                userId: chat,
                user: await getUserName(chat),
                userImage: await getUserImage(chat),
                time: dayjs(result.time).format('YYYY-MM-DD HH:mm'),

            })
        }))

        return conversations;

    }
}

module.exports = conversations;