module.exports = {
  index: async (req,res,next) =>
  {
    try
    {
      // const categories = await Category.findAll();
      res.render('layouts/index',{
        current: 'dashboard',
        title: 'Dashboard',
        view: '../dashboard/index.ejs',
      });
    } catch(error)
    {
      console.log(error);
    }
  }
}