//use strict significa que las variabes deben ser declaradas completas 
'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EsquemaMenu = Schema({
    entrada: { type: Schema.ObjectId, ref: "Entrada" },
    principal: { type: Schema.ObjectId, ref: "Principal" },
    postre: { type: Schema.ObjectId, ref: "Postre" },
    bebidas: { type: Schema.ObjectId, ref: "Bebidas" }
});

module.exports = mongoose.model('Menu', EsquemaMenu);