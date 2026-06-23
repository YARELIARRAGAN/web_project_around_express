const express = require('express');

const { PORT = 3000} = process.env;

const app = express();
const cards = require('./routes/cards');
const users = require('./routes/users');

app.use('/cards', cards);
app.use('/users', users);
app.use( (req, res) => {
  res.status(404).json({
    message: "No existe esa pagina"
  });
})


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);

})