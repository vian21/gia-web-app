const {db} = require('../../../db');
const dayjs = require('dayjs');

const getUserName = require('../../users/select').getUserName;
const getUserImage = require('../../users/select').getUserImage;

//comments
const getComments = async (postId, offSet) => {
    const [results] = await db.execute(`SELECT * FROM comments WHERE postId = ? ORDER BY id DESC LIMIT ? ,10`, [postId, offSet])
        .catch(console.log);

    if (results.length !== 0) {

        let comments = [];

        await Promise.all(results.map(async (result, index) => {
            await comments.push({
                userId: result.user,
                user: await getUserName(result.user),
                userImage: await getUserImage(result.user),
                postId: result.postId,
                comment: result.comment,
                time: dayjs(result.time).format('YYYY-MM-DD HH:mm'),

            })
        }))

        return comments;
    } else {
        return false;
    }
}

module.exports = {
    getComments,
}