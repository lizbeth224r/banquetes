'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaEventos = Schema({
    tipo: String,
    fecha: String,
    hora: String,
    invitados: String
        //usuarios: { type: Schema.ObjectId, ref: "Usuarios" }
});
//El nombre real de la coleccion se llama Usuarios 
module.exports = mongoose.model("Eventos", EsquemaEventos);