const mongoose = require('mongoose');

const { CastError, ValidationError } = mongoose.Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { SECRET_JWT_KEY = 'SECRET_JWT_KEY' } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      if (err instanceof UnauthorizedError) {
        next(new UnauthorizedError('Необходимо авторизоваться'));
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя не существует');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send(user))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с данным email уже существует'));
        } else if (err instanceof ValidationError) {
          next(new BadRequestError('Данные для создания пользователя некорректны'));
        } else {
          next(err);
        }
      }));
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        return res.send({
          _id: user._id,
          avatar: user.avatar,
          name,
          about,
        });
      }
    })
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        next(new BadRequestError('Данные для обновления пользователя некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar }, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      } else {
        return res.send({
          _id: user._id,
          avatar,
          name: user.name,
          about: user.about,
        });
      }
    })
    .catch((err) => {
      if (err instanceof CastError || err instanceof ValidationError) {
        next(new BadRequestError('Данные для обновления аватара пользователя некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, SECRET_JWT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      })
        .send({ token });
    })
    .catch(next);
};
