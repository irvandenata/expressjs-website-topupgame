const multer = require('multer');
const os = require('os');
let multerHelper = multer({dest: os.tmpdir()});

module.exports = multerHelper;