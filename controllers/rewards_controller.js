const { Reward } = require('../models');

// GET /api/rewards
exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.findAll({
      attributes: ['id', 'name', 'description', 'cost'],
      order: [['cost', 'ASC']]
    });
    res.json(rewards);
  } catch (err) {
    console.error('Error fetching rewards:', err);
    res.status(500).json({ error: 'Failed to retrieve rewards' });
  }
};

// POST /api/rewards
exports.createReward = async (req, res) => {
    try {
      const { name, description, cost } = req.body;
  
      if (!name || !description || typeof cost !== 'number') {
        return res.status(400).json({ error: 'Missing or invalid fields' });
      }
  
      const newReward = await Reward.create({ name, description, cost });
      res.status(201).json(newReward);
    } catch (err) {
      console.error('Error creating reward:', err);
      res.status(500).json({ error: 'Failed to create reward' });
    }
  };


// PUT /api/rewards/:id
exports.updateReward = async (req, res) => {
    try {
      const rewardId = parseInt(req.params.id, 10);
      const { name, description, cost } = req.body;
  
      const reward = await Reward.findByPk(rewardId);
      if (!reward) return res.status(404).json({ error: 'Reward not found' });
  
      if (name !== undefined) reward.name = name;
      if (description !== undefined) reward.description = description;
      if (cost !== undefined) reward.cost = cost;
  
      await reward.save();
      res.json(reward);
    } catch (err) {
      console.error('Error updating reward:', err);
      res.status(500).json({ error: 'Failed to update reward' });
    }
  };

  
  // DELETE /api/rewards/:id
exports.deleteReward = async (req, res) => {
    try {
      const rewardId = parseInt(req.params.id, 10);
      const reward = await Reward.findByPk(rewardId);
      if (!reward) return res.status(404).json({ error: 'Reward not found' });
  
      await reward.destroy();
      res.json({ message: 'Reward deleted successfully' });
    } catch (err) {
      console.error('Error deleting reward:', err);
      res.status(500).json({ error: 'Failed to delete reward' });
    }
  };
  