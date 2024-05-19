const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  act :{
    type:String,
    required: true,
    trim:true
  },
  title: {
    type: String,
    required: true,
    trim:true,
  },
  description: {
    type:String,
    required: true,
    trim:true,
  },
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = mongoose.model('Maggie', userSchema);

module.exports = UserModel;
