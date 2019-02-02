const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+ '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${ now }: ${ req.method }: ${ req.url }`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err)
      console.log(err);
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainence.hbs');
// });

app.use(express.static(__dirname + 'public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to the home page.. homies'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About the Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Bad page'
  })
});

app.listen(process.env.PORT | 3000, () => {
  console.log('Server is up and listening at port: 3000');
});
