const { response, request } = require('express')
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');

const validarJWT = async (req=request,res=response,next)=>{
 
    const token = req.header('xtoken')

    if (!token) {
        return res.status(400).json({
            msg:"No hay token en la petición"
        })
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY)

        //leer el usuario correspondiente al uid
        const usuario = await Usuario.findById(uid);

        //Verificar si el usuario existe
        if (!usuario) {
            returnres.status(401).json({
                msg:'Token no valido - Usuario no existe en la DB'
            })
        }

        //verificar si uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg:'Token no valido - Usuario con estado en false'
            })
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token no valido"
        })
    }   
  
}

module.exports={validarJWT}