'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.post('/authenticate', controller.authenticate);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

router.get('/', controller.get);


module.exports = router;