const db = require('../../helpers/db');

const dayjs = require('dayjs');

const getMessages = async (currentUser, userId, offSet = 0) => {
    const [results] = await db.execute(`SELECT * FROM chats WHERE sender = ? AND receiver = ? OR sender = ? ANd receiver = ? LIMIT ?,20`,
        [currentUser, userId, userId, currentUser, offSet])
        .catch(console.log());

    if (results.length == 0) {
        return [];
    } else {

        let messages = [];

        await Promise.all(results.map(async (result) => {

            let owner = false;

            if (result.sender == currentUser) {
                owner = true;
            }

            await messages.push({
                id: result.id,
                sender: result.sender,
                body: JSON.parse(result.body || '[]'),
                owner: owner,
                receiver: result.receiver,
                time: dayjs(result.time).format('YYYY-MM-DD HH:mm'),

            })
        }))

        return messages;
    }
}

const saveMessage = async (sender, receiver, body, time) => {

    const [result] = await db.execute(`INSERT INTO chats(sender, receiver, body, time) 
                VALUES(${sender},${receiver},'${body}','${time}')`)
        .catch(console.log());


    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    getMessages,
    saveMessage,
}