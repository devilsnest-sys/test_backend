const Task = require('../models/task.model');

class TaskService {
  static async create(userId, title, description) {
    const task = new Task({ user: userId, title, description });
    await task.save();
    return task;
  }

  static async findByUser(userId) {
    return Task.find({ user: userId });
  }

  static async update(taskId, userId, title, description) {
    return Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description },
      { new: true }
    );
  }

  static async delete(taskId, userId) {
    return Task.findOneAndDelete({ _id: taskId, user: userId });
  }
}

module.exports = TaskService;