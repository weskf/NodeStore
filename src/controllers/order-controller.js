'use-strict'

const Order = require('../models/order')
const ValidationContract = require('../../validators/fluent-validator');
const repository = require('../../repositories/order-repository');
const guid = require('guid');

exports.post = async(req, res, next) => {

    try {

        await repository.create({
                customer: req.body.customer,
                number: guid.raw().substring(0, 6),
                items: req.body.items
        });
        res.status(201).send({message: "Pedido cadastrado com sucesso."});

    } catch (error) {
        res.status(400).send({message: "Falha ao cadastrar o pedido", data: error});
    }
};

exports.get = async(req, res, next) => {

    try {
        var data = await repository.get();
        res.status(200).send(data);

    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};