const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/NotFoundError');
const { validateLogin, validateSignUp } = require('../validators/userValidator');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', validateLogin, login);
router.post('/signup', validateSignUp, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/cards', cardsRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
