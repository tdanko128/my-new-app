const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users_controller');

// Get All Users
// GET /api/users?role=child|admin
router.get('/',usersController.get_all_users);

// POST /api/users
router.post('/', usersController.createUser);

// GET /api/users/:id/chores
router.get('/:id/chores', usersController.getUserChores);


module.exports = router;
