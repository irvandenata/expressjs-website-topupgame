const Category = require('../models/category');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      const categories = await Category.find().sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'category',
        title: 'Category',
        view: '../category/index.ejs',
        js: '../category/js.ejs',
        css: '../category/css.ejs',
        categories: categories,
        alert: alert
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/category');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {

      res.render('layouts/index',{
        title: 'Tambah Category',
        current: 'category',
        type: 'Tambah',
        view: '../category/createOrUpdate.ejs',
        action: '/category/create',
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/category');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {
      req.flash('alertMessage','Kategori berhasil ditambahkan');
      req.flash('alertStatus','success');
      const {name} = req.body;
      let category = await Category({name});
      await category.save();
      res.redirect('/category');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/category');
    }
  },
  edit: async (req,res) =>
  {
    const {id} = req.params
    const category = await Category.findOne({_id: id});

    res.render('layouts/index',{
      title: 'Ubah Category',
      current: 'category',
      type: 'Tambah',
      view: '../category/createOrUpdate.ejs',
      category: category,
      action: '/category/edit/' + id + '?_method=PUT',
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {id} = req.params;
      const {name} = req.body;
      const category = await Category.findOneAndUpdate({_id: id},{name: name});
      req.flash('alertMessage','Kategori berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/category');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/category');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;
      const category = await Category.findOneAndRemove({_id: id});
      req.flash('alertMessage','Kategori berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/category');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/category');
    }

  }
}