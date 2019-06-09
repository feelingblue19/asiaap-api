'use strict'

const model = require('../models/index');
const {validationResult} = require('express-validator/check');

exports.create = async (request, result) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return result.status(422).json({
            'errors': errors.array()
        });
    }    

    try {
        let last_id = await model.Cabang.findAll({
            order: [
                ['id_cabang', 'DESC']
            ],
            attributes: ['id_cabang'],
            limit: 1,
            raw: true
        });

        let id;

        if (last_id.length == 0) {
            id = 'CAB01';
        } else {
            let temp = last_id[0].id_cabang;
            let substring_id = parseInt(temp.substring(3)) + 1;
            
            if(substring_id < 10)
                id = 'CAB0' + substring_id;
            else 
                id = 'CAB' + substring_id;
        }

        let req = request.body;
        req.id_cabang = id;

        const cabang = await model.Cabang.create(req);
        if (cabang) {
            result.status(201).json({
                status: 'OK',
                message: 'Cabang berhasil ditambahkan',
                cabang: cabang
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

    const id_cabang = request.params.id;
    let req = request.body;
    try {
        const cabang = await model.Cabang.findOne({
            where: {
                id_cabang
            }
        });

        if (cabang) {
            await cabang.update(req);

            result.status(200).json({
                status: 'OK',
                message: 'Cabang berhasil diupdate'
            });
        } else {
            result.status(404).json({
                status: 'OK',
                message: 'Cabang tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        })
    }

}

exports.delete = async (request, result) => {
    const id_cabang = request.params.id;
    try {
        const cabang = await model.Cabang.findOne({
            where: {
                id_cabang
            }
        });

        if (cabang) {
            await cabang.destroy();

            result.status(200).json({
                status: 'OK',
                message: 'Cabang berhasil dihapus'
            });
        } else {
            result.status(404).json({
                status: 'OK',
                message: 'Cabang tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        })
    }

}

exports.get = async (request, result) => {
    try {
        const cabang = await model.Cabang.findAll();
        if (cabang.length != 0) {
            result.status(200).json({
                status: 'OK',
                cabang: cabang 
            })
        } else {
            result.status(200).json({
                status: 'OK',
                message: 'EMPTY' 
            })
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        })
    }
}

exports.show = async (request, result) => {
    const id_cabang = request.params.id;
    try {
        const cabang = await model.Cabang.findOne({
            where: {
                id_cabang
            },
        });

        if (cabang) {
            result.status(200).json({
                status: 'OK',
                cabang: cabang 
            })
        } else {
            result.status(404).json({
                status: 'OK',
                message: 'Cabang tidak ditemukan' 
            })
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            status: 'ERROR',
            message: error
        })
    }
}




