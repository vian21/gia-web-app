const db = require('../../db');

const updateIdNumber = async (id, idNumber) => {
    const [result] = await db.execute(`UPDATE users set idNumber = ? WHERE id = ?`, [idNumber, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }

}

const updateName = async (id, name) => {
    const [result] = await db.execute(`UPDATE users set name = ? WHERE id = ?`, [name, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }


}

const updateEmail = async (id, email) => {
    const [result] = await db.execute(`UPDATE users set email ,= ? WHERE id = ?`, [email, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateDOB = async (id, DOB) => {
    const [result] = await db.execute(`UPDATE users set DOB = ? WHERE id = ?`, [DOB, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateGender = async (id, gender) => {
    const [result] = await db.execute(`UPDATE users set gender = ? WHERE id = ?`, [gender, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateContact = async (id, value) => {
    const [result] = await db.execute(`UPDATE users set contacts = ? WHERE id = ?`, [value, id])
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }

}

module.exports = {
    updateIdNumber,
    updateName,
    updateEmail,
    updateDOB,
    updateGender,
    updateContact
}