const {db} = require('../../db');

/**
 * 
 * returns True or False
 */
const deleteStatus = async (statusId) => {
    const [result] = await db.execute(`DELETE FROM status WHERE id = ?`, [statusId])
        .catch(console.log);

    if (result.affectedRows) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    deleteStatus,
}