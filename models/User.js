const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  facebookId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  picture: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now()
  },

});

module.exports = mongoose.model('User', UserSchema)
