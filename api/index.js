const express = require('express');
const session = require('express-session');
const path = require('path');

const port = 3001;

// Server setup
const app = express();

// Gives access to the body-object on the request
// req.body
app.use(express.json());

app.listen(port, err => {
  if (err) {
    console.log('Could not start the server...');
    console.log(err);
    return;
  }
  console.log(`Listening on port: ${port}`);
})