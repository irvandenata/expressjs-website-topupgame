const Nominal = require('../models/nominal');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const nominals = await Nominal.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'nominal',
        title: 'Nominal',
        view: '../nominal/index.ejs',
        js: '../nominal/js.ejs',
        css: '../nominal/css.ejs',
        nominals: nominals,
        alert: alert
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/nominal');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {
      res.render('layouts/index',{
        title: 'Tambah Nominal',
        current: 'nominal',
        type: 'Tambah',
        js: '../nominal/js.ejs',
        css: '../nominal/css.ejs',
        view: '../nominal/createOrUpdate.ejs',
        action: '/nominal/create',
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/nominal');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {

      const {name,quantity,price} = req.body;
      const nominal = await Nominal({coinName: name,coinQuantity: quantity,price: price});
      await nominal.save();
      req.flash('alertMessage','Nominal berhasil ditambahkan');
      req.flash('alertStatus','success');
      res.redirect('/nominal');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/nominal');
    }
  },
  edit: async (req,res) =>
  {
    const {id} = req.params
    const nominal = await Nominal.findOne({_id: id});

    res.render('layouts/index',{
      title: 'Ubah Nominal',
      current: 'nominal',
      type: 'Tambah',
      view: '../nominal/createOrUpdate.ejs',
      nominal: nominal,
      action: '/nominal/edit/' + id + '?_method=PUT',
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {id} = req.params;
      const {name,quantity,price} = req.body;
      const nominal = await Nominal.findOneAndUpdate({_id: id},{coinName: name,coinQuantity: quantity,price: price});
      req.flash('alertMessage','Nominal berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/nominal');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/nominal');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;
      const nominal = await Nominal.findOneAndRemove({_id: id});
      req.flash('alertMessage','Nominal berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/nominal');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/nominal');
    }

  }
}