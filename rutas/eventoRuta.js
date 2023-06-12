'use strict'

var express = require('express');
var EventoControl = require('../control/eventoControl');
//var md_auth = require('../middleware/autenticar');
var api = express.Router();

api.post('/pruebaE', EventoControl.prueba);
api.post('/registrar-evento', EventoControl.registrarEvento);
api.put('/actualizar-evento/:id', EventoControl.actualizarEvento);
api.delete('/eliminar/:id', EventoControl.eliminarEvento);
api.get('/buscar', EventoControl.buscarEvento);
module.exports = api;