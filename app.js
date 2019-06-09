const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    morgan = require('morgan');

const merkKendaraanRoute = require('./route/merkKendaraanRoute');
const tipeKendaraanRoute = require('./route/tipeKendaraanRoute');
const sparepartRoute = require('./route/sparepartRoute');
const cabangRoute = require('./route/cabangRoute');
const pegawaiRoute = require('./route/pegawaiRoute');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/public',express.static('public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });


//ROUTE
app.use('/merkkendaraan', merkKendaraanRoute);
app.use('/tipekendaraan', tipeKendaraanRoute);
app.use('/sparepart', sparepartRoute);
app.use('/cabang', cabangRoute);
app.use('/pegawai', pegawaiRoute);

module.exports = app;