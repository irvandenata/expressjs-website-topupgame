var express = require('express');
var router = express.Router();
const {allData} = require('../../app/controllers/api/playerController');
const {landingPage,detailPage} = require('../../app/controllers/api/pageController');

/* player. */
router.get('/',allData);
router.get('/landing-page',landingPage);
router.get('/:id/detail',detailPage);

// router.post('/login',login);

module.exports = router;
