const db = require('../../helpers/db');
const { getUserImage, getUserName } = require('../../helpers/functions/users/select');

const dayjs = require('dayjs');

const conversations = async (userId) => {

    const [results] = await db.execute(`SELECT id, sender, receiver, time FROM chats WHERE sender = ? OR receiver = ? GROUP BY sender, receiver`, [userId, userId])
        .catch(error => console.log(error));

    if (results.length == 0) {

        return [];
    }
    else {
        //array to contain all grouped conversations
        let conversations = [];

        //loop through each row and fetch usernames and images
        await Promise.all(results.map(async (result) => {
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