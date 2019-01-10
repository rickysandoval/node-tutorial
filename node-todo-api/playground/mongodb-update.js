const { MongoClient, ObjectID } = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Error: Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate(
    //     { _id: new ObjectID("5c379266797e717dae969c2c") },
    //     { $set: { completed: true } },
    //     { returnOriginal: false }
    // ).then(result => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate(
        { _id: new ObjectID("5c37810227206c68262cf354") },
        { 
            $set: { name: "Richard" },
            $inc: { age: -1 }
        },
        { returnOriginal: false }
    ).then(result => {
        console.log(result);
    });

    // db.close();
});