'use strict'
const model = require('../models/index');
const {validationResult} = require('express-validator/check');
const bcrypt = require('bcrypt');

exports.create = async (request, result) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return result.status(422).json({
            'errors': errors.array()
        });
    }
    
    try {
        let last_id = await model.Pegawai.findAll({
            order: [
                ['id_pegawai', 'DESC']
            ],
            attributes: ['id_pegawai'],
            limit: 1,
            raw: true
        });

        let id;

        if (last_id.length == 0) {
            id = 'PEG01';
        } else {
            let temp = last_id[0].id_pegawai;
            let substring_id = parseInt(temp.substring(3)) + 1;
            
            if(substring_id < 10)
                id = 'PEG0' + substring_id;
            else 
                id = 'PEG' + substring_id;
        }

        let req = request.body;
        req.id_pegawai = id;
        req.password = await bcrypt.hash(req.password, 10);

        if(req.jabatan_pegawai == 'Montir') {
            req.username = null;
            req.password = null; 
        }

        const pegawai = await model.Pegawai.create(req);

        if (pegawai) {
            pegawai.update(req);

            result.status(200).json({
                status: 'OK',
                message: pegawai
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        });
    }
}

exports.update = async (request, result) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return result.status(422).json({
            'errors': errors.array()
        });
    }

    const id_pegawai = request.params.id;
    const req = request.body;

    try {
        const pegawai = await model.Pegawai.findOne({
            where: {
                id_pegawai
            }
        });

        if (pegawai) {
            pegawai.update(req);

            result.status(200).json({
                status: 'OK',
                message: 'Pegawai berhasil diupdate'
            });
        } else {
            result.status(404).json({
                status: 'ERROR',
                message: 'Pegawai tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        });
    }
}

exports.delete = async (request, result) => {
    const id_pegawai = request.params.id;

    try {
        const pegawai = await model.Pegawai.findOne({
            where: {
                id_pegawai
            }
        });

        if (pegawai) {
            await pegawai.destroy();
            result.status(200).json({
                status: 'OK',
                message: 'Pegawai berhasil dihapus'
            });
        } else {
            result.status(404).json({
                status: 'ERROR',
                message: 'Pegawai tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        });
    }
    
}

exports.get = async (request, result) => {
    try {
        const pegawai = await model.Pegawai.findAll();

        if (pegawai.length != 0) {
            result.status(200).json({
                status: 'OK',
                pegawai: pegawai
            });
        } else {
            result.status(200).json({
                status: 'OK',
                message: 'EMPTY'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        });
    }
}

exports.show = async (request, result) => {
    const id_pegawai = request.params.id;
    
    try {
        const pegawai = await model.Pegawai.findOne({
            where: {
                id_pegawai
            }
        });

        if (pegawai) {
            result.status(200).json({
                status: 'OK',
                pegawai: pegawai
            });
        } else {
            result.status(404).json({
                status: 'ERROR',
                message: 'Pegawai tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        });
    }
}