const mongoose = require('mongoose');
let categoryScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true,'Nama kategori harus diisi !']
  }
},{timestamps: true});

module.exports = mongoose.model('Category',categoryScheme);