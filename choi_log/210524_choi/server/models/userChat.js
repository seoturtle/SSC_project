var mongoose = require('mongoose');

var UserChatSchema = new mongoose.Schema({

  midx: {type: Number, required: true},

  oidx: {type: Number, required: true},

  name: {type: String, required: true},

  email: {type: String, required: true},

  sex: {type: String, required: true},

});

module.exports = mongoose.model('UserChat', UserChatSchema);