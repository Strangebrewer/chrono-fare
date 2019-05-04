const User = require('./User');
const UserModel = require('./UserModel');

class Food {
   constructor(model) {
      if (!model || typeof model !== 'function') {
         throw new Error('A valid model must be given to use this class');
      }

      this.FoodModel = model;
   }

   async getAllFoods(user_id) {
      console.log("User id: ", user_id)
      try {
         const foods = await this.FoodModel.find({ user_id });
         return foods;
      } catch (e) {
         console.log("Error in Food model, getAllFoods: ", e);
      }
   }

   async addNewFood(user_id, food_data) {
      const user_model = new User(UserModel);
      try {
         const newFoodObject = { ...food_data, user_id }
         const new_food = await this.FoodModel.create(newFoodObject);
         user_model.addFoodToUser(user_id, new_food._id);
         const foods = await this.getAllFoods(user_id);
         console.log("Foods: ", foods);
         return foods;
      } catch (e) {
         console.log("Error in Food model, addNewFood: ", e);
      }
   }
}

module.exports = Food;