var express = require('express');
var router = express.Router();
const {signUp,signIn} = require('../../app/controllers/api/authController');
const multer = require('../../app/helpers/multer');

/* GET users listing. */
router.post('/sign-in',multer.single(),signIn);
router.post('/sign-up',multer.single('image'),signUp);
module.exports = router;