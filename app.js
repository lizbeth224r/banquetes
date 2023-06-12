'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var usuario_ruta = require('./rutas/usuarioRuta.js');

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

// rutas base
app.use('/api', usuario_ruta);

module.exports = app;