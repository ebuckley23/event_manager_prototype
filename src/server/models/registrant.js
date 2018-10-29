const mongoose = require('mongoose');
const validator = require('validator');
const schema = new mongoose.Schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: {unique: true},
    lowercase: true,
    validate: (value) => validator.isEmail(value)
  }
});

schema.virtual('fullName').get(function() {
  return `${this.name.firstName} ${this.name.lastName}`;
});

module.exports = mongoose.model('registrant', schema);