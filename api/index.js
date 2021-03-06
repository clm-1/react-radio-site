const express = require('express');
const session = require('express-session');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const channelRoutes = require('./routes/channelRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const programRoutes = require('./routes/programRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const port = 3001;

// Server setup
const app = express();

// Gives access to the body-object on the request (req.body)
app.use(express.json());

app.use(
  session({
    // The secret should be in it's own file, and git-ignored
    // This is for testing purposes
    secret: 'Test Secret 1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
  })
)

// Middleware to check routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/channels', channelRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/episodes', episodeRoutes);

app.listen(port, err => {
  if (err) {
    console.log('Could not start the server...');
    console.log(err);
    return;
  }
  console.log(`Listening on port: ${port}`);
})