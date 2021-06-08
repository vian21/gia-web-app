const db = require('../../db');

const updateIdNumber = async (id, idNumber) => {
    const [result] = await db.query(`UPDATE users set idNumber='${idNumber}' WHERE id=${id}`)
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }

}

const updateName = async (id, name) => {
    const [result] = await db.query(`UPDATE users set name='${name}' WHERE id=${id}`)
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }


}

const updateEmail = async (id, email) => {
    const [result] = await db.query(`UPDATE users set email='${email}' WHERE id=${id}`)
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateDOB = async (id, DOB) => {
    const [result] = await db.query(`UPDATE users set DOB='${DOB}' WHERE id=${id}`)
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateGender = async (id, gender) => {
    const [result] = await db.query(`UPDATE users set gender='${gender}' WHERE id=${id}`)
        .catch(console.log)

    if (result.affectedRows) {
        return true;

    } else {
        return false;
    }
}

const updateContact = async (id, value) => {
    const [result] = await db.query(`UPDATE users set contacts='${value}' WHERE id=${id}`)
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