const db = require('./db.js');

module.exports.handleSignup = (email, password) => {
    // Check if the email exists
    // Save the user to the DB
    db.saveUser({ 
        email,
        password
    });
    // Send welcome email
};