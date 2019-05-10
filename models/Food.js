const User = require('./User');
const UserModel = require('./UserModel');
const user_model = new User(UserModel);
const dateFns = require('date-fns');

class Food {
   constructor(model) {
      if (!model || typeof model !== 'function') {
         throw new Error('A valid model must be given to use this class');
      }

      this.FoodModel = model;
   }

   async addNewFood(user_id, food_data) {
      try {

         const date = dateFns.format(food_data.date, 'x');
         food_data.date = date;
         const newFoodObject = { ...food_data, user_id }
         const new_food = await this.FoodModel.create(newFoodObject);
         user_model.addFoodToUser(user_id, new_food._id);
         return new_food;

      } catch (e) {

         console.log("Error in Food model, \'addNewFood\': ", e.message);

      }
   }

   async editFood(food_id, food_data) {
      try {

         const date = dateFns.format(food_data.date, 'x');
         food_data.date = date;
         const food = await this.FoodModel.findByIdAndUpdate(food_id, food_data, { new: true });
         return food;

      } catch (e) {

         console.log("Error in Food model, \'editFood\': ", e.message);

      }
   }

   async deleteFood(user_id, food_id) {
      try {

         await user_model.removeFoodFromUser(user_id, food_id);
         await this.FoodModel.findByIdAndDelete(food_id);
         return 'success!';

      } catch (e) {

         console.log("Error in Food model, \'deleteFood\': ", e.message);

      }
   }
}

module.exports = Food;