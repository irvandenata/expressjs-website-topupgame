var express = require('express');
var router = express.Router();
const {login,index} = require('../app/controllers/authController');
/* GET users listing. */
router.get('/login',index);
router.post('/login',login);
module.exports = router;
