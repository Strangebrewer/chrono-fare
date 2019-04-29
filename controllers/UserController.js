import User from '../models/User';
import UserModel from '../models/UserModel';
import { sign } from '../passport';
const user_model = new User(UserModel, sign);

export async function getCurrentUser(req, res) {
  try {
    const user = await UserModel.findById(req.user._id);
    const { _id, username } = user;
    const user_data = { _id, username };
    res.json(user_data);
  } catch (e) {
    res.json({ msg: e.message });
  }
}

export async function login(req, res) {
  try {
    const user = await user_model.login(req.body);
    console.log("User: ", user)
    res.json(user);
  } catch (e) {
    res.json({ message: e.message });
  }
}