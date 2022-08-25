
const Payment = require('../models/payment');
const Bank = require('../models/bank');
const fs = require('fs-extra');
const path = require('path');
const config = require('../../config');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const payments = await Payment.find().populate('banks').sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'payment',
        title: 'payment',
        view: '../payment/index.ejs',
        js: '../payment/js.ejs',
        css: '../payment/css.ejs',
        payments: payments,
        alert: alert
      });
    } catch(error)
    {
      console.log(error);
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {
      const banks = await Bank.find();
      res.render('layouts/index',{
        title: 'Tambah payment',
        current: 'payment',
        type: 'Tambah',
        js: '../payment/js.ejs',
        css: '../payment/css.ejs',
        view: '../payment/createOrUpdate.ejs',
        action: '/payment/create',
        banks: banks,
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {
      console.log(req.body);
      const {type,banks} = req.body;
      const payment = await Payment({type: type,banks: banks});
      await payment.save();
      req.flash('alertMessage','Jenis Pembayaran berhasil ditambahkan');
      req.flash('alertStatus','success');
      res.redirect('/payment');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }
  },
  edit: async (req,res) =>
  {
    const {id} = req.params
    const payment = await Payment.findOne({_id: id});
    const banks = await Bank.find();
    console.log(payment);
    res.render('layouts/index',{
      title: 'Ubah Jenis Pembayaran',
      current: 'payment',
      type: 'Tambah',
      view: '../payment/createOrUpdate.ejs',
      payment: payment,
      action: '/payment/edit/' + id + '?_method=PUT',
      banks: banks,
      js: '../payment/js.ejs',
      css: '../payment/css.ejs'
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {type,banks} = req.body;
      const {id} = req.params
      const paymentUpdate = await Payment.findOneAndUpdate({_id: id},{type: type,banks: banks});
      req.flash('alertMessage','Jenis pembayaran berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/payment');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;
      await Payment.findOneAndRemove({_id: id});
      req.flash('alertMessage','Jenis pembayaran berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/payment');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }

  },
  changeStatus: async (req,res) =>
  {
    try
    {
      const {id} = req.params;

      const payment = await Payment.findOne({_id: id});
      const status = payment.status == 'Y' ? 'N' : 'Y';
      await Payment.findOneAndUpdate({_id: id},{status: status});
      req.flash('alertMessage','Status jenis pembayaran berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/payment');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/payment');
    }
  }
}