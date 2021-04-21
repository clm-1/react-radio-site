const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../radioSiteDb.db'));

const getAllUsers = (req, res) => {
  let query = `SELECT * FROM users`;
  db.all(query, (err, users) => {
    console.log('getting users', users)
    res.send(users);
  })
}

module.exports = {
  getAllUsers,
}