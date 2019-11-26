const User = require('../schemas/userSchema');

exports.update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('+password');

    if (!(await user.correctPassword(req.body.oldPassword, user.password))) {
      throw Error('Your current password is wrong');
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;

    await user.save();

    return res.status(200).json({ status: 'success' });
  } catch (error) {
    return res.status(401).json({ status: 'error', message: error.message });
  }
};
