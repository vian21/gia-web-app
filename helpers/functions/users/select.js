const {db} = require('../../db');

const getContacts = async (id) => {
    const [result] = await db.execute('SELECT contacts FROM `users` WHERE id=?', [id]);
    return JSON.parse(result[0].contacts)

}

const getUserName = async (id) => {
    const [result] = await db.execute('SELECT name FROM `users` WHERE id=?', [id]);
    return result[0].name;

}

const getUserImage = async (id) => {
    const [result] = await db.execute('SELECT profilePicture FROM `users` WHERE id=?', [id]);
    return result[0].profilePicture;

}
module.exports = {
    getContacts,
    getUserName,
    getUserImage
}