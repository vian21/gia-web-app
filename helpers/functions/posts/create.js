const db = require('../../db');

const createPost = async (user, time, location, attachments, text) => {
    const [result] = await db.execute(`INSERT INTO posts(user, time,location,attachments, text) VALUES
                        (${user},'${time}', '${location}', '${attachments}', '${text}')`)
        .catch(console.log());

    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }


}

module.exports = {
    createPost,
}