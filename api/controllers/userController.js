const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../radioSiteDb.db'));

const whoami = (req, res) => {
  res.json(req.session.user || null);
  return;
}

const login = (req, res) => {
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  db.get(query, params, (err, userInDb) => {
    if (!userInDb) {
      res.status(401).json({ error: 'Bad credentials' });
      return;
    }

    if (userInDb.password === req.body.password) {
      delete userInDb.password;
      req.session.user = userInDb;
      res.json({ success: 'Login successful', loggedInUser: userInDb });
      return;
    } else {
      res.status(401).json({ error: 'Bad credentials' });
      return;
    }
  })
}

const getAllUsers = (req, res) => {
  let query = `SELECT * FROM users`;
  db.all(query, (err, users) => {
    res.json(users);
  })
}

const getUserById = (req, res) => {
  let query = `SELECT * FROM users WHERE userId = $userId`;
  let params = { $userId: req.params.userId };
  db.get(query, params, (err, user) => {
    res.json(user);
  })
}

const getFavouritesByUserId = (req, res) => {
  let query = `SELECT * FROM favourites WHERE userIdFav = $userId`;
  let params = { $userId: req.params.userId };
  db.all(query, params, (err, fav) => {
    res.json(fav);
  });
}

const register = (req, res) => {
  let query = 'SELECT * FROM users WHERE email = $email';
  params = { $email: req.body.email };

  db.get(query, params, (err, userExists) => {
    if (userExists) {
      res.status(400).json({ error: 'A user with that email address already exits' });
    } else {
      query = `
        INSERT INTO users (email, firstName, lastName, password)
        VALUES ($email, $firstName, $lastName, $password)`;
      params = {
        $email: req.body.email,
        $firstName: req.body.firstName,
        $lastName: req.body.lastName,
        $password: req.body.password,
      };

    console.log(req.body);
    db.run(query, params, function (err) {
      if (err) {
        console.log('there was an error')
        console.log(err);
      }
      
      res.json({ success: 'User was registered', lastID: this.lastID });
    });
    }
  })
}


module.exports = {
  getAllUsers,
  getUserById,
  getFavouritesByUserId,
  register,
  whoami,
  login,
}