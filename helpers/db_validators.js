const Rol = require('../models/rol');
const Usuario = require('../models/usuario');



const esRolValido = async(rol="")=>{
    const existeRol = await Rol.findOne({rol});
    if (!existeRol) {
         throw new Error(`El rol: ${rol} , no está registrado en la BD`);
    }
}

const emailExiste = async (correo="")=>{
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error('Este correo ya ha sido registrado');
    }
}

const existeUsuarioPorId = async (id="")=>{
    const existeUsuario = await Usuario.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario correspondiente al id : ${id} , no existe`);
    }
}


module.exports={esRolValido,emailExiste,existeUsuarioPorId};