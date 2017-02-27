// npm install express, hbs
// 'views' folder is the default folder for the handlebars module partials function


const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//must first install hbs (handlebar.js)
//to be able to use partials and helpers
hbs.registerPartials(__dirname + '/views/partials')  // Partials are pieces of reuseable html

app.set('view engine', 'hbs');

// step to insert middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
        console.log('Unable to append server log.')
    }
  });
  next(); //next() MUST be inserted, otherwise program will never continue passed this function
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

// helpers are reuseable pieces of javascript code
// that can be used anywhere within the project
// under an hbs extension file
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home page',
    welcomeMsg: 'Welcome to the root page',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'An About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'There was an error.'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
