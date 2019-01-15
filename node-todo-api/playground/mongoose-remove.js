const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } =  require('../server/models/todo');
const { User } =  require('../server/models/user');

// Todo.remove({}).then((result) => console.log(result));

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
let id = '5c3e27a61f891f9d70af2cd6';

Todo.findByIdAndRemove(id).then((todo) => {
    console.log(todo);
});