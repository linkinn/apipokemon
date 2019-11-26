const User = require('../schemas/userSchema');

exports.store = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw Error('Please provide email and password!');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw Error('Incorrect email or password!');
    }

    const token = user.generateToken(user._id);

    return res.status(200).json({ status: 'success', token, data: { user } });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};
