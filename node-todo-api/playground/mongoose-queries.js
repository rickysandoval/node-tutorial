const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } =  require('./../server/models/todo');

let id = '5c3cdc72c1ca944f57be52b3';

// if (!ObjectID.isValid(id)) {
//     return console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Find', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Find one', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('Id not found');
    }
    console.log('Find by id', todo);
}).catch((e) => console.log(e));

