'use strict'
const model = require('../models/index');
const { validationResult } = require('express-validator/check');

exports.get = async (request, result) => {
    try {
        // findAll return array of object
        const merk = await model.MerkKendaraan.findAll({});
        if (merk.length != 0) {
            result.status(200).json({
                'status': 'OK',
                'merk_kendaraan': merk
            });
        } else {
            result.status(200).json({
                'status': 'OK',
                'messages': 'EMPTY'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    }
}

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
            //get id merk terakhir, findAll return array of object
            let last_id = await model.MerkKendaraan.findAll({
                order: [
                    ['id_merk', 'DESC']
                ],
                attributes: ['id_merk'],
                limit: 1,
                raw: true
            });

            if (last_id.length == 0) {
                //belum ada data merk kendaraan
                id = 'MERK01';
            } else {
                //data merk kendaraan sudah ada
                let temp = last_id[0].id_merk;
                let substring_id = parseInt(temp.substring(4))+1;
                
                if(substring_id < 10)
                    id = 'MERK0' + substring_id;
                else 
                    id = 'MERK' + substring_id;
            }

            return id;
        } catch (error) {
            console.log(error);
        }
    }

    try {
        const id_merk = await getID();
        const nama_merk = request.body.nama_merk;

        console.log(id_merk);

        //create return object created
        const merk = await model.MerkKendaraan.create({
            id_merk,
            nama_merk
        });

        if (merk) {
            result.status(201).json({
                'status': 'OK',
                'messages': 'Merk Kendaraan berhasil ditambahkan',
                'merk_kendaraan': merk
            });
        }
    } catch (error) {
        //handle error saat create resource
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    }
}

exports.show = async (request, result) => {
    const id_merk = request.params.id;

    try {
        //findOne return object  yang dicari
        const merk = await model.MerkKendaraan.findOne({
            where: {
                id_merk: id_merk
            }
        });

        if(merk) {
            result.status(200).json({
                'status': 'OK',
                'merk_kendaraan': merk
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Merk kendaraan tidak ditemukan'
            })
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
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

    const id = request.params.id
    const {
        nama_merk
    } = request.body;
    let merk;

    try {
        const [upd] = await model.MerkKendaraan.update({
            nama_merk
        }, {
            where: {
                id_merk: id
            }
        });

        if (upd) {
            result.status(200).json({
                'status': 'OK',
                'message': 'Merk kendaraan berhasil diupdate'
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Merk Kendaraan tidak ditemukan'
            });
        }
    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    }

    /******** INI ALTERNATIF YANG LAIN *********
        try {
            merk = await model.MerkKendaraan.findOne({
                where: {
                    id_merk: id
                }
            });
        
            if(!merk) {
                result.status(404).json({
                    'status': 'ERROR',
                    'message': 'Merk Kendaraan tidak ditemukan'
                })
            }

        } catch (error) {
            console.log(error);
            result.status(500).json({
                'status': 'ERROR',
                'messages': error
            })
        }

        try {
            merk.nama_merk = nama_merk;

            const upd = await merk.save();

            if(upd) {
                result.status(200).json({
                    'status': 'OK',
                    'message': 'Merk kendaraan berhasil diupdate',
                    'merk_kendaraan': upd
                });
            }
        } catch (error) {
            //handle error saat save
            console.log(error);
            result.status(500).json({
                'status': 'ERROR',
                'messages': error
            })
        } 
    ********************************************/
}

exports.delete = async (request, result) => {
    const id = request.params.id;
    
    try {
        //destroy return 0 kalau tidak ada row yang dihapus,
        //dan jika ada row yang akan dihapus akan return
        //angka sesuai jumlah row yang dihapus
        const del = await model.MerkKendaraan.destroy({
            where: { 
                id_merk: id
            }
        });

        if(del) {
            //akan masuk sini jika ada row yang dihapus atau yang direturn > 0
            result.status(200).json({
                'status': 'OK',
                'message': 'Merk Kendaraan berhasil dihapus'
            });
        } else {
            //akan masuk sini jika TIDAK ada row yang dihapus atau yang direturn == 0
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Merk Kendaraan tidak ditemukan'
            });
        }

    } catch (error) {
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    }   
}