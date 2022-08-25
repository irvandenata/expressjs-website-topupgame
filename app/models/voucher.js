const mongoose = require('mongoose');
let voucherScheme = mongoose.Schema({
  name: {
    type: String,
    require: [true,'Nama kategori harus diisi !']
  },
  status: {
    type: String,
    enum: ['Y','N'],
    default: 'Y',
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    require: [true,'kategori harus diisi !']

  },
  nominals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nominal',
    require: [true,'Nominal harus diisi !']
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},{timestamps: true});

module.exports = mongoose.model('Voucher',voucherScheme);