const express = require('express');
const router = express.Router();
const rewardsController = require('../../controllers/rewards_controller');
const redemptionsController = require('../../controllers/redemptions_controller');
//const { requireAdmin } = require('../../middleware/auth.js');

// GET /api/rewards - list all available rewards
router.get('/', rewardsController.getAllRewards);

// POST /api/rewards
router.post('/',  rewardsController.createReward);

// PUT /api/rewards/:id
router.put('/:id',  rewardsController.updateReward);

// DELETE /api/rewards/:id
router.delete('/:id', rewardsController.deleteReward);

// POST /api/rewards/:rewardId/redeem - user redeems a reward
router.post('/:rewardId/redeem', redemptionsController.redeemReward);

// GET /api/users/:userId/rewards - get a user's redemption history
router.get('/user/:userId', redemptionsController.getUserRedemptions);

// PATCH /api/rewards/redemptions/:id/status - update redemption status
router.patch('/redemptions/:id/status', redemptionsController.updateRedemptionStatus);

module.exports = router;
