const Food = require('../models/Food');
const FoodModel = require('../models/FoodModel');
const food_model = new Food(FoodModel);

module.exports = apiController = {};

apiController.getAllFoods = async function (req, res) {
   try {
      const foods = await food_model.getAllFoods();
      res.json(foods);
   } catch (e) {
      console.log("Error: ", e);
   }
}

apiController.addNewFood = async function (req, res) {
   try {
      const foods = await food_model.addNewFood(req.user._id, req.body);
      res.json(foods);
   } catch (e) {
      console.log("Error: ", e);
   }
}