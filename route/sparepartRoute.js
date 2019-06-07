'use strict'

const express = require('express');
const router = express.Router();

const multer = require('multer');

const validator = require('../validator/sparepartValidator');

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
        cb(new Error('Ekstensi file tidak didukung, hanya mendukung .jpg atau .png'), false);
}

const upload = multer({
    storage,
    fileFilter
}).single('gambar_sparepart');

const sparepart = require('../controller/sparepartController');

router.post('/', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'ERROR',
                message: err.message
            });
        } else
            next();
    }) 
}, validator.validate, sparepart.create);

router.post('/:id', (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                status: 'ERROR',
                message: err.message
            });
        } else {
            next();
        }
    }) 
}, validator.validate, sparepart.update);

router.get('/:id', sparepart.show);
router.get('/', sparepart.get);
router.delete('/:id', sparepart.delete);

module.exports = router;

