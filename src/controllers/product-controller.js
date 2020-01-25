'use-strict'

// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/Product');
const ValidationContract = require('../../validators/fluent-validator');
const repository = require('../../repositories/product-repository');

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve conter pelo menos 3 caracteres');

    //Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }    

    try {

        await repository.create(req.body)
        res.status(201).send({message: "Produto cadastrado com sucesso."});

    } catch (error) {
        res.status(400).send({message: "Falha ao cadastrar o produto", data: error});
    }
};

exports.put = async(req, res, next) => {

    try {

        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Produto atualizado com sucesso!'});

    } catch (error) {
        res.status(400).send({ message: 'Falha ao atualizar o produto', data: error})
    }
};

exports.delete = async(req, res, next) => {

    try {

        await repository.remove(req.params.id);
        res.status(201).send({ message: 'Produto removido com sucesso!'});

    } catch (error) {
        res.status(400).send({ message: 'Falha ao remover o produto', data: error});
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

exports.getBySlug = async(req, res, next) => {

    try {

        const data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);
    } catch (erro) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.getById = (req, res, next) => {

    try {
        const data = await =  repository.getById(req.params.id);
        res.status(200).send(data);

    } catch (erro) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};

exports.getByTag = (req, res, next) => {

    try {

        const data = await =  repository .getByTag(req.params.tag);
        res.status(200).send(data);

    } catch (erro) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
};