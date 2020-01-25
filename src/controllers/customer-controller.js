'use-strict'

const Customer = require('../models/customer')
const ValidationContract = require('../../validators/fluent-validator');
const repository = require('../../repositories/customer-repository');

exports.post = async(req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'O e-mail está inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres.');

    //Se os dados forem inválidos
    if(!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }    

    try {

        await repository.create(req.body)
        res.status(201).send({message: "Cliente cadastrado com sucesso."});

    } catch (error) {
        res.status(400).send({message: "Falha ao cadastrar o cliente", data: error});
    }
};

exports.put = async(req, res, next) => {

    try {

        await repository.update(req.params.id, req.body);
        res.status(201).send({ message: 'Cliente atualizado com sucesso!'});

    } catch (error) {
        res.status(400).send({ message: 'Falha ao atualizar o cliente', data: error})
    }
};

exports.delete = async(req, res, next) => {

    try {

        await repository.remove(req.params.id);
        res.status(201).send({ message: 'Cliente removido com sucesso!'});

    } catch (error) {
        res.status(400).send({ message: 'Falha ao remover o cliente', data: error});
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