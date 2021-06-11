const db = require('../../db');
const dayjs = require('dayjs');

const getUserName = require('../users/select').getUserName;
const getUserImage = require('../users/select').getUserImage;

const getPost = async (id) => {
    const [result] = await db.query(`SELECT * FROM posts WHERE id=${id}`)

    if (result.length == 0) {
        return false
    } else {
        //fetch user name
        const userName = await getUserName(result[0].user);
        const userImage = await getUserImage(result[0].user);
        let isOwn;
        /*
         * hey bro fix how the system will know if the post is own(current user)
         * This api route can be accessed whether logged in or not
         * If not own how to know u already liked it
         */
        return {
            id: result[0].id,
            user: result[0].user,
            userName: userName,
            userImage: userImage,
            time: dayjs(result[0].time).format('YYYY-MM-DD HH:mm'),
            selfLike: result[0].selfLike,
            likes: result[0].likes,
            likeBy: JSON.parse(result[0].likeBy || null),
            location: result[0].location,
            attachments: JSON.parse(result[0].attachments || null),
            text: result[0].text,
            type: result[0].type,
        }
    }

}

const getLikedBy = async (post) => {
    const [result] = await db.query(`SELECT likedBy FROM posts WHERE id=${post}`)
        .catch(console.log);

    return JSON.parse(result[0].likedBy || '[]');

}

//comments
const getComments = async (postId, offSet) => {
    const [result] = await db.query(`SELECT * FROM comments WHERE postId=${postId} LIMIT ${offSet},20`)
        .catch(console.log);

    if (result.length == 0) {
        return false;
    } else {
        return result;
    }
}
module.exports = {
    getLikedBy,
    getPost,
    getComments,
}