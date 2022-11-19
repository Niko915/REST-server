const {response} = require('express');
const bcryptjs = require('bcryptjs');




const Usuario = require('../models/usuario');


const usuariosGet = (req, res = response) =>{
    //parámetros  de query
    const {q,nombre='No name',apikey} = req.query;

    res.json({
        msg:'API get - controlador',
        q,
        nombre,
        apikey
    });
}
 
const usuariosPut = (req, res = response) =>{
    //parametro dentro del url
    const id = req.params.id;

    res.status(500).json({
        msg:'API put - controlador',
        id
    })
}

const usuariosPost =  async(req, res = response) =>{


    const {nombre,correo,passwd,rol} = req.body;
    const usuario = new Usuario({nombre,correo,passwd,rol});

    //verificar si correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return  res.status(400).json({
            msg:'Ese correo ya está registrado'
        })
    }

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.passwd = bcryptjs.hashSync(passwd,salt);
    
    //grabar en DB
    await usuario.save();


    res.status(201).json({
        usuario
    })
}

const usuariosDelete = (req, res = response) =>{
    res.json({
        msg:'API delete - controlador'
    })
}

const usuariosPatch = (req, res = response) =>{
    res.json({
        msg:'API patch'
    })
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
}