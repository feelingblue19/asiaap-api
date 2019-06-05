'use strict'

const express = require('express');
const router = express.Router();

const merkKendaraan = require('../controller/merkKendaraanController');

router.get('/', merkKendaraan.get);
router.post('/', merkKendaraan.create);
router.get('/:id', merkKendaraan.show);
router.patch('/:id', merkKendaraan.update);
router.delete('/:id', merkKendaraan.delete);

module.exports = router;