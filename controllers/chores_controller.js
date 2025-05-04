
const { Chore, SubTask } = require('../models');

// GET /api/chores
exports.getAllChores = async (req, res) => {
  try {
    const chores = await Chore.findAll({
      include: [{ model: SubTask }]
    });
    res.json(chores);
  } catch (err) {
    console.error('Error fetching chores:', err);
    res.status(500).json({ error: 'Failed to retrieve chore templates' });
  }
};

// POST /api/chores
exports.createChore = async (req, res) => {
    try {
      const { title, description, frequency, pointValue, subTasks } = req.body;
  
      const newChore = await Chore.create({ title, description, frequency, pointValue });
  
      if (subTasks && Array.isArray(subTasks)) {
        for (const task of subTasks) {
          await SubTask.create({
            choreId: newChore.id,
            title: task.title,
            order: task.order || 0
          });
        }
      }
  
      const fullChore = await Chore.findByPk(newChore.id, {
        include: [{ model: SubTask }]
      });
  
      res.status(201).json(fullChore);
    } catch (err) {
      console.error('Error creating chore:', err);
      res.status(500).json({ error: 'Failed to create chore' });
    }
  };
  