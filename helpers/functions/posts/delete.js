const db = require('../../db');

const deletePost = async (postId, userId) => {
    const [result] = await db.query(`DELETE FROM posts WHERE id = ? AND user = ?;DELETE FROM comments WHERE postId = ?`, [postId, userId, postId])
        .catch(console.log);

    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    deletePost,
}