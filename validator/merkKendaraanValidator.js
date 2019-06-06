const { check } = require('express-validator/check');

module.exports = {
    validate: [
        check('nama_merk')
            .isLength({min: 1}).withMessage('Nama merk tidak boleh kosong')
    ]
};