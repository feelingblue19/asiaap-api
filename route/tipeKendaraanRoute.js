'use strict'

const express = require('express');
const router = express.Router();

const tipeKendaraan = require('../controller/tipekendaraanController');

router.get('/', tipeKendaraan.get);
router.post('/', tipeKendaraan.create);
router.get('/:id', tipeKendaraan.show);
router.patch('/:id', tipeKendaraan.update);
router.delete('/:id', tipeKendaraan.delete);

module.exports = router;