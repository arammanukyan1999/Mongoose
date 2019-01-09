const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const todoDataSchema = new Schema({
    todo:String,
});

let Todo = mongoose.model('todoData', todoDataSchema);

module.exports = Todo;