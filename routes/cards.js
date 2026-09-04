const router = require('express').Router();
const Card = require('../models/card');

// router.get('/', (req, res) => {
//   fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf8', (err, data) => {
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
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
})

router.post('/', async(req, res) => {
    const { name, link } = req.body;
    const owner = req.user._id
    try{
      const newCard = await Card.create({ name, link, owner });
      res.send({ data: newCard})
    }  catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
})

router.delete('/:cardId', async(req, res) =>{
    const cardId = req.params.cardId;
    try{
      const deleteCard = await Card.findByIdAndDelete(cardId);
      res.send(deleteCard)
    } catch (err) {
      res.status(500).json({
        message: err.message
      })
    }
})
module.exports = router;