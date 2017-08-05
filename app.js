const express = require('express');
const swig = require('swig');
const path = require('path');
swig.setDefaults({ cache: false });

const app = express();
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use('/users', require('./routes/users'));

module.exports = app;
