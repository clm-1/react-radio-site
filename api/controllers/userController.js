const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../radioSiteDb.db'));

const getAllUsers = (req, res) => {
  let query = `SELECT * FROM users`;
  db.all(query, (err, users) => {
    res.send(users);
  })
}

const getUserById = (req, res) => {
  let query = `SELECT * FROM users WHERE userId = $userId`;
  let params = { $userId: req.params.userId };
  db.get(query, params, (err, user) => {
    res.json(user);
  })
}

module.exports = {
  getAllUsers,
  getUserById,
}