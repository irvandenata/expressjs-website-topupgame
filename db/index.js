const mongoose = require('mongoose');
const {urlDB} = require('../config');
// console.log(urlDB);
mongoose.connect(
  urlDB,{
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;