const router = require('express').Router();
const fs = require('fs');
const path = require('path');


router.get('/', (req, res) => {
  console.log('ruta cards alcanzada');
  fs.readFile(path.join(__dirname, '../data/cards.json'), 'utf8', (err, data) => {
    if(err) {
      return res.status(500).json({
        message: "Algo ha salido mal"
      })
    }
    res.json(JSON.parse(data));
  })
});




module.exports = router;