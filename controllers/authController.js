const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.registerUser = (req, res) => {
  User.register({ username: req.body.username }, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error on registering user', err: err });
    } else {
      passport.authenticate('local')(req, res, function () {
        res.status(201).json({ message: 'Successfully registering user', data: req.body });
      });
    }
  });
};

exports.loginUser = (req, res) => {

  passport.authenticate('local', function (err, user) {
    if (err || !user) {
      res.status(400).json({ message: 'Login failed', data: err, user: user });
      return;
    }

    req.login(user, function (err) {
      if (err) {
        res.status(400).json({ message: 'Login failed', data: err, user: user });
      } else {
        // Generate a JWT token using the secret key from the environment variables
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.SECRET, // Use the secret key from environment variables
          { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successfully', token: token });
      }
    });
  })(req, res);
};
