// controllers/secretsController.js

const User = require('../models/user');

exports.getSecrets = (req, res) => {
  User.find({ secret: { $ne: null } })
    .then(function (foundUsers) {
      if (foundUsers) {
        res.status(200).json({ message: 'You have access to this route', data: foundUsers });
      }
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
};
