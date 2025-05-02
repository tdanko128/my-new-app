const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/users_controller');

// GET /api/users?role=child|admin
router.get('/',usersController.get_all_users);

// POST /api/users
router.post('/', usersController.createUser);

// GET /api/users/:id/chores
router.get('/:id/chores', usersController.getUserChores);

// GET /api/users/:ud/chorelogs
router.get('/:id/chorelogs', usersController.getUserChoreLog)

// GET /api/users/:id/points
router.get('/:id/points', usersController.getUserPoints);

// PUT /api/users/:id
router.put('/:id', usersController.updateUser);

// DEL /api/users/:id
router.delete('/:id', usersController.deleteUser);

// GET /api/users/:id/apikeys
router.get('/:id/apikeys', usersController.getUserApiKeys);

// POST /api/users/:id/apikeys
router.post('/:id/apikeys', usersController.createApiKey);

// DEL /api/users/apikeys/:keyId
router.delete('/apikeys/:keyId', usersController.revokeApiKey);


module.exports = router;
