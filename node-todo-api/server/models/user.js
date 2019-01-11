const mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {
    User
};




// let newUser = new User({
//     email: 'ras482@cornell.edu'
// });

// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, e => {
//     console.log('Unable to save user');
//     console.log(e.message)
// });