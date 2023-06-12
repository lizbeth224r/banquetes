'use strict'

const bcrypt = require('bcrypt');
const usuarios = require('../modelo/usuarios');
var usuariosModelo = require('../modelo/usuarios');
var usuario = new usuariosModelo(); //usuarios es un objeto que guarda en la bd 
var jwt = require('../servicio/jwt');
var fs = require('fs');
var path = require('path');

function registrarUsuario(req, res) {
    var usuario = new usuariosModelo();

    var params = req.body; //recibe todos los datos por Por el Metodo POST
    console.log(params);

    usuario.nombre = params.nombre;
    usuario.apellido = params.apellido;
    usuario.email = params.email;
    usuario.direccion = params.direccion;
    usuario.telefono = params.telefono;
    usuario.imagen = 'null';

    if (params.password) {
        bcrypt.hash(params.password, 10, function(err, hash) {
            usuario.password = hash;
            if (usuario.nombre != null && usuario.apellido != null && usuario.email != null && usuario.direccion != null && usuario.telefono != null) {
                //guardar el ususario en BD
                usuario.save()
                    .then(usuarioAlmacenado => {
                        if (!usuarioAlmacenado) {
                            res.status(404).send({ mesagge: 'No se ha registrado el ususario' });
                        } else {
                            //nos devuelve un objeto con los datos del ususario guardado
                            res.status(200).send({ usuariosModelo: usuarioAlmacenado });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ mesagge: 'Error al guardar el usuario' });
                    });
            } else {
                res.status(200).send({ mesagge: 'Introduce todos los campos' });
            }
        });
    } else {
        res.status(500).send({ mesagge: 'Introduce la contraseña' });
    }
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    /* usuariosModelo.findOne({ email: email }, (err, usuario) => {
        if (err) {
            res.status(500).send({ mesagge: 'Error en la peticion al servidor' });
        } else {
            if (!usuario) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password, function(err, check) {
                    if (check) {
                        //devolver los datos del ususario logeado 
                        console.log('coincide el password')
                        if (params.gethash) {
                            //gethash es una palaba que clave que no se puede olvidar (fecha especial, nombre etc)
                            //devolver un token de jwt 
                            res.status(200).send({
                                token: jwt.createToken(usuario)
                            });
                        } else {
                            res.status(200).send({ usuario: usuario });
                        }
                    } else {
                        res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                    }
                });
            }
        }
    });
}*/
    usuariosModelo.findOne({ email: email })
        .then(usuario => {
            if (!usuario) {
                res.status(404).send({ mesagge: 'El usuario no existe' });
            } else {
                bcrypt.compare(password, usuario.password)
                    .then(check => {
                        if (check) {
                            console.log('coincide el password');
                            if (params.gethash) {
                                res.status(200).send({
                                    token: jwt.createToken(usuario)
                                });
                            } else {
                                res.status(200).send({ usuario: usuario });
                            }
                        } else {
                            res.status(404).send({ mesagge: 'El usuario no se ha identificado' });
                        }
                    })
                    .catch(err => {
                        res.status(500).send({ mesagge: 'Error en la comparación de contraseñas' });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({ mesagge: 'Error en la petición al servidor' });
        });
}

function actualizarUsuario(req, res) { //PUT
    var usuarioId = req.params.id; //GET
    var update = req.body //POST

    /*usuariosModelo.findByIdAndUpdate(usuarioId, update, (err, usuarioUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        } else {
            if (!usuarioUpdate) {
                res.status(404).send({ message: 'No se ha podido encontar el usuario' });
            } else {
                res.status(200).send({ usuario: usuarioUpdate });
            }
        }
    });
}*/
    usuariosModelo.findByIdAndUpdate(usuarioId, update)
        .then(usuarioUpdate => {
            if (!usuarioUpdate) {
                res.status(404).send({ message: 'No se ha podido encontrar el usuario' });
            } else {
                res.status(200).send({ usuario: usuarioUpdate });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        });
}

function eliminarRegistro(req, res) {
    const id = req.params.id;

    usuariosModelo.findByIdAndDelete(id) //Puede ser remove para versiones recientes y para versiones anteriores Delete 
        .then(() => {
            res.json({ message: 'Usuario eliminado exitosamente' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error al eliminar el usuario', details: error });
        });

}

function actualizarFoto(req, res) {
    var UsuarioId = req.params.id; //Se declara una variable que llame al id por el método put, ya que este método va a requerir el id del usuario y la foto que va a colocar 
    if (req.files) { //Hace una condicional if en donde nos pregunta que requiere un archivo 
        //path significa ruta 
        var file_path = req.files.image.path; // Se declara una variable que recibe un archivo y la dirección de una imagen 
        var file_split = file_path.split('\\'); //     cargas\usuario\foto.jpg //Se declara una variable que va a analizar el tipo de archivo que recibe y quitara las diagonales que tenga
        var file_name = file_split[2]; //Se declara una variable que guarda el nombre del archivo 
        var extension = file_name.split('\.'); //Se declara una variable que guarda el nombre del archivo y quita las diagonales 
        var file_ext = extension[1];
        if (file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg') { //Hace una condición en donde analiza si el tipo de archivo es png, gif o jpg 
            /*usuariosModelo.findByIdAndUpdate(UsuarioId, { imagen: file_name[2] }, (err, usuario) => { // Nos indica que va a buscar el id que va a modificar y va a colocar la imagen seleccionada, despues hace un callback 
                if (err) { //Hace una condicional que primeramente manda el error 
                    res.status(500).send({ mesagge: 'Error al buscar el usuario' }); //envia el mensaje de error 
                }
                if (!usuario) { //Crea una condicional, donde si no es el usuario enviara un mensaje de error 
                    res.status(404).send({ mesagge: 'Error en el id' }); //Envia el mensaje de error por que el id no existe
                } else { //Envia el contrario al if en el cual enviara los datos para que el usuario los visualice 
                    res.status(200).send({ // Se muestran los datos(la imagen y el id del usuario al que se le coloco)
                        usuario: usuario
                    });
                }
            })
        } else {
            res.status(404).send({ mesagge: 'El formato no es adecuado' }); //Dentro del else indica si el formato de la imagen colocada no es adecuando al que se esta condionando en el if de la linea 179
        }
    } else {
        res.status(404).send({ mesagge: 'No cargo el archivo.....' }); //Indica el mensaje de que hubo un error al cargar el archivo 
    }
}*/
            usuariosModelo.findByIdAndUpdate(UsuarioId, { imagen: file_name[2] })
                .then(usuario => {
                    if (!usuario) {
                        res.status(404).send({ mesagge: 'Error en el id' });
                    } else {
                        res.status(200).send({
                            usuario: usuario
                        });
                    }
                })
                .catch(err => {
                    res.status(500).send({ mesagge: 'Error al buscar el usuario' });
                });
        }
    }
}

function getFoto(req, res) {
    var imageFile = req.params.imageFile;
    var rutaFoto = './cargas/usuario/' + imageFile;
    console.log(imageFile);
    /* fs.exists(rutaFoto, function(existe) {
        if (existe) {
            res.sendFile(path.resolve(rutaFoto));
        } else {
            res.status(404).send({ mesagge: 'No has cargado una imagen con ese nombre' });
        }
    })

}*/
    const fsPromises = require('fs').promises;

    fsPromises.access(rutaFoto)
        .then(() => {
            res.sendFile(path.resolve(rutaFoto));
        })
        .catch(() => {
            res.status(404).send({ mesagge: 'No has cargado una imagen con ese nombre' });
        });
}

function buscarUsuario(req, res) {
    var params = req.body;
    var id = params.id;
    usuariosModelo.find({ id: id })
        .then(us => {
            console.log(us);
            if (!us) {
                res.status(404).send({ mesagge: 'El usuario no existe' });

            } else {
                res.status(200).send({ us: us });
            }
        })
        .catch(err => {
            console.error(err);
        })
}
module.exports = {
    registrarUsuario,
    accesoUsuario,
    actualizarUsuario,
    eliminarRegistro,
    actualizarFoto,
    getFoto,
    buscarUsuario
};