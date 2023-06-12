//use strict significa que las variabes deben ser declaradas completas 
'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaUsuarios = Schema({
    nombre: String,
    apellido: String,
    email: String,
    direccion: String,
    telefono: String,
    password: String,
    imagen: String
});
//El nombre real de la coleccion se llama Usuarios 
module.exports = mongoose.model("Usuarios", EsquemaUsuarios);