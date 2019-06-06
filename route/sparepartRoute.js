'use strict'

const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') 
        cb(null, true);
    else 
        cb(new Error('Ekstensi file tidak didukung'), false);
}

const upload = multer({
    storage,
    fileFilter
});



const sparepart = require('../controller/sparepartController');

router.post('/', upload.single('gambar_sparepart') , sparepart.create);

module.exports = router;

