const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {


  index: (req,res) =>
  {
    const alertMessage = req.flash('alertMessage');
    const alertStatus = req.flash('alertStatus');
    const alert = {
      message: alertMessage,
      status: alertStatus
    }
    if(req.session.user && req.session.user.status == "Y")
    {
      res.redirect('/dashboard');
    }
    res.render('layouts/auth',{
      title: 'Login',
      view: '../authentication/login.ejs',
      alert: alert
    });
  },
  login: async (req,res) =>
  {

    try
    {
      const {email,password} = req.body;
      const user = await User.findOne({email: email});
      if(user)
      {
        if(user.status == "Y")
        {
          const valid = await bcrypt.compareSync(password,user.password);
          if(valid)
          {
            req.session.user = {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              status: user.status
            };
            res.redirect('/dashboard');
          } else
          {
            req.flash('alertMessage','Password yang anda masukkan salah');
            req.flash('alertStatus','danger');
            res.redirect('/silent/login');
          }
        } else
        {
          req.flash('alertMessage','Akun anda belum aktif');
          req.flash('alertStatus','danger');
          res.redirect('/silent/login');
        }
      } else
      {
        req.flash('alertMessage','Email tidak ditemukan');
        req.flash('alertStatus','danger');
        res.redirect('/silent/login');
      }
    } catch(error)
    {
      req.flash('alertMessage',`${error}`);
      req.flash('alertStatus','danger');
      req.redirect('/silent/login');
    }
  }
}