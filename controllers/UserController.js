const User = require('../models/User');
const UserModel = require('../models/UserModel');
const { sign } = require('../passport');
const user_model = new User(UserModel, sign);

module.exports = userController = {};

userController.getCurrentUser = async function (req, res) {
  console.log(req.user)
  try {
    // for only authenticating, just do this:
    const { _id, username } = req.user;
    const user = { _id, username };
    res.json(user);

    // if you need to populate more data or otherwise get more info than the passport request, use and modify this:
    // const user = await UserModel.findById(req.user._id);
    // const { _id, username } = user;
    // const user_data = { _id, username };
    // res.json(user_data);
  } catch (e) {
    res.json({ msg: e.message });
  }
}

userController.login = async function (req, res) {
  console.log("Req.body: ", req.body)
  try {
    const user = await user_model.login(req.body);
    console.log("User: ", user)
    res.json(user);
  } catch (e) {
    res.json({ message: e.message });
  }
}