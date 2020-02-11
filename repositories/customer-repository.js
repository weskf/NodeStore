'use strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async() => {
    
    const res = await Customer.findOne({
        active:true
    }, 'name email password');
    
    return res;
};

exports.create = async(data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.update = async(id, data) => {

    await Customer.findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                email: data.email,
                senha: data.senha
            }
        });
};    

exports.remove = async(id) => {
    return await Customer.findOneAndRemove(id);
};    

exports.authenticate = async(data) => {
    const res = await Customer.find({
        email: data.email,
        password: data.password
    });

    return res;
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}