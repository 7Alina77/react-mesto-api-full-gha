const Card = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { HTTP_STATUS_CREATED } = require('../errors/handleErrors');

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
    .catch(next);
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
        .then((cardToDelete) => res.send({ data: cardToDelete }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        card.populate(['owner', 'likes']);
      }
      return card;
    })
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Такая карточка не найдена');
      }
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        card.populate(['owner', 'likes']);
      }
      return card;
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такая карточка не найдена');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
