const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
const cards = require('./routes/cards');
const users = require('./routes/users');

app.use((req, res, next) => {
  req.user = {
    _id: '6a8f234d0c8657f3bff94e13',
  };

  next();
});
app.use('/cards', cards);
app.use('/users', users);
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});
