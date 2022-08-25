const bcrypt = require('bcryptjs');
const Player = require('../../models/player');
const responseReturn = require('../../helpers/responseReturn');
module.exports = {
  allData: async (req,res) =>
  {
    try 
    {
      const users = await Player.find();
      const response = responseReturn.success({message: 'Berhasil',data: users});
      res.json(response);
    } catch(error)
    {
      const response = responseReturn.error({message: `${error}`});
      res.json(response);
    }
  }
}