const User = require('../models/User');
const UserModel = require('../models/UserModel');
const { sign } = require('../passport');
const user_model = new User(UserModel, sign);

module.exports = userController = {};

userController.getCurrentUser = async function (req, res) {
   try {
      const user = await user_model.getCurrentUser(req.user._id, 'foods friends');
      res.json(user);
   } catch ({ message }) {
      res.json({ message });
   }
}

userController.login = async function (req, res) {
   try {
      const user = await user_model.login(req.body);
      res.json(user);
   } catch ({ message }) {
      res.json({ message });
   }
}