'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

router.get('/', controller.get);
router.get('/admin/:id', controller.getById);
router.get('/:slug', controller.getBySlug);
router.get('/tags/:tag', controller.getByTag);

module.exports = router;