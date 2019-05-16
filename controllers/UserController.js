const User = require('../models/User');
const UserModel = require('../models/UserModel');
const { sign } = require('../passport');
const user_model = new User(UserModel, sign);

module.exports = userController = {};

userController.getCurrentUser = async (req, res) => {
   try {
      const user = await user_model.getCurrentUser(req.user._id, 'foods friends');
      res.json(user);
   } catch ({ message }) {
      res.json({ message });
   }
}

userController.login = async (req, res) => {
   try {
      const user = await user_model.login(req.body);
      console.log("User in a baahhhhtull: ", user)
      res.json(user);
   } catch ({ message }) {
      console.log("Message in a baahhhhtull: ", message)
      res.status(422).json({ message });
   }
}

userController.requestFriend = async (req, res) => {
   try {
      const request = await user_model.requestFriend(req.params.id, req.user._id);
      res.json(request);
   } catch ({ message }) {
      res.status(422).json({ message });
   }
}