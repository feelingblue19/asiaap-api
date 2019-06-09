'use strict'

const {check} = require('express-validator/check');

module.exports = {
    validate: [
        check('nama_cabang')
            .isLength({min: 1}).withMessage('Nama cabang tidak boleh kosong'),
        check('alamat_cabang')
            .isLength({min: 1}).withMessage('Alamat cabang tidak boleh kosong')
    ]
}

