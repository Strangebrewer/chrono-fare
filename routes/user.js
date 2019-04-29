const router = require('express').Router();
const { passport } = require('../passport');
const userController = require('../controllers/UserController');

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), userController.getCurrentUser)

router.post('/login', logThis, userController.login);

function logThis(req, res, next) {
  console.log('Working');
  next();
}

module.exports = router;