const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  external_id: String,
  registrants: [{
    signedIn: false,
    registrant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'registrant'
    }
  }]
});

module.exports = mongoose.model('event', schema);