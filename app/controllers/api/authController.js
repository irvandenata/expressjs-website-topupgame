const responseReturn = require('../../helpers/responseReturn');
const Player = require('../../models/player');
const path = require('path');
const fs = require('fs');
const config = require('../../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {
  signUp: async (req,res) =>
  {
    try
    {
      const payload = req.body;
      console.log(req.file);
      if(req.file)
      {
        let name = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for(let i = 0; i < 6; i++)
          name += possible.charAt(Math.floor(Math.random() * possible.length));
        let tempPath = req.file.path;
        let originalName = name;
        let originalExtension = req.file.originalname.split('.').pop();
        let dir = 'player';
        let filename = `${dir}/${originalName}.${originalExtension}`;
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

        const player = new Player({...payload,avatar: filename});
        await player.save();
        await delete player._doc.password;
        return res.json(responseReturn.success({message: 'Berhasil',data: player}));

      } else
      {
        const player = new Player(payload);
        await player.save();
        await delete player._doc.password;
        return res.json(responseReturn.success({message: 'Berhasil',data: player}));

      }
    } catch(error)
    {
      if(error.name === 'ValidationError')
      {
        const response = responseReturn.error({message: `${error.message}`,code: 400,data: error.errors});
        res.json(response);
      } else
      {
        const response = responseReturn.error({message: `${error}`});
        res.json(response);
      }
    }
  },
  signIn: async (req,res) =>
  {
    try
    {
      const {email,password} = req.body;
      if(!email || !password)
      {
        const response = responseReturn.error({message: 'Email dan password tidak boleh kosong'});
        res.json(response);
      }
      const player = await Player.findOne({email: email});
      if(!player)
      {
        const response = responseReturn.error({message: 'Email tidak ditemukan',code: 404});
        res.json(response);
      }
      const isMatch = bcrypt.compareSync(password,player.password);
      if(!isMatch)
      {
        const response = responseReturn.error({message: 'Password salah',code: 400});
        res.json(response);
      }
      const token = jwt.sign({id: player._id,email: player.email,username: player.username,name: player.name,phoneNumber: player.phoneNumber,avatar: player.avatar},config.jwtKey,{expiresIn: '1d'});
      return res.json(responseReturn.success({message: 'Berhasil',data: token}));
    } catch(error)
    {
      if(error.name === 'ValidationError')
      {
        const response = responseReturn.error({message: `${error.error}`,code: 400});
        res.json(response);
      } else
      {
        const response = responseReturn.error({message: `${error}`});
        res.json(response);
      }
    }
  },
}