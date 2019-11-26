const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../schemas/userSchema');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'You are not logged in! Please log in to get access.'
    });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw Error('The user belonging to this user does no longer exist.');
    }

    req.user = currentUser;

    return next();
  } catch (error) {
    return res.status(401).json({ status: 'error', message: error.message });
  }
};
