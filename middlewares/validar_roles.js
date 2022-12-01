const { response } = require("express");
const usuario = require("../models/usuario");


const esAdminRol = (req, res = response)=>{
   
    if (!req.usuario) {
        return res.status(500).json({
            msg:'Se intenta verificar el roll sin un token verificado'
        });
    }

    const {rol,nombre} = req.usuario;

    if (rol !=='ADMIN_ROL') {
        return res.status(401).json({
            msg:`El ususario ${nombre} no es administrador`
        });
    }


    next();
}


const tieneRol = (...roles)=>{

    return(req, res = response)=>{
        
        if (!req.usuario) {
            return res.status(500).json({
                msg:'Se intenta verificar el roll sin un token verificado'
            });
        }
    
        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg:`El servicio requiere uno de estos ${roles}`
            });
        }

        next();
    }

}


module.exports={esAdminRol,tieneRol};