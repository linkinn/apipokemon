const ApiFeatures = require('../../utils/apiFeatures');

exports.index = Model => async (req, res) => {
  const query = Model.find();

  const features = new ApiFeatures(query, req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  return res
    .status(200)
    .json({ status: 'success', results: doc.length, data: { doc } });
};

exports.show = Model => async (req, res) => {
  try {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      throw Error('No document find with that ID!');
    }

    return res.status(200).json({ status: 'success', data: { doc } });
  } catch (error) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
};

exports.store = Model => async (req, res) => {
  try {
    const doc = await Model.create(req.body);

    return res.status(201).json({ status: 'success', data: { doc } });
  } catch (error) {
    return res.status(400).json({ status: 'error', message: error.message });
  }
};

exports.update = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      context: 'query'
    });

    if (!doc) {
      throw Error('No document find with that ID!');
    }

    return res.status(200).json({ status: 'success', data: { doc } });
  } catch (error) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
};

exports.delete = Model => async (req, res) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      throw Error('No document find with that ID!');
    }

    return res.status(204).json({ status: 'success' });
  } catch (error) {
    return res.status(404).json({ status: 'error', message: error.message });
  }
};
