const User = require('../schemas/userSchema');

const filterObj = require('../../utils/filterObj');

exports.show = async (req, res, next) => {
  const user = await User.findById(req.user._id);

  return res.status(200).json({ status: 'success', data: { user } });
};

exports.store = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    const user = await User.create({ name, email, password, passwordConfirm });

    const token = user.generateToken(user._id);

    return res.status(201).json({ status: 'success', token, data: { user } });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      throw Error(
        'This route is not for password updates. Please use /updateMyPassword.'
      );
    }

    const filterBody = filterObj(req.body, 'name', 'email');
    if (req.file) filterBody.photo = req.file.filename;

    const updateUser = await User.findOneAndUpdate(req.user.id, filterBody, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    return res
      .status(200)
      .json({ status: 'success', data: { user: updateUser } });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};
