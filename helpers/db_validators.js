const Rol = require('../models/rol')

const esRolValido = async(rol="")=>{
    const existeRol = await Rol.findOne({rol});
    if (!existeRol) {
         throw new Error(`El rol: ${rol} , no está registrado en la BD`);
    }
}

module.exports={esRolValido};