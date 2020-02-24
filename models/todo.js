const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoschema = new Schema({
    text: String,
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('Todo', todoschema);