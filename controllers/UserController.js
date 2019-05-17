const User = require('../models/User');
const UserModel = require('../models/UserModel');
const { sign } = require('../passport');
const user_model = new User(UserModel, sign);

module.exports = {

   getCurrentUser: async (req, res) => {
      try {
         const user = await user_model.getCurrentUser(req.user._id, 'foods friends');
         res.json(user);
      } catch ({ message }) {
         res.json({ 'error': message });
      }
   },

   login: async (req, res) => {
      try {
         const user = await user_model.login(req.body);
         res.json(user);
      } catch ({ message }) {
         res.json({ 'error': message });
      }
   },

   requestFriend: async (req, res) => {
      try {
         const request = await user_model.requestFriend(req.params.id, req.user._id);
         res.json(request);
      } catch ({ message }) {
         res.json({ 'error': message });
      }
   },

   searchUsers: async (req, res) => {
      try {
         const results = await user_model.searchUsers(req.query);
         res.json(results);
      } catch ({ message }) {
         res.json({ 'error': message });
      }
   }

};