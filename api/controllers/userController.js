const encrypt = require('../Encrypt');
const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../../database/radioSiteDb.db'));

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

    req.body.password = encrypt.encrypt(req.body.password);
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

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: 'Logout successful' });
};

// const getAllUsers = (req, res) => {
//   let query = `SELECT * FROM users`;
//   db.all(query, (err, users) => {
//     res.json(users);
//   })
// }

const getUserById = (req, res) => {
  if (!req.session.user) {
    res.json('Not logged in');
    return;
  } else if (req.session.user.userId != req.params.userId) {
    res.json('Not correct user');
    return;
  }
  
  let query = `SELECT * FROM users WHERE userId = $userId`;
  let params = { $userId: req.params.userId };
  db.get(query, params, (err, user) => {
    res.json(user);
  })
}

const getFavouritesByUserId = (req, res) => {
  if (!req.session.user) {
    res.json('Not logged in');
    return;
  } else if (req.session.user.userId != req.params.userId) {
    res.json('Not correct user');
    return;
  }

  let query = `
    SELECT * FROM favourites WHERE userIdFav = $userId
    ORDER BY timeAdded`;
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
      req.body.password = encrypt.encrypt(req.body.password);
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
        console.log('There was an error')
        console.log(err);
        }
      
        res.json({ success: 'User was registered', lastID: this.lastID });
      });
    }
  })
}

const editUserInfo = (req, res) => {
  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  db.get(query, params, (err, emailUsed) => {
    if (emailUsed && emailUsed.email !== req.session.user.email) {
      res.status(400).json({ emailExists: 'A user with that email address already exits' });
    } else {
      req.body.password = encrypt.encrypt(req.body.password);
      query = `UPDATE users SET firstName = $firstName, lastName = $lastName, email = $email, password = $password WHERE userId = $userId`;
      params = {
        $firstName: req.body.firstName,
        $lastName: req.body.lastName,
        $email: req.body.email,
        $password: req.body.password,
        $userId: req.session.user.userId
      }
      db.run(query, params, function (err) {
        if (err) {
          res.json({ error: 'There was an error'});
        } else {
          req.session.user = {
            userId: req.session.user.userId,
            email: params.$email,
            firstName: params.$firstName,
            lastName: params.$lastName,
          }
          res.json({ success: 'User info was edited'});
        }
      });
    }
  })
}

const removeFavourite = (req, res) => {
  if (req.session.user) {
    if (req.session.user.userId != req.params.userId) {
      res.json({ error: 'Not correct user' });
      return;
    }
  }

  let query = `
    DELETE FROM favourites 
    WHERE ($userIdFav = userIdFav AND $showId = showId AND $type = type)`;
  let params = {
    $userIdFav: req.params.userId,
    $showId: req.query.showId,
    $type: req.query.type,
  }
  db.run(query, params, function (err) {
    if (err) {
      res.json({ error: 'There was an error', type: err })
      return;
    } else {
      res.json({ success: 'Favourite was removed', changes: this.changes })
    }
  })
}

const addFavourite = (req, res) => {
  if (!req.session.user) return;
  let query = `
    INSERT INTO favourites (userIdFav, showId, type, timeAdded)
    VALUES ($userIdFav, $showId, $type, $timeAdded)`;
  params = {
    $userIdFav: req.params.userId,
    $showId: req.body.showId,
    $type: req.body.type,
    $timeAdded: Date.now(),
  }
  db.run(query, params, function (err) {
    if (err) {
      console.log(err);
      if (err.code === 'SQLITE_CONSTRAINT') res.json({ error: 'Already in favourites'});
    } else {
      res.json({ success: 'Favourite added', 
                 item: {
                   userIdFav: req.params.userId,
                   showId: req.body.showId,
                   type: req.body.type,
                   timeAdded: params.$timeAdded,
                 } });
    }
  })
}

module.exports = {
  // getAllUsers,
  getUserById,
  getFavouritesByUserId,
  register,
  whoami,
  login,
  logout,
  addFavourite,
  removeFavourite,
  editUserInfo,
}