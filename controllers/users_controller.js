const { User, Sequelize } = require('../models');
const { Chore } = require('../models');
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
