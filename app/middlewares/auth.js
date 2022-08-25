module.exports = {
  isAuthenticated: (req,res,next) =>
  {
    if(req.session.user && req.session.user.status == "Y")
    {
      return next();
    }
    req.flash('alertMessage','Anda harus login terlebih dahulu');
    req.flash('alertStatus','danger');
    res.redirect('/silent/login');
  }
}