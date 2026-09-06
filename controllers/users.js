const User = require('../models/user');
const { notFound, badRequest, serverError } = require('../errors/constants');
const { crearOrFail } = require('../errors/create');
const { responseError } = require('../errors/response');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send({ data: users });
  } catch (err) {
    responseError(res, serverError, err.message);
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const userById = await User.findById(req.params.userId)
      .orFail(() => {
        crearOrFail('No se ha encontrado ninguna tarjeta con esa ID');
      });
    res.json({ data: userById });
  } catch (err) {
    if (err.name === 'CastError') {
      responseError(res, badRequest, 'Formato de ID incorrecto');
    } else if (err.name === 'NotFound') {
      responseError(res, notFound, err.message);
    } else {
      responseError(res, serverError, err.message);
    }
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { Name, about, avatar } = req.body;
    const newUser = await User.create({ Name, about, avatar });
    res.send({ data: newUser });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      responseError(res, badRequest, 'Formato de ID incorrecto');
    } else {
      responseError(res, serverError, err.message);
    }
  }
};

module.exports.updateUser = async (req, res) => {
  const userId = req.user._id;
  const { Name, about, avatar } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { Name, about, avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => {
        crearOrFail('Usuario no encontrado');
      });
    res.json({ data: updateUser });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      responseError(res, badRequest, 'Formato de ID incorrecto');
    } else if (err.name === 'NotFound') {
      responseError(res, notFound, err.message);
    } else {
      responseError(res, serverError, err.message);
    }
  }
};

module.exports.updateAvatarUser = async (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  try {
    const updateAvatarUser = await User.findByIdAndUpdate(
      userId,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
      .orFail(() => {
        crearOrFail('Usuario no encontrado');
      });
    res.json({ data: updateAvatarUser });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      responseError(res, badRequest, 'Formato de ID incorrecto');
    } else if (err.name === 'NotFound') {
      responseError(res, notFound, err.message);
    } else {
      responseError(res, serverError, err.message);
    }
  }
};
