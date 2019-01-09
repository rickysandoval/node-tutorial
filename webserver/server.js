const express = require('express');
const hbs = require('hbs'); // handlebars
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


// custom middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log');
        }
    });
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });

// Middleware for static resources
app.use(express.static(__dirname + '/webserver/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() + 1000);
hbs.registerHelper('screamIt', text => typeof text === 'string' ? text.toUpperCase() : text);

// Root
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Sub broski'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "bad boy!"
    });
});

// Bind application to port on machine
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});