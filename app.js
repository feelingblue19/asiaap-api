const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
    morgan = require('morgan');

const merkKendaraanRoutes = require('./route/merkKendaraanRoute');
const tipeKendaraanRoutes = require('./route/tipeKendaraanRoute');
const sparepartRoutes = require('./route/sparepartRoute');

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

app.use('/merkkendaraan', merkKendaraanRoutes);
app.use('/tipekendaraan', tipeKendaraanRoutes);
app.use('/sparepart', sparepartRoutes);


module.exports = app;