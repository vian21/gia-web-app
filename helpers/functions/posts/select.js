const db = require('../../db');
const dayjs = require('dayjs');

const getUserName = require('../users/select').getUserName;
const getUserImage = require('../users/select').getUserImage;

const getPost = async (id, userId = 0) => {
    const [result] = await db.query(`SELECT * FROM posts WHERE id=${id}`)

    if (result.length == 0) {
        return false
    } else {
        //fetch user name
        const userName = await getUserName(result[0].user);
        const userImage = await getUserImage(result[0].user);

        let selfLike = false;

        //array of user ids
        let likedBy = JSON.parse(result[0].likedBy || '[]');

        if (likedBy.includes(userId)) {
            selfLike = true
        }

        //TODO: get info of user who like the post

        return {
            id: result[0].id,
            user: result[0].user,
            userName: userName,
            userImage: userImage,
            time: dayjs(result[0].time).format('YYYY-MM-DD HH:mm'),
            selfLike: selfLike,
            likes: result[0].likes,
            likeBy: 0,
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

module.exports = {
    getLikedBy,
    getPost,
}