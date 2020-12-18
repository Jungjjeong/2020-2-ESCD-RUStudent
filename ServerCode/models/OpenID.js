const mongoose = require('mongoose');

const OpenIDSchema = mongoose.Schema({
    openID: {type: String},
    amount: {type: Number}
})

module.exports = mongoose.model('OpenID', OpenIDSchema);