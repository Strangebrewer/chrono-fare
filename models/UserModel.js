const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const tempPw = bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null);

const userSchema = new Schema({
   username: { type: String, required: true },
   password: { type: String, required: true, default: tempPw },
   name: { type: String, required: true },
   email: { type: String, required: true },
   foods: [{
      type: Schema.Types.ObjectId,
      ref: 'Food'
   }],
   friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
   }]
},
   { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;