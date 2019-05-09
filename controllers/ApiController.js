const Food = require('../models/Food');
const FoodModel = require('../models/FoodModel');
const food_model = new Food(FoodModel);

module.exports = apiController = {};

apiController.getAllFoods = async function (req, res) {
   try {
      const foods = await FoodModel.find({ _id: req.user._id });
      res.json(foods);
   } catch (e) {
      res.send('Error in \'getAllFoods\' in apiController: ', e.message);
   }
}

apiController.addNewFood = async function (req, res) {
   try {
      const food = await food_model.addNewFood(req.user._id, req.body);
      res.json(food);
   } catch (e) {
      res.send('Error in \'addNewFood\' in apiController: ', e.message);
   }
}

apiController.editFood = async function (req, res) {
   try {
      const food = await food_model.editFood(req.params.id, req.body, { new: true });
      // const food = await food_model.editFood(req.params.id, req.body);
      res.json(food);
   } catch (e) {
      res.send('Error in \'editFood\' in apiController: ', e.message);
   }
}

apiController.deleteFood = async function (req, res) {
   try {
      await food_model.deleteFood(req.user._id, req.params.id);
      res.json('success!');
   } catch (e) {
      res.send('Error in \'deleteFood\' in apiController: ', e.message);
   }
}