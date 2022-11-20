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
 
const usuariosPut = async (req, res = response) =>{
    //parametro dentro del url
    const {id} = req.params;
    //de esta forma separamos los parametros deseados
    const {_id,passwd,google,...resto}= req.body;

    if (passwd) {
        
         //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.passwd = bcryptjs.hashSync(passwd,salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg:'API put - controlador',
        usuario
    })
}

const usuariosPost =  async(req, res = response) =>{


    const {nombre,correo,passwd,rol} = req.body;
    const usuario = new Usuario({nombre,correo,passwd,rol});


    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.passwd = bcryptjs.hashSync(passwd,salt);
    
    //grabar en DB
    await usuario.save();


    res.json({
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