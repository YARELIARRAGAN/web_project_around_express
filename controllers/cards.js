const Card = require('../models/card');
const { notFound, badRequest, serverError } = require('../errors/constants');
const { crearOrFail } = require('../errors/create');
const { responseError } = require('../errors/response');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    responseError(res, serverError, err.message);
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  try {
    const newCard = await Card.create({ name, link, owner });
    res.json({ data: newCard });
  } catch (err) {
    if ((err.name === 'CastError' && err.path === 'owner') || err.name === 'ValidationError') {
      responseError(res, badRequest, 'Formato de ID incorrecto');
    } else {
      responseError(res, serverError, err.message);
    }
  }
};

module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const deleteCard = await Card.findByIdAndDelete(cardId)
      .orFail(() => {
        crearOrFail('Tarjeta no encontrada');
      });
    res.json(deleteCard);
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

module.exports.addLikeCard = async (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;
  try {
    const addLikeCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: owner } },
      { new: true },
    )
      .orFail(() => {
        crearOrFail('Tarjeta no encontrada');
      });
    res.json({ data: addLikeCard });
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

module.exports.deleteLikeCard = async (req, res) => {
  const { cardId } = req.params;
  const owner = req.user._id;

  try {
    const deleteLikeCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: owner } },
      { new: true },
    )
      .orFail(() => {
        crearOrFail('Tarjeta no encontrada');
      });
    res.json({ data: deleteLikeCard });
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
