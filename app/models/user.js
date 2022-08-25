const mongoose = require('mongoose');
let userScheme = mongoose.Schema({
  email: {
    type: String,
    require: [true,'Email harus diisi !']
  },
  name: {
    type: String,
    require: [true,'Nama harus diisi !']
  },
  password: {
    type: String,
    require: [true,'Password harus diisi !']
  },
  role: {
    type: String,
    enum: ['admin','user'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['Y','N'],
    default: 'Y',
  },
},{timestamps: true});
module.exports = mongoose.model('User',userScheme);