const express = require('express');
const router = express.Router();
const { getTask, createTask, getTaskByID, updateTask, removeTask } = require('../controllers/taskController');
const auth = require('../middleware/auth'); // import middleware

// toutes ces routes exigent un token
router.get('/', auth, getTask);
router.post('/', auth, createTask);
router.get('/:id', auth, getTaskByID);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, removeTask);

module.exports = router;
