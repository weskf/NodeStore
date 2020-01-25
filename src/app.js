'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

//Conecta ao banco de dados
mongoose.connect('mongodb+srv://wfrohlich:wes2chris@cluster0-dyj65.mongodb.net/nodeStore?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//Carrega os Models
//const Product = require('./models/product');

//Carrega as rotas
app.use('/', indexRoute);
app.use('/products', productsRoute);





module.exports = app;