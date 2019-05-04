const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
   name: { type: String, required: true },
   description: String,
   date: { type: Date, required: true },
   user_id: { type: Schema.Types.ObjectId }
},
   { timestamps: true }
);

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;