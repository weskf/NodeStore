'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

router.get('/', controller.get);


module.exports = router;