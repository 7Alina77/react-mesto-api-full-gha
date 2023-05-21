const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { HTTP_STATUS_CREATED } = require('../errors/handleErrors');
const BadRequestError = require('../errors/BadRequestError');

const { CastError, ValidationError } = mongoose.Error;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const ownerId = req.user.id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        next(new BadRequestError('Данные для создания карточки некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки нет');
      }
      if (card.owner._id.toString() !== req.user.id.toString()) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      }
      Card.findByIdAndDelete(req.params.cardId)
        .populate('owner')
        .then((cardToDelete) => res.send(cardToDelete));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Такая карточка не найдена');
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Карточки не существует'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => card.populate(['owner', 'likes']))
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такая карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequestError('Карточки не существует'));
      } else {
        next(err);
      }
    });
};
