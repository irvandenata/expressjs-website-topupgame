var express = require('express');
var router = express.Router();
const {index,create,store,edit,update,destroy,changeStatus} = require('../app/controllers/voucherController');
const upload = require('../app/helpers/multer');
const {isAuthenticated} = require('../app/middlewares/auth');
router.use(isAuthenticated);

/* GET users listing. */
router.get('/',index);
router.get('/create',create);
router.post('/create',upload.single('image'),store);
router.get('/edit/:id',edit);
router.put('/edit/:id',upload.single('image'),update);
router.delete('/delete/:id',destroy);
router.get('/change-status/:id',changeStatus);

module.exports = router;
