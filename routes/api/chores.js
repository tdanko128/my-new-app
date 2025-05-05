const express = require('express');
const router = express.Router();
const choresController = require('../../controllers/chores_controller');
const choreInstancesController = require('../../controllers/chore_instances_controller');
const choreLogsController = require('../../controllers/chore_logs_controller');

// GET /api/chores
router.get('/', choresController.getAllChores);

// POST /api/chores
router.post('/', choresController.createChore);

// GET /api/chores/:choreId/instances
router.get('/:choreId/instances', choreInstancesController.getChoreInstances);

// POST /api/chores/:choreId/instances
router.post('/:choreId/instances', choreInstancesController.createInstance);

// GET /api/chores/:choreId/instances/:instanceId
router.get('/:choreId/instances/:instanceId', choreInstancesController.getChoreInstanceById);

// PUT /api/chores/:choreId/instances/:instanceId
router.put('/:choreId/instances/:instanceId', choreInstancesController.updateChoreInstance);

// DEL /api/chores/:choreId/instances/:instanceId
router.delete('/:choreId/instances/:instanceId', choreInstancesController.deleteChoreInstance);

// PATCH /api/chores/:choreId/instances/:instanceId/users/:userId/complete
router.patch('/:choreId/instances/:instanceId/users/:userId/complete', choreInstancesController.markUserComplete);

// GET all chore logs for a chore
router.get('/:choreId/logs', choreLogsController.getChoreLogs);

// POST new log entry (when a chore is completed)
router.post('/:choreId/logs', choreLogsController.createChoreLog);

// Get logs by user
router.get('/logs/user/:userId', choreLogsController.getLogsByUser);

module.exports = router;
