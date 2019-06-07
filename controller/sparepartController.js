'use strict' 

const model = require('../models/index');
const { validationResult } = require('express-validator/check');

exports.create = async (request, result) => {
    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return result.status(422).json({
            'errors': errors.array()
        });
    }

    async function getID () {
        let id;
        try {
            let last_id = await model.Sparepart.findAll({
                order: [
                    ['kode_sparepart', 'DESC']
                ],
                attributes: ['kode_sparepart'],
                limit: 1,
                raw: true
            });

            if (last_id.length == 0) {
                id = 'SPR01';
            } else {
                let temp = last_id[0].kode_sparepart;
                let substring_id = parseInt(temp.substring(3)) + 1;
                
                if(substring_id < 10)
                    id = 'SPR0' + substring_id;
                else 
                    id = 'SPR' + substring_id;
            }

            return id;
        } catch (error) {
            console.log(error);
        }
    }

    try {
        let req = request.body;
        req.kode_sparepart = await getID();

        if (request.file)
            req.gambar_sparepart = 'http://localhost:3000/uploads/' + request.file.filename;
        else {
            result.status(400).json({
                'status': 'ERROR',
                'messages': 'File gambar sparepart tidak ada'
            });
        }

        const sparepart = await model.Sparepart.create(req);
        
        if (sparepart) {
            const tipe_kendaraan = JSON.parse(request.body.tipe_kendaraan);

            try {
                await sparepart.setTipe(tipe_kendaraan);
            } catch (error) {
                console.log(error);
                result.status(500).json({
                    'status': 'ERROR',
                    'messages': error
                });
            }

            result.status(201).json({
                'status': 'OK',
                'messages': 'Sparepart berhasil ditambahkan',
                'sparepart': sparepart
            });

        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    };
};

exports.update = async (request, result) => {
    const kode_sparepart = request.params.id;

    const errors = validationResult(request);

    if(!errors.isEmpty()) {
        return result.status(422).json({
            'errors': errors.array()
        });
    }

    let req = request.body;
    
    try {
        const sparepart = await model.Sparepart.findOne({
            where: {
                kode_sparepart
            }
        });
    
        if (sparepart) {
            if (request.file)
                req.gambar_sparepart = 'http://localhost:3000/uploads/' + request.file.filename;
            else 
                req.gambar_sparepart = sparepart.gambar_sparepart;
    
            sparepart.update(req).then( async (spr) => {
                const tipe_kendaraan = JSON.parse(request.body.tipe_kendaraan);

                try {
                    await spr.setTipe(tipe_kendaraan);
                } catch (error) {
                    console.log(error);
                    result.status(500).json({
                        'status': 'ERROR',
                        'messages': error
                    });
                }

                result.status(200).json({
                    'status': 'OK',
                    'message': 'Sparepart berhasil diupdate'
                });
            }).catch((err) => {
                console.log(err);
                result.status(500).json({
                    'status': 'ERROR',
                    'messages': err
                });
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Sparepart tidak ditemukan'
            });
        }
    } catch (error) {
        result.status(500).json({
            'status': 'ERROR',
            'message': error
        });
    }
    
};

exports.show = async (request, result) => {
    const id = request.params.id;
    try {
        const sparepart = await model.Sparepart.findOne({
            include: 'tipe',
            where: {
                kode_sparepart: id
            }
        });

        if (sparepart) {
            result.status(200).json({
                'status': 'OK',
                'sparepart': sparepart
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Sparepart tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    }
};

exports.get = (request, result) => {
    model.Sparepart.findAll({}).then((sparepart) => {
        if(sparepart.length != 0) {
            result.status(200).json({
                'status': 'OK',
                'sparepart': sparepart
            });
        } else {
            result.status(200).json({
                'status': 'OK',
                'message': 'EMPTY'
            });
        }
    }).catch((err) => {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'message': err
        });
    });
};

exports.delete = (request, result) => {
    const id = request.params.id;

    model.Sparepart.destroy({
        where: {
            kode_sparepart: id
        }
    }).then((res) => {
        if(res) {
            result.status(200).json({
                'status': 'OK',
                'message': 'Sparepart berhasil dihapus'
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Sparepart tidak ditemukan'
            });
        }
    }).catch((err) => {
        console.log(err);
        result.status(500).json({
            'status': 'ERROR',
            'message': err
        });
    });
};