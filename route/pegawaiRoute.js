'use strict'

const express = require('express');
const router = express.Router();
const validator = require('../validator/pegawaiValidator');
const pegawai = require('../controller/pegawaiController');

router.post('/', validator.validate, pegawai.create);
router.patch('/:id', validator.validate, pegawai.update);
router.get('/', pegawai.get);
router.get('/:id', pegawai.show);
router.delete('/:id', pegawai.delete);

module.exports = router;