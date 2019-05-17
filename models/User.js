const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
class User {
   constructor(model, sign) {
      if (!model || typeof model !== 'function')
         throw new Error('A valid model must be given to use this class');
      this.UserModel = model;
      this.sign = sign;
   }

   async getCurrentUser(user_id, populate = '') {
      const response = await this.UserModel.findById(user_id)
         .populate(populate);

      const { _id, email, foods, friends, requests_sent, requests_received, username } = response;
      const user = { _id, email, foods, friends, requests_sent, requests_received, username };

      return user
   }

   async validateInputs(username, email) {
      let emailTest;
      email !== undefined
         ? emailTest = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
         : emailTest = true;

      let userTest;
      username !== undefined
         ? userTest = /^[a-zA-Z0-9]+$/.test(username)
         : userTest = true;

      if (!userTest && !emailTest) {
         return {
            valid: false,
            msg: 'username & email invalid'
         }
      }
      if (!emailTest) {
         return {
            valid: false,
            msg: 'email invalid'
         }
      }
      if (!userTest) {
         return {
            valid: false,
            msg: 'username invalid'
         }
      }
      return { valid: true };
   }

   async checkUserAvailable(username, email) {
      const user = await this.UserModel.findOne({ username })
      if (user) {
         return {
            valid: false,
            msg: 'username taken'
         }
      }
      const nextUser = await this.UserModel.findOne({ email });
      if (nextUser) {
         return {
            valid: false,
            msg: 'email taken'
         }
      }
      return { valid: true };
   }

   async createNewUser(req_body) {
      const { username, email } = req_body;
      const inputs = await this.validateInputs(username, email);
      if (!inputs.valid) return inputs;
      const avail = await this.checkUserAvailable(username, email);
      if (!avail.valid) return avail;

      const password = this.hashPassword(req_body.password);
      req_body.password = password;
      const response = await this.UserModel.create(req_body);
      const { _id } = response;
      const token = this.sign({
         id: _id,
         username,
      });
      const user = { _id, username }
      return { msg: "logged in", token, user };
   }

   async updateUser(req_body, req_user) {
      const { username, email } = req_body;
      const inputs = await this.validateInputs(username, email);
      if (!inputs.valid) return inputs;
      const avail = await this.checkUserAvailable(username, email);
      if (!avail.valid) return avail;
      const response = await this.UserModel.findOneAndUpdate({ _id: req_user._id }, req_body);
      const { _id } = response;
      const token = this.sign({
         id: _id,
         username,
      });
      const user = { _id, username }
      return { msg: "update successful", token, user };
   }

   async login(req_body) {
      const { username, password } = req_body;

      const response = await this.UserModel.findOne({ username });
      if (!response) throw new Error('Username is incorrect.');

      const passwordValid = this.checkPassword(password, response.password);
      if (passwordValid) {
         const { _id } = response;
         const token = this.sign({
            id: _id,
            username,
         });
         const user = { _id, username }
         return { token, user };
      } else {
         throw new Error('Password is incorrect.');
      }
   }

   async updatePassword(req_body, req_user) {
      const { _id, password } = req_user;
      const { currentPassword, newPassword } = req_body;
      const passwordValid = this.checkPassword(currentPassword, password);
      if (passwordValid) {
         const pw = hashPassword(newPassword);
         const response = await this.UserModel.findOneAndUpdate({ _id }, { password: pw });
         const { username } = response;
         const token = this.sign({
            id: _id,
            username,
         });
         const user = { _id, username }
         return { msg: "password changed", token, user };
      }
   }

   checkPassword(inputPassword, password) {
      return compareSync(inputPassword, password);
   }

   hashPassword(plainTextPassword) {
      return hashSync(plainTextPassword, genSaltSync(10), null);
   }

   async addFoodToUser(user_id, food_id) {
      const user = await this.UserModel.findByIdAndUpdate(
         user_id,
         { $push: { foods: food_id } },
         { new: true }
      );
      return user;
   }

   async removeFoodFromUser(user_id, food_id) {
      const user = await this.UserModel.findByIdAndUpdate(
         user_id,
         { $pull: { foods: food_id } },
         { new: true }
      );
      return user;
   }

   async requestFriend(friend_id, user_id) {
      const friend = await this.UserModel.findById(friend_id);
      // log 'friend' to make sure the below conditionals will work
      const { blocked, friends, requests } = friend;

      // maybe in the future you can do something with these besides just return
      // like notify the user they've already sent it, have been blocked, etc.
      if (friends.includes(user_id)) return;
      if (requests.includes(user_id)) return;
      if (blocked.includes(user_id)) return;

      const request = await this.UserModel.findByIdAndUpdate(
         friend_id,
         { $push: { requests_received: user_id } },
         { new: true }
      );

      return request;
   }

   async searchUsers(args) {
      const { search_term, page = 1, limit = 10 } = args;
      const skip = (page - 1) * limit;
      const matches = await this.UserModel.find({
         $or: [
            { username: { "$regex": search_term, "$options": "i" } },
            { name: { "$regex": search_term, "$options": "i" } },
            { email: { "$regex": search_term, "$options": "i" } },
         ]
      }, null, {
            skip: parseInt(skip),
            limit: parseInt(limit)
         });
      return matches;
   }
}

module.exports = User;