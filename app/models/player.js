const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
let playerScheme = mongoose.Schema({
  email: {
    type: String,
    require: [true,'Email harus diisi !']
  },
  name: {
    type: String,
    require: [true,'Nama harus diisi !'],
    maxLength: [50,'Nama tidak boleh lebih dari 50 karakter !'],
    minLength: [3,'Nama minimal 3 karakter !']
  },
  username: {
    type: String,
    require: [true,'Username harus diisi !'],
    maxLength: [50,'Username tidak boleh lebih dari 50 karakter !'],
    minLength: [3,'Username minimal 3 karakter !']
  },
  password: {
    type: String,
    require: [true,'Password harus diisi !'],
    minLength: [6,'Password minimal 6 karakter !'],
    maxLength: [255,'Password maksimal 255 karakter !']
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
  avatar: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
  },
  fileName: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    require: [true,'Nomor telepon harus diisi !'],
    minLength: [3,'Nomor telepon minimal 3 karakter !'],
    maxLength: [14,'Nomor telepon maksimal 14 karakter !']
  }
  ,
  favorite: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
},{timestamps: true});

playerScheme.pre('save',function (next)
{
  this.password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
  next();
});
playerScheme.path('email').validate(async function (value)
{
  try
  {
    const count = await this.model('Player').countDocuments({email: value});
    return !count;
  } catch(error)
  {
    throw error;
  }
},attr => `${attr.value} sudah terdaftar !`);
module.exports = mongoose.model('Player',playerScheme);