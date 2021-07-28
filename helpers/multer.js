const multer = require('multer');
const uuid = require('uuid');
const mime= require('mime-types');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/media/')
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v1()+ '.' +mime.extension(file.mimetype))
    }
})

var upload = multer({ storage: storage });

module.exports = upload;