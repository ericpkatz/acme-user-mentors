const express = require('express');
const swig = require('swig');
const path = require('path');
swig.setDefaults({ cache: false });

const app = express();
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('method-override')('_method'));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use((req, res, next)=> {
  res.locals.url = req.url;
  next();
});

app.get('/', (req, res, next)=> {
  res.render('index');
});

app.use('/users', require('./routes/users'));

module.exports = app;
