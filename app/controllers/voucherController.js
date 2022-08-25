const Nominal = require('../models/nominal');
const Category = require('../models/category');
const Voucher = require('../models/voucher');
const fs = require('fs-extra');
const path = require('path');
const config = require('../../config');
module.exports = {
  index: async (req,res,next) =>
  {
    try
    {

      const vouchers = await Voucher.find().populate('category').populate('nominals').sort({updatedAt: -1});
      const alertMessage = req.flash('alertMessage');
      const alertStatus = req.flash('alertStatus');
      const alert = {
        message: alertMessage,
        status: alertStatus
      }
      res.render('layouts/index',{
        current: 'voucher',
        title: 'Voucher',
        view: '../voucher/index.ejs',
        js: '../voucher/js.ejs',
        css: '../voucher/css.ejs',
        vouchers: vouchers,
        alert: alert
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }
  },
  create: async (req,res,next) =>
  {
    try
    {
      const nominals = await Nominal.find();
      const categories = await Category.find();
      res.render('layouts/index',{
        title: 'Tambah Voucher',
        current: 'voucher',
        type: 'Tambah',
        js: '../voucher/js.ejs',
        css: '../voucher/css.ejs',
        view: '../voucher/createOrUpdate.ejs',
        action: '/voucher/create',
        nominals: nominals,
        categories: categories
      });
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }
  },
  store: async (req,res,next) =>
  {
    try
    {
      const {name,category,nominals} = req.body;
      let filename = '';
      if(req.file)
      {
        let name = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 6; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        let tempPath = req.file.path;
        let originalName = name;
        let originalExtension = req.file.originalname.split('.').pop();
        let dir = 'voucher';
        filename = `${dir}/${originalName}.${originalExtension}`;
        let targetPath = path.resolve(`${config.rootPath}/public/images/${filename}`);
        if(!fs.existsSync(`${config.rootPath}/public/images/${dir}`))
        {
          await fs.mkdirSync(`${config.rootPath}/public/images/${dir}`);
        }
        const src = fs.createReadStream(tempPath);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on('end',async () =>
        {
          fs.unlink(tempPath,(err) =>
          {
            if(err) throw err;
          });
        }).on('error',(err) => console.log(err));
      }
      const voucher = await Voucher({name: name,category: category,nominals: nominals,thumbnail: filename});
      await voucher.save();
      req.flash('alertMessage','Voucher berhasil ditambahkan');
      req.flash('alertStatus','success');
      res.redirect('/voucher');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }
  },
  edit: async (req,res) =>
  {
    const {id} = req.params
    const voucher = await Voucher.findOne({_id: id});
    const nominals = await Nominal.find();
    const categories = await Category.find();
    console.log(voucher);
    res.render('layouts/index',{
      title: 'Ubah Voucher',
      current: 'voucher',
      type: 'Tambah',
      view: '../voucher/createOrUpdate.ejs',
      voucher: voucher,
      action: '/voucher/edit/' + id + '?_method=PUT',
      nominals: nominals,
      categories: categories,
      js: '../voucher/js.ejs',
      css: '../voucher/css.ejs'
    });
  },
  update: async (req,res) =>
  {
    try
    {
      const {name,category,nominals} = req.body;
      const {id} = req.params
      const voucher = await Voucher.findOne({_id: id});
      let filename = voucher.thumbnail;
      if(req.file)
      {
        let name = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i = 0; i < 6; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        let tempPath = req.file.path;
        let originalName = name;
        let originalExtension = req.file.originalname.split('.').pop();
        let dir = 'voucher';
        filename = `${dir}/${originalName}.${originalExtension}`;
        let targetPath = path.resolve(`${config.rootPath}/public/images/${filename}`);
        if(!fs.existsSync(`${config.rootPath}/public/images/${dir}`))
        {
          await fs.mkdirSync(`${config.rootPath}/public/images/${dir}`);
        }
        const src = fs.createReadStream(tempPath);
        const dest = fs.createWriteStream(targetPath);
        src.pipe(dest);
        src.on('end',async () =>
        {
          let currentImage = `${config.rootPath}/public/images/${voucher.thumbnail}`;
          if(fs.existsSync(currentImage))
          {
            fs.unlink(currentImage,(err) =>
            {
              if(err) throw err;
            });
          }

          fs.unlink(tempPath,(err) =>
          {
            if(err) throw err;
          });
        }).on('error',(err) => console.log(err));
      }
      const voucherUpdate = await Voucher.findOneAndUpdate({_id: id},{name: name,category: category,nominals: nominals,thumbnail: filename});
      req.flash('alertMessage','Voucher berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/voucher');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }

  },
  destroy: async (req,res) =>
  {
    try
    {
      const {id} = req.params;

      const voucher = await Voucher.findOne({_id: id});
      if(fs.existsSync(`${config.rootPath}/public/images/${voucher.thumbnail}`))
      {
        fs.unlink(`${config.rootPath}/public/images/${voucher.thumbnail}`,(err) =>
        {
          if(err) throw err;
        });
      }
      await Voucher.findOneAndRemove({_id: id});
      req.flash('alertMessage','Voucher berhasil dihapus');
      req.flash('alertStatus','success');
      res.redirect('/voucher');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }

  },
  changeStatus: async (req,res) =>
  {
    try
    {
      const {id} = req.params;

      const voucher = await Voucher.findOne({_id: id});
      const status = voucher.status == 'Y' ? 'N' : 'Y';
      await Voucher.findOneAndUpdate({_id: id},{status: status});
      req.flash('alertMessage','Status Voucher berhasil diubah');
      req.flash('alertStatus','success');
      res.redirect('/voucher');
    } catch(error)
    {
      req.flash('alertMessage',`${error.message}`);
      req.flash('alertStatus','danger');
      res.redirect('/voucher');
    }

  }
}