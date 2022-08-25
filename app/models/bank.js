const mongoose = require('mongoose');
let bankScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true,'Nama Bank harus diisi !']
  },
  owner: {
    type: String,
    require: [true,'Nama Pemilik rekening harus diisi !']
  },
  bankNumber: {
    type: Number,
    require: [true,'Nomor rekening harus diisi !']
  },
  image: {
    type: String,
  }
},{timestamps: true});

module.exports = mongoose.model('Bank',bankScheme);