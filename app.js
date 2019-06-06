const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    morgan = require('morgan');

const merkKendaraanRoutes = require('./route/merkKendaraanRoute');
const tipeKendaraanRoutes = require('./route/tipeKendaraanRoute');
const sparepartRoutes = require('./route/sparepartRoute');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/merkkendaraan', merkKendaraanRoutes);
app.use('/tipekendaraan', tipeKendaraanRoutes);
app.use('/sparepart', sparepartRoutes);


module.exports = app;