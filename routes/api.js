const router = require('express').Router();
const { passport } = require('../passport');
const apiController = require('../controllers/ApiController');

router.route('/foods')
   .get(passport.authenticate('jwt', { session: false }), apiController.getAllFoods)
   .post(passport.authenticate('jwt', { session: false }), apiController.addNewFood)

function logThis(req, res, next) {
   console.log('Working');
   next();
}

module.exports = router;