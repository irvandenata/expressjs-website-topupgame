var express = require('express');
var router = express.Router();
const {index} = require('../app/controllers/dashboardController');
const {isAuthenticated} = require('../app/middlewares/auth');
router.use(isAuthenticated);

/* GET users listing. */
router.get('/',index);
// router.get('/',(req,res) => );
module.exports = router;
