const { RewardRedemption, Reward, User } = require('../models');

// GET /api/rewards/user/:userId
exports.getUserRedemptions = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    const redemptions = await RewardRedemption.findAll({
      where: { userId },
      include: [
        {
          model: Reward,
          attributes: ['name', 'description', 'cost']
        }
      ],
      order: [['requestedAt', 'DESC']]
    });

    res.json(redemptions);
  } catch (err) {
    console.error('Error fetching redemptions:', err);
    res.status(500).json({ error: 'Failed to retrieve redemption history' });
  }
};


// PATCH /api/rewards/redemptions/:id/status
exports.updateRedemptionStatus = async (req, res) => {
  try {
    const redemptionId = parseInt(req.params.id, 10);
    const { status, adminId } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Status must be either "approved" or "rejected"' });
    }

    const redemption = await RewardRedemption.findByPk(redemptionId, {
      include: [Reward, User]
    });

    if (!redemption) {
      return res.status(404).json({ error: 'Redemption not found' });
    }

    if (redemption.status !== 'pending') {
      return res.status(400).json({ error: 'Redemption has already been processed' });
    }

    redemption.status = status;
    redemption.approvedAt = new Date();
    redemption.adminId = adminId;

    if (status === 'approved') {
      // Deduct points now (if not already deducted during initial request)
      const user = await User.findByPk(redemption.userId);
      user.points -= redemption.Reward.cost;
      await user.save();
    }

    await redemption.save();

    res.json({ message: `Redemption ${status}`, redemption });
  } catch (err) {
    console.error('Error updating redemption status:', err);
    res.status(500).json({ error: 'Failed to update redemption status' });
  }
};


// POST /api/rewards/:rewardId/redeem
exports.redeemReward = async (req, res) => {
  try {
    const rewardId = parseInt(req.params.rewardId, 10);
    const user = req.user; // populated by authenticateApiKey middleware

    // Fetch reward
    const reward = await Reward.findByPk(rewardId);
    if (!reward) {
      return res.status(404).json({ error: 'Reward not found' });
    }

    // Check user points
    if (user.points < reward.cost) {
      return res.status(400).json({ error: 'Not enough points to redeem this reward' });
    }

    // Deduct points and create redemption
    user.points -= reward.cost;
    await user.save();

    const redemption = await RewardRedemption.create({
      userId: user.id,
      rewardId,
      status: 'pending',
      requestedAt: new Date()
    });

    res.status(201).json({
      message: 'Reward redemption requested',
      redemption
    });
  } catch (err) {
    console.error('Error redeeming reward:', err);
    res.status(500).json({ error: 'Failed to redeem reward' });
  }
};
