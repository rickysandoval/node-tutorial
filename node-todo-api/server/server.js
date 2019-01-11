const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');


let app = express();

// Middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    });
    console.log(newTodo);
    newTodo.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000');
});