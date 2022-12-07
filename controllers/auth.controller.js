const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req,res = response)=>{

    const{correo,passwd} = req.body;


    try {
        //verificar si el correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos - correo'
            })
        }
        //verificar actividad del usuario
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos - estado:false'
            })
        }
        //verificar passwd
        const passwdValida = bcryptjs.compareSync(passwd,usuario.passwd);
        if (!passwdValida) {
            return res.status(400).json({
                msg:'Usuario/Contraseña no son correctos - contraseña incorrecta'
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({usuario,token});
 
    } catch (error) {
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }

}

const googleIdentity = async(req,res=response)=>{
    const {id_token} = req.body;

    try {
        const  googleUser = await googleVerify(id_token);
        
        res.json({
            msg:'Ta bueno pa',
            id_token
        })
    } catch (error) {
        
    }



}



module.exports={login,googleIdentity} 