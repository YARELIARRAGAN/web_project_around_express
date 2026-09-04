const router = require('express').Router();
const User = require('../models/user');


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