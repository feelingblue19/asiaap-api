'use strict'

const express = require('express');
const router = express.Router();
const validator = require('../validator/merkKendaraanValidator');

const merkKendaraan = require('../controller/merkKendaraanController');

router.get('/', merkKendaraan.get);
router.post('/', validator.validate, merkKendaraan.create);
router.get('/:id', merkKendaraan.show);
router.patch('/:id', validator.validate, merkKendaraan.update);
router.delete('/:id', merkKendaraan.delete);

module.exports = router;