const router = require('express').Router();
const { passport } = require('../passport');
const userController = require('../controllers/UserController');

router.route('/')
   .get(passport.authenticate('jwt', { session: false }), userController.getCurrentUser)

router.post('/login', userController.login);

router.get('/search', userController.searchUsers)

module.exports = router;