const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    parent_id: {type: String, required: true},
    title: {type: String, required: true},
    inputscore: {type: Number, required: true},
    contents: {type: String, required: true},
    timestampe: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('Comment', CommentSchema);