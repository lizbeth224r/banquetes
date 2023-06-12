//use strict significa que las variabes deben ser declaradas completas 
'use strict'
var mongoose = require("mongoose"); //utiliza la libreria mongoose 
var Schema = mongoose.Schema;

var EsquemaPostre = Schema({
    titulo: String,
    descripcion: String,
    imagen: String
});

module.exports = mongoose.model('Postre', EsquemaPostre); //crea coleccion cancion para exportarla
//con model se tiene que instanciar