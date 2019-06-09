'use strict'

const express = require('express');
const router = express.Router();

const tipeKendaraan = require('../controller/tipeKendaraanController');

const validator = require('../validator/tipeKendaraanValidator');

router.get('/', tipeKendaraan.get);
router.post('/', validator.validate, tipeKendaraan.create);
router.get('/:id', tipeKendaraan.show);
router.patch('/:id',validator.validate, tipeKendaraan.update);
router.delete('/:id', tipeKendaraan.delete);

module.exports = router;