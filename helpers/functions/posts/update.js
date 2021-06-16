const db = require('../../db');

const getLikedBy = require('./select').getLikedBy;

const like = async (post, user) => {

    //fecth array of users who liked post
    let likedBy = await getLikedBy(post);

    //check if user already liked the post and add him if not
    if (likedBy.indexOf(user) === -1) {
        likedBy.push(user);

        await updateLikedBy(likedBy, post)

        const [result] = await db.execute(`UPDATE posts SET likes=likes+1 WHERE id = ?`, [post])
            .catch(console.log)

        //successfull increment in likes
        if (result.affectedRows) {
            return true;
        } else {
            return false;
        }
    }

}

const unlike = async (post, user) => {
    const [result] = await db.execute(`UPDATE posts SET likes=likes-1 WHERE id = ?`, [post])
        .catch(console.log);

    let likedBy = await getLikedBy(post);

    //remove user from liked array
    if (likedBy.indexOf(user) !== -1) {

        //get index of user in array
        const index = likedBy.indexOf(user);

        //remove userId from array
        likedBy.splice(index);

        //update database
        await updateLikedBy(likedBy, post);
    }

    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }
}

const updateLikedBy = async (array, postId) => {
    const [result] = await db.execute(`UPDATE posts SET likedBy = ? WHERE id = ?`, [JSON.stringify(array), postId])
        .catch(console.log);

    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }
}
module.exports = {
    like,
    unlike,
    updateLikedBy,
}