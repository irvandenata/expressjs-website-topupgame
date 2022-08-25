var express = require('express');
var router = express.Router();
const {index,create,store,edit,update,destroy} = require('../app/controllers/categoryController');
const {isAuthenticated} = require('../app/middlewares/auth');
router.use(isAuthenticated);

/* GET users listing. */
router.get('/',index);
router.get('/create',create);
router.post('/create',store);
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
router.delete('/delete/:id',destroy);

module.exports = router;
