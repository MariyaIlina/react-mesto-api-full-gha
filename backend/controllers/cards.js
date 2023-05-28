const Card = require('../models/cards');
const NotFoundError = require('../errors/not-found-error');
const DeleteCardError = require('../errors/delete-card-error');
const ValidationError = require('../errors/validation-error');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const ownerId = req.user._id;
    const card = await Card.create({ name, link, owner: ownerId });
    res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new ValidationError('Некорректные данные'));
    } else {
      next(err);
    }
  }
};
const deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) {
      throw new NotFoundError('Такой карточки нет в базе данных');
    }
    if (!card.owner.equals(req.user._id)) {
      throw new DeleteCardError('Чужая карточка не может быть удалена');
    }
    card.deleteOne()
      .then(() => res.json({ card }))
      .catch(next);
  })
  .catch((err) => {
    next(err);
  });

const likeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (like) {
      res.send({ like });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (like) {
      res.status(200).send({ like });
    } else {
      throw new NotFoundError('Переданы некорректные данные');
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new ValidationError('Невалидный id'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
