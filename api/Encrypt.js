const crypto = require('crypto');

// This file would otherwise be git-ignored
// This is for testing purposes
const encrypt = (password) => {
  return crypto
            .createHmac('sha256', 'Test Salt 1234')
            .update(password)
            .digest('hex');
}

module.exports = {
  encrypt,
}
