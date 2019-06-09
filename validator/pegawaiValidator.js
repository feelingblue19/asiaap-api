'use strict'

const {check} = require('express-validator/check');

module.exports = {
    validate: [
        check('id_cabang')
            .isLength({min: 1}).withMessage('ID cabang tidak boleh kosong'),
        check('nama_pegawai')
            .isLength({min: 1}).withMessage('Nama pegawai tidak boleh kosong'),
        check('alamat_pegawai')
            .isLength({min: 1}).withMessage('Alamat pegawai tidak boleh kosong'),
        check('no_telp_pegawai')
            .isLength({min: 1}).withMessage('Nomor telepon pegawai tidak boleh kosong')
            .isLength({max: 13}).withMessage('Nomor telepon pegawai maksimal 13 digit')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik'),
        check('gaji_per_minggu')
            .isLength({min: 1}).withMessage('Gaji per minggu tidak boleh kosong')
            .isNumeric({no_symbols: true}).withMessage('Inputan harus numerik')
            .isInt({min: 0}).withMessage('Gaji per minggu tidak boleh kurang dari 0'),
        check('jabatan_pegawai')
            .isIn(['Admin', 'Kasir', 'Customer Service', 'Montir'])
                .withMessage('Inputan hanya boleh Admin, Kasir, Customer Service, atau Montir'),
        check('username')
            .custom((value, {req}) => {
                if (req.body.jabatan_pegawai == 'Montir' && value.length != 0)
                    return false;
                else 
                    return true;
            }).withMessage('Montir tidak boleh memiliki username')
            .custom((value, {req}) => {
                if (req.body.jabatan_pegawai != 'Montir' && (value.length < 4 || value.length > 10))
                    return false;
                else 
                    return true;
            }).withMessage('Username minimal 4 karakter dan maksimal 10 karakter')
            .custom((value, {req}) => {
                if (req.body.jabatan_pegawai != 'Montir' && !/^([a-zA-Z0-9]+)$/.test(value))
                    return false;
                else 
                    return true;
            }).withMessage('Username tidak boleh memiliki karakter khusus'),
        check('password')
            .custom((value, {req}) => {
                if (req.body.jabatan_pegawai == 'Montir' && value.length != 0)
                    return false;
                else 
                    return true;
            }).withMessage('Montir tidak boleh memiliki password')
            .custom(value => !/\s/.test(value)).withMessage('Password tidak boleh memiliki spasi')
            .custom((value, {req}) => {
                if (req.body.jabatan_pegawai != 'Montir' && (value.length < 4 || value.length > 10))
                    return false;
                else 
                    return true;
            }).withMessage('Password minimal 4 karakter dan maksimal 10 karakter'),
    ]
}

