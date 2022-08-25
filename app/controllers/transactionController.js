const Transaction = require('../models/transaction');
const Player = require('../models/player');

module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const transactions = await Transaction.find().populate('category').populate('player').sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'transaction',
        title: 'transaction',
        view: '../transaction/index.ejs',
        js: '../transaction/js.ejs',
        css: '../transaction/css.ejs',
        transactions: transactions,
        alert: alert
      });
    } catch(error)
    {
      console.log('error',error);
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/transaction');
    }
  },
  actionStatus: async (req,res,next) =>
  {
    try
    {
      const {id} = req.params;
      console.log(id);
      console.log(req.body);
      console.log("=============");
      const {status} = req.body;
      const transaction = await Transaction.findOneAndUpdate({_id: id},{status: status});
      req.flash('alertMessage','Status berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/transaction');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/transaction');
    }
  },
}