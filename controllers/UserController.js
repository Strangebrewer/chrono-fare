const User = require('../models/User');
const UserModel = require('../models/UserModel');
const { sign } = require('../passport');
const user_model = new User(UserModel, sign);

module.exports = userController = {};

userController.getCurrentUser = async function (req, res) {
   console.log(req.user)
   try {
      const user = await user_model.getCurrentUser(req.user._id, 'foods friends');
      res.json(user);
   } catch (e) {
      console.log("Here's the E: ", e);
      res.json({ msg: e.message });
   }
}

userController.login = async function (req, res) {
   console.log("Req.body: ", req.body)
   try {
      const user = await user_model.login(req.body);
      console.log("User: ", user)
      res.json(user);
   } catch ({ message }) {
      console.log("Here's the E: ", e);
      res.json({ message });
   }
}