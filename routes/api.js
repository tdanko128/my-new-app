const express = require('express');
const router = express.Router();

router.use('/users', require('./api/users'));
router.use('/chores', require('./api/chores'));
router.use('/rewards', require('./api/rewards'));
// router.use('/chorelogs', require('./api/chorelogs'));

module.exports = router;
