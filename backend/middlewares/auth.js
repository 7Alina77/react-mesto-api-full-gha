const jwt = require('jsonwebtoken');

const { SECRET_JWT_KEY = 'SECRET_JWT_KEY' } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '') || req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  req.user = payload;
  return next();
};
