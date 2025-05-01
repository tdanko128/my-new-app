const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
// router.use('/chores', require('./api/chores'));
// router.use('/chorelogs', require('./api/chorelogs'));
// router.use('/rewards', require('./api/rewards'));

module.exports = router;
