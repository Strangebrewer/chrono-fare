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
         console.log("New Food Object: ", newFoodObject)
         const new_food = await this.FoodModel.create(newFoodObject, { new: true });
         console.log("New Food: ", new_food)
         user_model.addFoodToUser(user_id, new_food._id);
         // const foods = await this.getAllFoods(user_id);
         return new_food;
      } catch (e) {
         console.log("Error in Food model, addNewFood: ", e);
      }
   }

   async deleteFood(user_id, food_id) {
      const user_model = new User(UserModel);
      try {
         await user_model.removeFoodFromUser(user_id, food_id);
         await this.FoodModel.findByIdAndDelete(food_id);
         return 'success!';
      } catch (e) {
         console.log("Error in Food model, deleteFood: ", e);
      }
   }
}

module.exports = Food;