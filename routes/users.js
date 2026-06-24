const router = require('express').Router();
const fs = require('fs');
const path = require('path');

//ruta para devolver listade usuarios en JSON
router.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {
    if(err) {
      return res.status(500).json({
        message: "Internal Server Error"
      })
    }
    res.json(JSON.parse(data));
  })
});

router.get('/:_id', (req, res) => {

  fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8', (err, data) => {

    if(err) {
      return res.status(500).json({
        message: "Internal Server Error"
      })
    }

    let dataJson = JSON.parse(data);

  const user = dataJson.find((user) => user._id === req.params._id)



  if(!user) {
    return res.status(404).json({
     message: "ID de usuario no encontrado",
    });
   }

   res.status(200).json(user);

  });

});

module.exports = router;