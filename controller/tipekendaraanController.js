'use strict'
const model = require('../models/index');

exports.get = async (request, result) => {
    try {
        // findAll return array of object
        const tipe = await model.TipeKendaraan.findAll({
            include: 'merk_kendaraan'
        });
        if (tipe.length != 0) {
            result.status(200).json({
                'status': 'OK',
                'tipe_kendaraan': tipe
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
    async function getID () {
        let id;
        try {
            //get id tipe terakhir, findAll return array of object
            let last_id = await model.TipeKendaraan.findAll({
                order: [
                    ['id_tipe', 'DESC']
                ],
                attributes: ['id_tipe'],
                limit: 1,
                raw: true
            });

            if (last_id.length == 0) {
                //belum ada data tipe kendaraan
                id = 'TIPE01';
            } else {
                //data tipe kendaraan sudah ada
                let temp = last_id[0].id_tipe;
                let substring_id = parseInt(temp.substring(4))+1;
                
                if(substring_id < 10)
                    id = 'TIPE0' + substring_id;
                else 
                    id = 'TIPE' + substring_id;
            }

            return id;
        } catch (error) {
            console.log(error);
        }
    }

    try {
        const id_tipe = await getID();
        const id_merk = request.body.id_merk;
        const nama_tipe = request.body.nama_tipe;

        // console.log(id_merk);

        //create return object created
        const tipe = await model.TipeKendaraan.create({
            id_tipe,
            nama_tipe,
            id_merk
        });

        if (tipe) {
            result.status(201).json({
                'status': 'OK',
                'messages': 'Tipe Kendaraan berhasil ditambahkan',
                'tipe_kendaraan': tipe
            });
        }
    } catch (error) {
        //handle error saat create resource
        console.log(error);
        result.status(500).json({
            'status': 'ERROR',
            'messages': error
        });
    };
}

exports.show = async (request, result) => {
    const id_tipe = request.params.id;

    try {
        //findOne return object  yang dicari
        const tipe = await model.TipeKendaraan.findOne({
            where: {
                id_tipe
            },
            include: 'merk_kendaraan'
        });

        if(tipe) {
            result.status(200).json({
                'status': 'OK',
                'tipe_kendaraan': tipe
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Tipe kendaraan tidak ditemukan'
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

exports.update = async (request, result) => {
    const id = request.params.id;
    const {
        nama_tipe,
        id_merk
    } = request.body;
    let tipe;

    try {
        const [upd] = await model.TipeKendaraan.update({
            nama_tipe,
            id_merk
        }, {
            where: {
                id_tipe: id
            }
        });

        if (upd) {
            result.status(200).json({
                'status': 'OK',
                'message': 'Tipe kendaraan berhasil diupdate'
            });
        } else {
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Tipe Kendaraan tidak ditemukan'
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
        const del = await model.TipeKendaraan.destroy({
            where: { 
                id_tipe: id
            }
        });

        if(del) {
            //akan masuk sini jika ada row yang dihapus atau yang direturn > 0
            result.status(200).json({
                'status': 'OK',
                'message': 'Tipe Kendaraan berhasil dihapus'
            });
        } else {
            //akan masuk sini jika TIDAK ada row yang dihapus atau yang direturn == 0
            result.status(404).json({
                'status': 'ERROR',
                'message': 'Tipe Kendaraan tidak ditemukan'
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