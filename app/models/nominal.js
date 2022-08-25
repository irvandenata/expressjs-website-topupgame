const mongoose = require('mongoose');
let coinScheme = mongoose.Schema({
  coinQuantity: {
    type: Number,
    require: [true,'Jumlah kategori harus diisi !']
  },
  coinName: {
    type: String,
    require: [true,'Nama Koin kategori harus diisi !']
  },
  price: {
    type: Number,
    require: [true,'Harga kategori harus diisi !']
  },
},{timestamps: true});

module.exports = mongoose.model('Nominal',coinScheme);