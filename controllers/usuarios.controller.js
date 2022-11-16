const {response} = require('express');
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
    const body = req.body;
    const usuario = new Usuario(body);

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