const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
   name: { type: String, required: true },
   description: String,
   date: { type: String, required: true },
   owner_id: { type: Schema.Types.ObjectId },
   shared_with: [{
      type: Schema.Types.ObjectId,
      ref: "User"
   }]
},
   { timestamps: true }
);

const FoodModel = mongoose.model('Food', foodSchema);

module.exports = FoodModel;