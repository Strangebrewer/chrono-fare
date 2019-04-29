const path = require('path');
const router = require('express').Router();
const user_routes = require('./user');

router.use('/user', user_routes);

router.use(function (req, res) {
  if (process.env.NODE_ENV === 'production')
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;