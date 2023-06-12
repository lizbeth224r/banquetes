/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/proyecto', (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log("conexión exitosa");
    }
})*/
//conecta a base de datos y exporta el servidor 
var mongoose = require('mongoose'); //manda a llamar la base de datos sql 
var app = require('./app'); //recibe el archivo de app (manda a llamar al servidor)
var port = process.env.PORT || 3977; //

mongoose.connect('mongodb://127.0.0.1:27017/banquetes')
    .then(() => {
        console.log("conexion exitosa");
        return app.listen(port); //lanzando el servidor por el puerto 3977
    })
    .then(() => {
        console.log("Servidor de api rest de musica escuchando en http://localhost:" + port);
    })
    .catch((err) => {
        console.error(err); //error de la conexion con la base de datos 
        process.exit(1);
    });