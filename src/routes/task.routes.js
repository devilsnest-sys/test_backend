const express = require('express');
const { body, param } = require('express-validator');
const TaskController = require('../controllers/task.controller');
const authMiddleware = require('../middlewares/authentication.middleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional()
], TaskController.createTask);

router.get('/', TaskController.getTasks);

router.put('/:taskId', [
  param('taskId').isInt().withMessage('Invalid task ID'),
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional()
], TaskController.updateTask);
/**
 * @openapi
 * /api/tasks/{taskId}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete('/:taskId', [
  param('taskId').isInt().withMessage('Invalid task ID')
], TaskController.deleteTask);

module.exports = router;