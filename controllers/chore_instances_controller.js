const { Chore, ChoreInstance, UserChoreInstance, User } = require('../models');
const { Op } = require('sequelize');

// POST /api/chores/:choreId/instances
exports.createInstance = async (req, res) => {
  try {
    const choreId = parseInt(req.params.choreId, 10);
    const { dueDate, assignedUserIds } = req.body;

    // Check that chore exists
    const chore = await Chore.findByPk(choreId);
    if (!chore) {
      return res.status(404).json({ error: 'Chore template not found' });
    }

    // Create the chore instance
    const instance = await ChoreInstance.create({
      choreId,
      dueDate,
      isComplete: false
    });

    // Associate users if provided
    if (Array.isArray(assignedUserIds)) {
      for (const userId of assignedUserIds) {
        const user = await User.findByPk(userId);
        if (user) {
          await UserChoreInstance.create({
            userId,
            choreInstanceId: instance.id,
            isComplete: false
          });
        }
      }
    }

    const fullInstance = await ChoreInstance.findByPk(instance.id, {
      include: [{ model: User }]
    });

    res.status(201).json(fullInstance);
  } catch (err) {
    console.error('Error creating chore instance:', err);
    res.status(500).json({ error: 'Failed to create chore instance' });
  }
};


// GET /api/chores/:choreId/instances
exports.getChoreInstances = async (req, res) => {
  try {
    const choreId = parseInt(req.params.choreId, 10);

    const instances = await ChoreInstance.findAll({
      where: { choreId },
      include: [{ model: User, through: { attributes: ['isComplete'] } }]
    });

    res.json(instances);
  } catch (err) {
    console.error('Error fetching chore instances:', err);
    res.status(500).json({ error: 'Failed to retrieve chore instances' });
  }
};



// GET /api/chores/:choreId/instances/:instanceId
exports.getChoreInstanceById = async (req, res) => {
  try {
    const { choreId, instanceId } = req.params;

    const instance = await ChoreInstance.findOne({
      where: {
        id: instanceId,
        choreId
      },
      include: [{ model: User, through: { attributes: ['isComplete'] } }]
    });

    if (!instance) {
      return res.status(404).json({ error: 'Chore instance not found' });
    }

    res.json(instance);
  } catch (err) {
    console.error('Error fetching chore instance:', err);
    res.status(500).json({ error: 'Failed to retrieve chore instance' });
  }
};


// PUT /api/chores/:choreId/instances/:instanceId
exports.updateChoreInstance = async (req, res) => {
  try {
    const { choreId, instanceId } = req.params;
    const { dueDate, isComplete, assignedUserIds } = req.body;

    const instance = await ChoreInstance.findOne({
      where: { id: instanceId, choreId }
    });

    if (!instance) {
      return res.status(404).json({ error: 'Chore instance not found' });
    }

    // Update dueDate or isComplete if provided
    if (dueDate !== undefined) instance.dueDate = dueDate;
    if (isComplete !== undefined) instance.isComplete = isComplete;
    await instance.save();

    // Reassign users if new list provided
    if (Array.isArray(assignedUserIds)) {
      await UserChoreInstance.destroy({
        where: { choreInstanceId: instance.id }
      });

      for (const userId of assignedUserIds) {
        const user = await User.findByPk(userId);
        if (user) {
          await UserChoreInstance.create({
            userId,
            choreInstanceId: instance.id,
            isComplete: false
          });
        }
      }
    }

    // Return updated instance
    const updated = await ChoreInstance.findByPk(instance.id, {
      include: [{ model: User, through: { attributes: ['isComplete'] } }]
    });

    res.json(updated);
  } catch (err) {
    console.error('Error updating chore instance:', err);
    res.status(500).json({ error: 'Failed to update chore instance' });
  }
};



// DELETE /api/chores/:choreId/instances/:instanceId
exports.deleteChoreInstance = async (req, res) => {
  try {
    const { choreId, instanceId } = req.params;

    const instance = await ChoreInstance.findOne({
      where: { id: instanceId, choreId }
    });

    if (!instance) {
      return res.status(404).json({ error: 'Chore instance not found' });
    }

    // Delete user assignments
    await UserChoreInstance.destroy({
      where: { choreInstanceId: instance.id }
    });

    // Delete the instance itself
    await instance.destroy();

    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting chore instance:', err);
    res.status(500).json({ error: 'Failed to delete chore instance' });
  }
};


// PATCH /api/chores/:choreId/instances/:instanceId/users/:userId/complete
exports.markUserComplete = async (req, res) => {
  try {
    const { instanceId, userId } = req.params;

    const assignment = await UserChoreInstance.findOne({
      where: {
        choreInstanceId: instanceId,
        userId
      }
    });

    if (!assignment) {
      return res.status(404).json({ error: 'User assignment not found for this chore instance' });
    }

    assignment.isComplete = true;
    await assignment.save();

    res.json({ message: 'Chore marked complete for user', assignment });
  } catch (err) {
    console.error('Error marking chore complete:', err);
    res.status(500).json({ error: 'Failed to mark chore complete' });
  }
};




exports.generateRecurringChores = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // Get all recurring chores
    const chores = await Chore.findAll({
      where: {
        frequency: {
          [Op.in]: ['daily', 'weekly']
        }
      }
    });

    let createdCount = 0;

    for (const chore of chores) {
      // Check if an instance already exists for today (can extend to weekly later)
      const existingInstance = await ChoreInstance.findOne({
        where: {
          choreId: chore.id,
          scheduledDate: {
            [Op.between]: [startOfDay, endOfDay]
          }
        }
      });

      if (!existingInstance) {
        await ChoreInstance.create({
          choreId: chore.id,
          scheduledDate: new Date()
        });
        createdCount++;
      }
    }

    res.json({ message: `Created ${createdCount} new chore instance(s)` });
  } catch (err) {
    console.error('Error generating recurring chores:', err);
    res.status(500).json({ error: 'Failed to generate chores' });
  }
};
