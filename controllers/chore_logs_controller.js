const { ChoreLog, Chore, User } = require('../models');
const { Op } = require('sequelize');

// GET /api/chores/:choreId/logs?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
exports.getChoreLogs = async (req, res) => {
    try {
      const { choreId } = req.params;
      const { startDate, endDate } = req.query;
  
      const whereClause = { choreId };
  
      if (startDate && endDate) {
        whereClause.dateCompleted = {
          [Op.between]: [new Date(startDate), new Date(endDate)]
        };
      } else if (startDate) {
        whereClause.dateCompleted = { [Op.gte]: new Date(startDate) };
      } else if (endDate) {
        whereClause.dateCompleted = { [Op.lte]: new Date(endDate) };
      }
  
      const logs = await ChoreLog.findAll({
        where: whereClause,
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      });
  
      res.json(logs);
    } catch (err) {
      console.error('Error fetching chore logs:', err);
      res.status(500).json({ error: 'Failed to retrieve chore logs' });
    }
  };



// GET /api/chores/logs/user/:userId?startDate=&endDate=
exports.getLogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const whereClause = { userId };

    if (startDate && endDate) {
      whereClause.dateCompleted = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      whereClause.dateCompleted = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      whereClause.dateCompleted = { [Op.lte]: new Date(endDate) };
    }

    const logs = await ChoreLog.findAll({
      where: whereClause,
      include: [{ model: Chore, attributes: ['id', 'title', 'pointValue'] }]
    });

    res.json(logs);
  } catch (err) {
    console.error('Error fetching user chore logs:', err);
    res.status(500).json({ error: 'Failed to retrieve user chore logs' });
  }
};



// POST /api/chores/:choreId/logs
exports.createChoreLog = async (req, res) => {
  try {
    const choreId = parseInt(req.params.choreId, 10);
    const { userId, dateCompleted, pointsOverride } = req.body;

    const chore = await Chore.findByPk(choreId);
    const user = await User.findByPk(userId);

    if (!chore || !user) {
      return res.status(404).json({ error: 'Chore or user not found' });
    }

    const pointsEarned = pointsOverride !== undefined
      ? parseInt(pointsOverride, 10)
      : chore.pointValue;

    const log = await ChoreLog.create({
      userId,
      choreId,
      dateCompleted: dateCompleted || new Date(),
      pointsEarned
    });

    // Update user points
    user.points += pointsEarned;
    await user.save();

    res.status(201).json(log);
  } catch (err) {
    console.error('Error creating chore log:', err);
    res.status(500).json({ error: 'Failed to create chore log' });
  }
};



  
