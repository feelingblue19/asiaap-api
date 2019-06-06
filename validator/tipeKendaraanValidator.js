const { check } = require('express-validator/check');

module.exports = {
    validate: [
        check('nama_tipe')
            .isLength({min: 1}).withMessage('Nama tipe tidak boleh kosong'),
        check('id_merk')
            .isLength({min: 1}).withMessage('ID merk tidak boleh kosong')
    ]
};