'use strict'

const express = require('express');
const router = express.Router();
const validator = require('../validator/cabangValidator');
const cabang = require('../controller/cabangController');

router.post('/', validator.validate, cabang.create);
router.patch('/:id', validator.validate, cabang.update);
router.get('/', cabang.get);
router.get('/:id', cabang.show);
router.delete('/:id', cabang.delete);


module.exports = router;