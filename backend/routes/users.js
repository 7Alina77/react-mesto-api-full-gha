const router = require('express').Router();
const {
  getUsers,
  getUser,
  getMe,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { validateUserById, validateUser, validateUserAvatar } = require('../validators/userValidator');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:id', validateUserById, getUser);
router.patch('/me', validateUser, updateUser);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
