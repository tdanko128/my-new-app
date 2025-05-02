const { Sequelize } = require('../models');
const { User, Chore, ChoreLog, ApiKey } = require('../models');
const crypto = require('crypto');
const { Op } = Sequelize;


// Get All User
exports.get_all_users = async (req, res) => {
  try {
    const filters = {};
    // Optional filter: ?name=name_of_user
    if (req.query.name) {
      filters.name = { [Op.iLike]: `%${req.query.name}%` }; // case-insensitive for PostgreSQL
    }
    
    // Optional filter: ?email=email_of_user
    if (req.query.email) {
      filters.email = { [Op.iLike]: `%${req.query.email}%` };
    }
    
    // Optional filter: ?role=admin or ?role=child
    if (req.query.role) {
      filters.role = req.query.role;
    }


    const users = await User.findAll({ where: filters });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Post /api/users
exports.createUser = async (req, res) => {
  try {
    const { name, email, role, settings, points } = req.body;

    // Basic validation
    if (!name || !email || !role) {
      return res.status(400).json({ error: 'Name, email, and role are required.' });
    }

    // Create the user
    const newUser = await User.create({
      name,
      email,
      role,
      settings: settings || {},
      points: points || 0
    });

    res.status(201).json(newUser); // 201 Created
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get User Chores
exports.getUserChores = async (req, res) => {
  try {
    const userId = req.params.id;

    const chores = await Chore.findAll({
      where: { assignedTo: userId }
    });

    res.json(chores);
  } catch (err) {
    console.error('Error fetching chores for user:', err);
    res.status(500).json({ error: 'Failed to retrieve user chores' });
  }
};

// Get User Chore Logs
exports.getUserChoreLog = async (req, res) => {
  try{
    const userId = req.params.id;
    const logs = await ChoreLog.findAll ({
      where: {userId: userId},
      include: ['Chore']
    }); 
    res.json(logs);
  } catch (err) {
    console.error('Error fetching chore logs for user:', err);
    res.status(500).json({ error: 'Failed to retrieve user chore logs' })
  }
}

// Get user points
exports.getUserPoints = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId, {
      attributes: ['name', 'email', 'points'] // Only return these fields
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user points:', err);
    res.status(500).json({ error: 'Failed to retrieve user points' });
  }
};

// PUT /api/users/:id 
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body); // Automatically updates any provided fields
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// DELETE /api/users/:id 
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// GET /api/users/:id/apikeys - List user's API keys
exports.getUserApiKeys = async (req, res) => {
  try {
    const keys = await ApiKey.findAll({
      where: { userId: req.params.id },
      attributes: ['id', 'key', 'description', 'lastUsedAt', 'createdAt']
    });

    res.json(keys);
  } catch (err) {
    console.error('Error fetching API keys:', err);
    res.status(500).json({ error: 'Failed to retrieve API keys' });
  }
};

// Create a new API key for user
exports.createApiKey = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newKey = crypto.randomBytes(32).toString('hex');

    const apiKey = await ApiKey.create({
      key: newKey,
      description: req.body.description || 'Generated key',
      userId: user.id
    });

    res.status(201).json(apiKey);
  } catch (err) {
    console.error('Error creating API key:', err);
    res.status(500).json({ error: 'Failed to create API key' });
  }
};


// DELETE /api/users/apikeys/:keyId - Revoke API key
exports.revokeApiKey = async (req, res) => {
  try {
    const key = await ApiKey.findByPk(req.params.keyId);

    if (!key) {
      return res.status(404).json({ error: 'API key not found' });
    }

    await key.destroy();
    res.json({ message: 'API key revoked' });
  } catch (err) {
    console.error('Error revoking API key:', err);
    res.status(500).json({ error: 'Failed to revoke API key' });
  }
};
