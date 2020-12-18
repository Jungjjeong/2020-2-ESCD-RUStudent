const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    appid: {},
    secret: {},
    js_code: {type: String},
    grant_type: {}
})

module.exports = mongoose.model('Order', OrderSchema);