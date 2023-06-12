'use strict'

const bcrypt = require('bcrypt');
const Eventos = require('../modelo/evento');

var eventosModelo = require('../modelo/evento');
var usuario = new eventosModelo(); //usuarios es un objeto que guarda en la bd 

function registrarEvento(req, res) {
    var Eventos = new eventosModelo();
    var params = req.body; // Recibe todos los datos por el método POST
    console.log(params);

    Eventos.tipo = params.tipo;
    Eventos.fecha = params.fecha;
    Eventos.hora = params.hora;
    Eventos.invitados = params.invitados;
    if (Eventos.tipo != null && Eventos.fecha != null && Eventos.hora != null && Eventos.invitados != null ) {
        //guardar el ususario en BD
        Eventos.save()
            .then(eventoAlmacenado => {
                if (!eventoAlmacenado) {
                    res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                } else {
                    //nos devuelve un objeto con los datos del ususario guardado
                    res.status(200).send({ eventosModelo: eventoAlmacenado });
                }
            })
            .catch(err => {
                res.status(500).send({ mesagge: 'Error al guardar el usuario' });
            });
    } else {
        res.status(200).send({ mesagge: 'Introduce todos los campos' });
    }
}



function buscarRegistro(req, res) {
    var params = req.body;
    var clasificacion = params.clasificacion;

    return peliculasModelo.find({ clasificacion: clasificacion })
        .then(peli => {
            console.log(peli);
            if (!peli) {
                throw { status: 404, message: 'El usuario no existe' };
            }
            return { status: 200, peli: peli };
        })
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(error => {
            res.status(error.status || 500).send({ message: error.message || 'Error al buscar el registro', details: error.details });
        });
}

/*En esta implementación, se utiliza directamente la función librosModelo.findByIdAndUpdate() para 
actualizar el registro del libro en la base de datos. La función retorna una promesa que se encarga de 
manejar el resultado de la operación. Si se actualiza correctamente el libro, se resuelve la promesa con 
un objeto que contiene el estado 200 y los datos del libro actualizado. Si no se encuentra el libro, se lanza 
una excepción que será capturada en el siguiente bloque catch. En caso de error durante la actualización, 
también se captura la excepción y se maneja en el bloque catch. Finalmente, se envía la respuesta 
adecuada utilizando res.status().send(), teniendo en cuenta el estado y el mensaje correspondiente. */
function actualizarRegistro(req, res) {
    var peliId = req.params.id;
    var update = req.body;

    return peliculasModelo.findByIdAndUpdate(peliId, update)
        .then(peliUpdate => {
            if (!peliUpdate) {
                throw { status: 404, message: 'No se ha podido encontrar el usuario' };
            }
            return { status: 200, lib: peliUpdate };
        })
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(error => {
            res.status(error.status || 500).send({ message: error.message || 'Error al actualizar el usuario en el servidor' });
        });
}

/*En esta implementación, se utiliza directamente la función librosModelo.findByIdAndDelete() para eliminar el 
registro del libro en la base de datos. La función retorna una promesa que se encarga de manejar el resultado de 
la operación. Si la eliminación se realiza correctamente, se resuelve la promesa con un objeto que contiene el 
mensaje de éxito. Luego, se maneja la resolución de la promesa para enviar la respuesta adecuada utilizando 
res.json(). En caso de error durante la eliminación, 
se captura la excepción y se envía una respuesta de error con el código de estado 500 y el mensaje correspondiente.*/
function eliminarRegistro(req, res) {
    const id = req.params.id;

    return peliculasModelo.findByIdAndDelete(id)
        .then(() => {
            return { message: 'Registro de auto eliminado exitosamente' };
        })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error al eliminar el registro de auto', details: error });
        });
}

module.exports = {

    registrarEvento,
    buscarRegistro,
    actualizarRegistro,
    eliminarRegistro,
};