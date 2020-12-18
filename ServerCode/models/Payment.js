const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    name: {type: String, required:true},   //name of all the food ordered
    price: {type: Number, required:true},  //price of each food
    totalprice: {type: Number, required:true}, //price of all the food
    num: {type: Number, required:true},    //number of food ordered
    nickname: {type: String, required:true},   //nickname of the user
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Payment', PaymentSchema);