const {check} = require('express-validator/check');

module.exports = {
    validate: [
        check('penempatan_sparepart')
            .isLength({min: 1}).withMessage('Penempatan sparepart tidak boleh kosong'),
        check('tipe_sparepart')
            .isLength({min: 1}).withMessage('Tipe sparepart tidak boleh kosong'),
        check('nama_sparepart')
            .isLength({min: 1}).withMessage('Nama sparepart tidak boleh kosong'),
        check('harga_beli_sparepart')
            .isLength({min: 1}).withMessage('Harga beli sparepart tidak boleh kosong')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik'),
        check('harga_jual_sparepart')
            .isLength({min: 1}).withMessage('Harga jual sparepart tidak boleh kosong')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik'),
        check('merk_sparepart')
            .isLength({min: 1}).withMessage('Merk sparepart tidak boleh kosong'),
        check('stok_sparepart')
            .isLength({min: 1}).withMessage('Stok sparepart tidak boleh kosong')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik'),
        check('min_stok')
            .isLength({min: 1}).withMessage('Minimal stok sparepart tidak boleh kosong')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik'),
        check('tipe_kendaraan')
            .isLength({min: 1}).withMessage('Tipe kendaraan tidak boleh kosong')
            .isJSON().withMessage('Inputan harus JSON string')
    ]
}