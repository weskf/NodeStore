'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({ extended: false}));

//Habilitar o CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Method', 'GET, POST, DELETE, PUT, OPTIONS');
    next();
});

const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');
const customerRoute = require('./routes/customer-route');
const orderRoute = require('./routes/order-route');

//Conecta ao banco de dados
mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

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