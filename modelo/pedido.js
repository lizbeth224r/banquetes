'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaPedidos = Schema({
    total: String,
    usuarios: { type: Schema.ObjectId, ref: "Usuarios" },
    evento: { type: Schema.ObjectId, ref: "Eventos" },
    menu: { type: Schema.ObjectId, ref: "Menu" }
});
//El nombre real de la coleccion se llama Usuarios 
module.exports = mongoose.model("Pedidos", EsquemaPedidos);