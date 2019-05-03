const Food = require('../models/Food');
const FoodModel = require('../models/FoodModel');
const food_model = new Food(FoodModel);

module.exports = apiController = {};

apiController.getFoods = async function (req, res) {
  console.log("Request received.");
  res.json([{ name: 'grated cheese', description: "colby jack in the big tub with the blue lid", date: '2019/05/02' }]);
}

apiController.newFood = async function (req, res) {
  console.log(req.body);
  res.json([
    { name: 'grated cheese', description: "colby jack in the big tub with the blue lid", date: '2019/05/02' },
    { name: 'black-eyed peas', description: "", date: '2019/04/30' }
  ])
}