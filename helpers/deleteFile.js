const fs = require('fs');

const deleteFile = (path) => {
    try {
        fs.unlinkSync('./public/media/' + path);
        return true;
    }
    catch (error) {
        return false;
    }

}

module.exports = deleteFile;