const Task = require('../models/task.model');
const { validationResult } = require('express-validator');

class TaskController {
  static async createTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const userId = req.user.id;

    try {
      const taskId = await Task.create(userId, title, description);
      res.status(201).json({ id: taskId, title, description });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTasks(req, res) {
    const userId = req.user.id;

    try {
      const tasks = await Task.findByUser(userId);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateTask(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { taskId } = req.params;
    const { title, description } = req.body;
    const userId = req.user.id;

    try {
      await Task.update(taskId, userId, title, description);
      res.json({ id: taskId, title, description });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTask(req, res) {
    const { taskId } = req.params;
    const userId = req.user.id;

    try {
      await Task.delete(taskId, userId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = TaskController;