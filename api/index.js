const express = require('express');
const session = require('express-session');
const path = require('path');

const channelRoutes = require('./routes/channelRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const programRoutes = require('./routes/programRoutes');
const port = 3001;

// Server setup
const app = express();

// Gives access to the body-object on the request (req.body)
app.use(express.json());

// Middleware to check routes
app.use('/api/v1/channels', channelRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/programs', programRoutes);

app.listen(port, err => {
  if (err) {
    console.log('Could not start the server...');
    console.log(err);
    return;
  }
  console.log(`Listening on port: ${port}`);
})