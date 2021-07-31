const {db} = require('../../../db');

const date = new Date();
const time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const saveComment = async (postId, userId, comment) => {
    const [result] = await db.execute(`INSERT INTO comments(postId,user,comment,time) 
                VALUES(?, ?, ?, ?)`, [postId, userId, comment, time])
        .catch(console.log);

    if (result.affectedRows) {
        return true
    } else {
        return false;
    }
}

module.exports = {
    saveComment,
}