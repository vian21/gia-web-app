const {db} = require('../../db');
const dayjs = require('dayjs');

const getUserName = require('../users/select').getUserName;
const getUserImage = require('../users/select').getUserImage;

const getStatus = async (id, userId = 0) => {
    const [result] = await db.execute(`SELECT * FROM status WHERE id = ?`, [id])

    if (result.length == 0) {
        return false
    } else {
        //fetch user name
        const userName = await getUserName(result[0].user);
        const userImage = await getUserImage(result[0].user);

        let owner = false;

        //determine ownership of status
        if (result[0].user == userId) {
            owner = true
        }

        return {
            id: result[0].id,
            user: result[0].user,
            userName: userName,
            owner: owner,
            userImage: userImage,
            attachments: JSON.parse(result[0].attachments || null),
        }
    }

}

const getUserStatuses = async (userId) => {
    const [result] = await db.execute(`SELECT id FROM status WHERE user = ? ORDER BY time`, [userId])

    if (result.length == 0) {
        return false;
    } else {
        return result;
    }

}
module.exports = {
    getStatus,
    getUserStatuses,
}