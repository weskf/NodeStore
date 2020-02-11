'use-strict'

const Customer = require('../models/customer')
const ValidationContract = require('../../validators/fluent-validator');
const repository = require('../../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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

        await repository.create({
           name: req.body.name,
           email: req.body.email,
           password: md5(req.body.password + global.SALT_KEY),
           roles: ["user"]
        });

        emailService.send(req.body.email, 
                        'Bem vindo ao Node Store', 
                        global.EMAIL_TMPL.replace('{0}', req.body.name));
    
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

exports.authenticate = async(req, res, next) => {
    
    try {
        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if(!customer){
            res.status(404).send({message:'Usuário ou senha inválido.'});
        }
        else{
            const token = await authService.generateToken({
                id: customer._id,
                email: customer.email, 
                name: customer.name,
                roles: customer.roles
            });

            res.status(200).send({
                token: token,
                data: {
                    email: customer.email, 
                    name: customer.name
                }
            });
        }
    } catch (erro) {
        return res.status(400).send({message: "Falha ao validar o cliente", data: error});
    }
}

exports.refreshToken = async(req, res, next) => {
    
    try {

        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if(!customer){
            res.status(404).send({message:'Cliente não encontrado'});
        }
        else{
            const tokenData = await authService.generateToken({
                id: customer._id,
                email: customer.email, 
                name: customer.name,
                roles: customer.roles
            });

            res.status(200).send({
                token: tokenData,
                data: {
                    email: customer.email, 
                    name: customer.name
                }
            });
        }
    } catch (erro) {
        return res.status(400).send({message: "Falha ao validar o cliente", data: error});
    }
}