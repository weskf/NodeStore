'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//Conecta ao banco de dados
mongoose.connect('mongodb+srv://wfrohlich:wes2chris@cluster0-dyj65.mongodb.net/nodeStore?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

//Carrega os Models
// const Product = require('./models/product');
// const Customer = require('./models/customer');
// const Order = require('./models/order');

//Carrega as rotas
app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);





module.exports = app;