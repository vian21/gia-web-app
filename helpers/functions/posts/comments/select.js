const db = require('../../../db');
const dayjs = require('dayjs');

const getUserName = require('../../users/select').getUserName;
const getUserImage = require('../../users/select').getUserImage;

//comments
const getComments = async (postId, offSet) => {
    const [results] = await db.query(`SELECT * FROM comments WHERE postId=${postId} ORDER BY time DESC LIMIT ${offSet},10`)
        .catch(console.log);

    if (results.length !== 0) {

        let comments = [];

        await Promise.all(results.map(async (result, index) => {
            comments.push({
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