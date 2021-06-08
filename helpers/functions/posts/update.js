const db = require('../../db');
const getLikedBy = require('./select').getLikedBy;

const like = async (post, user) => {
    const [result] = await db.query(`UPDATE posts SET likes=likes+1 WHERE id=${post}`)
        .catch(console.log)

    //fecth array of users who liked post
    let likedBy = await getLikedBy(post);

    //check if user already liked the post and add him if not
    if (likedBy.indexOf(user) === -1) {
        likedBy.push(user);

        await db.query(`UPDATE posts SET likedBy='${JSON.stringify(likedBy)}' WHERE id=${post}`)
            .catch(console.log);
    }


    if (result.affectedRows) {
        return true
    } else {
        return false;
    }
}

const unlike = async (post, user) => {
    const [result] = await db.query(`UPDATE posts SET likes=likes-1 WHERE id=${post}`)
        .catch(console.log);

    if (result.affectedRows) {
        return true
    } else {
        return false;
    }
}

module.exports = {
    like,
    unlike,
}