'use strict'

var express = require('express');
var UsuarioControl = require('../control/usuarioControl');
var md_auth = require('../middleware/autenticar');
var api = express.Router();
var multipart = require('connect-multiparty');
var dir_fotos = multipart({ uploadDir: './fotos/usuario' });

api.post('/prueba', UsuarioControl.registrarUsuario);
api.post('/registro', UsuarioControl.registrarUsuario);
api.post('/login', UsuarioControl.accesoUsuario);
api.put('/actualizar-usuario/:id', md_auth.validarAcceso, UsuarioControl.actualizarUsuario);
api.post('/actualizar-imagen-usuario/:id', [md_auth.validarAcceso, dir_fotos], UsuarioControl.actualizarFoto);
api.get('/get-imagen-usuario/:imageFile', UsuarioControl.getFoto);
api.delete('/eliminar/:id', UsuarioControl.eliminarRegistro);
api.get('/buscar/:id', UsuarioControl.buscarUsuario);

module.exports = api;