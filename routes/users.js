const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

//ruta para devolver listade usuarios en JSON
// router.get('/', (req, res) => {
//   fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
//     if(err) {
//       return res.status(500).json({
//         message: "Internal Server Error"
//       })
//     }
//     res.json(JSON.parse(data));
//   })
// });

router.get('/', async(req, res) => {
    try{
      const users = await User.find();
      res.json(users);
    } catch (err) {
        res.status(500).json({
          message: err.message
        })
    }
})

// router.get('/:_id', (req, res) => {

//   fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {

//     if(err) {
//       return res.status(500).json({
//         message: "Internal Server Error"
//       })
//     }

//     let dataJson = JSON.parse(data);

//   const user = dataJson.find((user) => user._id === req.params._id)

//   if(!user) {
//     return res.status(404).json({
//      message: "ID de usuario no encontrado",
//     });
//    }

//    res.status(200).json(user);

//   });

// });

router.get('/:userId', async (req, res) => {
  try{
      let userById = await User.findById(req.params.userId);
      res.json(userById);
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
  }
})

router.post('/', async (req, res) => {
  const { name, about, avatar } = req.body;

  try{
    const newUser = await User.create({ name, about, avatar });
    res.send({data: newUser});
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})
module.exports = router;