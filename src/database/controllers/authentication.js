const jwt = require('jwt-simple');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.secret);
}

exports.signin = function(req, res, next) {
  // user is already authenticated
  // just need to give token
  const user = {
    username: req.user.username,
    email: req.user.email,
    id: req.user._id,
    name: req.user.name,
  };
  const token = tokenForUser(req.user);
  res.cookie('Authorization', token);
  res.send({ token, user });
}

exports.getCurrentUser = function(req, res) {
    return res.send(req.user);
}

exports.signout = function(req, res) {
  res.clearCookie('Authorization');
  res.send(false);
}

exports.signup = function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const name = req.body.name;

  if (!username || !password) {
    return res.status(422).send({ error: 'You must provide a username and password' });
  }

  User.findOne({ username: username.toLowerCase() }, function(err, existingUser) {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send({ error: 'Username is in use' });
    }

    const user = new User({
      username: username.toLowerCase(), password, email, name
    });
    user.save(function(err) {
      if (err) { return next(err); }
      const token = tokenForUser(user);
      res.cookie('Authorization', token);
      res.json({ token, user });
    });
  });
}
