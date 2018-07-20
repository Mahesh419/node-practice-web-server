const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  let now = new Date().toString();

  var log = `${now}, ${req.method}, ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append server.log');
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });



hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, res) => {
 //res.send('<h1>Hello Express!</h1>');
 res.render('home.hbs', {
   pageTitle: 'Home page',
   welcomeMessage: 'Welcome to this webpage!'
 });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up in port ${port}`);
});
