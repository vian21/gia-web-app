const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/media/')
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v1())
    }
})

var upload = multer({ storage: storage });

module.exports = upload;