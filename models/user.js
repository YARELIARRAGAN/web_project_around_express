const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /((https?:\/\/)?(www\.)?[a-zA-Z0-9._~:\/?%#\[\]@!$&'()*+,;=]{5,})/.test(v);
      },
      message: (props) => `${props.value} no es un avatar valido`,
    },
  },
});

module.exports = mongoose.model('user', userSchema);
