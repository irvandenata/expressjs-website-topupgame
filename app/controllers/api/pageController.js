const bcrypt = require('bcryptjs');
const Player = require('../../models/player');
const responseReturn = require('../../helpers/responseReturn');
const Voucher = require('../../models/voucher');
module.exports = {
  landingPage: async (req,res) =>
  {
    try 
    {
      const vouchers = await Voucher.find().select('_id name status category thumbnail').populate('category');
      const response = responseReturn.success({message: 'Berhasil',data: vouchers});
      res.json(response);
    } catch(error)
    {
      const response = responseReturn.error({message: `${error}`});
      res.json(response);
    }
  },
  detailPage: async (req,res) =>
  {
    try 
    {
      const {id} = req.params;
      const voucher = await Voucher.findOne({_id: id}).populate('category').populate('nominals').populate('user','_id name phoneNumber');
      if(!voucher)
      {
        const response = responseReturn.error({message: 'Voucher tidak ditemukan',code: 404});
        res.json(response);
      }
      const response = responseReturn.success({message: 'Berhasil',data: voucher});
      res.json(response);
    } catch(error)
    {
      const response = responseReturn.error({message: `${error}`});
      res.json(response);
    }
  }
}