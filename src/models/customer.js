'use strict';

const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String, 
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Customer', customerSchema );