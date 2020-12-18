const mongoose = require('mongoose');

const GaonNuriSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    ingredient: {type: String, required: true},
    url: {type: String},
    date: {type: Date, default: Date.now}
})

module.exports = mongoose.model('GaonNuriFood', GaonNuriSchema);