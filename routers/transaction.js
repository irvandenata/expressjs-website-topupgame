var express = require('express');
var router = express.Router();
const {index,actionStatus} = require('../app/controllers/transactionController');
const {isAuthenticated} = require('../app/middlewares/auth');
router.use(isAuthenticated);

/* GET users listing. */
router.get('/',index);
router.put('/status/:id',actionStatus);
module.exports = router;
