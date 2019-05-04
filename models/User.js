const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
class User {
   constructor(model, sign) {
      if (!model || typeof model !== 'function')
         throw new Error('A valid model must be given to use this class');
      this.UserModel = model;
      this.sign = sign;
   }

   async getCurrentUser(user_id, populate = '') {
      const user = await this.UserModel.findById(user_id)
         .populate(populate);

      const { _id, email, foods, friends, username } = user;
      const user_data = { _id, email, foods, friends, username };

      return user_data
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
      const user = await this.UserModel.create(req_body);
      const { _id } = user;
      const token = this.sign({
         id: _id,
         username,
      });
      const userData = { _id, username }
      return { msg: "logged in", token, user: userData };
   }

   async updateUser(req_body, req_user) {
      const { username, email } = req_body;
      const inputs = await this.validateInputs(username, email);
      if (!inputs.valid) return inputs;
      const avail = await this.checkUserAvailable(username, email);
      if (!avail.valid) return avail;
      const res = await this.UserModel.findOneAndUpdate({ _id: req_user._id }, req_body);
      const { _id } = res;
      const token = this.sign({
         id: _id,
         username,
      });
      const user = { _id, username }
      return { msg: "update successful", token, user };
   }

   async login(req_body) {
      try {
         const { username, password } = req_body;
         const res = await this.UserModel.findOne({ username })
         const passwordValid = this.checkPassword(password, res.password);
         if (passwordValid) {
            const { _id } = res;
            const token = this.sign({
               id: _id,
               username,
            });
            const user = { _id, username }
            return { msg: "logged in", token, user };
         }
      } catch (e) {
         console.log("Here's the E: ", e);
         return { error: e.message }
      }

   }

   async updatePassword(req_body, req_user) {
      const { _id, password } = req_user;
      const { currentPassword, newPassword } = req_body;
      const passwordValid = this.checkPassword(currentPassword, password);
      if (passwordValid) {
         const pw = hashPassword(newPassword);
         const res = await this.UserModel.findOneAndUpdate({ _id }, { password: pw });
         const { username } = res;
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
      try {
         await this.UserModel.findByIdAndUpdate(user_id, {
            $push: { foods: food_id }
         })
         return 'success!';
      } catch (e) {
         console.log("Error in User model, addFoodToUser: ", e);
      }
   }

}

module.exports = User;