const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const data = require('../data/users').data;

module.exports.login = function login(req, res) {
  const password = req.body.password;
  const username = req.body.username;

  // Check if there is a password and username
  if (!password || !username) {
    return res.status(403).send({
      success: false,
      message: 'Authentication failed. Invalid Password or username',
    });
  }

  // Hash the password
  const shaFunction = crypto.createHash('sha1');
  shaFunction.update(password);
  const shaPassword = shaFunction.digest('hex');

  // Check if exists
  const loginResult = data.find((user) => user.username === username && user.password === shaPassword);

  // Check if the user exist and return an error
  if (!loginResult) {
    return res.status(403).send({
      success: false,
      message: 'Authentication failed. User name or password not exist',
    });
  }

  // Sign the token
  const token = jwt.sign({
    id: loginResult.id,
    name: loginResult.name,
  }, 'rapid-secret-string', { expiresIn: '1d' });

  // Return the token
  return res.status(200).send({ success: true, token });
};
