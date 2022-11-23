const {response} = require('express');
const bcryptjs = require('bcryptjs');




const Usuario = require('../models/usuario');


const usuariosGet = async  (req, res = response) =>{
    //parámetros  de query
    // const {q,nombre='No name',apikey} = req.query;
    const {desde=0,limite=5} = req.query;
 
    const [total,usuarios] = await Promise.all([ //lo de adentro es un filtro
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true})
        .skip(Number(desde)) //Desde donde se muestra
        .limit(Number(limite)) //Hasta donde se muestra
    ]);

    res.json({total,usuarios});
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

    res.json({ usuario });
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

const usuariosDelete = async(req, res = response) =>{

    const {id} = req.params;

    //Borrado físico
    //const usuario = Usuario.findByIdAndDelete(id);

    const usuario = Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({usuario});
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