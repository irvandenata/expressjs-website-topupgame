const mongoose = require('mongoose');
let transactionScheme = mongoose.Schema({
  historyVoucherTopup: {
    gameName: {
      type: String,
      require: [true,'Nama game harus diisi !'],
      minLength: [3,'Nama game minimal 3 karakter !'],
    },
    price: {
      type: Number,
      require: [true,'Harga harus diisi !']
    },
    category: {
      type: String,
      require: [true,'Kategori harus diisi !']
    },
    thumbnail: {
      type: String,
    },
    coinName: {
      type: String,
      require: [true,'Nama koin harus diisi !']
    },
    coinQuantity: {
      type: Number,
      require: [true,'Jumlah koin harus diisi !']
    }
  },
  historyPayment: {
    name: {
      type: String,
      require: [true,'Nama harus diisi !']
    },
    type: {
      type: String,
      require: [true,'Tipe harus diisi !']
    },
    bankName: {
      type: String,
      require: [true,'Nama Bank harus diisi !']
    },
    noRekening: {
      type: Number,
      require: [true,'Nomor rekening harus diisi !']
    }
  },
  name: {
    type: String,
    require: [true,'Nama Bank harus diisi !'],
    minLength: [3,'Nama game minimal 3 karakter !'],
    maxLength: [255,'Nama game maksimal 255 karakter !']
  },
  accountUser: {
    type: String,
    require: [true,'Nama akun harus diisi !'],
    minLength: [3,'Nama akun minimal 3 karakter !'],
    maxLength: [255,'Nama akun maksimal 255 karakter !']
  },
  owner: {
    type: String,
    require: [true,'Nama Pemilik rekening harus diisi !'],
    minLength: [3,'Nama minimal 3 karakter !'],
    maxLength: [255,'Nama maksimal 255 karakter !'],
  },
  tax: {
    type: Number,
    default: 0
  },
  value: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['pending','success','failed'],
    default: 'pending'
  },
  bankNumber: {
    type: Number,
    require: [true,'Nomor rekening harus diisi !']
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player',
  },
  historyPlayer: {
    name: {
      type: String,
      require: [true,'Nama player harus diisi !'],
    },
    phoneNumber: {
      type: Number,
      require: [true,'Nomor telepon harus diisi !'],
      minLength: [3,'Nomor telepon minimal 3 karakter !'],
      maxLength: [14,'Nomor telepon maksimal 14 karakter !']
    }
  },
  image: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }

},{timestamps: true});

module.exports = mongoose.model('Transaction',transactionScheme);