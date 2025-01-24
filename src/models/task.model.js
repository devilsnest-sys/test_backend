const db = require('../config/databse');

class Task {
  static async create(userId, title, description) {
    const [result] = await db.execute(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)', 
      [userId, title, description]
    );
    return result.insertId;
  }

  static async findByUser(userId) {
    const [rows] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows;
  }

  static async update(taskId, userId, title, description) {
    await db.execute(
      'UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?',
      [title, description, taskId, userId]
    );
  }

  static async delete(taskId, userId) {
    await db.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
  }
}

module.exports = Task;